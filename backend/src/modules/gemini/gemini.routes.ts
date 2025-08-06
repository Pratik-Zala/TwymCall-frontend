
import { Router } from 'express';
import { geminiController } from './gemini.controller';

const geminiRoutes = Router();

geminiRoutes.post('/chat', geminiController.chatHandler);

export default geminiRoutes; 