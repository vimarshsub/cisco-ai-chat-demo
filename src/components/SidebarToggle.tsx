
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarToggleProps {
  sidebarCollapsed: boolean;
  onToggle: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ sidebarCollapsed, onToggle }) => {
  return (
    <button 
      className="absolute left-60 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md"
      onClick={onToggle}
    >
      <div className="w-4 h-4 flex items-center justify-center">
        {sidebarCollapsed ? (
          <ChevronRight className="w-3 h-3 text-gray-500" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-gray-500" />
        )}
      </div>
    </button>
  );
};

export default SidebarToggle;
