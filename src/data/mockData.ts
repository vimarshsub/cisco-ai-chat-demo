import { ScenarioStep } from '@/types/multiStepScenario';

export interface Thread {
  id: string;
  name: string;
  date: string;
  messages: Message[];
  activeScenario?: {
    id: string;
    currentStepIndex: number;
  };
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  scenarioStep?: ScenarioStep;
}

// Mock data for the chat assistant
export const mockThreads: Thread[] = [
  {
    id: "thread-1",
    name: "How to configure security settings",
    date: "today",
    messages: [
      {
        id: "msg-1-1",
        content: "How do I configure security settings and firewall rules?",
        sender: "user",
        timestamp: "11:02 am"
      },
      {
        id: "msg-1-2",
        content: "To configure security settings and firewall rules, click Add rule to add rules to the Access policy. Rules added here use default security settings and are disabled by default.",
        sender: "ai",
        timestamp: "11:03 am"
      }
    ]
  },
  {
    id: "thread-2",
    name: "Setting up VLANs",
    date: "today",
    messages: [
      {
        id: "msg-2-1",
        content: "How do I set up and manage VLANs?",
        sender: "user",
        timestamp: "10:45 am"
      },
      {
        id: "msg-2-2",
        content: "To set up VLANs, navigate to the Network settings and select VLAN configuration. From there you can create new VLANs, assign IP ranges, and manage VLAN tagging for your network devices.",
        sender: "ai",
        timestamp: "10:46 am"
      }
    ]
  },
  {
    id: "thread-3",
    name: "Network device details",
    date: "today",
    messages: [
      {
        id: "msg-3-1",
        content: "Can you list network device details for my network?",
        sender: "user",
        timestamp: "09:30 am"
      },
      {
        id: "msg-3-2",
        content: "I can help you list network device details. To view all connected devices, go to the Devices section in your dashboard. There you'll find information about each device including IP address, MAC address, connection status, and traffic data.",
        sender: "ai",
        timestamp: "09:31 am"
      }
    ]
  },
  {
    id: "thread-4",
    name: "Network optimization suggestions",
    date: "today",
    messages: [
      {
        id: "msg-4-1",
        content: "Suggest network optimizations for my current setup",
        sender: "user",
        timestamp: "08:15 am"
      },
      {
        id: "msg-4-2",
        content: "Based on your current network configuration, I recommend the following optimizations: 1) Enable QoS for VoIP traffic 2) Upgrade firmware on your router 3) Separate guest networks from your main network 4) Implement traffic shaping for bandwidth-heavy applications",
        sender: "ai",
        timestamp: "08:17 am"
      }
    ]
  },
  {
    id: "thread-5",
    name: "Troubleshooting connection issues",
    date: "yesterday",
    messages: [
      {
        id: "msg-5-1",
        content: "I'm having connection issues with several devices",
        sender: "user",
        timestamp: "03:25 pm"
      },
      {
        id: "msg-5-2",
        content: "Let's troubleshoot your connection issues. First, check if all devices are affected or just specific ones. Next, verify your router status and internet connection. You may need to restart your networking equipment or check for service outages in your area.",
        sender: "ai",
        timestamp: "03:26 pm"
      }
    ]
  },
  {
    id: "thread-6",
    name: "Setting up guest WiFi",
    date: "yesterday",
    messages: [
      {
        id: "msg-6-1",
        content: "How do I set up a secure guest WiFi network?",
        sender: "user",
        timestamp: "01:15 pm"
      },
      {
        id: "msg-6-2",
        content: "To set up a secure guest WiFi network, go to WiFi settings in your dashboard, select 'Add new network', and choose 'Guest network' as the type. Enable client isolation for security, set a separate password, and consider enabling bandwidth limits for guest users.",
        sender: "ai",
        timestamp: "01:17 pm"
      }
    ]
  },
  {
    id: "thread-7",
    name: "Bandwidth monitoring tools",
    date: "yesterday",
    messages: [
      {
        id: "msg-7-1",
        content: "What tools can I use to monitor bandwidth usage?",
        sender: "user",
        timestamp: "11:20 am"
      },
      {
        id: "msg-7-2",
        content: "For bandwidth monitoring, you can use the built-in traffic analysis tools in your dashboard. Navigate to Analytics > Traffic to view real-time and historical bandwidth usage by device, application, and time period. You can also export reports for further analysis.",
        sender: "ai",
        timestamp: "11:22 am"
      }
    ]
  },
  {
    id: "thread-8",
    name: "IoT device security",
    date: "previous 7 days",
    messages: [
      {
        id: "msg-8-1",
        content: "How can I secure IoT devices on my network?",
        sender: "user",
        timestamp: "Tuesday 09:45 am"
      },
      {
        id: "msg-8-2",
        content: "To secure IoT devices on your network, I recommend: 1) Creating a separate VLAN specifically for IoT devices 2) Implementing strict firewall rules to limit IoT device communications 3) Keeping firmware updated on all devices 4) Using strong, unique passwords for each device 5) Disabling UPnP on your router",
        sender: "ai",
        timestamp: "Tuesday 09:47 am"
      }
    ]
  }
];

export const suggestionPrompts = [
  "How do I set up and manage VLANs?",
  "How do I configure security settings and firewall rules?",
  "List network device details",
  "Suggest network optimizations"
];
