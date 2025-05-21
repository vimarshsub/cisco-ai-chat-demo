
import React from 'react';

const LoadingResponse: React.FC = () => {
  return (
    <div className="my-4 flex items-center space-x-2">
      <div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-pulse delay-150"></div>
      <div className="w-4 h-4 rounded-full bg-blue-600 animate-pulse delay-300"></div>
      <span className="text-gray-600 ml-2">Processing...</span>
    </div>
  );
};

export default LoadingResponse;
