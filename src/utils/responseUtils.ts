
import cannedData from '@/data/cannedData.json';

// Get direct response for specific questions
export const getDirectResponse = (content: string): string | null => {
  const normalizedInput = content.toLowerCase().trim();
  
  // Check for VLAN related queries
  if (normalizedInput === "how do i set up and manage vlans?" || 
      normalizedInput.includes("set up vlan") || 
      normalizedInput.includes("manage vlan") ||
      normalizedInput.includes("vlan configuration")) {
    
    // Find the VLAN Configuration response
    const vlanResponse = cannedData.assistantResponses.find(resp => 
      resp.title === "VLAN Configuration"
    );
    
    if (vlanResponse) {
      return vlanResponse.content;
    }
  }

  // Then try to find a canned response from the database
  return findMatchingCannedResponse(content);
};

// Find matching canned response from database
export const findMatchingCannedResponse = (content: string): string | null => {
  // Convert input to lowercase for case-insensitive comparison
  const normalizedInput = content.toLowerCase().trim();
  
  // Simple direct matching for exact questions (case insensitive)
  for (const questionObj of cannedData.commonQuestions) {
    const normalizedQuestion = questionObj.question.toLowerCase().trim();
    
    if (normalizedInput === normalizedQuestion) {        
      // Once we found a matching question, search through all responses
      // to find one with a title containing any of the tags
      for (const tag of questionObj.tags) {
        for (const response of cannedData.assistantResponses) {
          const responseTitle = response.title.toLowerCase();
          
          if (responseTitle.includes(tag.toLowerCase())) {
            return response.content;
          }
        }
      }
    }
  }
  
  return null;
};
