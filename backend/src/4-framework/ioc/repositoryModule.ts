import { IClientRepository, IClientRepositoryToken } from '@business/repositories/client/iClientRepository'
import { ClientRepository } from '@framework/repositories/ClientRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {  
  bind<IClientRepository>(IClientRepositoryToken).to(ClientRepository)
})
