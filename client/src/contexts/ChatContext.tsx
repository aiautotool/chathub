import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast";
import { Message, ModelType, ChatResponse } from '@shared/schema';
import { sendMessage } from '@/lib/api/apiClient';
import { availableModels } from '@/lib/modelConfig';

interface ChatState {
  activeModel: ModelType;
  conversations: Record<ModelType, Message[]>;
  loading: boolean;
  apiConnected: boolean;
}

interface ChatContextType extends ChatState {
  setActiveModel: (model: ModelType) => void;
  sendChatMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [state, setState] = useState<ChatState>({
    activeModel: 'deepseek-r1',
    conversations: {
      'deepseek-r1': [],
      'deepseek-v3': [],
      'claude-3-7-sonnet': [],
      'claude-3-5-haiku': [],
      'gemini-1-0-pro': [],
      'openai-o3-mini': [],
      'openai-o1': [],
      'openai-o1-mini': [],
      'grok-2': []
    },
    loading: false,
    apiConnected: true,
  });

  // Set active model and update URL
  const setActiveModel = useCallback((model: ModelType) => {
    setState((prev) => ({ ...prev, activeModel: model }));
    setLocation(`/chat/${model}`);
  }, [setLocation]);

  // Initialize empty conversations for all models
  useEffect(() => {
    const initialConversations: Record<ModelType, Message[]> = {} as Record<ModelType, Message[]>;
    
    availableModels.forEach(model => {
      initialConversations[model.id] = [];
    });
    
    setState(prev => ({
      ...prev,
      conversations: initialConversations
    }));
  }, []);

  // Send a message to the current active model
  const sendChatMessage = async (content: string) => {
    const userMessage: Message = {
      role: 'user',
      content,
      timestamp: Date.now()
    };

    // Update state with user message
    setState(prev => ({
      ...prev,
      conversations: {
        ...prev.conversations,
        [prev.activeModel]: [...prev.conversations[prev.activeModel], userMessage]
      },
      loading: true
    }));

    try {
      // Get all messages for the current conversation
      const messages = [...state.conversations[state.activeModel], userMessage];
      
      // Send request to backend
      const response = await sendMessage({
        model: state.activeModel,
        messages,
        temperature: 0.7
      });

      // Update state with AI response
      setState(prev => ({
        ...prev,
        conversations: {
          ...prev.conversations,
          [prev.activeModel]: [...prev.conversations[prev.activeModel], userMessage, response.message]
        },
        loading: false,
        apiConnected: true
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error toast
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
      
      // Update state to reflect error
      setState(prev => ({
        ...prev,
        loading: false,
        apiConnected: false
      }));
    }
  };

  // Clear the current conversation
  const clearChat = useCallback(() => {
    setState(prev => ({
      ...prev,
      conversations: {
        ...prev.conversations,
        [prev.activeModel]: []
      }
    }));
  }, []);

  const value: ChatContextType = {
    ...state,
    setActiveModel,
    sendChatMessage,
    clearChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
