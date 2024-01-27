import { IClientRepository, IClientRepositoryToken } from "@business/repositories/client/iClientRepository";
import { inject, injectable } from "inversify";
import { IAbstractUseCase } from "../abstractUseCase";
import { Either, left, right } from "@shared/either";
import { ClientErrors } from "@business/module/errors/clientErrors";
import { IClientEntity } from "@domain/entities/client";
import { IError } from "@shared/IError";

@injectable()
export class FindAllClientsWithoutPaginationUseCase implements IAbstractUseCase<void, Either<IError, IClientEntity[]>> {
  constructor(
    @inject(IClientRepositoryToken)
    private clientRepository: IClientRepository
  ){}

  async exec(): Promise<Either<IError, IClientEntity[]>> {
    try {          
      const clients = await this.clientRepository.findAllWithoutPagination()
      
      return right(clients)
    } catch(err) {
      console.error(err)
      return left(ClientErrors.loadError())
    }
  }

}