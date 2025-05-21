
import React, { useRef, useEffect } from 'react';
import { Message, Thread } from '../data/mockData';
import MessageBubble from './MessageBubble';
import { ScrollArea } from './ui/scroll-area';

interface ConversationViewProps {
  thread: Thread | null;
}

const ConversationView = ({ thread }: ConversationViewProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [thread?.messages]);

  if (!thread) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white">
        <div className="relative w-48 h-48 mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0051AF] via-[#0087EA] to-[#00BCEB]"></div>
          <div className="absolute top-[10%] right-[10%] w-1/2 h-1/2 rounded-tl-full bg-gradient-to-br from-[#0087EA] to-[#63FFF7]"></div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">How can I help today?</h2>
        <p className="text-center text-gray-600 max-w-md mb-6">
          Choose a suggestion or use the text field to ask a question. I have limitations 
          and won't always get it right, but your feedback will help me improve.
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-800">{thread.name}</h2>
      </div>
      <div ref={scrollAreaRef} className="flex-1 overflow-hidden">
        <ScrollArea className="h-full max-h-[calc(100vh-180px)]">
          <div className="p-4 space-y-6">
            {thread.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ConversationView;
