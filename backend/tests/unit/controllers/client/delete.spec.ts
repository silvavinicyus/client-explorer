import { ClientErrors } from "@business/module/errors/clientErrors"
import { IClientRepositoryToken } from "@business/repositories/client/iClientRepository"
import { DeleteClientUseCase } from "@business/useCases/client/deleteClientUseCase"
import { FindByClientUseCase } from "@business/useCases/client/findByClientUseCase"
import { DeleteClientOperator } from "@controller/operations/client/deleteClientOperator"
import { InputDeleteClient } from "@controller/serializers/client/inputDelete"
import { left, right } from "@shared/either"
import { container } from "@shared/ioc/container"
import { fakeClientEntity } from "@tests/mock/entities/client"
import { FakeClientRepository } from "@tests/mock/repositories/iClientRepository"

describe("Create Client Operator Tests", () => {  
  beforeAll(() => {
    container.bind(IClientRepositoryToken).to(FakeClientRepository)
    container.bind(DeleteClientUseCase).toSelf().inSingletonScope()
    container.bind(FindByClientUseCase).toSelf().inSingletonScope()
  })            

  afterAll(() => {
    container.unbindAll()
  })

  test("Should fail to delete a client if client does not exists", async () => {    
    const input = new InputDeleteClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3'
    })

    const findByUseCase = container.get(FindByClientUseCase)
    jest.spyOn(findByUseCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.notFound())))

    const sut = container.get(DeleteClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(ClientErrors.notFound())    
  })

  test("Should fail to delete a client if delete use case failed", async () => {    
    const input = new InputDeleteClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3'
    })

    const findByUseCase = container.get(FindByClientUseCase)
    jest.spyOn(findByUseCase, 'exec').mockReturnValueOnce(Promise.resolve(right(fakeClientEntity)))

    const deleteUseCase = container.get(DeleteClientUseCase)
    jest.spyOn(deleteUseCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.deleteError())))

    const sut = container.get(DeleteClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(ClientErrors.deleteError())    
  })

  test("Should have sucess to delete", async () => {    
    const input = new InputDeleteClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3'
    })

    const findByUseCase = container.get(FindByClientUseCase)
    jest.spyOn(findByUseCase, 'exec').mockReturnValueOnce(Promise.resolve(right(fakeClientEntity)))

    const deleteUseCase = container.get(DeleteClientUseCase)
    jest.spyOn(deleteUseCase, 'exec').mockReturnValueOnce(Promise.resolve(right(void 0)))

    const sut = container.get(DeleteClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()   
  })
})