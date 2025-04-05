/**
 * Mock API functions for when API keys are not available
 * This allows the application to function in standalone mode
 */

import { hasAnyApiKeys } from "./api-keys";

// Sample CV content for mock responses
const sampleCV = `
John Smith
jsmith@email.com | (555) 123-4567 | linkedin.com/in/johnsmith

PROFESSIONAL SUMMARY
Experienced management consultant with 5 years of experience in strategy development and implementation. Strong analytical skills with expertise in data-driven decision making and process optimization.

EXPERIENCE
Senior Consultant | ABC Consulting
Jan 2020 - Present
- Led a team of 4 consultants on a cost reduction project for a Fortune 500 client, resulting in $2.5M annual savings
- Developed and implemented a new supply chain strategy for a manufacturing client, improving efficiency by 15%
- Conducted market analysis and competitive benchmarking for 3 major clients in the technology sector

Consultant | XYZ Advisory
Jun 2017 - Dec 2019
- Supported the development of a 5-year strategic plan for a healthcare provider
- Analyzed financial data and created forecasting models for clients across various industries
- Prepared and delivered client presentations and implementation roadmaps

EDUCATION
MBA, Business Administration | Harvard Business School
2015 - 2017

B.S., Economics | University of Pennsylvania
2011 - 2015

SKILLS
- Strategic Planning
- Financial Analysis
- Project Management
- Data Visualization
- Market Research
- Client Relationship Management
`;

// Mock optimization suggestions
const mockOptimizations = [
  {
    original:
      "Experienced management consultant with 5 years of experience in strategy development and implementation.",
    suggested:
      "Results-driven management consultant with 5+ years spearheading strategic initiatives that delivered measurable business impact across Fortune 500 clients.",
    reason: "More impactful and results-focused opening statement",
  },
  {
    original:
      "Led a team of 4 consultants on a cost reduction project for a Fortune 500 client, resulting in $2.5M annual savings",
    suggested:
      "Orchestrated a cross-functional cost optimization initiative for a Fortune 500 technology firm, delivering $2.5M in annual savings through strategic vendor consolidation and process reengineering",
    reason: "Adds specific methodology and more detailed impact",
  },
  {
    original:
      "Developed and implemented a new supply chain strategy for a manufacturing client, improving efficiency by 15%",
    suggested:
      "Architected and executed an end-to-end supply chain transformation for a $300M manufacturing client, yielding 15% efficiency gains and reducing lead times by 22%",
    reason: "Includes company size and additional metrics",
  },
  {
    original:
      "Analyzed financial data and created forecasting models for clients across various industries",
    suggested:
      "Developed sophisticated financial models and predictive analytics frameworks that guided $50M+ investment decisions across healthcare, technology, and financial services sectors",
    reason: "Specifies industries and quantifies the impact",
  },
];

/**
 * Mock function to analyze a CV
 * @param cvText The CV text to analyze
 * @param modelIds The AI models to use (single string or array of strings)
 */
export const analyzeCV = async (
  cvText: string,
  modelIds: string | string[],
): Promise<any> => {
  // Convert single modelId to array for consistent handling
  const modelIdsArray = Array.isArray(modelIds) ? modelIds : [modelIds];

  // If we have API keys configured, we would call the real API here
  if (hasAnyApiKeys()) {
    // This would be replaced with actual API calls
    console.log(`Would call ${modelIdsArray.join(", ")} APIs with the CV text`);
    // Return mock data for now until real implementation
  }

  // For mock mode, simulate a delay to mimic API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Create different suggestions based on the models selected
  let combinedSuggestions = [...mockOptimizations];

  // Add model-specific suggestions if multiple models are selected
  if (modelIdsArray.length > 1) {
    // Add some model-specific suggestions
    modelIdsArray.forEach((modelId, index) => {
      if (index > 0) {
        // Skip first model as we already have its suggestions
        const modelSpecificSuggestion = {
          original:
            "Conducted market analysis and competitive benchmarking for 3 major clients in the technology sector",
          suggested: `${modelId} enhancement: Led comprehensive market analysis and competitive intelligence initiatives for 3 enterprise clients, resulting in strategic repositioning that increased market share by 12%`,
          reason: `${modelId} specializes in quantifying business impact`,
        };
        combinedSuggestions.push(modelSpecificSuggestion);
      }
    });
  }

  return {
    originalText: cvText || sampleCV,
    suggestions: combinedSuggestions,
    improvedText: generateImprovedCV(cvText || sampleCV, combinedSuggestions),
    modelsUsed: modelIdsArray,
  };
};

/**
 * Generate an improved CV by applying the suggestions
 */
const generateImprovedCV = (
  originalText: string,
  optimizations: any[],
): string => {
  let improvedText = originalText;

  // Apply each optimization
  optimizations.forEach((opt) => {
    improvedText = improvedText.replace(opt.original, opt.suggested);
  });

  return improvedText;
};

/**
 * Mock function to generate a PDF of the CV
 */
export const generatePDF = async (
  cvText: string,
  template: string,
): Promise<Blob> => {
  // This would be replaced with actual PDF generation
  console.log(`Would generate PDF with template: ${template}`);

  // For mock mode, simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return a mock PDF blob (this is just a placeholder)
  return new Blob([cvText], { type: "application/pdf" });
};

/**
 * Mock function to generate a DOCX of the CV
 */
export const generateDOCX = async (
  cvText: string,
  template: string,
): Promise<Blob> => {
  // This would be replaced with actual DOCX generation
  console.log(`Would generate DOCX with template: ${template}`);

  // For mock mode, simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return a mock DOCX blob (this is just a placeholder)
  return new Blob([cvText], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
};
