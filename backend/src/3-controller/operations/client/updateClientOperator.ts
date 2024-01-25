import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";
import { InputUpdateClient } from "@controller/serializers/client/inputUpdate";
import { IOutputUpdateClientDto } from "@business/dto/client/update";
import { FindByClientUseCase } from "@business/useCases/client/findByClientUseCase";
import { UpdateClientUseCase } from "@business/useCases/client/updateClientUseCase";
import { left } from "@shared/either";

@injectable()
export class UpdateClientOperator extends AbstractOperator<InputUpdateClient, IOutputUpdateClientDto> {
  constructor(
    @inject(FindByClientUseCase)
    private findByClient: FindByClientUseCase,
    @inject(UpdateClientUseCase)
    private updateClient: UpdateClientUseCase
    ){
      super()
    }

    async run(
      input: InputUpdateClient
    ): Promise<IOutputUpdateClientDto> {
      this.exec(input)

      const client = await this.findByClient.exec({
        column: 'uuid',
        value: input.uuid
      })
  
      if(client.isLeft()) {
        return left(client.value)
      }

      const clientResult = await this.updateClient.exec({
        ...input
      }, {
        column: 'id',
        value: client.value.id
      })

      return clientResult
    }
}