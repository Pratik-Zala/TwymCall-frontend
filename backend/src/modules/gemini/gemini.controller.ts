import { Request, Response } from "express";
import { promises as fs } from 'fs';
import path from 'path';
import { geminiService } from "./gemini.service";

 class GeminiController {

    chatHandler = async (req: Request, res: Response) => {
        try {
            const { prompt } = req.body;
    
            if (!prompt) {
                res.status(400).json({ error: 'User prompt is required.' });
                return;
            }
    
            const systemPromptPath = path.join(__dirname, 'system_prompt.txt');
            const docContextPath = path.join(__dirname, 'document_context.txt');
            const docMetadataPath = path.join(__dirname, 'document_metadata.json');
    
            const [systemPrompt, documentContent, documentMetadata] = await Promise.all([
                fs.readFile(systemPromptPath, 'utf8'),
                fs.readFile(docContextPath, 'utf8'),
                fs.readFile(docMetadataPath, 'utf8'),
            ]);
        
            const fullPrompt = `
                ${systemPrompt}
                Here is the document you need to answer questions about:
                --- DOCUMENT CONTENT START ---
                ${documentContent}
                --- DOCUMENT CONTENT END ---
                Here is the metadata for the document:
                --- METADATA START ---
                ${documentMetadata}
                --- METADATA END ---
                User: ${prompt}
            `;
    
            const text = await geminiService.generateGeminiResponse(fullPrompt);
            console.log("text", text);
            res.json({ text });
    
        } catch (error) {
            console.error('Error in chat endpoint:', error);
            res.status(500).json({ error: 'Failed to get a response from the AI model.' });
        }
    };
}

export const geminiController = new GeminiController();