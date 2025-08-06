import { ConfidentialClientApplication, AuthorizationCodeRequest, AuthorizationUrlRequest, CryptoProvider } from "@azure/msal-node";
import { Client, ResponseType } from "@microsoft/microsoft-graph-client";
import "isomorphic-fetch";
import { Request } from "express";
import fs from 'fs';
import path from 'path';
import { geminiService } from "../gemini/gemini.service";
import mammoth from 'mammoth';

const MICROSOFT_SCOPES = [
    "https://graph.microsoft.com/User.Read",
    "https://graph.microsoft.com/Mail.Send",
    "https://graph.microsoft.com/Mail.Read",
    "https://graph.microsoft.com/Mail.ReadWrite",
    "https://graph.microsoft.com/Mail.ReadBasic",
    "https://graph.microsoft.com/MailboxSettings.Read",
    "https://graph.microsoft.com/MailboxFolder.ReadWrite",
    "https://graph.microsoft.com/MailboxFolder.Read",
    "https://graph.microsoft.com/MailboxItem.Read",
    "https://graph.microsoft.com/Calendars.ReadWrite",
    "https://graph.microsoft.com/Channel.ReadBasic.All",
    "https://graph.microsoft.com/ChannelMessage.Send",
    "https://graph.microsoft.com/ChannelMessage.Read.All",
    "https://graph.microsoft.com/ChannelMessage.ReadWrite",
    "https://graph.microsoft.com/Chat.Read",
    "https://graph.microsoft.com/Chat.ReadWrite",
    "https://graph.microsoft.com/Chat.ReadBasic",
    "https://graph.microsoft.com/ChatMessage.Read",
    "https://graph.microsoft.com/ChatMessage.Send",
    "https://graph.microsoft.com/Files.Read",
    "https://graph.microsoft.com/Files.Read.All",
    "https://graph.microsoft.com/Files.ReadWrite",
    "https://graph.microsoft.com/Files.ReadWrite.All",
    "https://graph.microsoft.com/Group.Read.All",
    "https://graph.microsoft.com/Group.ReadWrite.All",
    "https://graph.microsoft.com/Team.ReadBasic.All",
    "offline_access"
];

const config = {
    auth: {
        clientId: process.env.OAUTH_CLIENT_ID!,
        authority: "https://login.microsoftonline.com/common",
        clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel: any, message: any, containsPii: any) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        },
    },
};



const cca = new ConfidentialClientApplication(config);
const cryptoProvider = new CryptoProvider();

class MicrosoftService {
    async getAuthUrl(req: Request): Promise<string | null> {
        try {
            const { verifier, challenge } = await cryptoProvider.generatePkceCodes();

            const authCodeUrlParameters: AuthorizationUrlRequest = {
                scopes: MICROSOFT_SCOPES,
                redirectUri: process.env.OAUTH_REDIRECT_URI!,
                codeChallenge: challenge,
                codeChallengeMethod: "S256"
            };

            // @ts-ignore
            req.session.pkceCodes = {
                verifier: verifier,
            };

            const authUrl = await cca.getAuthCodeUrl(authCodeUrlParameters);
            return authUrl;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async acquireTokenByCode(req: Request): Promise<any> {
        const tokenRequest: AuthorizationCodeRequest = {
            code: req.query.code as string,
            scopes: MICROSOFT_SCOPES,
            redirectUri: process.env.OAUTH_REDIRECT_URI!,
            // @ts-ignore
            codeVerifier: req.session.pkceCodes.verifier,
        };

        try {
            const response = await cca.acquireTokenByCode(tokenRequest);
            // @ts-ignore
            req.session.accessToken = response.accessToken;
            // @ts-ignore
            req.session.account = response.account;
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    getAuthenticatedClient(accessToken: string): Client {
        const client = Client.init({
            authProvider: (done) => {
                done(null, accessToken);
            },
        });
        return client;
    }

    async getUserDetails(accessToken: string): Promise<any> {
        const client = this.getAuthenticatedClient(accessToken);
        const user = await client.api("/me").get();
        return user;
    }

    async getEmails(accessToken: string): Promise<any> {
        const client = this.getAuthenticatedClient(accessToken);
        const messages = await client.api("/me/messages").select("subject,from,receivedDateTime,bodyPreview").top(25).get();
        return messages.value;
    }

    async getLatestEmail(accessToken: string): Promise<any> {
        const client = this.getAuthenticatedClient(accessToken);
        const message = await client.api("/me/messages")
            .orderby("receivedDateTime DESC")
            .top(1)
            .select([
                "bccRecipients", "body", "bodyPreview", "categories", "ccRecipients", "changeKey",
                "conversationId", "conversationIndex", "createdDateTime", "flag", "from",
                "hasAttachments", "id", "importance", "inferenceClassification",
                "internetMessageHeaders", "internetMessageId", "isDeliveryReceiptRequested",
                "isDraft", "isRead", "isReadReceiptRequested", "lastModifiedDateTime",
                "parentFolderId", "receivedDateTime", "replyTo", "sender", "sentDateTime",
                "subject", "toRecipients", "uniqueBody", "webLink"
            ])
            .expand("attachments")
            .get();
        return message.value[0];
    }

    async getConversationThread(accessToken: string, conversationId: string): Promise<any[]> {
        const client = this.getAuthenticatedClient(accessToken);
        const messages = await client.api("/me/messages")
            .filter(`conversationId eq '${conversationId}'`)
            .select(["sender", "receivedDateTime"])
            .get();
        return messages.value;
    }

    async draftEmail(accessToken: string, emailDetails: any): Promise<any> {
        const prompt = `Please draft a reply to the following email:\n\n${emailDetails.originalEmail}\n\n The user has provided the following details for the reply:\n\n${JSON.stringify(emailDetails, null, 2)}`;
        const draft = await geminiService.callGemini(prompt);
        return {
            ...draft,
            to: emailDetails.contactPerson
        };
    }

    async sendEmail(accessToken: string, email: any) {
        const client = this.getAuthenticatedClient(accessToken);
        const sendMail = {
            message: {
                subject: email.subject,
                body: {
                    contentType: "HTML",
                    content: email.body
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: email.to
                        }
                    }
                ]
            },
            saveToSentItems: "true"
        };
        return await client.api('/me/sendMail').post(sendMail);
    }

    async generateDraftEmail(formData: any): Promise<any> {
        try {
            const promptTemplate = fs.readFileSync(path.join(__dirname, '../gemini/email_prompt.txt'), 'utf-8');
            const prompt = `${promptTemplate}\n\n${JSON.stringify(formData, null, 2)}`;
            const result = await geminiService.callGemini(prompt);
            return result;
        } catch (error) {
            console.error('Error generating email draft:', error);
            throw new Error('Failed to generate email draft');
        }
    }

    async getOneDriveFiles(accessToken: string): Promise<any> {
        const client = this.getAuthenticatedClient(accessToken);
        const files = await client.api("/me/drive/root/children").get();
        return files.value;
    }

    async getOneDriveFileMetadata(accessToken: string, fileId: string): Promise<any> {
        const client = this.getAuthenticatedClient(accessToken);
        const metadata = await client.api(`/me/drive/items/${fileId}`).get();
        return metadata;
    }

    async getOneDriveFileContent(accessToken: string, fileId: string): Promise<any> {
        const client = this.getAuthenticatedClient(accessToken);
        const fileContent: ArrayBuffer = await client.api(`/me/drive/items/${fileId}/content`)
            .responseType(ResponseType.ARRAYBUFFER)
            .get();
        
        const text = (await mammoth.extractRawText({ buffer: Buffer.from(fileContent) })).value;
        return { text };
    }
}

export const microsoftService = new MicrosoftService();