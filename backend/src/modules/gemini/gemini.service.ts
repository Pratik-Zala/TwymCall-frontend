import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiChatService {

  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      throw new Error("GOOGLE_GEMINI_API_KEY is not set in environment variables.");
    }
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });
  }

  async generateLegalMetadata(email: any, prompt: string): Promise<any> {
    const emailContent = `
      Subject: ${email.subject}
      From: ${email.from.emailAddress.name} <${email.from.emailAddress.address}>
      Received: ${email.receivedDateTime}
      Body: ${email.body.content}
    `;

    const fullPrompt = `${prompt}\n\n${emailContent}`;
    return this.callGemini(fullPrompt);
  }

  async callGemini(prompt: string): Promise<any> {
    try {
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const rawJson = response.text();
        console.log("rawJson", rawJson);
        const cleanedJson = rawJson.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanedJson);
    } catch (e: any) {
        console.error("Error in callGemini:", e);
        throw new Error("Failed to get response from Gemini");
    }
  }


  async generateGeminiResponse(prompt: string): Promise<any> {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    console.log("response", response);
    return response.text();
  }
} 

export const geminiService = new GeminiChatService();