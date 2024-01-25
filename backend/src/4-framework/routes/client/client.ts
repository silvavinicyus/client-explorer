import { Router } from "express";
import { CreateClientHandler } from "./create";
import { DeleteClientHandler } from "./delete";

const clientRoutes = Router();

const createClient = new CreateClientHandler()
const deleteClient = new DeleteClientHandler()

clientRoutes.post('/', createClient.handle);
clientRoutes.delete('/:uuid', deleteClient.handle)


export { clientRoutes };
