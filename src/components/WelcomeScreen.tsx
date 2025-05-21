
import React from 'react';
import SuggestionGrid from '@/components/SuggestionGrid';

interface WelcomeScreenProps {
  onSelectSuggestion: (suggestion: string) => void;
  suggestionPrompts: string[];
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectSuggestion, suggestionPrompts }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
      <div className="relative w-48 h-48 mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0051AF] via-[#0087EA] to-[#00BCEB]"></div>
        <div className="absolute top-[10%] right-[10%] w-1/2 h-1/2 rounded-tl-full bg-gradient-to-br from-[#0087EA] to-[#63FFF7]"></div>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">How can I help today?</h2>
      <p className="text-center text-gray-600 max-w-md mb-8">
        Choose a suggestion or use the text field to ask a question. I have limitations 
        and won't always get it right, but your feedback will help me improve.
      </p>
      
      <SuggestionGrid 
        suggestions={suggestionPrompts} 
        onSelectSuggestion={onSelectSuggestion} 
      />
    </div>
  );
};

export default WelcomeScreen;
