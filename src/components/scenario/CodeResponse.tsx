
import React from 'react';
import { CodeResponseData } from '@/types/multiStepScenario';

interface CodeResponseProps {
  data: CodeResponseData;
}

const CodeResponse: React.FC<CodeResponseProps> = ({ data }) => {
  return (
    <div className="my-4 p-4 bg-gray-900 text-gray-100 rounded-md font-mono text-sm whitespace-pre-wrap overflow-x-auto">
      {data.code}
    </div>
  );
};

export default CodeResponse;
