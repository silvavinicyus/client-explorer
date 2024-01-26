import { Router } from "express";
import { CreateClientHandler } from "./create";
import { DeleteClientHandler } from "./delete";
import { FindByClientHandler } from "./findBy";
import { UpdateClientHandler } from "./update";
import { FindAllClientsHandler } from "./findAll";
import { GetBestPathHandler } from "./getBestPath";

const clientRoutes = Router();

const createClient = new CreateClientHandler()
const deleteClient = new DeleteClientHandler()
const findbyClient = new FindByClientHandler()
const updateClient = new UpdateClientHandler()
const findAllClients = new FindAllClientsHandler()
const getBestPath = new GetBestPathHandler()

clientRoutes.post('/', createClient.handle);
clientRoutes.delete('/:uuid', deleteClient.handle)
clientRoutes.put('/:uuid', updateClient.handle)
clientRoutes.get('/:uuid', findbyClient.handle)
clientRoutes.get('/', findAllClients.handle)
clientRoutes.get('/adresses/path', getBestPath.handle)

export { clientRoutes };
