import { ChatRequest, ChatResponse } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  return await apiRequest<ChatResponse>({
    method: 'POST',
    url: '/api/chat',
    data: request
  });
}
