import { container } from '@shared/ioc/container'
import { repositoryModule } from './repositoryModule'
import { servicesModule } from './servicesModule'

container.load(repositoryModule)
container.load(servicesModule)
