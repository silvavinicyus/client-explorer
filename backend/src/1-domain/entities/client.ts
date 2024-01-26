import { Right, right } from "../../shared/either";
import { AbstractEntity } from "../abstractEntity";
import { ITimestamps } from "../timestamps";

export interface IClientEntity extends ITimestamps {
  id: number
  uuid: string
  name: string
  email: string
  phone: string
  address: string  
}

export type IInputClientEntity = Pick<IClientEntity, 'email' | 'name' | 'phone' | 'address'>

export type IClientEntityKeys = Pick<IClientEntity, 'email' | 'name' | 'id' | 'uuid'>

export class ClientEntity extends AbstractEntity<IClientEntity> {
  static create(
    props: IInputClientEntity,
    currentDate: Date
  ): Right<void, ClientEntity> {
    const clientEntity = new ClientEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props
    })

    return right(clientEntity)
  }

  static update(
    props: Partial<IClientEntity>,
    currentDate: Date
  ): Right<void, ClientEntity> {
    const clientEntity = new ClientEntity({
      ...props,
      updated_at: currentDate,
    } as IClientEntity)

    return right(clientEntity)
  }
}