import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { availableModels } from "@/lib/modelConfig";
import UserProfileButton from "@/components/UserProfileButton";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { activeModel, setActiveModel, clearChat } = useChat();

  const handleModelSelect = (modelId: any) => {
    setActiveModel(modelId);
    onClose();
  };

  const handleNewChat = () => {
    clearChat();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-neutral-800 bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform">
        {/* Brand */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-md mr-2">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zm10 7v2a1 1 0 01-1 1h-1a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 011 1zM4 9v2a1 1 0 01-1 1H2a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 011 1zm14.12 5.12A7 7 0 105.87 14.1l-.87 2.37a1 1 0 001.32 1.32l2.36-.86a7 7 0 009.43-2.82zM9 15a1 1 0 11-2 0 1 1 0 012 0zm5 2a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold">AI Chat Hub</h1>
          </div>
          <button 
            className="p-1.5 rounded-md hover:bg-neutral-100"
            onClick={onClose}
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* New Chat Button */}
        <div className="p-4">
          <button 
            className="flex items-center justify-center w-full py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
            onClick={handleNewChat}
          >
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New Chat
          </button>
        </div>
        
        {/* Models list */}
        <div className="p-4">
          <h2 className="text-sm font-semibold text-neutral-500 mb-3">Chat Models</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto pb-2">
            {availableModels.map((model) => (
              <button 
                key={model.id}
                className={`flex items-center w-full p-2 rounded-md text-left hover:bg-neutral-100 transition-colors ${
                  activeModel === model.id ? `bg-${model.color}-50 border border-${model.color}-200` : ''
                }`}
                onClick={() => handleModelSelect(model.id)}
              >
                <div 
                  className={`flex items-center justify-center w-6 h-6 rounded bg-${model.color}-500 text-white mr-2`}
                >
                  <ModelIcon name={model.icon} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-800">{model.name}</div>
                  <div className="text-xs text-neutral-500">{model.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Settings section */}
        <div className="mt-auto p-4 border-t border-neutral-200">
          <div className="flex flex-col space-y-2">
            {/* User Profile Button */}
            <UserProfileButton />
            
            <button className="flex items-center text-sm text-neutral-600 p-1.5 rounded-md hover:bg-neutral-100 transition-colors">
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              Settings
            </button>
            <button className="flex items-center text-sm text-neutral-600 p-1.5 rounded-md hover:bg-neutral-100 transition-colors">
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
              </svg>
              API Keys
            </button>
          </div>
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
