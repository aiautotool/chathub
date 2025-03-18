interface WelcomeScreenProps {
  modelName: string;
  onExampleSelect: (example: string) => void;
  modelColor: string;
  modelIcon: string;
}

export default function WelcomeScreen({ modelName, onExampleSelect, modelColor, modelIcon }: WelcomeScreenProps) {
  const examples = [
    {
      title: 'Explain quantum computing',
      description: 'Get a clear explanation of quantum computing principles'
    },
    {
      title: 'Write a Python function',
      description: 'Generate a Python function to calculate Fibonacci sequence'
    },
    {
      title: 'Analyze this code snippet',
      description: 'Get help understanding and optimizing a code snippet'
    },
    {
      title: 'Create a business plan',
      description: 'Help me draft a simple business plan outline'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <div className={`flex items-center justify-center w-16 h-16 bg-${modelColor}-100 text-${modelColor}-600 rounded-full mb-4`}>
        <ModelIcon name={modelIcon} size="lg" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Welcome to {modelName} Chat</h2>
      <p className="text-neutral-600 mb-6 max-w-md">Ask anything or try one of the following examples</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
        {examples.map((example, index) => (
          <button 
            key={index}
            className="text-left p-3 bg-white border border-neutral-200 rounded-lg hover:border-primary/30 transition-colors"
            onClick={() => onExampleSelect(example.title)}
          >
            <div className="text-sm font-medium mb-1">{example.title}</div>
            <div className="text-xs text-neutral-500">{example.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

interface ModelIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

function ModelIcon({ name, size = 'md' }: ModelIconProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-8 h-8'
  };
  
  const iconClass = sizeClasses[size];
  
  switch (name) {
    case 'brain':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
        </svg>
      );
    case 'sparkling':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      );
    case 'bubble-chart':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7.5" cy="14.5" r="4.5" fill="currentColor"/>
          <circle cx="16.5" cy="16.5" r="3.5" fill="currentColor"/>
          <circle cx="14.5" cy="7.5" r="5.5" fill="currentColor"/>
        </svg>
      );
    case 'openai':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.2819 9.8211a9.5971 9.5971 0 0 0-.8243-2.6451 10.1734 10.1734 0 0 0-3.0811-3.8389 10.2867 10.2867 0 0 0-4.5511-1.8848 8.3537 8.3537 0 0 0-6.2916 1.5116 8.6983 8.6983 0 0 0-3.191 5.6756 8.4456 8.4456 0 0 0 .9036 5.6163 8.768 8.768 0 0 0 4.4882 4.0018 2.0746 2.0746 0 0 0 .6223.1301 1.7888 1.7888 0 0 0 .932-.248 1.9589 1.9589 0 0 0 .6233-.9372 2.1064 2.1064 0 0 0 .0399-1.1454 4.324 4.324 0 0 1-.1579-.8648 4.4 4.4 0 0 1 1.1961-3.8742 6.3198 6.3198 0 0 1 7.2606-1.2163 6.421 6.421 0 0 1 3.5035 6.1868 6.3742 6.3742 0 0 1-2.331 5.2208 6.1836 6.1836 0 0 1-2.5011 1.1207 6.2781 6.2781 0 0 1-2.7503-.0788 3.8753 3.8753 0 0 0 .5607 2.3136 4.0593 4.0593 0 0 0 1.9664 1.5398 10.262 10.262 0 0 0 4.7535.4505 10.0711 10.0711 0 0 0 4.2376-1.6273 10.2895 10.2895 0 0 0 3.0319-3.7188 9.8683 9.8683 0 0 0 .8408-6.6601Z" fill="currentColor"/>
        </svg>
      );
    case 'robot':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zm10 7v2a1 1 0 01-1 1h-1a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 011 1zM4 9v2a1 1 0 01-1 1H2a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 011 1zm14.12 5.12A7 7 0 105.87 14.1l-.87 2.37a1 1 0 001.32 1.32l2.36-.86a7 7 0 009.43-2.82zM9 15a1 1 0 11-2 0 1 1 0 012 0zm5 2a1 1 0 100-2 1 1 0 000 2z" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
}
