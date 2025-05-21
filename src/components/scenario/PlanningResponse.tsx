
import React from 'react';

const PlanningResponse: React.FC = () => {
  return (
    <div className="my-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
      <div className="flex items-center">
        <div className="mr-3">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <div>
          <p className="text-blue-700 font-medium">Planning in progress...</p>
          <p className="text-blue-600 text-sm">Analyzing configuration and creating implementation steps</p>
        </div>
      </div>
    </div>
  );
};

export default PlanningResponse;
