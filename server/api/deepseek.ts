import { Message, ModelType, ChatResponse } from '@shared/schema';

export class DeepSeekClient {
  private apiKey: string;
  private baseUrl: string = 'https://api.deepseek.com/v1';
  private modelMapping: Record<string, string> = {
    'deepseek-r1': 'deepseek-r1',
    'deepseek-v3': 'deepseek-chat'
  };

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
  }

  async chat(modelType: ModelType, messages: Message[]): Promise<ChatResponse> {
    try {
      if (!this.apiKey) {
        throw new Error('DEEPSEEK_API_KEY is not set');
      }
      
      // Map our model types to DeepSeek model IDs
      const deepseekModel = this.modelMapping[modelType];
      if (!deepseekModel) {
        throw new Error(`Unsupported DeepSeek model: ${modelType}`);
      }

      // Format messages for DeepSeek API (similar to OpenAI format)
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      // Get the 10 most recent messages to stay within context window
      const recentMessages = formattedMessages.slice(-10);

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: deepseekModel,
          messages: recentMessages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`DeepSeek API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      return {
        message: {
          role: 'assistant',
          content: data.choices[0].message.content,
          timestamp: Date.now(),
        },
        modelUsed: modelType,
      };
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw new Error(`Failed to get response from DeepSeek: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
