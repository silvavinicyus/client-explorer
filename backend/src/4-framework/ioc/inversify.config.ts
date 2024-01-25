import { container } from '@shared/ioc/container'
// import { repositoryModule } from './repositoryModule'
// import { servicesModule } from './servicesModule'
import { sequelize } from '../utils/database'
import { repositoryModule } from './repositoryModule'
import { servicesModule } from './servicesModule'

container.bind('sequelize').toConstantValue(sequelize)
container.load(repositoryModule)
container.load(servicesModule)
