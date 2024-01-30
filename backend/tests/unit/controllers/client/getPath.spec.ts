import { ClientErrors } from "@business/module/errors/clientErrors"
import { IClientRepositoryToken } from "@business/repositories/client/iClientRepository"
import { IClientAddress, ITravelingSalesmanServiceToken } from "@business/services/tsp/iTsp"
import { FindAllClientsWithoutPaginationUseCase } from "@business/useCases/client/findAllClientsWithousPagiUseCase"
import { GetBestPathOperator } from "@controller/operations/client/getBestpathOperator"
import { left, right } from "@shared/either"
import { container } from "@shared/ioc/container"
import { fakeClientEntity } from "@tests/mock/entities/client"
import { FakeClientRepository } from "@tests/mock/repositories/iClientRepository"
import { FakeTSPService, fakeTSPServicePath } from "@tests/mock/services/iTspService"

describe("Create Client Operator Tests", () => {  
  beforeAll(() => {
    container.bind(IClientRepositoryToken).to(FakeClientRepository)
    container.bind(FindAllClientsWithoutPaginationUseCase).toSelf().inSingletonScope()    
    container.bind(ITravelingSalesmanServiceToken).to(FakeTSPService)

    const clientAddresses: IClientAddress[] = [{id: 2, x: 0, y: 2}, {id: 1, x: 0, y: 3}]    
    fakeTSPServicePath.mockReturnValue(clientAddresses)
  })            

  afterAll(() => {
    container.unbindAll()
  })

  test('Should have success to calculate best path to clients', async () => {
    const useCase = container.get(FindAllClientsWithoutPaginationUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(right([{...fakeClientEntity, address: '0, 3'}, {...fakeClientEntity, address: '0, 2', id: 2}])))

    const sut = container.get(GetBestPathOperator)
    const result = await sut.run()

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })

  test('Should fail to calculate best path to clients if find all failed', async () => {
    const useCase = container.get(FindAllClientsWithoutPaginationUseCase)
    jest.spyOn(useCase, 'exec').mockReturnValueOnce(Promise.resolve(left(ClientErrors.loadError())))

    const sut = container.get(GetBestPathOperator)
    const result = await sut.run()

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toStrictEqual(ClientErrors.loadError())
  })
})