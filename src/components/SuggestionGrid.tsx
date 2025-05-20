
import React from 'react';
import SuggestionPrompt from './SuggestionPrompt';

interface SuggestionGridProps {
  suggestions: string[];
  onSelectSuggestion: (suggestion: string) => void;
}

const SuggestionGrid = ({ suggestions, onSelectSuggestion }: SuggestionGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      {suggestions.map((suggestion, index) => (
        <SuggestionPrompt
          key={index}
          text={suggestion}
          onClick={() => onSelectSuggestion(suggestion)}
        />
      ))}
    </div>
  );
};

export default SuggestionGrid;
