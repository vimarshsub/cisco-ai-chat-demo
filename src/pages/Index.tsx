
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import ThreadSidebar from '@/components/ThreadSidebar';
import ConversationView from '@/components/ConversationView';
import ChatInput from '@/components/ChatInput';
import SuggestionGrid from '@/components/SuggestionGrid';
import { mockThreads, suggestionPrompts, Thread, Message } from '@/data/mockData';
import cannedData from '@/data/cannedData.json';

const Index = () => {
  const [threads, setThreads] = useState(mockThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const activeThread = activeThreadId 
    ? threads.find(thread => thread.id === activeThreadId) || null
    : null;

  const handleThreadSelect = (threadId: string) => {
    setActiveThreadId(threadId);
  };

  const createNewThread = () => {
    const newThreadId = `thread-${uuidv4()}`;
    const newThread: Thread = {
      id: newThreadId,
      name: "New Conversation",
      date: "today",
      messages: []
    };
    
    setThreads(prevThreads => [newThread, ...prevThreads]);
    setActiveThreadId(newThreadId);
    toast({
      title: "New conversation started",
      description: "You can now ask the AI Assistant a question.",
    });
  };

  const findMatchingCannedResponse = (content: string) => {
    console.log("Finding response for:", content);
    
    // Debug the common questions in canned data
    console.log("Available questions:", cannedData.commonQuestions.map(q => q.question));
    
    // Check if the input matches any common question (case-insensitive and trimmed)
    const matchingQuestion = cannedData.commonQuestions.find(q => 
      q.question.toLowerCase().trim() === content.toLowerCase().trim()
    );
    
    console.log("Matching question found:", matchingQuestion);
    
    if (matchingQuestion) {
      // Debug the available tags
      console.log("Question tags:", matchingQuestion.tags);
      console.log("Available responses:", cannedData.assistantResponses.map(r => r.title));
      
      // Search for a response that matches any tag from the question
      for (const tag of matchingQuestion.tags) {
        const relatedResponse = cannedData.assistantResponses.find(r => 
          r.title.toLowerCase().includes(tag.toLowerCase())
        );
        
        if (relatedResponse) {
          console.log("Found matching response:", relatedResponse.title);
          return relatedResponse.content;
        }
      }
    }
    
    console.log("No matching response found");
    return null;
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
    
    // Check if there's a matching canned response
    const cannedResponse = findMatchingCannedResponse(content);
    console.log("Canned response:", cannedResponse);
    
    // Simulate AI response after short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${uuidv4()}`,
        content: cannedResponse || `This is a simulated response to your question: "${content}"`,
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

  const handleSelectSuggestion = (suggestion: string) => {
    createNewThread();
    // Small timeout to ensure the thread is created first
    setTimeout(() => handleSendMessage(suggestion), 100);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {!sidebarCollapsed && (
          <ThreadSidebar
            threads={threads}
            activeThreadId={activeThreadId}
            onThreadSelect={handleThreadSelect}
            onNewThread={createNewThread}
          />
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeThread ? (
              <ConversationView thread={activeThread} />
            ) : (
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
                  onSelectSuggestion={handleSelectSuggestion} 
                />
              </div>
            )}
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isActiveThread={!!activeThread || activeThreadId === null} 
          />
        </div>
        
        <button 
          className="absolute left-60 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <div className="w-4 h-4 flex items-center justify-center">
            {sidebarCollapsed ? (
              <ChevronRight className="w-3 h-3 text-gray-500" />
            ) : (
              <ChevronLeft className="w-3 h-3 text-gray-500" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default Index;
