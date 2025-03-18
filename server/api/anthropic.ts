import Anthropic from '@anthropic-ai/sdk';
import { Message, ModelType, ChatResponse } from '@shared/schema';

export class AnthropicClient {
  private anthropic: Anthropic;
  private modelMapping: Record<string, string> = {
    'claude-3-7-sonnet': 'claude-3-7-sonnet-20250219',
    'claude-3-5-haiku': 'claude-3-5-haiku-20240307',
  };

  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });
  }

  async chat(modelType: ModelType, messages: Message[]): Promise<ChatResponse> {
    try {
      if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error('ANTHROPIC_API_KEY is not set');
      }
      
      // Map our model types to Anthropic model IDs
      const anthropicModel = this.modelMapping[modelType];
      if (!anthropicModel) {
        throw new Error(`Unsupported Anthropic model: ${modelType}`);
      }

      // Format messages for Anthropic API
      const formattedMessages = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      }));

      // Get only the 10 most recent messages to stay within context window
      const recentMessages = formattedMessages.slice(-10);

      const response = await this.anthropic.messages.create({
        model: anthropicModel,
        messages: recentMessages,
        max_tokens: 1024,
      });

      return {
        message: {
          role: 'assistant',
          content: response.content[0].text,
          timestamp: Date.now(),
        },
        modelUsed: modelType,
      };
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw new Error(`Failed to get response from Anthropic: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
