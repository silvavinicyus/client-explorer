import { IClientEntity } from "@domain/entities/client"

export const ITravelingSalesmanServiceToken = Symbol.for('ITravelingSalesmanServiceToken')

export interface ITravelingSalesmangService {
  bestPath(clients: IClientEntity[]): IClientEntity[]
}