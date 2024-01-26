import { ITravelingSalesmanServiceToken, ITravelingSalesmangService } from "@business/services/tsp/iTsp";
import { FindAllClientsUseCase } from "@business/useCases/client/findAllClientUseCase";
import { IClientEntity } from "@domain/entities/client";
import { IError } from "@shared/IError";
import { Either, left } from "@shared/either";
import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";

@injectable()
export class GetBestPathOperator extends AbstractOperator<void, Either<IError, IClientEntity[]>> {
  constructor(
    @inject(FindAllClientsUseCase)
    private findAllClients: FindAllClientsUseCase,
    @inject(ITravelingSalesmanServiceToken)
    private travelingSalesmanService: ITravelingSalesmangService
  ){
    super()
  }

  async run(): Promise<Either<IError, IClientEntity[]>> {    
    const clients = await this.findAllClients.exec({
      filters: {
        contains: []
      },
      pagination: {
        page: 0,
        count: 10
      }
    })

    if (clients.isLeft()) {
      return left(clients.value)
    }

    const clientsRoute = this.travelingSalesmanService.bestPath(clients.value.items) 

    console.log(clientsRoute)

    return void 0
  }

}