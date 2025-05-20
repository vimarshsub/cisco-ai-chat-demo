
import React from 'react';

interface SuggestionPromptProps {
  text: string;
  onClick: () => void;
}

const SuggestionPrompt = ({ text, onClick }: SuggestionPromptProps) => {
  return (
    <div 
      onClick={onClick}
      className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <p className="text-sm text-gray-700">{text}</p>
    </div>
  );
};

export default SuggestionPrompt;
