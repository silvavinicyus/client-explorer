import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";
import { InputDeleteClient } from "@controller/serializers/client/inputDelete";
import { IOutputDeleteClientDto } from "@business/dto/client/delete";
import { FindByClientUseCase } from "@business/useCases/client/findByClientUseCase";
import { DeleteClientUseCase } from "@business/useCases/client/deleteClientUseCase";
import { left } from "@shared/either";

@injectable()
export class DeleteClientOperator extends AbstractOperator<InputDeleteClient, IOutputDeleteClientDto>{
  constructor(
    @inject(FindByClientUseCase)
    private findByClient: FindByClientUseCase,
    @inject(DeleteClientUseCase)
    private deleteClient: DeleteClientUseCase
  ){
    super()
  }

  async run(
    input: InputDeleteClient
  ): Promise<IOutputDeleteClientDto> {
    this.exec(input)

    const client = await this.findByClient.exec({
      column: 'uuid',
      value: input.uuid
    })

    if (client.isLeft()) {
      return left(client.value)
    }

    const clientResult = await this.deleteClient.exec({
      id: client.value.id
    })

    return clientResult
  }

}