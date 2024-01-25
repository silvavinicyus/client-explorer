import { IInputUpdateClientDto, IOutputUpdateClientDto } from "@business/dto/client/update";
import { inject, injectable } from "inversify";
import { IAbstractUseCase } from "../abstractUseCase";
import { IClientRepository, IClientRepositoryToken, updateWhereClient } from "@business/repositories/client/iClientRepository";
import { left, right } from "@shared/either";
import { ClientErrors } from "@business/module/errors/clientErrors";
import { ClientEntity } from "@domain/entities/client";

@injectable()
export class UpdateClientUseCase implements IAbstractUseCase<IInputUpdateClientDto, IOutputUpdateClientDto> {
  constructor(
    @inject(IClientRepositoryToken)
    private clientRepository: IClientRepository
  ){}
  
  async exec(
    props: IInputUpdateClientDto,
    updateWhere: updateWhereClient,
  ): Promise<IOutputUpdateClientDto> {
    try {
      const clientEntity = ClientEntity.update(props, new Date())

      const clientResult = await this.clientRepository.update({
        newData: clientEntity.value.export(),
        updateWhere,
      })

      return right(clientResult)
    } catch(err) {
      console.error(err)
      return left(ClientErrors.updateError())
    }
  }

}