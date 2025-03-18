import OpenAI from 'openai';
import { Message, ModelType, ChatResponse } from '@shared/schema';

export class OpenAIClient {
  private openai: OpenAI;
  private modelMapping: Record<string, string> = {
    'openai-o3-mini': 'gpt-3.5-turbo',
    'openai-o1': 'gpt-4o',
    'openai-o1-mini': 'gpt-4o-mini',
  };

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
  }

  async chat(modelType: ModelType, messages: Message[]): Promise<ChatResponse> {
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not set');
      }
      
      // Map our model types to OpenAI model IDs
      const openaiModel = this.modelMapping[modelType];
      if (!openaiModel) {
        throw new Error(`Unsupported OpenAI model: ${modelType}`);
      }

      // Format messages for OpenAI API
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Get the 10 most recent messages to stay within context window
      const recentMessages = formattedMessages.slice(-10);
      
      // The newest OpenAI model is "gpt-4o" which was released May 13, 2024
      // do not change this unless explicitly requested by the user
      const response = await this.openai.chat.completions.create({
        model: openaiModel,
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
      console.error('OpenAI API error:', error);
      throw new Error(`Failed to get response from OpenAI: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
