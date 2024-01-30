import { IClientAddress, ITravelingSalesManService } from "@business/services/tsp/iTsp";
import { IClientEntity } from "@domain/entities/client";
import { injectable } from "inversify";

@injectable()
export class FakeTSPService implements ITravelingSalesManService {
  bestPath(_clients: IClientEntity[]): IClientAddress[] {
    return void 0
  }
}

export const fakeTSPServicePath = jest.spyOn(
  FakeTSPService.prototype,
  'bestPath'
)