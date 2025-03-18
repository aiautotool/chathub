import OpenAI from 'openai';
import { Message, ModelType, ChatResponse } from '@shared/schema';

export class GrokClient {
  private openai: OpenAI;
  private modelMapping: Record<string, string> = {
    'grok-2': 'grok-2-1212'
  };

  constructor() {
    this.openai = new OpenAI({
      baseURL: "https://api.x.ai/v1",
      apiKey: process.env.XAI_API_KEY || '',
    });
  }

  async chat(modelType: ModelType, messages: Message[]): Promise<ChatResponse> {
    try {
      if (!process.env.XAI_API_KEY) {
        throw new Error('XAI_API_KEY is not set');
      }
      
      // Map our model types to xAI model IDs
      const grokModel = this.modelMapping[modelType];
      if (!grokModel) {
        throw new Error(`Unsupported Grok model: ${modelType}`);
      }

      // Format messages for xAI API (using OpenAI format)
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Get the 10 most recent messages to stay within context window
      const recentMessages = formattedMessages.slice(-10);

      const response = await this.openai.chat.completions.create({
        model: grokModel,
        messages: recentMessages,
        max_tokens: 1024,
      });

      return {
        message: {
          role: 'assistant',
          content: response.choices[0].message.content || 'No response generated',
          timestamp: Date.now(),
        },
        modelUsed: modelType,
      };
    } catch (error) {
      console.error('Grok API error:', error);
      throw new Error(`Failed to get response from Grok: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
