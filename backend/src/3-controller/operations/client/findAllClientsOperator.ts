import { IOutputFindAllClientsDto } from "@business/dto/client/findAll";
import { InputFindAllClients } from "@controller/serializers/client/inputFindAll";
import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";
import { FindAllClientsUseCase } from "@business/useCases/client/findAllClientUseCase";

@injectable()
export class FindAllClientsOperator extends AbstractOperator<InputFindAllClients, IOutputFindAllClientsDto> {
  constructor(
    @inject(FindAllClientsUseCase)
    private findAllClients: FindAllClientsUseCase
  ){
    super()
  }

  async run(
    input: InputFindAllClients
  ): Promise<IOutputFindAllClientsDto> {
    this.exec(input)
        
    const clients = await this.findAllClients.exec({
      filters: {
        contains: input.contains,        
      },
      pagination: {
        count: input.count,
        page: input.page
      }
    })

    return clients
  }
}