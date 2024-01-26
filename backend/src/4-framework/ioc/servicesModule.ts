import { ITravelingSalesmanServiceToken, ITravelingSalesmangService } from '@business/services/tsp/iTsp'
import { IUniqueIdentifierService, IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { TravelingSalesmanService } from '@framework/services/tsp/tsp'
import { UniqueIdentifierService } from '@framework/services/uniqueIdentifier/uniqueIdentifierService'
import { ContainerModule, interfaces } from 'inversify'

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUniqueIdentifierService>(IUniqueIdentifierServiceToken).to(
    UniqueIdentifierService
  )
  bind<ITravelingSalesmangService>(ITravelingSalesmanServiceToken).to(TravelingSalesmanService)
})
