import { ModelType } from '@shared/schema';

export interface ModelConfig {
  id: ModelType;
  name: string;
  description: string;
  icon: string;
  color: string;
  isPremium: boolean;
}

export const availableModels: ModelConfig[] = [
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1',
    description: 'Free',
    icon: 'brain',
    color: 'blue',
    isPremium: false
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek-V3',
    description: 'Premium',
    icon: 'brain',
    color: 'blue',
    isPremium: true
  },
  {
    id: 'gemini-2-0-flash',
    name: 'Gemini 2.0 Flash',
    description: 'Premium',
    icon: 'sparkling',
    color: 'emerald',
    isPremium: true
  },

  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    description: 'Premium',
    icon: 'bubble-chart',
    color: 'violet',
    isPremium: true
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    description: 'Premium',
    icon: 'bubble-chart',
    color: 'violet',
    isPremium: true
  },
  {
    id: 'openai-o3-mini',
    name: 'OpenAI o3-mini',
    description: 'Premium',
    icon: 'openai',
    color: 'gray',
    isPremium: true
  },
  {
    id: 'openai-o1',
    name: 'OpenAI o1',
    description: 'Premium',
    icon: 'openai',
    color: 'gray',
    isPremium: true
  },
  {
    id: 'openai-o1-mini',
    name: 'OpenAI o1-mini',
    description: 'Premium',
    icon: 'openai',
    color: 'gray',
    isPremium: true
  },
  {
    id: 'grok-2',
    name: 'Grok-2',
    description: 'Premium',
    icon: 'robot',
    color: 'red',
    isPremium: true
  }
];

export function getModelConfig(modelId: ModelType): ModelConfig {
  const config = availableModels.find(model => model.id === modelId);
  if (!config) {
    throw new Error(`Model config not found for ${modelId}`);
  }
  return config;
}
