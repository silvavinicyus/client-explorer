import { inject, injectable } from "inversify";
import { IAbstractUseCase } from "../abstractUseCase";
import { IInputDeleteClientDto, IOutputDeleteClientDto } from "@business/dto/client/delete";
import { IClientRepository, IClientRepositoryToken } from "@business/repositories/client/iClientRepository";
import { left, right } from "@shared/either";
import { ClientErrors } from "@business/module/errors/clientErrors";

@injectable()
export class DeleteClientUseCase implements IAbstractUseCase<IInputDeleteClientDto, IOutputDeleteClientDto> {
  constructor(
    @inject(IClientRepositoryToken)
    private clientRepository: IClientRepository
  ){}

  async exec(
    props: IInputDeleteClientDto    
  ): Promise<IOutputDeleteClientDto> {
    try {
      await this.clientRepository.delete(props)
      
      return right(void 0)
    } catch(err) {
      console.error(err)
      return left(ClientErrors.deleteError())
    }
  }
}
