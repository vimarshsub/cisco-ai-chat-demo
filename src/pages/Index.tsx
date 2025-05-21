
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import Header from '@/components/Header';
import ThreadSidebar from '@/components/ThreadSidebar';
import ConversationView from '@/components/ConversationView';
import ChatInput from '@/components/ChatInput';
import WelcomeScreen from '@/components/WelcomeScreen';
import SidebarToggle from '@/components/SidebarToggle';
import { useMessageHandler } from '@/hooks/useMessageHandler';
import { mockThreads, suggestionPrompts, Thread } from '@/data/mockData';

const Index = () => {
  const [threads, setThreads] = useState(mockThreads);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const activeThread = activeThreadId 
    ? threads.find(thread => thread.id === activeThreadId) || null
    : null;

  const { 
    createNewThread, 
    handleSendMessage, 
    handleSelectSuggestion 
  } = useMessageHandler({
    threads,
    setThreads,
    activeThreadId
  });

  const handleThreadSelect = (threadId: string) => {
    setActiveThreadId(threadId);
  };

  const handleNewThread = () => {
    const newThreadId = createNewThread();
    setActiveThreadId(newThreadId);
    toast({
      title: "New conversation started",
      description: "You can now ask the AI Assistant a question.",
    });
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    const newThreadId = handleSelectSuggestion(suggestion);
    setActiveThreadId(newThreadId);
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
            onNewThread={handleNewThread}
          />
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden flex flex-col">
            {activeThread ? (
              <ConversationView thread={activeThread} />
            ) : (
              <WelcomeScreen 
                onSelectSuggestion={handleSuggestionSelect} 
                suggestionPrompts={suggestionPrompts}
              />
            )}
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isActiveThread={!!activeThread || activeThreadId === null} 
          />
        </div>
        
        <SidebarToggle 
          sidebarCollapsed={sidebarCollapsed}
          onToggle={handleToggleSidebar}
        />
      </div>
    </div>
  );
};

export default Index;
