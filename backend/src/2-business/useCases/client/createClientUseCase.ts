import { IInputCreateClientDto, IOutputCreateClientDto } from "@business/dto/client/create";
import { ClientErrors } from "@business/module/errors/clientErrors";
import { IClientRepository, IClientRepositoryToken } from "@business/repositories/client/iClientRepository";
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from "@business/services/uniqueIdentifier/iUniqueIdentifier";
import { ClientEntity, IInputClientEntity } from "@domain/entities/client";
import { left, right } from "@shared/either";
import { inject, injectable } from "inversify";
import { IAbstractUseCase } from "../abstractUseCase";

@injectable()
export class CreateClientUseCase implements IAbstractUseCase<IInputCreateClientDto, IOutputCreateClientDto> {
  constructor(
    @inject(IClientRepositoryToken)
    private clientRepository: IClientRepository,    
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ){}

  async exec(
    props: IInputClientEntity    
  ): Promise<IOutputCreateClientDto> {
    try {
      const clientEntity = ClientEntity.create(props, new Date())

      const clientResult = await this.clientRepository.create({
        ...clientEntity.value.export(),
        uuid: this.uniqueIdentifier.create()
      })

      return right(clientResult)
    } catch(err) {
      console.error(err)
      return left(ClientErrors.creationError());
    }
  }

}