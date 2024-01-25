import { IInputFindAllClientsDto, IOutputFindAllClientsDto } from "@business/dto/client/findAll";
import { IClientRepository, IClientRepositoryToken } from "@business/repositories/client/iClientRepository";
import { inject, injectable } from "inversify";
import { IAbstractUseCase } from "../abstractUseCase";
import { left, right } from "@shared/either";
import { ClientErrors } from "@business/module/errors/clientErrors";

@injectable()
export class FindAllClientsUseCase implements IAbstractUseCase<IInputFindAllClientsDto, IOutputFindAllClientsDto> {
  constructor(
    @inject(IClientRepositoryToken)
    private clientRepository: IClientRepository
  ){}

  async exec(props: IInputFindAllClientsDto): Promise<IOutputFindAllClientsDto> {
    try {
      const clients = await this.clientRepository.findAll(props)

      return right(clients)
    } catch(err) {
      console.error(err)
      return left(ClientErrors.loadError())
    }
  }

}