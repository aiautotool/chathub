import { useState } from 'react';
import { Message } from '@shared/schema';
import { ModelConfig } from '@/lib/modelConfig';

interface ChatMessageProps {
  message: Message;
  modelConfig: ModelConfig;
}

export default function ChatMessage({ message, modelConfig }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  
  const formatMessageContent = (content: string) => {
    // Handle code blocks with language specification
    const formattedContent = content.replace(
      /```([\w-]*)\n([\s\S]*?)\n```/g,
      (_, language, code) => {
        return `<div class="bg-neutral-800 text-neutral-100 p-3 rounded-md font-mono text-sm my-3 overflow-x-auto"><pre class="whitespace-pre">${code}</pre></div>`;
      }
    );
    
    // Handle inline code
    const withInlineCode = formattedContent.replace(
      /`([^`]+)`/g,
      '<code class="bg-neutral-200 text-neutral-800 px-1 py-0.5 rounded font-mono text-sm">$1</code>'
    );
    
    // Handle headers
    const withHeaders = withInlineCode
      .replace(/^### (.*$)/gm, '<h3 class="font-semibold text-lg mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="font-semibold text-xl mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="font-bold text-2xl mt-4 mb-2">$1</h1>');
    
    // Handle paragraphs and line breaks
    return withHeaders
      .split('\n\n')
      .map(paragraph => `<p class="mb-3">${paragraph}</p>`)
      .join('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Different styling based on role
  if (message.role === 'user') {
    return (
      <div className="flex items-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-neutral-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm text-neutral-500 mb-1">You</div>
          <div className="bg-white p-3 rounded-lg shadow-sm border border-neutral-200">
            <p className="text-neutral-800">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-${modelConfig.color}-100 flex items-center justify-center mr-3`}>
        <div className={`text-${modelConfig.color}-600 text-sm`}>
          <ModelIcon name={modelConfig.icon} />
        </div>
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-neutral-500 mb-1">{modelConfig.name}</div>
        <div className={`bg-${modelConfig.color}-50 p-3 rounded-lg shadow-sm border border-${modelConfig.color}-100`}>
          <div 
            className="text-neutral-800 prose-sm" 
            dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
          />
        </div>
        <div className="flex items-center mt-2 space-x-2">
          <button 
            className="p-1 text-neutral-500 hover:text-neutral-700"
            title="Like"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
          </button>
          <button 
            className="p-1 text-neutral-500 hover:text-neutral-700"
            title="Dislike"
          >
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
            </svg>
          </button>
          <button 
            className="p-1 text-neutral-500 hover:text-neutral-700"
            onClick={copyToClipboard}
            title={copied ? "Copied!" : "Copy to clipboard"}
          >
            {copied ? (
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ModelIconProps {
  name: string;
}

function ModelIcon({ name }: ModelIconProps) {
  switch (name) {
    case 'brain':
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
        </svg>
      );
    case 'sparkling':
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      );
    case 'bubble-chart':
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7.5" cy="14.5" r="4.5" fill="currentColor"/>
          <circle cx="16.5" cy="16.5" r="3.5" fill="currentColor"/>
          <circle cx="14.5" cy="7.5" r="5.5" fill="currentColor"/>
        </svg>
      );
    case 'openai':
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.2819 9.8211a9.5971 9.5971 0 0 0-.8243-2.6451 10.1734 10.1734 0 0 0-3.0811-3.8389 10.2867 10.2867 0 0 0-4.5511-1.8848 8.3537 8.3537 0 0 0-6.2916 1.5116 8.6983 8.6983 0 0 0-3.191 5.6756 8.4456 8.4456 0 0 0 .9036 5.6163 8.768 8.768 0 0 0 4.4882 4.0018 2.0746 2.0746 0 0 0 .6223.1301 1.7888 1.7888 0 0 0 .932-.248 1.9589 1.9589 0 0 0 .6233-.9372 2.1064 2.1064 0 0 0 .0399-1.1454 4.324 4.324 0 0 1-.1579-.8648 4.4 4.4 0 0 1 1.1961-3.8742 6.3198 6.3198 0 0 1 7.2606-1.2163 6.421 6.421 0 0 1 3.5035 6.1868 6.3742 6.3742 0 0 1-2.331 5.2208 6.1836 6.1836 0 0 1-2.5011 1.1207 6.2781 6.2781 0 0 1-2.7503-.0788 3.8753 3.8753 0 0 0 .5607 2.3136 4.0593 4.0593 0 0 0 1.9664 1.5398 10.262 10.262 0 0 0 4.7535.4505 10.0711 10.0711 0 0 0 4.2376-1.6273 10.2895 10.2895 0 0 0 3.0319-3.7188 9.8683 9.8683 0 0 0 .8408-6.6601Z" fill="currentColor"/>
        </svg>
      );
    case 'robot':
      return (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zm10 7v2a1 1 0 01-1 1h-1a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 011 1zM4 9v2a1 1 0 01-1 1H2a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 011 1zm14.12 5.12A7 7 0 105.87 14.1l-.87 2.37a1 1 0 001.32 1.32l2.36-.86a7 7 0 009.43-2.82zM9 15a1 1 0 11-2 0 1 1 0 012 0zm5 2a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
}
