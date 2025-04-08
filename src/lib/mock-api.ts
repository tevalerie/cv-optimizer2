/**
 * Mock API functions for when API keys are not available
 * This allows the application to function in standalone mode
 */

import { AIModel } from "@/components/AIModelSelector";

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

  // For mock mode, simulate a delay to mimic API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Check if the CV contains TOR or additional competencies sections
  const hasTOR =
    cvText.includes("TOR Requirements") ||
    cvText.includes("Terms of Reference");
  const hasAdditionalCompetencies = cvText.includes("Additional Competencies");

  // Check if the CV contains binary content marker
  const hasBinaryContent = cvText.includes("-binary-content-");

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

  // Extract name from original CV if possible
  const nameMatch =
    cvText.match(/# ([^\n]+)/) ||
    cvText.match(/Content extracted from ([^\n]+)/);
  const name = nameMatch
    ? nameMatch[1].replace(/\.(docx|pdf)$/, "")
    : "Professional CV";

  // Extract professional summary if available
  const professionalSummaryMatch =
    cvText.match(/## Professional Summary[\s\S]*?(?=##|$)/) ||
    cvText.match(/## PROFESSIONAL SUMMARY[\s\S]*?(?=##|$)/) ||
    cvText.match(/Professional Summary[\s\S]*?(?=##|$)/) ||
    cvText.match(/PROFESSIONAL SUMMARY[\s\S]*?(?=##|$)/);
  const professionalSummary = professionalSummaryMatch
    ? professionalSummaryMatch[0]
        .replace(
          /## Professional Summary\s*|## PROFESSIONAL SUMMARY\s*|Professional Summary\s*|PROFESSIONAL SUMMARY\s*/,
          "",
        )
        .trim()
    : "Experienced professional with a proven track record of delivering results. Skilled in strategic planning, project management, and stakeholder engagement.";

  // Extract experience section if available
  const experienceMatch =
    cvText.match(/## Experience[\s\S]*?(?=##|$)/) ||
    cvText.match(/## EXPERIENCE[\s\S]*?(?=##|$)/) ||
    cvText.match(/## Professional Experience[\s\S]*?(?=##|$)/) ||
    cvText.match(/## PROFESSIONAL EXPERIENCE[\s\S]*?(?=##|$)/);
  const experienceContent = experienceMatch
    ? experienceMatch[0]
        .replace(
          /## Experience\s*|## EXPERIENCE\s*|## Professional Experience\s*|## PROFESSIONAL EXPERIENCE\s*/,
          "",
        )
        .trim()
    : "";

  // Extract education section if available
  const educationMatch =
    cvText.match(/## Education[\s\S]*?(?=##|$)/) ||
    cvText.match(/## EDUCATION[\s\S]*?(?=##|$)/);
  const educationContent = educationMatch
    ? educationMatch[0].replace(/## Education\s*|## EDUCATION\s*/, "").trim()
    : "";

  // Extract skills section if available
  const skillsMatch =
    cvText.match(/## Skills[\s\S]*?(?=##|$)/) ||
    cvText.match(/## SKILLS[\s\S]*?(?=##|$)/) ||
    cvText.match(/## Skills & Certifications[\s\S]*?(?=##|$)/) ||
    cvText.match(/## SKILLS & CERTIFICATIONS[\s\S]*?(?=##|$)/);
  const skillsContent = skillsMatch
    ? skillsMatch[0]
        .replace(
          /## Skills\s*|## SKILLS\s*|## Skills & Certifications\s*|## SKILLS & CERTIFICATIONS\s*/,
          "",
        )
        .trim()
    : "";

  // Generate suggestions based on the actual CV content and TOR if available
  let suggestions = [];

  if (hasTOR) {
    // Extract TOR content to generate more relevant suggestions
    suggestions = [
      {
        section: "Professional Summary",
        suggestion:
          "Align your professional summary with the TOR requirements, highlighting specific expertise in post-issuance review and financial analysis.",
      },
      {
        section: "Experience",
        suggestion:
          "Emphasize experience related to financial auditing, compliance review, and post-issuance processes mentioned in the TOR.",
      },
      {
        section: "Skills",
        suggestion:
          "Highlight skills in financial analysis, regulatory compliance, and audit methodologies that match the TOR requirements.",
      },
      {
        section: "Education",
        suggestion:
          "Emphasize qualifications relevant to financial review and compliance as specified in the TOR.",
      },
      {
        section: "TOR Alignment",
        suggestion:
          "Add a section that explicitly addresses how your experience meets the specific requirements outlined in the Terms of Reference.",
      },
    ];
  } else {
    // Default suggestions if no TOR is available
    suggestions = [
      {
        section: "Professional Summary",
        suggestion:
          "Add quantifiable achievements to highlight your impact. Include specific metrics that demonstrate your expertise and the value you've brought to previous roles.",
      },
      {
        section: "Experience",
        suggestion:
          "Include specific metrics and outcomes for each role. Quantify your achievements with percentages, dollar amounts, or other measurable results.",
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
    ];
  }

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

  // Create an improved version of the CV based on TOR and other inputs
  let improvedText = "";

  // If we have binary content, create a more tailored CV based on the actual CV content
  if (hasBinaryContent && hasTOR) {
    // Extract TOR-specific keywords for better alignment
    const torKeywords = torContent.toLowerCase();
    const isFinanceRelated =
      torKeywords.includes("finance") ||
      torKeywords.includes("financial") ||
      torKeywords.includes("review");
    const isPostIssuance =
      torKeywords.includes("post-issuance") ||
      torKeywords.includes("post issuance");
    const isAudit =
      torKeywords.includes("audit") || torKeywords.includes("compliance");

    // Create a tailored CV based on the actual uploaded content and TOR
    improvedText = `# Optimized CV for ${name}

## PROFESSIONAL SUMMARY
${professionalSummary} ${isFinanceRelated ? "Specialized expertise in financial analysis and regulatory frameworks." : ""} ${isPostIssuance ? "Experienced in post-issuance review processes and compliance requirements." : ""} ${isAudit ? "Skilled in conducting thorough assessments and delivering detailed reports aligned with industry standards." : ""}

## PROFESSIONAL EXPERIENCE

${
  experienceContent
    ? experienceContent
    : `### Technical Consultant | ${name} Consulting | Current
- ${isPostIssuance ? "Conducted comprehensive reviews for multiple projects, ensuring compliance with regulatory standards" : "Led strategic initiatives for multiple high-profile projects, ensuring successful outcomes"}
- ${isAudit ? "Performed detailed documentation reviews and identified potential compliance issues" : "Analyzed complex requirements and identified potential optimization opportunities"}
- ${isFinanceRelated ? "Developed standardized methodologies that improved efficiency and increased detection of compliance issues" : "Developed standardized frameworks that improved project efficiency and quality"}
- Collaborated with stakeholders to ensure alignment with evolving requirements

### Previous Experience
- ${isFinanceRelated ? "Performed detailed reviews of documentation for compliance with industry regulations" : "Delivered comprehensive analysis of project requirements and implementation strategies"}
- Prepared detailed reports with findings and recommendations
- Advised clients on best practices for maintaining compliance with regulations
- Developed and implemented training programs for internal teams`
}

## EDUCATION
${
  educationContent
    ? educationContent
    : `- Advanced Degree in relevant field
- Professional certifications in specialized areas`
}

## SKILLS & CERTIFICATIONS
${
  skillsContent
    ? skillsContent
    : `- ${isPostIssuance ? "Post-Issuance Review Methodologies" : "Project Review Methodologies"}
- ${isFinanceRelated ? "Financial Regulatory Compliance" : "Regulatory Compliance"}
- ${isAudit ? "Audit Procedures and Documentation" : "Documentation and Reporting"}
- Risk Assessment and Mitigation
- Stakeholder Communication and Reporting
- ${isFinanceRelated ? "Financial Analysis and Reporting" : "Technical Analysis and Reporting"}
- Project Management and Implementation`
}

## RELEVANT PROJECTS

### Comprehensive Review Framework
- Developed a structured framework for conducting thorough reviews
- Implemented the framework across multiple client engagements, resulting in high compliance rates

### Training and Knowledge Transfer
- Created and delivered training on requirements and methodologies
- Programs adopted by multiple organizations as part of their protocols`;
  } else if (isValerieCV) {
    // If it's Valerie's CV, generate a dynamic CV based on the extracted information
    // Extract key information from additionalCompetencies or cvText
    const extractedName = "TELOJO 'VALERIE' ONU";
    const extractedTitle = "Financial Innovator & Climate Finance Expert";

    // Generate a dynamic professional summary based on extracted information
    const dynamicSummary = `Distinguished economist and financial innovator with over twenty years of expertise in Structured Finance & Deeptech. Specializes in the intersection of Climate, International Trade, Policy & eGovernance. Proven track record of delivering transformative projects with multilateral institutions${additionalCompetencies.includes("World Bank") ? " including the World Bank, EU, GIZ, CDB, and the German Savings Banks Foundation" : ""}. ${additionalCompetencies.includes("blockchain") ? "Extensive experience in leveraging blockchain and AI for sustainable finance solutions, with a focus on vulnerable regions like Small Island Developing States (SIDS) across the Caribbean and emerging markets in Africa." : ""}`;

    // Generate dynamic experience sections based on extracted information
    const dynamicExperience = [];

    if (
      additionalCompetencies.includes("Quintessence") ||
      cvText.includes("Quintessence")
    ) {
      dynamicExperience.push(`### Managing Director | Quintessence Consulting Inc. | ${additionalCompetencies.includes("2012") ? "2012-Present" : "Current"}
- ${additionalCompetencies.includes("UKFCDO") ? "Led technical assistance to the UKFCDO as the Caribbean Regional Climate Finance Expert and Climate Resilient Governance and Multistakeholder Lead" : "Led regional climate finance initiatives and governance projects"}
- ${additionalCompetencies.includes("blockchain") ? "Developed blockchain-based hedge fund and AI-driven risk management tools for sustainable finance applications" : "Developed innovative financial tools for sustainable finance applications"}
- ${additionalCompetencies.includes("St. Kitts") ? "Strengthened St. Kitts and Nevis Green Climate Fund National Designated Authority's capacity to access climate finance" : "Strengthened national capacities to access climate finance"}
- Created innovative blue and green business models for various bankable project use cases
- ${additionalCompetencies.includes("UKCRIP") ? "Shaped the Caribbean Renewable Energy Pipeline (CREP) Regional Landscape Assessment and supported the UKFCDO with strategic design for the UK-Caribbean Resilient Infrastructure Platform (UKCRIP)" : "Supported renewable energy initiatives and infrastructure development in the Caribbean"}
- ${additionalCompetencies.includes("£200M") ? "Identified key entry points for UK Expertise and Investments into Renewable Energy for the new £200M climate-adaptive infrastructure facility for the Caribbean" : "Identified key investment opportunities for climate-adaptive infrastructure"}`);
    }

    if (
      additionalCompetencies.includes("Valerie Capital") ||
      cvText.includes("Valerie Capital")
    ) {
      dynamicExperience.push(`### Founder | Valerie Capital | ${additionalCompetencies.includes("2018") ? "2018-Present" : "Current"}
- Established innovative financial firm focused on sustainable finance solutions
- ${additionalCompetencies.includes("blockchain") ? "Pioneered integration of blockchain technology and AI for climate finance applications" : "Pioneered innovative technology solutions for climate finance applications"}
- ${additionalCompetencies.includes("Hedge fund") ? "Designed and launched the first Balanced Multiclass Hedge fund leveraging blockchain technology for a private investment banking group based in Canada" : "Designed and launched innovative financial products for investment banking clients"}
- Developed a downside risk protection & leveraged financing instrument for Fund and Portfolio managers applied to sustainable finance
- Created climate action pooled funds for a US-based Hedge fund group`);
    }

    if (
      additionalCompetencies.includes("CDRFI") ||
      cvText.includes("CDRFI") ||
      additionalCompetencies.includes("Caribbean Policy")
    ) {
      dynamicExperience.push(`### Regional Climate Disaster Risk Finance and Insurance (CDRFI) Specialist | Caribbean Policy Development Centre (CPDC) | ${additionalCompetencies.includes("2023") ? "2023-Present" : "Current"}
- Led regional community and technical training workshops in partnership with Munich Climate Insurance Initiative (MCII)
- Raised awareness on Parametric Insurance design, Carbon Finance for Agriculture and Fisherfolk communities
- ${additionalCompetencies.includes("Antigua") ? "Provided training on various forms of Climate Finance across Antigua and Barbuda, Barbados, Dominica, Grenada and Jamaica" : "Provided training on various forms of Climate Finance across Caribbean nations"}`);
    }

    // Generate dynamic education section
    const dynamicEducation = [];
    if (
      additionalCompetencies.includes("EPFL") ||
      cvText.includes("EPFL") ||
      additionalCompetencies.includes("eGovernance")
    ) {
      dynamicEducation.push(
        "- Executive Master's in eGovernance | Ecolé Politechnique de Lausanne (EPFL), Switzerland",
      );
    }
    if (
      additionalCompetencies.includes("Frankfurt") ||
      cvText.includes("Frankfurt") ||
      additionalCompetencies.includes("Climate Adaptation Finance")
    ) {
      dynamicEducation.push(
        "- Postgraduate Certificate in Climate Adaptation Finance | Frankfurt School of Management and Finance",
      );
    }
    if (
      additionalCompetencies.includes("UWI") ||
      cvText.includes("UWI") ||
      additionalCompetencies.includes("International Trade Policy")
    ) {
      dynamicEducation.push(
        "- Postgraduate Certificate in International Trade Policy | University of West Indies (UWI)",
      );
    }
    if (dynamicEducation.length === 0) {
      dynamicEducation.push("- Advanced degree in Economics and Finance");
      dynamicEducation.push(
        "- Specialized training in Climate Finance and Policy",
      );
    }

    // Generate dynamic skills section
    const dynamicSkills = [];
    if (additionalCompetencies.includes("CAIA") || cvText.includes("CAIA")) {
      dynamicSkills.push(
        "- Chartered Alternative Investment Analyst (CAIA) 2020 Scholar",
      );
    }
    dynamicSkills.push("- Financial Modeling & Analysis (Advanced)");
    if (
      additionalCompetencies.includes("blockchain") ||
      cvText.includes("blockchain")
    ) {
      dynamicSkills.push(
        "- Blockchain & AI Applications for Sustainable Finance",
      );
    }
    dynamicSkills.push("- Climate Finance & Policy Development");
    dynamicSkills.push("- Stakeholder Engagement & Governance");
    dynamicSkills.push("- Project Management & Implementation");
    if (
      additionalCompetencies.includes("Blended Finance") ||
      cvText.includes("Blended Finance")
    ) {
      dynamicSkills.push("- Blended Finance Structuring");
    }
    if (
      additionalCompetencies.includes("Carbon Finance") ||
      cvText.includes("Carbon Finance") ||
      additionalCompetencies.includes("Parametric Insurance")
    ) {
      dynamicSkills.push("- Carbon Finance and Parametric Insurance Design");
    }
    if (
      additionalCompetencies.includes("Digital Infrastructure") ||
      cvText.includes("Digital Infrastructure")
    ) {
      dynamicSkills.push("- Digital Infrastructure for Climate Resilience");
    }
    dynamicSkills.push("- Blue and Green Economy Business Modeling");

    // Generate dynamic projects section
    const dynamicProjects = [];
    if (
      additionalCompetencies.includes("UKCRIP") ||
      cvText.includes("UKCRIP")
    ) {
      dynamicProjects.push(`### UK-Caribbean Resilient Infrastructure Platform (UKCRIP)
- ${additionalCompetencies.includes("£200M") ? "Provided strategic design for a £200M climate-adaptive infrastructure facility" : "Provided strategic design for climate-adaptive infrastructure initiatives"}
- Identified investment opportunities for resilient infrastructure aligned with Caribbean needs`);
    }
    if (
      additionalCompetencies.includes("St. Kitts") ||
      cvText.includes("St. Kitts") ||
      additionalCompetencies.includes("Climate Risk Intelligence")
    ) {
      dynamicProjects.push(`### St. Kitts and Nevis Climate Risk Intelligence System
- Designed digital infrastructure for climate risk management
- Established storm-surge modeling and climate risk atlas
- Developed governance framework for climate services`);
    }
    if (dynamicProjects.length === 0) {
      dynamicProjects.push(`### Climate Finance Initiatives
- Designed and implemented innovative financing mechanisms for climate resilience
- Developed frameworks for sustainable development in vulnerable regions
- Created capacity building programs for climate finance access`);
    }

    // Assemble the dynamic CV
    improvedText = `# ${extractedName}
${extractedTitle}

## PROFESSIONAL SUMMARY
${dynamicSummary}

## PROFESSIONAL EXPERIENCE

${dynamicExperience.join("\n\n")}

## EDUCATION
${dynamicEducation.join("\n")}

## SKILLS & CERTIFICATIONS
${dynamicSkills.join("\n")}

## NOTABLE PROJECTS

${dynamicProjects.join("\n\n")}`;
  } else {
    // For non-Valerie CVs, make improvements based on the extracted sections
    // Start with the name and professional summary
    improvedText = `# ${name}

## PROFESSIONAL SUMMARY
${professionalSummary}

`;

    // Add experience section if available, otherwise use a template
    if (experienceContent) {
      improvedText += `## PROFESSIONAL EXPERIENCE
${experienceContent}

`;
    } else {
      improvedText += `## PROFESSIONAL EXPERIENCE

### Senior Professional | Current Organization | Current
- Led strategic initiatives resulting in significant improvements to operational efficiency
- Managed cross-functional teams to deliver complex projects on time and within budget
- Developed and implemented innovative solutions to address business challenges
- Collaborated with stakeholders to ensure alignment with organizational objectives

### Previous Role | Previous Organization | Past
- Executed key responsibilities with a focus on quality and attention to detail
- Contributed to team success through effective collaboration and communication
- Identified opportunities for process improvement and implemented solutions
- Developed expertise in relevant methodologies and best practices

`;
    }

    // Add education section if available, otherwise use a template
    if (educationContent) {
      improvedText += `## EDUCATION
${educationContent}

`;
    } else {
      improvedText += `## EDUCATION
- Advanced Degree | University Name | Year
- Undergraduate Degree | University Name | Year
- Relevant Certifications and Professional Development

`;
    }

    // Add skills section if available, otherwise use a template
    if (skillsContent) {
      improvedText += `## SKILLS & CERTIFICATIONS
${skillsContent}

`;
    } else {
      improvedText += `## SKILLS & CERTIFICATIONS
- Strategic Planning and Analysis
- Project Management and Implementation
- Team Leadership and Collaboration
- Stakeholder Engagement and Communication
- Problem Solving and Decision Making
- Technical Expertise in Relevant Field

`;
    }

    // Add a projects section
    improvedText += `## KEY PROJECTS

### Strategic Initiative
- Led development and implementation of a comprehensive strategy
- Achieved measurable results including improved efficiency and cost savings
- Collaborated with cross-functional teams to ensure successful outcomes

### Process Improvement
- Identified opportunities for optimization in existing workflows
- Implemented solutions that resulted in significant improvements
- Documented best practices for future reference and knowledge sharing
`;
  }

  return {
    originalText: cvText,
    suggestions: suggestions,
    improvedText: improvedText,
    modelsUsed: modelIdsArray,
  };
};

/**
 * Mock function to generate a PDF of the CV
 */
export const generatePDF = async (
  cvText: string,
  template: string,
): Promise<Blob> => {
  // Simulate API delay
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
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return a mock DOCX blob (this is just a placeholder)
  return new Blob([cvText], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
};
