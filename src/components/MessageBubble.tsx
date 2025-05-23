
import React from 'react';
import { Message } from '../data/mockData';
import ScenarioStep from './scenario/ScenarioStep';
import { ScenarioStep as ScenarioStepType } from '@/types/multiStepScenario';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAI = message.sender === 'ai';
  const scenarioStep = message.scenarioStep as ScenarioStepType | undefined;
  const isTyping = message.isTyping;
  
  return (
    <div className={`flex gap-4 ${isAI ? 'border-l-4 border-blue-400 bg-gray-50 rounded-md p-4' : ''}`}>
      {isAI && (
        <div className="flex-shrink-0 w-6 h-6 mt-1">
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0051AF] via-[#0087EA] to-[#00BCEB]"></div>
            <div className="absolute top-[10%] right-[10%] w-1/2 h-1/2 rounded-tl-full bg-gradient-to-br from-[#0087EA] to-[#63FFF7]"></div>
          </div>
        </div>
      )}
      <div className={`flex flex-col flex-grow ${isAI ? 'pl-2' : 'pl-10'}`}>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{isAI ? 'AI Assistant' : 'You'}</span>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
        <div className={`mt-1 text-sm ${isAI ? 'text-gray-800' : ''}`}>
          {isTyping ? (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150"></div>
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-300"></div>
            </div>
          ) : scenarioStep ? (
            <ScenarioStep step={scenarioStep} />
          ) : (
            message.content
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
