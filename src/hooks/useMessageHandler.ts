import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/hooks/use-toast";
import { Thread, Message } from '@/data/mockData';
import { getDirectResponse } from '@/utils/responseUtils';
import { scenarios } from '@/data/scenarios';
import { ScenarioStep } from '@/types/multiStepScenario';

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

  const findMatchingScenario = (content: string) => {
    const normalizedContent = content.toLowerCase().trim();
    
    for (const scenario of scenarios) {
      for (const phrase of scenario.triggerPhrases) {
        if (normalizedContent === phrase.toLowerCase().trim()) {
          return scenario;
        }
      }
    }
    
    return null;
  };

  const processScenarioStep = (threadId: string, scenarioId: string, stepIndex: number) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario || stepIndex >= scenario.steps.length) return;
    
    const step = scenario.steps[stepIndex];
    
    // Create AI message with scenario step
    const aiMessage: Message = {
      id: `msg-${uuidv4()}`,
      content: '',
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      scenarioStep: step
    };
    
    // Update thread with AI message
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId
          ? { 
              ...thread, 
              messages: [...thread.messages, aiMessage],
              activeScenario: {
                id: scenarioId,
                currentStepIndex: stepIndex
              }
            }
          : thread
      )
    );
    
    // Process next step if there's no wait for user input and if there's a next step
    if (!step.waitForUserInput && stepIndex + 1 < scenario.steps.length) {
      const delay = step.delay || 1000;
      setTimeout(() => {
        processScenarioStep(threadId, scenarioId, stepIndex + 1);
      }, delay);
    }
  };

  const handleUserScenarioInput = (threadId: string, content: string) => {
    const thread = threads.find(t => t.id === threadId);
    if (!thread?.activeScenario) return false;
    
    const { id: scenarioId, currentStepIndex } = thread.activeScenario;
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return false;
    
    const currentStep = scenario.steps[currentStepIndex];
    if (!currentStep.waitForUserInput || !currentStep.expectedUserInput) return false;
    
    const normalizedContent = content.toLowerCase().trim();
    const isExpectedInput = currentStep.expectedUserInput.some(
      input => normalizedContent.includes(input.toLowerCase().trim())
    );
    
    if (isExpectedInput) {
      // Process the next step in the scenario
      processScenarioStep(threadId, scenarioId, currentStepIndex + 1);
      return true;
    }
    
    return false;
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
    
    // Check if this is a response to an active scenario
    const isScenarioResponse = handleUserScenarioInput(activeThreadId, content);
    if (isScenarioResponse) return;
    
    // Check if this is a trigger for a new scenario
    const matchingScenario = findMatchingScenario(content);
    if (matchingScenario) {
      processScenarioStep(activeThreadId, matchingScenario.id, 0);
      return;
    }
    
    // Otherwise, proceed with regular response flow with delay
    // Show typing indicator first
    const typingIndicatorId = `typing-${uuidv4()}`;
    const typingIndicator: Message = {
      id: typingIndicatorId,
      content: "",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTyping: true
    };
    
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === activeThreadId
          ? { ...thread, messages: [...thread.messages, typingIndicator] }
          : thread
      )
    );
    
    // Calculate response time based on content length (between 1-3 seconds)
    const responseTime = Math.min(Math.max(content.length * 50, 1000), 3000);
    
    // Check if there's a direct response or matching canned response
    const directResponse = getDirectResponse(content);
    
    // Remove typing indicator and add real response after delay
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
            ? { 
                ...thread, 
                messages: thread.messages
                  .filter(msg => msg.id !== typingIndicatorId)
                  .concat(aiResponse)
              }
            : thread
        )
      );
    }, responseTime);
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
