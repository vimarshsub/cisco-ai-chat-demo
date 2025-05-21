
import React from 'react';
import { ScenarioStep as ScenarioStepType } from '@/types/multiStepScenario';
import TableResponse from './TableResponse';
import CodeResponse from './CodeResponse';
import PlanningResponse from './PlanningResponse';
import LoadingResponse from './LoadingResponse';

interface ScenarioStepProps {
  step: ScenarioStepType;
}

const ScenarioStep: React.FC<ScenarioStepProps> = ({ step }) => {
  const renderResponseContent = () => {
    switch (step.responseType) {
      case 'table':
        return step.responseData && 'headers' in step.responseData ? 
          <TableResponse data={step.responseData} /> : null;
      case 'code':
        return step.responseData && 'code' in step.responseData ? 
          <CodeResponse data={step.responseData} /> : null;
      case 'planning':
        return <PlanningResponse />;
      case 'loading':
        return <LoadingResponse />;
      case 'text':
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <div className="whitespace-pre-wrap">{step.content}</div>
      {renderResponseContent()}
    </div>
  );
};

export default ScenarioStep;
