
import { v4 as uuidv4 } from 'uuid';
import { MultiStepScenario } from '../types/multiStepScenario';

export const onboardingScenario: MultiStepScenario = {
  id: 'switch-onboarding',
  name: 'Switch Onboarding',
  triggerPhrases: ['i need to onboard this 9350 at the san jose site'],
  steps: [
    {
      id: `step-${uuidv4()}`,
      content: 'Which device would you like to replace?',
      responseType: 'table',
      responseData: {
        headers: ['Model', 'Name', 'Ports', 'Serial Number'],
        rows: [
          ['MS120-24', 'Closet Flr 3', '24', 'Q2CW-4M29-BD2D'],
          ['MS210-48FP', 'IT Hardware', '48', 'Q2EW-9HB5-5WAS'],
          ['MS250-24P', 'Closet Flr 2', '24', 'Q4CG-B4XU-QD8K'],
          ['MS255-48X', 'Clost Flr 1', '48', 'Q5JC-LN8L-88EH']
        ]
      },
      waitForUserInput: true,
      expectedUserInput: ['closet flr 3', 'it hardware', 'closet flr 2', 'clost flr 1']
    },
    {
      id: `step-${uuidv4()}`,
      content: "Okay. I'll apply the configuration from Closet Flr 3 (MS120-24) to the new switch MS350-24X (Serial: Q2HP-2EG9-W2CH).\n\nBefore I start, I'll pull up the configuration for you to review.",
      responseType: 'text',
      delay: 1500
    },
    {
      id: `step-${uuidv4()}`,
      content: "Here is the configuration I found from Closet Flr 3 switch:",
      responseType: 'code',
      responseData: {
        code: "VLANs: VLAN 20 (Data), VLAN 30 (Voice)\nPoE Enabled: Ports 1–12\nTagged Ports: Ports 13–24\nUplink Port: Port 24\nSwitch Management IP: 192.168.1.10\nPort Tags: \"Office\", \"Reception\""
      },
      delay: 2000
    },
    {
      id: `step-${uuidv4()}`,
      content: "Alright, here's how the process will work:\n\n1. I'll assign the new switch MS350-24X to the network.\n2. I'll apply the configuration settings from Closet Flr 3 (VLANs, tags, PoE, etc.) to the new switch.\n3. Once the configuration is applied, I'll run diagnostics to ensure the new switch is fully operational.",
      responseType: 'text',
      delay: 2000
    },
    {
      id: `step-${uuidv4()}`,
      content: "Planning in progress...",
      responseType: 'planning',
      delay: 3000
    },
    {
      id: `step-${uuidv4()}`,
      content: "This will take a few moments to complete.",
      responseType: 'loading',
      delay: 3000
    },
    {
      id: `step-${uuidv4()}`,
      content: "The new switch MS350-24X has been successfully configured with the settings from Closet Flr 3.\n\n- All VLANs, port tags, and PoE settings have been applied.\n- The uplink port (Port 24) is configured and ready for network traffic.\n\nYou can verify that the new switch is online and correctly configured at Switching > Switches.\n\nI'll run a quick diagnostic check to ensure everything is working correctly.",
      responseType: 'text',
      delay: 2000
    },
    {
      id: `step-${uuidv4()}`,
      content: "The new switch MS350-24X is fully operational and integrated into the network.\n\nThis action has been logged under the reference 'Switch Refresh – Closet Flr 3' for your records.\n\nI'll monitor the behavior of this switch for the next 24 hours and alert you if any issues arise.\n\nIs there anything else I can help you with?",
      responseType: 'text',
      delay: 2000
    }
  ]
};

export const scenarios: MultiStepScenario[] = [onboardingScenario];
