
import React from 'react';
import { Search, User, Bell, HelpCircle, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-3 bg-gradient-to-r from-[#373C42] to-[#0F1114] text-white h-14">
      <div className="flex items-center gap-1">
        <div className="pl-1.5">
          <span className="text-lg font-semibold">AI Assistant</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative rounded-lg bg-[#373C42] flex items-center p-1.5 gap-2 w-60">
          <Search className="h-5 w-5" />
          <span className="text-sm font-semibold">Search</span>
        </div>
        
        <div className="flex items-center justify-center p-1.5 bg-[#464C54] rounded-lg">
          <div className="relative w-6 h-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0051AF] via-[#0087EA] to-[#00BCEB]"></div>
            <div className="absolute top-[10%] right-[10%] w-1/2 h-1/2 rounded-tl-full bg-gradient-to-br from-[#0087EA] to-[#63FFF7]"></div>
          </div>
        </div>
        
        <div className="p-1.5">
          <HelpCircle className="h-6 w-6" />
        </div>
        
        <div className="p-1.5">
          <Bell className="h-6 w-6" />
        </div>
        
        <div className="h-6 border-l border-white/50 mx-1"></div>
        
        <div className="flex items-center gap-1">
          <div className="p-1.5">
            <User className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Nik</span>
            <span className="text-sm">Business Corp, Inc</span>
          </div>
        </div>
        
        <Menu className="h-6 w-6 ml-2" />
      </div>
    </header>
  );
};

export default Header;
