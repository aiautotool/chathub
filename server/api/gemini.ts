// Since the Google AI Node.js SDK for Gemini is not included in package.json,
// we are creating a simpler implementation using fetch
import { Message, ModelType, ChatResponse } from "@shared/schema";

export class GeminiClient {
  private apiKey: string;
  private baseUrl: string = "https://generativelanguage.googleapis.com/v1beta";
  private modelMapping: Record<string, string> = {
    "gemini-2-0-flash": "gemini-2.0-flash",
  };

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || "";
  }

  async chat(modelType: ModelType, messages: Message[]): Promise<ChatResponse> {
    try {
      if (!this.apiKey) {
        throw new Error("GEMINI_API_KEY is not set");
      }

      // Map our model types to Gemini model IDs
      const geminiModel = this.modelMapping[modelType];
      if (!geminiModel) {
        throw new Error(`Unsupported Gemini model: ${modelType}`);
      }

      // Format messages for Gemini API
      const formattedMessages = this.formatMessagesForGemini(
        messages.slice(-10),
      );

      const url = `${this.baseUrl}/models/${geminiModel}:generateContent?key=${this.apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: formattedMessages,
          generationConfig: {
            maxOutputTokens: 1024,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();

      // Extract the text response from Gemini's response format
      const content =
        data.candidates[0]?.content?.parts[0]?.text || "No response generated";

      return {
        message: {
          role: "assistant",
          content,
          timestamp: Date.now(),
        },
        modelUsed: modelType,
      };
    } catch (error) {
      console.error("Gemini API error:", error);
      throw new Error(
        `Failed to get response from Gemini: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  private formatMessagesForGemini(messages: Message[]) {
    const formattedMessages = [];
    let currentRole = null;
    let currentContent = "";

    // Gemini expects a different format - we need to combine consecutive messages from the same role
    for (const msg of messages) {
      const role = msg.role === "assistant" ? "model" : "user";

      if (role === currentRole) {
        currentContent += "\n" + msg.content;
      } else {
        if (currentRole !== null) {
          formattedMessages.push({
            role: currentRole,
            parts: [{ text: currentContent }],
          });
        }
        currentRole = role;
        currentContent = msg.content;
      }
    }

    // Add the last message group
    if (currentRole !== null) {
      formattedMessages.push({
        role: currentRole,
        parts: [{ text: currentContent }],
      });
    }

    return formattedMessages;
  }
}
