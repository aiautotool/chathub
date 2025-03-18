import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  loading: boolean;
  apiConnected: boolean;
  modelName: string;
}

export default function ChatInput({ onSendMessage, loading, apiConnected, modelName }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Auto-resize textarea based on content
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setMessage(textarea.value);
    
    // Auto-resize logic
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    
    // Limit max height
    if (textarea.scrollHeight > 200) {
      textarea.style.height = '200px';
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  };

  // Handle Enter key to submit (but allow Shift+Enter for new lines)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-neutral-200 bg-white">
      <form className="flex items-end" onSubmit={handleSubmit}>
        <div className="flex-1 relative">
          <textarea 
            ref={textareaRef}
            className="w-full p-3 pr-10 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-white"
            placeholder="Type your message..."
            rows={1}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          ></textarea>
          <button 
            type="button" 
            className="absolute right-3 bottom-3 text-neutral-400 hover:text-neutral-600"
            disabled={loading}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
        </div>
        <button 
          type="submit" 
          className={`ml-2 p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex-shrink-0 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading || !message.trim()}
        >
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
      
      {/* API Status Indicator */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center text-xs text-neutral-500">
          <div className={`w-2 h-2 ${apiConnected ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-1.5`}></div>
          <span>{apiConnected ? 'API connected' : 'API disconnected'}</span>
        </div>
        <div className="text-xs text-neutral-500">
          <span>Model: {modelName}</span>
        </div>
      </div>
    </div>
  );
}
