import { Router } from 'express';
import { microsoftController } from './microsoft.controller';

const router = Router();

router.get('/auth/outlook', microsoftController.outlookAuth);
router.get('/auth/outlook/callback', microsoftController.outlookCallback);
router.post('/draft-email', microsoftController.draftEmail);
router.post('/send-email', microsoftController.sendEmail);
router.get('/status', microsoftController.checkAuthStatus);
router.get('/profile', microsoftController.getProfile); 
router.get('/emails', microsoftController.getEmails);
router.get('/onedrive/files', microsoftController.getOneDriveFiles);
router.get('/onedrive/files/:id', microsoftController.getOneDriveFileMetadata);
router.get('/onedrive/files/:id/content', microsoftController.getOneDriveFileContent);

export default router;