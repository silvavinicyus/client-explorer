import { ClientEntity } from "@domain/entities/client"
import { fakeClientEntity } from "@tests/mock/entities/client"

describe("Client Entity", () => {
  describe("Create method", () => {
    test('Should create a client entity', () => {
      const clientResult = ClientEntity.create(fakeClientEntity, new Date())

      expect(clientResult.isLeft()).toBeFalsy()
      expect(clientResult.isRight()).toBeTruthy()
    })
  })

  describe("Update method", () => {
    test('Should update a client entity', () => {
      const mockEntity = {
        ...fakeClientEntity,
        name: 'New Name',
        updated_at: new Date()        
      }

      const clientResult = ClientEntity.update(mockEntity, new Date())

      expect(clientResult.isLeft()).toBeFalsy()
      expect(clientResult.isRight()).toBeTruthy()
      expect(clientResult.value.export().name).toEqual('New Name')
    })
  })
})