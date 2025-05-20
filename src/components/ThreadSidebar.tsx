
import React from 'react';
import { ChevronRight, PlusCircle } from 'lucide-react';
import { Thread } from '../data/mockData';
import { Button } from '@/components/ui/button';

interface ThreadSidebarProps {
  threads: Thread[];
  activeThreadId: string | null;
  onThreadSelect: (threadId: string) => void;
  onNewThread: () => void;
}

const ThreadSidebar = ({ threads, activeThreadId, onThreadSelect, onNewThread }: ThreadSidebarProps) => {
  // Group threads by date
  const groupedThreads: Record<string, Thread[]> = {};
  
  threads.forEach((thread) => {
    if (!groupedThreads[thread.date]) {
      groupedThreads[thread.date] = [];
    }
    groupedThreads[thread.date].push(thread);
  });
  
  return (
    <aside className="w-60 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-2">
        <Button 
          onClick={onNewThread}
          className="w-full flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 mb-4"
        >
          <PlusCircle size={16} />
          <span>New thread</span>
        </Button>
        
        {Object.entries(groupedThreads).map(([date, dateThreads]) => (
          <div key={date} className="mb-4">
            <h3 className="px-2 py-1 text-sm font-medium text-gray-500 capitalize">{date}</h3>
            <ul className="space-y-1">
              {dateThreads.map((thread) => (
                <li 
                  key={thread.id}
                  className={`px-2 py-2 rounded-md cursor-pointer ${
                    activeThreadId === thread.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => onThreadSelect(thread.id)}
                >
                  <div className="text-sm truncate">{thread.name}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default ThreadSidebar;
