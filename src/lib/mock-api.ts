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
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if the CV contains TOR or additional competencies sections
  const hasTOR =
    cvText.includes("TOR Requirements") ||
    cvText.includes("Terms of Reference");
  const hasAdditionalCompetencies = cvText.includes("Additional Competencies");

  // Extract TOR content if available
  let torContent = "";
  if (hasTOR) {
    const torMatch = cvText.match(/## TOR Requirements\s*([\s\S]*?)(?=##|$)/);
    if (torMatch && torMatch[1]) {
      torContent = torMatch[1].trim();
      console.log("Found TOR content:", torContent.substring(0, 100) + "...");
    }
  }

  // Extract additional competencies if present
  let additionalCompetencies = "";
  if (hasAdditionalCompetencies) {
    const compMatch = cvText.match(
      /## Additional Competencies\s*([\s\S]*?)(?=##|$)/,
    );
    if (compMatch && compMatch[1]) {
      additionalCompetencies = compMatch[1].trim();
      console.log(
        "Found Additional Competencies:",
        additionalCompetencies.substring(0, 100) + "...",
      );
    }
  }

  // Check if CV contains Valerie's information
  const isValerieCV =
    cvText.includes("TELOJO") ||
    cvText.includes("Valerie") ||
    additionalCompetencies.includes("TELOJO") ||
    additionalCompetencies.includes("Valerie");

  // Generate suggestions based on the actual CV content and TOR if available
  const suggestions = generateSuggestionsFromCV(
    cvText,
    hasTOR ? torContent : undefined,
    isValerieCV,
  );

  // Add competency-specific suggestions
  if (hasAdditionalCompetencies) {
    suggestions.push({
      section: "Additional Competencies",
      suggestion:
        "Highlight the additional competencies you've provided throughout your CV, especially in your professional summary and experience sections.",
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
        suggestions.push(modelSpecificSuggestion);
      }
    });
  }

  // Use the actual CV content as the improved text
  // This ensures we're working with the real uploaded content
  let improvedText = cvText;

  // If it's Valerie's CV, provide a more tailored response
  if (isValerieCV) {
    improvedText = `# TELOJO 'VALERIE' ONU
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

### Founder | Valerie Capital | 2018-Present
- Established innovative financial firm focused on sustainable finance solutions
- Pioneered integration of blockchain technology and AI for climate finance applications
- Designed and launched the first Balanced Multiclass Hedge fund leveraging blockchain technology for a private investment banking group based in Canada
- Developed a downside risk protection & leveraged financing instrument for Fund and Portfolio managers applied to sustainable finance
- Created climate action pooled funds for a US-based Hedge fund group

### Regional Climate Disaster Risk Finance and Insurance (CDRFI) Specialist | Caribbean Policy Development Centre (CPDC) | 2023-Present
- Led regional community and technical training workshops in partnership with Munich Climate Insurance Initiative (MCII)
- Raised awareness on Parametric Insurance design, Carbon Finance for Agriculture and Fisherfolk communities
- Provided training on various forms of Climate Finance across Antigua and Barbuda, Barbados, Dominica, Grenada and Jamaica

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
- Developed governance framework for climate services`;
  }

  return {
    originalText: cvText,
    suggestions: suggestions,
    improvedText: improvedText,
    modelsUsed: modelIdsArray,
  };
};

/**
 * Generate suggestions based on the CV content
 */
const generateSuggestionsFromCV = (
  cvText: string,
  torContent?: string,
  isValerieCV: boolean = false,
): any[] => {
  // Base suggestions with detailed content and TOR alignment
  let suggestions = [];

  if (isValerieCV) {
    // Valerie-specific suggestions
    suggestions = [
      {
        section: "Professional Summary",
        suggestion:
          "Highlight your expertise in climate finance and structured finance more prominently. Consider adding a brief statement about your impact in terms of total funding secured or number of projects successfully implemented.",
        suggestedCopy:
          "Distinguished economist and financial innovator with over 20 years of expertise in Structured Finance & Deeptech, specializing in Climate Finance, International Trade, Policy & eGovernance. Mobilized over $240M in financing across public and private sectors, with proven success delivering transformative projects with multilateral institutions including the World Bank, EU, GIZ, and CDB.",
        torAlignment: torContent
          ? "The TOR emphasizes the need for expertise in climate finance and policy frameworks. Your summary should highlight your extensive experience with multilateral institutions and your track record in sustainable development initiatives."
          : "Consider highlighting your expertise in climate finance and policy frameworks more prominently.",
      },
      {
        section: "Experience",
        suggestion:
          "For each role, quantify your achievements with specific metrics where possible. For example, mention the exact amount of funding secured, percentage improvements in project outcomes, or number of stakeholders engaged.",
        suggestedCopy:
          "Managing Director | Quintessence Consulting Inc. | 2012-Present\n- Led technical assistance to the UKFCDO as the Caribbean Regional Climate Finance Expert, resulting in the development of climate-resilient infrastructure projects worth £200M\n- Strengthened St. Kitts and Nevis Green Climate Fund National Designated Authority's capacity, enabling access to $15M+ in climate finance\n- Developed innovative blue and green business models that attracted $35M in sustainable investments across 5 Caribbean nations",
        torAlignment: torContent
          ? "The TOR requires demonstrated expertise in climate finance and policy development. Your experience section should emphasize your leadership in securing funding and implementing sustainable development initiatives."
          : "Focus on demonstrating your expertise in climate finance and policy development through specific achievements.",
      },
      {
        section: "Skills",
        suggestion:
          "Organize your skills into categories (technical, domain expertise, soft skills) and prioritize those most relevant to climate finance and sustainable development.",
        suggestedCopy:
          "Climate Finance Expertise:\n- Blended Finance Structuring, Carbon Finance, Parametric Insurance Design\n- Climate Adaptation Finance, Green Bonds, Results-based Climate Finance\n\nPolicy & Governance:\n- Climate Policy Development, Stakeholder Engagement, Governance Frameworks\n- Digital Infrastructure for Climate Resilience, Regulatory Compliance\n\nFinancial Innovation:\n- Financial Modeling & Analysis (Advanced), Blockchain Applications for Sustainable Finance\n- Innovative Business Modeling, Risk Assessment & Management",
        torAlignment: torContent
          ? "The TOR specifically mentions requirements for expertise in climate finance and policy frameworks. Your skills section should clearly demonstrate your capabilities in these areas."
          : "Highlight your expertise in climate finance and policy frameworks through organized skill categories.",
      },
      {
        section: "Project Highlights",
        suggestion:
          "Add a dedicated section for 2-3 signature projects with detailed outcomes and your specific contributions to each.",
        suggestedCopy:
          "## NOTABLE PROJECTS\n\n### UK-Caribbean Resilient Infrastructure Platform (UKCRIP)\n- Led strategic design for a £200M climate-adaptive infrastructure facility\n- Developed innovative financing mechanisms that leveraged private investment at a 3:1 ratio\n- Created governance framework ensuring transparent fund allocation and measurable climate resilience outcomes\n\n### Green Berth Blended Performance Bond (GBBPB)\n- Structured a $210M blended finance facility integrating renewable energy and port electrification\n- Designed performance metrics that reduced investor risk while ensuring climate adaptation outcomes\n- Implemented nature-based solutions boosting resilience in SIDS while generating carbon credits",
        torAlignment: torContent
          ? "The TOR requires a proven track record in project implementation. This section provides concrete examples of your ability to design and execute complex climate finance initiatives."
          : "Showcase your proven track record in project implementation through detailed project highlights.",
      },
    ];

    // Add TOR-specific suggestions if TOR content is available
    if (torContent) {
      suggestions.push({
        section: "TOR-Specific Achievements",
        suggestion:
          "Create a section that directly addresses the specific requirements mentioned in the TOR document.",
        suggestedCopy:
          "## TOR-SPECIFIC ACHIEVEMENTS\n\n### Climate Finance Expertise\n- Mobilized over $240M in climate finance across 8 Caribbean nations\n- Designed and implemented innovative blended finance mechanisms for climate adaptation projects\n- Developed climate risk assessment frameworks adopted by 3 government agencies\n\n### Policy Development\n- Authored the National Hydrometerology and Climatology Policy for St. Kitts and Nevis\n- Contributed to the OECS Climate Finance Access and Mobilization Strategy 2023–2030\n- Designed governance frameworks for climate resilience initiatives in multiple SIDS",
        torAlignment:
          "This section directly addresses the core requirements outlined in the TOR, demonstrating your specific qualifications and experience relevant to the position.",
      });
    }
  } else {
    // Generic professional suggestions
    suggestions = [
      {
        section: "Professional Summary",
        suggestion:
          "Add quantifiable achievements to highlight your impact. Include specific metrics that demonstrate your expertise and the value you've brought to previous roles.",
        suggestedCopy: cvText.includes("Software Engineer")
          ? "Senior Software Engineer with 4+ years of expertise in full-stack development, specializing in React, TypeScript, and Node.js. Delivered responsive, high-performance web applications that improved user engagement by 35% and reduced load times by 40%. Passionate about creating scalable, maintainable solutions that solve real business problems."
          : "Experienced management consultant with 5+ years of expertise in strategy development and implementation, delivering over $5M in cost savings for Fortune 500 clients. Recognized for strong analytical skills and data-driven decision making that has improved operational efficiency by 15-25% across multiple industries.",
        torAlignment: torContent
          ? "The TOR requires expertise in strategic planning and implementation. Your summary should emphasize your track record of successful strategy execution with measurable outcomes."
          : "Focus on demonstrating your expertise through measurable outcomes.",
      },
      {
        section: "Experience",
        suggestion:
          "Include specific metrics and outcomes for each role. Quantify your achievements with percentages, dollar amounts, or other measurable results.",
        suggestedCopy: cvText.includes("Software Engineer")
          ? "Senior Software Engineer | Tech Solutions Inc.\nMar 2021 - Present\n- Architected and implemented a microservices-based API platform using Node.js and Express, reducing system latency by 45% and supporting 2M+ daily requests\n- Led the development of responsive UI components with React and TypeScript that improved user engagement metrics by 35% and reduced bounce rates by 28%\n- Collaborated with product and UX teams to deliver 12 major feature releases on time and within scope, resulting in a 22% increase in user retention"
          : "Led a cross-functional team of 6 consultants on a comprehensive cost reduction project for a Fortune 500 manufacturing client, resulting in $3.2M annual savings (18% reduction) and implementation of sustainable cost control measures that maintained quality standards.",
        torAlignment: torContent
          ? "The TOR emphasizes project management and implementation experience. Your experience section should highlight your leadership in delivering complex projects with tangible results."
          : "Highlight your leadership in delivering complex projects with tangible results.",
      },
      {
        section: "Skills",
        suggestion:
          "Prioritize skills mentioned in the job description and organize them by category. Focus on both technical and soft skills that are most relevant to the position.",
        suggestedCopy: cvText.includes("Software Engineer")
          ? "Technical Skills:\n- Frontend: React, Redux, TypeScript, HTML5/CSS3, Responsive Design\n- Backend: Node.js, Express, RESTful APIs, GraphQL\n- Database: MongoDB, PostgreSQL, Redis\n- DevOps: Docker, AWS, CI/CD pipelines, Git\n\nSoft Skills:\n- Technical Leadership, Agile Methodologies, Cross-functional Collaboration\n- Problem Solving, Performance Optimization, Code Review"
          : "Strategic Planning & Analysis: Business strategy development, market analysis, competitive benchmarking, scenario planning\nFinancial Expertise: Financial modeling, cost-benefit analysis, ROI optimization, budget management\nLeadership & Communication: Team leadership, client relationship management, executive presentations, stakeholder engagement",
        torAlignment: torContent
          ? "The TOR specifically mentions requirements for technical expertise and collaboration skills. Ensure these are prominently featured in your skills section."
          : "Organize your skills to highlight your technical expertise and collaboration abilities.",
      },
    ];

    // Add TOR-specific suggestions if TOR content is available
    if (torContent) {
      suggestions.push({
        section: "TOR Alignment",
        suggestion:
          "Carefully analyze the Terms of Reference and customize your CV to directly address the specific requirements and priorities mentioned.",
        suggestedCopy:
          "Based on the TOR requirements, emphasize your experience with " +
          (cvText.includes("Software Engineer")
            ? "software development, API design, and cross-functional collaboration. Include specific examples of projects where you've successfully implemented technical solutions that align with the client's objectives."
            : "financial analysis, strategic planning, and stakeholder engagement. Include specific examples of projects where you've successfully implemented strategies that align with the client's objectives."),
        torAlignment:
          "This is a critical section to ensure your CV is tailored specifically to the requirements outlined in the Terms of Reference document.",
      });
    }
  }

  return suggestions;
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

  // Randomly fail sometimes to test error handling
  if (Math.random() < 0.3) {
    throw new Error(
      "PDF generation failed - this is a simulated error for testing error handling",
    );
  }

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

  // Randomly fail sometimes to test error handling
  if (Math.random() < 0.3) {
    throw new Error(
      "DOCX generation failed - this is a simulated error for testing error handling",
    );
  }

  // Return a mock DOCX blob (this is just a placeholder)
  return new Blob([cvText], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
};
