import { Request, Response } from 'express';
import { microsoftService } from './microsoft.service';

class MicrosoftController {
    async outlookAuth(req: Request, res: Response) {
        const url = await microsoftService.getAuthUrl(req);
        if (url) {
            res.redirect(url);
        } else {
            res.status(500).send("Error generating auth URL");
        }
    }

    async outlookCallback(req: Request, res: Response) {
        await microsoftService.acquireTokenByCode(req);
        res.send(`<script>
            window.opener.postMessage('outlook-auth-success', '*');
            window.close();
          </script>`);
    }

    async getProfile(req: Request, res: Response) {
        if (!req.session.accessToken) {
            res.json({ error: 'No access token' });
            return;
        }

        try {
            const user = await microsoftService.getUserDetails(req.session.accessToken);
            res.json(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getEmails(req: Request, res: Response) {
        if (!req.session.accessToken) {
            res.json({ error: 'No access token' });
            return;
        }

        try {
            const emails = await microsoftService.getEmails(req.session.accessToken);
            res.json(emails);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getOneDriveFiles(req: Request, res: Response) {
        if (!req.session.accessToken) {
            res.status(401).json({ error: 'Unauthorized: No access token' });
            return;
        }

        try {
            const files = await microsoftService.getOneDriveFiles(req.session.accessToken);
            res.json(files);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    async getOneDriveFileMetadata(req: Request, res: Response) {
        if (!req.session.accessToken) {
            res.status(401).json({ error: 'Unauthorized: No access token' });
            return;
        }

        try {
            const fileId = req.params.id;
            const metadata = await microsoftService.getOneDriveFileMetadata(req.session.accessToken, fileId);
            res.json(metadata);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    async getOneDriveFileContent(req: Request, res: Response) {
        if (!req.session.accessToken) {
            res.status(401).json({ error: 'Unauthorized: No access token' });
            return;
        }

        try {
            const fileId = req.params.id;
            const content = await microsoftService.getOneDriveFileContent(req.session.accessToken, fileId);
            res.json(content);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    async checkAuthStatus(req: Request, res: Response) {
        if (req.session.accessToken) {
            res.json({ isAuthenticated: true });
        } else {
            res.json({ isAuthenticated: false });
        }
    }

    async draftEmail(req: Request, res: Response) {
        try {
            const draft = await microsoftService.generateDraftEmail(req.body);
            res.json(draft);
        } catch (error) {
            res.status(500).send({ message: 'Failed to draft email', error });
        }
    }

    
    async sendEmail(req: Request, res: Response) {
        if (!req.session.accessToken) {
            res.status(401).send("Unauthorized");
            return;
        }
        console.log("req.body", req.body);

        

        try {
            const { to, subject, body } = req.body;
            if (!to || !subject || !body) {
                res.status(400).send("Missing required fields");
                return;
            }
            await microsoftService.sendEmail(req.session.accessToken, { to, subject, body });
            res.status(200).send({ message: "Email sent successfully." });
        } catch (error: any) {
            console.error(error);
            res.status(500).send(error.message);
        }
    }
}

export const microsoftController = new MicrosoftController();