import { IOutputCreateClientDto } from "@business/dto/client/create";
import { CreateClientUseCase } from "@business/useCases/client/createClientUseCase";
import { InputCreateClient } from "@controller/serializers/client/inputCreate";
import { left } from "@shared/either";
import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";

@injectable()
export class CreateClientOperator extends AbstractOperator<InputCreateClient, IOutputCreateClientDto> {
  constructor(
    @inject(CreateClientUseCase)
    private createClient: CreateClientUseCase,    
  ){
    super()
  }

  async run(
    input: InputCreateClient
  ): Promise<IOutputCreateClientDto> {
    this.exec(input)    

    const client = await this.createClient.exec(input)

    if (client.isLeft()) {      
      return left(client.value)
    }
    
    return client
  }
}