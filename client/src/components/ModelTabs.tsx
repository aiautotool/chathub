import { useChat } from "@/contexts/ChatContext";
import { availableModels } from "@/lib/modelConfig";
import { useState } from "react";

export default function ModelTabs() {
  const { activeModel, setActiveModel } = useChat();
  const [showMore, setShowMore] = useState(false);
  
  // Only show first 4 models by default
  const visibleModels = showMore ? availableModels : availableModels.slice(0, 4);
  
  return (
    <div className="hidden md:flex items-center space-x-2 p-4 bg-white border-b border-neutral-200 overflow-x-auto scrollbar-hide">
      {visibleModels.map((model) => (
        <button 
          key={model.id}
          className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeModel === model.id 
              ? `bg-${model.color}-50 border border-${model.color}-200` 
              : 'hover:bg-neutral-100'
          }`}
          onClick={() => setActiveModel(model.id)}
        >
          <div 
            className={`flex items-center justify-center w-5 h-5 rounded-full bg-${model.color}-500 text-white mr-1.5`}
          >
            <ModelIcon name={model.icon} />
          </div>
          {model.name.split(' ')[0]}
        </button>
      ))}
      
      <button 
        className="flex items-center px-3 py-1.5 rounded-full text-sm font-medium hover:bg-neutral-100"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? (
          <>
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
            Less
          </>
        ) : (
          <>
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            More
          </>
        )}
      </button>
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
