import { IClientEntity } from "@domain/entities/client";

export const fakeClientEntity: IClientEntity = {
  id: 1,
  uuid: '6e41b9be-4607-4914-abbd-76b0b641873d',
  address: '1, 1',
  created_at: new Date(),
  email: 'client@email.com',
  name: 'Client Name',
  phone: '82 99999-9999',
  updated_at: new Date()
}