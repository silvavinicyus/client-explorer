import { IClientEntity } from "@domain/entities/client"

export const ITravelingSalesmanServiceToken = Symbol.for('ITravelingSalesmanServiceToken')

export interface IClientAddress {
  id: number
  x: number
  y: number
}

export interface ITravelingSalesManService {
  bestPath(clients: IClientEntity[]): IClientAddress[]
}