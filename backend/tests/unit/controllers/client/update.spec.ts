import { ClientErrors } from "@business/module/errors/clientErrors"
import { IClientRepositoryToken } from "@business/repositories/client/iClientRepository"
import { FindByClientUseCase } from "@business/useCases/client/findByClientUseCase"
import { UpdateClientUseCase } from "@business/useCases/client/updateClientUseCase"
import { UpdateClientOperator } from "@controller/operations/client/updateClientOperator"
import { InputUpdateClient } from "@controller/serializers/client/inputUpdate"
import { left, right } from "@shared/either"
import { container } from "@shared/ioc/container"
import { fakeClientEntity } from "@tests/mock/entities/client"
import { FakeClientRepository } from "@tests/mock/repositories/iClientRepository"

describe("Create Client Operator Tests", () => {  
  beforeAll(() => {
    container.bind(IClientRepositoryToken).to(FakeClientRepository)
    container.bind(UpdateClientUseCase).toSelf().inSingletonScope()
    container.bind(FindByClientUseCase).toSelf().inSingletonScope()
  })            

  afterAll(() => {
    container.unbindAll()
  })

  test("Should fail to update a client if client does not exists", async () => {    
    const input = new InputUpdateClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3',
      email: 'newemail@gmail.com'
    })

    const findByUseCase = container.get(FindByClientUseCase)
    jest.spyOn(findByUseCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.notFound())))

    const sut = container.get(UpdateClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(ClientErrors.notFound())    
  })

  test("Should fail to update a client if update use case failed", async () => {    
    const input = new InputUpdateClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3',
      email: 'newemail@gmail.com'
    })

    const findByUseCase = container.get(FindByClientUseCase)
    jest.spyOn(findByUseCase, 'exec').mockReturnValueOnce(Promise.resolve(right(fakeClientEntity)))

    const updateUseCase = container.get(UpdateClientUseCase)
    jest.spyOn(updateUseCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.updateError())))

    const sut = container.get(UpdateClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(ClientErrors.updateError())    
  })

  test("Should have sucess to update", async () => {    
    const input = new InputUpdateClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3',
      email: 'newemail@gmail.com'
    })

    const findByUseCase = container.get(FindByClientUseCase)
    jest.spyOn(findByUseCase, 'exec').mockReturnValueOnce(Promise.resolve(right(fakeClientEntity)))

    const updateUseCase = container.get(UpdateClientUseCase)
    jest.spyOn(updateUseCase, 'exec').mockReturnValueOnce(Promise.resolve(right(void 0)))

    const sut = container.get(UpdateClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()   
  })
})