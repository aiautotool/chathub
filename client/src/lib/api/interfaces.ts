import { ChatRequest, ChatResponse } from '@shared/schema';

export interface ApiClient {
  sendMessage: (request: ChatRequest) => Promise<ChatResponse>;
}
