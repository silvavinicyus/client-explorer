import { ClientErrors } from "@business/module/errors/clientErrors"
import { IClientRepositoryToken } from "@business/repositories/client/iClientRepository"
import { IUniqueIdentifierServiceToken } from "@business/services/uniqueIdentifier/iUniqueIdentifier"
import { CreateClientUseCase } from "@business/useCases/client/createClientUseCase"
import { DeleteClientUseCase } from "@business/useCases/client/deleteClientUseCase"
import { FindAllClientsUseCase } from "@business/useCases/client/findAllClientUseCase"
import { FindAllClientsWithoutPaginationUseCase } from "@business/useCases/client/findAllClientsWithousPagiUseCase"
import { FindByClientUseCase } from "@business/useCases/client/findByClientUseCase"
import { UpdateClientUseCase } from "@business/useCases/client/updateClientUseCase"
import { container } from "@shared/ioc/container"
import { fakeClientEntity } from "@tests/mock/entities/client"
import { FakeClientRepository, fakeClientRepositoryCreate, fakeClientRepositoryDelete, fakeClientRepositoryFindAll, fakeClientRepositoryFindAllWithoutPagination, fakeClientRepositoryFindBy, fakeClientRepositoryUpdate } from "@tests/mock/repositories/iClientRepository"
import { FakeUniqueIdentifierService } from "@tests/mock/services/iUniqueIdentifier"

describe("Client Use Case Tests", () => {
  beforeAll(() => {
    container.bind(IClientRepositoryToken).to(FakeClientRepository)
    container.bind(IUniqueIdentifierServiceToken).to(FakeUniqueIdentifierService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe("Create Client Use Case", () => {
    test("Should create a new client", async () => {
      const sut = container.get(CreateClientUseCase)

      fakeClientRepositoryCreate.mockImplementationOnce(async () => fakeClientEntity)

      const result = await sut.exec({
        address: fakeClientEntity.address, 
        email: fakeClientEntity.email, 
        name: fakeClientEntity.name, 
        phone: fakeClientEntity.phone
      })

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test("Should fail to create a new client if repository fails", async () => {
      const sut = container.get(CreateClientUseCase)

      fakeClientRepositoryCreate.mockImplementationOnce(
        async () => {
          throw new Error()
        }
      )

      const result = await sut.exec({
        address: fakeClientEntity.address, 
        email: fakeClientEntity.email, 
        name: fakeClientEntity.name, 
        phone: fakeClientEntity.phone
      })

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toStrictEqual(ClientErrors.creationError())
    })
  })

  describe("Delete Client Use Case", () => {
    test("Should have success to delete a client", async () => {
      const sut = container.get(DeleteClientUseCase)

      fakeClientRepositoryDelete.mockImplementationOnce(async () => void 0)

      const result = await sut.exec({id: 1})

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test("Should fail to delete a client if repository fails", async () => {
      const sut = container.get(DeleteClientUseCase)

      fakeClientRepositoryDelete.mockImplementation(async () => {throw new Error()})

      const result = await sut.exec({id: 1})

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toStrictEqual(ClientErrors.deleteError())
    })
  })

  describe("Find By Client Use Case", () => {
    test("Should have success to find a client", async () => {
      const sut = container.get(FindByClientUseCase)

      fakeClientRepositoryFindBy.mockImplementationOnce(async () => fakeClientEntity)

      const result = await sut.exec({
        column: 'uuid',
        value: 'uuid'
      })

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test("Should fail to find a client if repository fails", async () => {
      const sut = container.get(FindByClientUseCase)

      fakeClientRepositoryFindBy.mockImplementationOnce(async () => {throw new Error()})

      const result = await sut.exec({
        column: 'uuid',
        value: 'uuid'
      })

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toStrictEqual(ClientErrors.loadError())
    })

    test("Should fail to find a client if client does not exists", async () => {
      const sut = container.get(FindByClientUseCase)

      fakeClientRepositoryFindBy.mockImplementationOnce(async () => undefined)

      const result = await sut.exec({
        column: 'uuid',
        value: 'uuid'
      })

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toStrictEqual(ClientErrors.notFound())
    })
  })

  describe("Find all Clients Use case", () => {
    test("Should have success to find all clients", async () => {
      const sut = container.get(FindAllClientsUseCase)

      fakeClientRepositoryFindAll.mockImplementationOnce(async () => ({
        count: 1,
        items: [fakeClientEntity],
        page: 0,
        perPage: 10
      }))

      const result = await sut.exec({
        filters: {
          contains: []          
        }        
      })

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test("Should fail to find all clients if repository failed", async () => {
      const sut = container.get(FindAllClientsUseCase)

      fakeClientRepositoryFindAll.mockImplementationOnce(async () => {
        throw new Error()
      })

      const result = await sut.exec({
        filters: {
          contains: []          
        }        
      })

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toStrictEqual(ClientErrors.loadError())
    })
  })

  describe("Find All Clients With No Pagination", () => {
    test("Should have success to find all clients without pagination", async () => {
      const sut = container.get(FindAllClientsWithoutPaginationUseCase)

      fakeClientRepositoryFindAllWithoutPagination.mockImplementationOnce(async () => [fakeClientEntity])

      const result = await sut.exec()

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test("Should fail to find all clients without pagination if repository failed", async () => {
      const sut = container.get(FindAllClientsWithoutPaginationUseCase)

      fakeClientRepositoryFindAllWithoutPagination.mockImplementationOnce(async () => {
        throw new Error()
      })

      const result = await sut.exec()

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toStrictEqual(ClientErrors.loadError())
    })
  })

  describe("Update Client use case", () => {
    test("Should have success to update a client", async () => {
      const sut = container.get(UpdateClientUseCase)
      
      fakeClientRepositoryUpdate.mockImplementationOnce(async () => fakeClientEntity)

      const result = await sut.exec({
        name: 'Client new name',        
      }, {
        column: 'id',
        value: 1
      })

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test("Should have success to update a client", async () => {
      const sut = container.get(UpdateClientUseCase)
      
      fakeClientRepositoryUpdate.mockImplementationOnce(async () => {throw new Error()})

      const result = await sut.exec({
        name: 'Client new name',        
      }, {
        column: 'id',
        value: 1
      })

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toStrictEqual(ClientErrors.updateError())
    })
  })
})