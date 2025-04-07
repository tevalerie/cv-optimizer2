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
  const torContent = hasTOR
    ? cvText.split("TOR Requirements")[1]?.split("\n\n")[0] || ""
    : "";

  // Generate suggestions based on the actual CV content and TOR if available
  const suggestions = generateSuggestionsFromCV(
    cvText,
    hasTOR ? torContent : undefined,
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
  const improvedText = cvText;

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
): any[] => {
  // Base suggestions with detailed content and TOR alignment
  const suggestions = [
    {
      section: "Professional Summary",
      suggestion:
        "Add quantifiable achievements to highlight your impact. Include specific metrics that demonstrate your expertise and the value you've brought to previous roles. Consider mentioning the scale of projects you've worked on and any recognition received.",
      suggestedCopy: cvText.includes("Software Engineer")
        ? "Senior Software Engineer with 4+ years of expertise in full-stack development, specializing in React, TypeScript, and Node.js. Delivered responsive, high-performance web applications that improved user engagement by 35% and reduced load times by 40%. Passionate about creating scalable, maintainable solutions that solve real business problems."
        : "Experienced management consultant with 5+ years of expertise in strategy development and implementation, delivering over $5M in cost savings for Fortune 500 clients. Recognized for strong analytical skills and data-driven decision making that has improved operational efficiency by 15-25% across multiple industries.",
      torAlignment:
        "The TOR requires expertise in strategic planning and implementation. Your summary should emphasize your track record of successful strategy execution with measurable outcomes.",
    },
    {
      section: "Experience",
      suggestion:
        "Include specific metrics and outcomes for each role. Quantify your achievements with percentages, dollar amounts, or other measurable results. Focus on how your work directly impacted business objectives and created value for stakeholders.",
      suggestedCopy: cvText.includes("Software Engineer")
        ? "Senior Software Engineer | Tech Solutions Inc.\nMar 2021 - Present\n- Architected and implemented a microservices-based API platform using Node.js and Express, reducing system latency by 45% and supporting 2M+ daily requests\n- Led the development of responsive UI components with React and TypeScript that improved user engagement metrics by 35% and reduced bounce rates by 28%\n- Collaborated with product and UX teams to deliver 12 major feature releases on time and within scope, resulting in a 22% increase in user retention"
        : "Led a cross-functional team of 6 consultants on a comprehensive cost reduction project for a Fortune 500 manufacturing client, resulting in $3.2M annual savings (18% reduction) and implementation of sustainable cost control measures that maintained quality standards.",
      torAlignment:
        "The TOR emphasizes project management and implementation experience. Your experience section should highlight your leadership in delivering complex projects with tangible results.",
    },
    {
      section: "Skills",
      suggestion:
        "Prioritize skills mentioned in the job description and organize them by category. Focus on both technical and soft skills that are most relevant to the position. Consider adding proficiency levels for technical skills to provide more context.",
      suggestedCopy: cvText.includes("Software Engineer")
        ? "Technical Skills:\n- Frontend: React, Redux, TypeScript, HTML5/CSS3, Responsive Design\n- Backend: Node.js, Express, RESTful APIs, GraphQL\n- Database: MongoDB, PostgreSQL, Redis\n- DevOps: Docker, AWS, CI/CD pipelines, Git\n\nSoft Skills:\n- Technical Leadership, Agile Methodologies, Cross-functional Collaboration\n- Problem Solving, Performance Optimization, Code Review"
        : "Strategic Planning & Analysis: Business strategy development, market analysis, competitive benchmarking, scenario planning\nFinancial Expertise: Financial modeling, cost-benefit analysis, ROI optimization, budget management\nLeadership & Communication: Team leadership, client relationship management, executive presentations, stakeholder engagement",
      torAlignment:
        "The TOR specifically mentions requirements for technical expertise and collaboration skills. Ensure these are prominently featured in your skills section.",
    },
    {
      section: "Education",
      suggestion:
        "Add relevant coursework, academic achievements, and any specialized training that aligns with the position requirements. Include GPA if it's strong, and mention any leadership roles or relevant extracurricular activities.",
      suggestedCopy: cvText.includes("Software Engineer")
        ? "B.S., Computer Science | Stanford University | 2015-2019\n• Specialization in Software Engineering and Distributed Systems\n• GPA: 3.85/4.0\n• Senior Project: Developed a real-time collaborative coding platform\n• Member of the Association for Computing Machinery (ACM)"
        : "MBA, Business Administration | Harvard Business School | 2015-2017\n• Concentration in Strategic Management and Finance\n• GPA: 3.8/4.0\n• Selected for Leadership Development Program\n\nB.S., Economics | University of Pennsylvania | 2011-2015\n• Minor in Data Analytics\n• Graduated with Honors (cum laude)",
      torAlignment:
        "The TOR values advanced education in relevant fields. Your educational background should emphasize specialized knowledge that directly relates to the project requirements.",
    },
  ];

  // Add TOR-specific suggestions if TOR content is available
  if (torContent) {
    suggestions.push({
      section: "TOR Alignment",
      suggestion:
        "Carefully analyze the Terms of Reference and customize your CV to directly address the specific requirements and priorities mentioned. Highlight relevant experience and skills that match what the client is looking for in this particular role.",
      suggestedCopy:
        "Based on the TOR requirements, emphasize your experience with " +
        (cvText.includes("Software Engineer")
          ? "software development, API design, and cross-functional collaboration. Include specific examples of projects where you've successfully implemented technical solutions that align with the client's objectives."
          : "financial analysis, strategic planning, and stakeholder engagement. Include specific examples of projects where you've successfully implemented strategies that align with the client's objectives."),
      torAlignment:
        "This is a critical section to ensure your CV is tailored specifically to the requirements outlined in the Terms of Reference document.",
    });
  }

  // Add content-specific suggestions based on what's in the CV
  if (cvText.includes("Experience") || cvText.includes("EXPERIENCE")) {
    suggestions.push({
      section: "Experience Format",
      suggestion:
        "Use bullet points for achievements and responsibilities to improve readability. Start each bullet with a strong action verb and focus on accomplishments rather than duties. Ensure consistent formatting throughout your experience section.",
      suggestedCopy:
        "• Implemented a new customer feedback system that increased response rates by 45% and provided actionable insights for product development\n• Reduced operational costs by 18% through process optimization and automation of routine tasks\n• Led cross-functional team of 8 members to deliver a major project 2 weeks ahead of schedule and 10% under budget",
      torAlignment:
        "The TOR emphasizes results-oriented experience. Your bullet points should clearly demonstrate your ability to deliver measurable outcomes.",
    });
  }

  if (cvText.includes("Skills") || cvText.includes("SKILLS")) {
    suggestions.push({
      section: "Skills Organization",
      suggestion:
        "Group skills by category (technical, soft skills, domain knowledge) for better readability. Prioritize skills that are most relevant to the position and that align with the requirements in the Terms of Reference.",
      suggestedCopy: cvText.includes("Software Engineer")
        ? "Technical Skills:\n- Programming Languages: JavaScript/TypeScript, Python, Java\n- Frontend: React, Redux, HTML5/CSS3, Responsive Design\n- Backend: Node.js, Express, RESTful APIs, GraphQL\n- DevOps: Docker, AWS, CI/CD pipelines\n\nSoft Skills:\n- Project Management, Agile Methodologies, Technical Leadership\n- Problem Solving, Communication, Mentoring"
        : "Strategic Skills:\n- Business Strategy Development, Market Analysis, Risk Assessment\n- Financial Modeling, Data Analysis, Process Optimization\n\nLeadership Skills:\n- Team Management, Client Relations, Stakeholder Engagement\n- Executive Presentations, Change Management, Mentoring",
      torAlignment:
        "The TOR requires a specific skill set. Organizing your skills by category helps the reviewer quickly identify your relevant qualifications.",
    });
  }

  return suggestions;
};

/**
 * Generate an improved CV by applying the suggestions
 * Note: This function is kept for reference but is no longer used
 * as we now use the actual uploaded content directly
 */
const generateImprovedCV = (
  originalText: string,
  optimizations: any[],
): string => {
  // Simply return the original text as we want to work with the actual uploaded content
  return originalText;
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
