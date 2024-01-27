import { IInputDeleteClientDto } from "@business/dto/client/delete"
import { IInputFindAllClientsDto } from "@business/dto/client/findAll"
import { IInputFindClientByDto } from "@business/dto/client/findBy"
import { IPaginatedResponse } from "@business/dto/useCaseOptions"
import { IClientEntity, IClientEntityKeys } from "@domain/entities/client"
import { IWhere } from "../where"

export const IClientRepositoryToken = Symbol.for('IClientRepositoryToken')

export type updateWhereClient = IWhere<keyof IClientEntityKeys, string | number>

export interface IInputUpdateClient {
  updateWhere: updateWhereClient,
  newData: Partial<IClientEntity>
}

export interface IClientRepository {
  create(input: IClientEntity): Promise<IClientEntity>
  findBy(input: IInputFindClientByDto): Promise<IClientEntity>
  findAll(input: IInputFindAllClientsDto): Promise<IPaginatedResponse<IClientEntity>>
  findAllWithoutPagination(): Promise<IClientEntity[]>
  update(input: IInputUpdateClient): Promise<Partial<IClientEntity>>
  delete(input: IInputDeleteClientDto): Promise<void>
}