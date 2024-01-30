import { ClientErrors } from "@business/module/errors/clientErrors"
import { IClientRepositoryToken } from "@business/repositories/client/iClientRepository"
import { FindByClientUseCase } from "@business/useCases/client/findByClientUseCase"
import { FindByClientOperator } from "@controller/operations/client/findByClientOperator"
import { InputFindByClient } from "@controller/serializers/client/inputFindBy"
import { left, right } from "@shared/either"
import { container } from "@shared/ioc/container"
import { fakeClientEntity } from "@tests/mock/entities/client"
import { FakeClientRepository } from "@tests/mock/repositories/iClientRepository"

describe("Create Client Operator Tests", () => {  
  beforeAll(() => {
    container.bind(IClientRepositoryToken).to(FakeClientRepository)
    container.bind(FindByClientUseCase).toSelf().inSingletonScope()    
  })            

  afterAll(() => {
    container.unbindAll()
  })

  test('Should fail to find a client if use case failed', async () => {
    const input = new InputFindByClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3',       
    })

    const useCase = container.get(FindByClientUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.loadError())))

    const sut = container.get(FindByClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(ClientErrors.loadError())
  })

  test('Should fail to find a client if he does not exists', async () => {
    const input = new InputFindByClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3',       
    })

    const useCase = container.get(FindByClientUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.notFound())))

    const sut = container.get(FindByClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(ClientErrors.notFound())
  })


  test('Should have success to find a client', async () => {
    const input = new InputFindByClient({
      uuid: 'ab253b9a-f20e-405a-868c-34fdb13c0fe3',       
    })

    const useCase = container.get(FindByClientUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(right(fakeClientEntity)))

    const sut = container.get(FindByClientOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})