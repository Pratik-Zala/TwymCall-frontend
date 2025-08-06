import { Router } from 'express';
import { ClientRequestController } from './client-request.controller';

const router = Router();

router.get('/', ClientRequestController.handleClientRequest);

export default router; 