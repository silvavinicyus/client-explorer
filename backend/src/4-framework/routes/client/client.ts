import { Router } from "express";
import { CreateClientHandler } from "./create";

const clientRoutes = Router();

const createClient = new CreateClientHandler()

clientRoutes.post('/', createClient.handle);

export { clientRoutes }