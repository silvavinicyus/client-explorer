import { Router } from 'express'
import { clientRoutes } from './client/client';

const router = Router();

router.use('/clients', clientRoutes);

export { router };