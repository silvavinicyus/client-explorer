import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";
import { InputFindByClient } from "@controller/serializers/client/inputFindBy";
import { IOutputFindClientByDto } from "@business/dto/client/findBy";
import { FindByClientUseCase } from "@business/useCases/client/findByClientUseCase";

@injectable()
export class FindByClientOperator extends AbstractOperator<InputFindByClient, IOutputFindClientByDto> {
  constructor(
    @inject(FindByClientUseCase)
    private findByClient: FindByClientUseCase
  ){
    super()
  }

  async run(
    input: InputFindByClient
  ): Promise<IOutputFindClientByDto> {
    this.exec(input)

    const client = await this.findByClient.exec({
      column: 'uuid',
      value: input.uuid
    })

    return client
  }

}