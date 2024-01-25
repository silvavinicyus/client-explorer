import { inject, injectable } from "inversify";
import { IAbstractUseCase } from "../abstractUseCase";
import { IInputFindClientByDto, IOutputFindClientByDto } from "@business/dto/client/findBy";
import { IClientRepository, IClientRepositoryToken } from "@business/repositories/client/iClientRepository";
import { left, right } from "@shared/either";
import { ClientErrors } from "@business/module/errors/clientErrors";

@injectable()
export class FindByClientUseCase implements IAbstractUseCase<IInputFindClientByDto, IOutputFindClientByDto> {
  constructor(
    @inject(IClientRepositoryToken)
    private clientRepository: IClientRepository
  ){}
  
  async exec(props: IInputFindClientByDto): Promise<IOutputFindClientByDto> {
    try {
      const client = await this.clientRepository.findBy(props)

      if (!client) {
        console.error("Client not found")
        return left(ClientErrors.notFound())
      }

      return right(client)
    } catch(err) {
      console.error(err)
      return left(ClientErrors.loadError())
    }
  }

}