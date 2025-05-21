
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/hooks/use-toast";
import { Thread, Message } from '@/data/mockData';
import { getDirectResponse } from '@/utils/responseUtils';

interface UseMessageHandlerProps {
  threads: Thread[];
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
  activeThreadId: string | null;
}

export const useMessageHandler = ({
  threads,
  setThreads,
  activeThreadId
}: UseMessageHandlerProps) => {
  
  const createNewThread = () => {
    const newThreadId = `thread-${uuidv4()}`;
    const newThread: Thread = {
      id: newThreadId,
      name: "New Conversation",
      date: "today",
      messages: []
    };
    
    setThreads(prevThreads => [newThread, ...prevThreads]);
    return newThreadId;
  };

  const handleSendMessage = (content: string) => {
    if (!activeThreadId) return;
    
    // Create user message
    const userMessage: Message = {
      id: `msg-${uuidv4()}`,
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Update thread with user message
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === activeThreadId
          ? {
              ...thread,
              name: content.length > 30 ? `${content.substring(0, 30)}...` : content,
              messages: [...thread.messages, userMessage]
            }
          : thread
      )
    );
    
    // Check if there's a direct response or matching canned response
    const directResponse = getDirectResponse(content);
    
    // Simulate AI response after short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${uuidv4()}`,
        content: directResponse || `This is a simulated response to your question: "${content}"`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setThreads(prevThreads => 
        prevThreads.map(thread => 
          thread.id === activeThreadId
            ? { ...thread, messages: [...thread.messages, aiResponse] }
            : thread
        )
      );
    }, 1000);
  };

  const handleSelectSuggestion = (suggestion: string, createThread = true) => {
    let threadId = activeThreadId;
    
    if (createThread) {
      threadId = createNewThread();
      // Small timeout to ensure the thread is created first
      setTimeout(() => handleSendMessage(suggestion), 100);
    } else {
      handleSendMessage(suggestion);
    }
    
    return threadId;
  };

  return {
    createNewThread,
    handleSendMessage,
    handleSelectSuggestion
  };
};
