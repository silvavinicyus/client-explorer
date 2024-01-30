import { ITravelingSalesmanServiceToken, ITravelingSalesManService } from "@business/services/tsp/iTsp";
import { FindAllClientsWithoutPaginationUseCase } from "@business/useCases/client/findAllClientsWithousPagiUseCase";
import { IClientEntity } from "@domain/entities/client";
import { IError } from "@shared/IError";
import { Either, left, right } from "@shared/either";
import { inject, injectable } from "inversify";
import { AbstractOperator } from "../abstractOperator";

@injectable()
export class GetBestPathOperator extends AbstractOperator<void, Either<IError, IClientEntity[]>> {
  constructor(
    @inject(FindAllClientsWithoutPaginationUseCase)
    private findAllClients: FindAllClientsWithoutPaginationUseCase,
    @inject(ITravelingSalesmanServiceToken)
    private travelingSalesmanService: ITravelingSalesManService
  ){
    super()
  }

  async run(): Promise<Either<IError, IClientEntity[]>> {    
    const clients = await this.findAllClients.exec()

    if (clients.isLeft()) {
      return left(clients.value)
    }

    const clientsRoute = this.travelingSalesmanService.bestPath(clients.value) 

    const clientsEntitiesRoute = clientsRoute.map((client) => clients.value.find((entity) => entity.id === client.id))

    return right(clientsEntitiesRoute)
  }

}