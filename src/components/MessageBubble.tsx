
import React from 'react';
import { Message } from '../data/mockData';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex gap-4 ${isAI ? 'border-l-4 border-blue-400' : ''}`}>
      {isAI && (
        <div className="flex-shrink-0 w-8 h-8 mt-1">
          <div className="relative w-8 h-8">
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
        <div className="mt-1 text-sm">{message.content}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
