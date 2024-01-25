import { Router } from "express";
import { CreateClientHandler } from "./create";
import { DeleteClientHandler } from "./delete";
import { FindByClientHandler } from "./findBy";
import { UpdateClientHandler } from "./update";
import { FindAllClientsHandler } from "./findAll";

const clientRoutes = Router();

const createClient = new CreateClientHandler()
const deleteClient = new DeleteClientHandler()
const findbyClient = new FindByClientHandler()
const updateClient = new UpdateClientHandler()
const findAllClients = new FindAllClientsHandler()

clientRoutes.post('/', createClient.handle);
clientRoutes.delete('/:uuid', deleteClient.handle)
clientRoutes.put('/:uuid', updateClient.handle)
clientRoutes.get('/:uuid', findbyClient.handle)
clientRoutes.get('/', findAllClients.handle)

export { clientRoutes };
