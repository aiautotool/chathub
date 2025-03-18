import { useEffect } from 'react';
import { useParams } from 'wouter';
import { useChat } from '@/contexts/ChatContext';
import MainLayout from '@/components/layouts/MainLayout';
import ChatInterface from '@/components/chat/ChatInterface';
import { ModelType } from '@shared/schema';

export default function ChatPage() {
  const params = useParams<{ modelId?: string }>();
  const { activeModel, setActiveModel } = useChat();
  
  // Set active model from URL param if available
  useEffect(() => {
    if (params.modelId && params.modelId !== activeModel) {
      // Validate that it's a valid model type
      try {
        const modelId = params.modelId as ModelType;
        setActiveModel(modelId);
      } catch (error) {
        console.error('Invalid model ID in URL:', params.modelId);
      }
    }
  }, [params.modelId, activeModel, setActiveModel]);

  return (
    <MainLayout>
      <ChatInterface />
    </MainLayout>
  );
}
