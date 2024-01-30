import { ClientErrors } from "@business/module/errors/clientErrors"
import { IClientRepositoryToken } from "@business/repositories/client/iClientRepository"
import { IUniqueIdentifierServiceToken } from "@business/services/uniqueIdentifier/iUniqueIdentifier"
import { CreateClientUseCase } from "@business/useCases/client/createClientUseCase"
import { CreateClientOperator } from "@controller/operations/client/createClientOperator"
import { InputCreateClient } from "@controller/serializers/client/inputCreate"
import { left, right } from "@shared/either"
import { container } from "@shared/ioc/container"
import { fakeClientEntity } from "@tests/mock/entities/client"
import { FakeClientRepository } from "@tests/mock/repositories/iClientRepository"
import { FakeUniqueIdentifierService } from "@tests/mock/services/iUniqueIdentifier"

describe("Create Client Operator Tests", () => {  
  beforeAll(() => {
    container.bind(IClientRepositoryToken).to(FakeClientRepository)
    container.bind(CreateClientUseCase).toSelf().inSingletonScope()
    container.bind(IUniqueIdentifierServiceToken).to(FakeUniqueIdentifierService)
  })            

  afterAll(() => {
    container.unbindAll()
  })

  test('Should have success to create a new client', async () => {
    const input = new InputCreateClient({
      address: '1, 1',
      email: 'email@email.com',
      name: 'client name',
      phone: '82 98181-8181'
    })

    const useCase = container.get(CreateClientUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(right(fakeClientEntity)))

    const sut = container.get(CreateClientOperator)
    const result = await sut.run(input)

    expect(result.isRight()).toBeTruthy()
    expect(result.isLeft()).toBeFalsy()
  })

  test('Should fail to create a new client if use case failed', async () => {
    const input = new InputCreateClient({
      address: '1, 1',
      email: 'email@email.com',
      name: 'client name',
      phone: '82 98181-8181'
    })

    const useCase = container.get(CreateClientUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.creationError())))

    const sut = container.get(CreateClientOperator)
    const result = await sut.run(input)

    expect(result.isRight()).toBeFalsy()
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toStrictEqual(ClientErrors.creationError())
  })
})