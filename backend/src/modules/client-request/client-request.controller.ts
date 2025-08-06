import { Request, Response } from 'express';
import { clientRequestService } from './client-request.service';

export class ClientRequestController {
    static async handleClientRequest(req: Request, res: Response) {
        if (!req.session.accessToken) {
             res.status(401).send("Unauthorized");
             return;
        }

        try {
            const result = await clientRequestService.processLatestEmail(req.session.accessToken);
            res.json(result);
        } catch (error: any) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }
} 