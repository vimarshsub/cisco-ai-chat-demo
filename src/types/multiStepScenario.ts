
import { ReactNode } from 'react';

export type ResponseType = 'text' | 'code' | 'table' | 'planning' | 'loading';

export interface TableResponseData {
  headers: string[];
  rows: string[][];
}

export interface CodeResponseData {
  code: string;
}

export interface ScenarioStep {
  id: string;
  content: string;
  responseType: ResponseType;
  responseData?: TableResponseData | CodeResponseData;
  delay?: number;
  waitForUserInput?: boolean;
  expectedUserInput?: string[];
}

export interface MultiStepScenario {
  id: string;
  name: string;
  triggerPhrases: string[];
  steps: ScenarioStep[];
}
