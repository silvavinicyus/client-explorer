import { ITravelingSalesmangService } from "@business/services/tsp/iTsp";
import { IClientEntity } from "@domain/entities/client";
import { injectable } from "inversify";

@injectable()
export class TravelingSalesmanService implements ITravelingSalesmangService {  
  bestPath(clients: IClientEntity[]): IClientEntity[] {
    
    return clients
  }
}