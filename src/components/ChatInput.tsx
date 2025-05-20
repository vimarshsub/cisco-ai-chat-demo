
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isActiveThread: boolean;
}

const ChatInput = ({ onSendMessage, isActiveThread }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex w-full items-center border-2 border-gray-300 rounded-lg overflow-hidden">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask the AI Assistant a question"
            className="flex-1 p-3 outline-none text-gray-700"
            disabled={!isActiveThread}
          />
          <button
            type="submit"
            disabled={!message.trim() || !isActiveThread}
            className={`p-3 ${
              message.trim() && isActiveThread
                ? 'text-blue-500 hover:bg-blue-50'
                : 'text-gray-300'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-center text-gray-500">
          Assistant can make mistakes. Verify responses.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
