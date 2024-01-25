import { IInputDeleteClientDto } from "@business/dto/client/delete";
import { IInputFindAllClientsDto } from "@business/dto/client/findAll";
import { IInputFindClientByDto } from "@business/dto/client/findBy";
import { IPaginatedResponse } from "@business/dto/useCaseOptions";
import { IClientRepository, IInputUpdateClient } from "@business/repositories/client/iClientRepository";
import { IClientEntity } from "@domain/entities/client";
import { injectable } from "inversify";
import { ITransaction } from "./TransactionRepository";

@injectable()
export class ClientRepository implements IClientRepository {
  
  client: IClientEntity = {  
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      email: 'email',
      name: 'name',
      phone: 'phone',
      uuid: 'uuid'    
  }

  async create(input: IClientEntity, trx?: ITransaction): Promise<IClientEntity> {
    return input;
  }

  async findBy(input: IInputFindClientByDto): Promise<IClientEntity> {
    return this.client
  }

  async findAll(input: IInputFindAllClientsDto): Promise<IPaginatedResponse<IClientEntity>> {
    return {
      count: 1,
      items: [this.client],
      page: input.pagination.page,
      perPage: input.pagination.count,
    }
  }
  
  async update(input: IInputUpdateClient, trx?: ITransaction): Promise<Partial<IClientEntity>> {
    return input.newData
  }

  async delete(input: IInputDeleteClientDto, trx?: ITransaction): Promise<void> {
    return void 0
  }
}