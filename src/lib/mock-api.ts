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
    section: "Professional Summary",
    suggestion:
      "Add more quantifiable achievements and specific areas of expertise to your summary to immediately demonstrate your value.",
  },
  {
    section: "Experience",
    suggestion:
      "Include metrics and specific outcomes for each role to showcase your impact. For example, mention percentage improvements, monetary values, or number of stakeholders involved.",
  },
  {
    section: "Skills",
    suggestion:
      "Organize your skills into categories (technical, soft skills, domain expertise) and prioritize those most relevant to your target positions.",
  },
  {
    section: "Education",
    suggestion:
      "Include relevant coursework, research projects, or thesis topics that align with your career goals and demonstrate specialized knowledge.",
  },
  {
    section: "Project Highlights",
    suggestion:
      "Add a dedicated section for 2-3 signature projects with detailed outcomes and your specific contributions to each.",
  },
  {
    section: "TOR Alignment",
    suggestion:
      "Ensure your CV directly addresses the key requirements mentioned in the Terms of Reference, particularly highlighting your experience with climate finance and policy frameworks.",
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

  // Create different suggestions based on the models selected and input content
  let combinedSuggestions = [...mockOptimizations];

  // Check if the CV contains TOR or additional competencies sections
  const hasTOR = cvText.includes("TOR Requirements");
  const hasAdditionalCompetencies = cvText.includes("Additional Competencies");

  // Add TOR-specific suggestions if TOR content is present
  if (hasTOR) {
    combinedSuggestions.push({
      original: "Conducted market analysis and competitive benchmarking",
      suggested:
        "Conducted comprehensive market analysis and competitive benchmarking aligned with the Terms of Reference requirements",
      reason: "Aligns experience with specific TOR requirements",
    });
  }

  // Add competency-specific suggestions
  if (hasAdditionalCompetencies) {
    combinedSuggestions.push({
      original: "Participated in code reviews and mentored 2 junior developers",
      suggested:
        "Demonstrated leadership and knowledge transfer capabilities by conducting regular code reviews and mentoring 2 junior developers",
      reason:
        "Highlights leadership competencies mentioned in additional information",
    });
  }

  // Add model-specific suggestions if multiple models are selected
  if (modelIdsArray.length > 1) {
    // Add some model-specific suggestions
    modelIdsArray.forEach((modelId, index) => {
      if (index > 0) {
        // Skip first model as we already have its suggestions
        const modelSpecificSuggestion = {
          section: `${modelId.charAt(0).toUpperCase() + modelId.slice(1)} Analysis`,
          suggestion: `Based on ${modelId} analysis: Consider restructuring your experience section to highlight leadership roles and strategic initiatives more prominently.`,
        };
        combinedSuggestions.push(modelSpecificSuggestion);
      }
    });
  }

  // Create a professional CV based on the input
  let improvedText;

  if (
    cvText.includes("Additional Competencies") &&
    cvText.includes("Valerie")
  ) {
    // If we have Valerie's competencies, create a specialized CV
    // Create two versions - a concise resume and a detailed CV
    const conciseResume = `# TELOJO 'VALERIE' ONU
Financial Innovator & Climate Finance Expert

## PROFESSIONAL SUMMARY
Distinguished economist and financial innovator with over twenty years of expertise in Structured Finance & Deeptech. Specializes in the intersection of Climate, International Trade, Policy & eGovernance. Proven track record of delivering transformative projects with multilateral institutions including the World Bank, EU, GIZ, CDB, and the German Savings Banks Foundation.

## PROFESSIONAL EXPERIENCE
Managing Director | Quintessence Consulting Inc. | Current
- Led technical assistance to the UKFCDO as the Caribbean Regional Climate Finance Expert
- Developed blockchain-based hedge fund and AI-driven risk management tools
- Strengthened St. Kitts and Nevis Green Climate Fund National Designated Authority's capacity to access climate finance
- Created innovative blue and green business models for various bankable project use cases

Founder | Valerie Capital | Current
- Established innovative financial firm focused on sustainable finance solutions
- Pioneered integration of blockchain technology and AI for climate finance applications
- Developed strategic partnerships with key stakeholders across Caribbean and African markets

## EDUCATION
Executive Master's in eGovernance | Ecolé Politechnique de Lausanne (EPFL), Switzerland
PGCert in Climate Adaptation Finance | Frankfurt School of Management and Finance
PGCert in International Trade Policy | University of West Indies (UWI)

## SKILLS & CERTIFICATIONS
- Chartered Alternative Investment Analyst (CAIA) 2020 Scholar
- Financial Modeling & Analysis
- Blockchain & AI Applications
- Climate Finance & Policy
- Stakeholder Engagement & Governance
- Project Management & Implementation`;

    const detailedCV = `# TELOJO 'VALERIE' ONU
Financial Innovator & Climate Finance Expert

## PROFESSIONAL SUMMARY
Distinguished economist and financial innovator with over twenty years of expertise in Structured Finance & Deeptech. Specializes in the intersection of Climate, International Trade, Policy & eGovernance. Proven track record of delivering transformative projects with multilateral institutions including the World Bank, EU, GIZ, CDB, and the German Savings Banks Foundation. Extensive experience in leveraging blockchain and AI for sustainable finance solutions, with a focus on vulnerable regions like Small Island Developing States (SIDS) across the Caribbean and emerging markets in Africa.

## PROFESSIONAL EXPERIENCE

### Managing Director | Quintessence Consulting Inc. | 2012-Present
- Led technical assistance to the UKFCDO as the Caribbean Regional Climate Finance Expert and Climate Resilient Governance and Multistakeholder Lead
- Developed blockchain-based hedge fund and AI-driven risk management tools for sustainable finance applications
- Strengthened St. Kitts and Nevis Green Climate Fund National Designated Authority's capacity to access climate finance
- Created innovative blue and green business models for various bankable project use cases
- Shaped the Caribbean Renewable Energy Pipeline (CREP) Regional Landscape Assessment and supported the UKFCDO with strategic design for the UK-Caribbean Resilient Infrastructure Platform (UKCRIP)
- Identified key entry points for UK Expertise and Investments into Renewable Energy for the new £200M climate-adaptive infrastructure facility for the Caribbean
- Designed and architected the St. Kitts and Nevis Climate Risk Intelligence, Digital-Infrastructure & Ecosystem (SKN-CRIDE) under a Green Climate Fund Readiness Programme
- Established a storm-surge model, climate risk atlas, and underlying hydrometrology digital infrastructure
- Developed the National Hydrometerology and Climatology Policy and Governance Framework to enable climate services and support early-warning systems
- Created the Regional Needs-Based Climate Finance Strategy for the OECS focused on the Blue and Green Economy, endorsed as the OECS Climate Finance Access and Mobilization Strategy 2023–2030

### Founder | Valerie Capital | 2018-Present
- Established innovative financial firm focused on sustainable finance solutions
- Pioneered integration of blockchain technology and AI for climate finance applications
- Designed and launched the first Balanced Multiclass Hedge fund leveraging blockchain technology for a private investment banking group based in Canada
- Developed a downside risk protection & leveraged financing instrument for Fund and Portfolio managers applied to sustainable finance
- Created climate action pooled funds for a US-based Hedge fund group
- Currently structuring a ±$210M innovative blended finance facility (Green Berth Blended Performance Bond) for the Inclusive GreenPort Resilience & De-Carbonization Initiative (InGReD)
- Developing a Women in Climate AgFintech Facility to broaden financial access through revenue-based financing mechanisms for Climate Adaptation

### Regional Climate Disaster Risk Finance and Insurance (CDRFI) Specialist | Caribbean Policy Development Centre (CPDC) | 2023-Present
- Led regional community and technical training workshops in partnership with Munich Climate Insurance Initiative (MCII)
- Raised awareness on Parametric Insurance design, Carbon Finance for Agriculture and Fisherfolk communities
- Provided training on various forms of Climate Finance across Antigua and Barbuda, Barbados, Dominica, Grenada and Jamaica

### Structured Finance and Resource Mobilization Expert | Various Projects | 2012-Present
- Co-authored comprehensive analysis and strategic framework for enhancing sustainable food production and trade opportunities in St. Kitts and Nevis (2012)
- Proposed establishment of demonstration farm and training center for technical and vocational education in aquaculture
- Identified domestic, regional, and international market opportunities for farmed fish, particularly Cobia and Tilapia
- Developed a Mariculture Business Plan for Farming Cobia in the Region
- Advocated for revolving fund and revenue-based loan schemes to support mariculture and aquaculture entrepreneurs
- Worked with the GEF Small Grants Programme on a Protected Area Project in the Tobago Cays, St. Vincent & the Grenadines
- Mobilized over $240M in financing in both private and public sectors
- Brokered SBFIC-Eastern Caribbean Central Bank (ECCB) collaboration which unlocked <€2M from the German Government for SME Financing in the Eastern Caribbean Currency Union (ECCU)

## EDUCATION
- Executive Master's in eGovernance | Ecolé Politechnique de Lausanne (EPFL), Switzerland
- Postgraduate Certificate in Climate Adaptation Finance | Frankfurt School of Management and Finance
- Postgraduate Certificate in International Trade Policy | University of West Indies (UWI)

## SKILLS & CERTIFICATIONS
- Chartered Alternative Investment Analyst (CAIA) 2020 Scholar
- Financial Modeling & Analysis (Advanced)
- Blockchain & AI Applications for Sustainable Finance
- Climate Finance & Policy Development
- Stakeholder Engagement & Governance
- Project Management & Implementation
- Blended Finance Structuring
- Carbon Finance and Parametric Insurance Design
- Digital Infrastructure for Climate Resilience
- Blue and Green Economy Business Modeling

## NOTABLE PROJECTS

### UK-Caribbean Resilient Infrastructure Platform (UKCRIP)
- Provided strategic design for a £200M climate-adaptive infrastructure facility
- Identified investment opportunities for resilient infrastructure aligned with Caribbean needs

### St. Kitts and Nevis Climate Risk Intelligence System
- Designed digital infrastructure for climate risk management
- Established storm-surge modeling and climate risk atlas
- Developed governance framework for climate services

### Green Berth Blended Performance Bond (GBBPB)
- Currently structuring a ±$210M blended finance facility
- Integrating renewable energy, desalinated water, and port electrification
- Designing nature-based solutions to boost resilience in SIDS

### Women in Climate AgFintech Facility
- Developing revenue-based financing mechanisms for Climate Adaptation
- Implementing point-to-point soil testing for nutrients
- Creating baseline assessment for Carbon Sequestration for Root Crop Farmers using digital technology
- Collaborating with Hydrofluidics, a Saint Lucian based DeepTech Venture Nanotechnology firm`;

    // Use the detailed CV as the primary output
    improvedText = detailedCV;
  } else {
    // Otherwise use a generic improved CV
    improvedText = generateImprovedCV(cvText || sampleCV, combinedSuggestions);
  }

  return {
    originalText: cvText || sampleCV,
    suggestions: combinedSuggestions,
    improvedText: improvedText,
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
