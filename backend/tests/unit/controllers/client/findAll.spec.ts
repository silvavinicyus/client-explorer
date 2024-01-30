import { ClientErrors } from "@business/module/errors/clientErrors"
import { IClientRepositoryToken } from "@business/repositories/client/iClientRepository"
import { FindAllClientsUseCase } from "@business/useCases/client/findAllClientUseCase"
import { FindAllClientsOperator } from "@controller/operations/client/findAllClientsOperator"
import { InputFindAllClients } from "@controller/serializers/client/inputFindAll"
import { left, right } from "@shared/either"
import { container } from "@shared/ioc/container"
import { fakeClientEntity } from "@tests/mock/entities/client"
import { FakeClientRepository } from "@tests/mock/repositories/iClientRepository"

describe("Create Client Operator Tests", () => {  
  beforeAll(() => {
    container.bind(IClientRepositoryToken).to(FakeClientRepository)
    container.bind(FindAllClientsUseCase).toSelf().inSingletonScope()    
  })            

  afterAll(() => {
    container.unbindAll()
  })

  test('Should fail to find all clients if use case failed', async () => {
    const input = new InputFindAllClients({
      contains: [],       
    })

    const useCase = container.get(FindAllClientsUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.loadError())))

    const sut = container.get(FindAllClientsOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(ClientErrors.loadError())
  })

  test('Should have success to find all clients', async () => {
    const input = new InputFindAllClients({
      contains: [],       
    })

    const useCase = container.get(FindAllClientsUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(right({
      count: 1,
      items: [fakeClientEntity],
      page: 0,
      perPage: 10
    })))

    const sut = container.get(FindAllClientsOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})