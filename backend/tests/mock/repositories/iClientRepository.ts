import { IInputDeleteClientDto } from "@business/dto/client/delete";
import { IInputFindAllClientsDto } from "@business/dto/client/findAll";
import { IInputFindClientByDto } from "@business/dto/client/findBy";
import { IPaginatedResponse } from "@business/dto/useCaseOptions";
import { IClientRepository, IInputUpdateClient } from "@business/repositories/client/iClientRepository";
import { IClientEntity } from "@domain/entities/client";
import { injectable } from "inversify";

@injectable()
export class FakeClientRepository implements IClientRepository {
  async create(_input: IClientEntity): Promise<IClientEntity> {
    return void 0;
  }

  async findBy(_input: IInputFindClientByDto): Promise<IClientEntity> {
    return void 0;
  }

  async findAll(_input: IInputFindAllClientsDto): Promise<IPaginatedResponse<IClientEntity>> {
    return void 0;
  }
  
  async findAllWithoutPagination(): Promise<IClientEntity[]> {
    return void 0;
  }
  
  async update(_input: IInputUpdateClient): Promise<Partial<IClientEntity>> {
    return void 0;
  }

  async delete(_input: IInputDeleteClientDto): Promise<void> {
    return void 0;
  }  
}

export const fakeClientRepositoryCreate = jest.spyOn(
  FakeClientRepository.prototype,
  'create'
)

export const fakeClientRepositoryFindBy = jest.spyOn(
  FakeClientRepository.prototype,
  'findBy'
)

export const fakeClientRepositoryFindAll = jest.spyOn(
  FakeClientRepository.prototype,
  'findAll'
)

export const fakeClientRepositoryDelete = jest.spyOn(
  FakeClientRepository.prototype,
  'delete'
)

export const fakeClientRepositoryUpdate = jest.spyOn(
  FakeClientRepository.prototype,
  'update'
)

export const fakeClientRepositoryFindAllWithoutPagination = jest.spyOn(
  FakeClientRepository.prototype,
  'findAllWithoutPagination'
)