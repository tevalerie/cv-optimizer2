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
  const suggestions = [
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
  } else {
    // For non-Valerie CVs, make some basic improvements
    improvedText = improvedText
      .replace(/worked on/gi, "successfully delivered")
      .replace(/helped with/gi, "led initiatives for")
      .replace(/used/gi, "leveraged")
      .replace(/made/gi, "developed")
      .replace(/good/gi, "excellent");

    // Add a professional summary if missing
    if (
      !improvedText.includes("Professional Summary") &&
      !improvedText.includes("PROFESSIONAL SUMMARY")
    ) {
      const summarySection =
        "\n\n## Professional Summary\nExperienced professional with a proven track record of delivering results. Skilled in strategic planning, project management, and stakeholder engagement.\n";

      // Insert after the title or at the beginning
      if (improvedText.startsWith("#")) {
        const lines = improvedText.split("\n");
        improvedText = lines[0] + summarySection + lines.slice(1).join("\n");
      } else {
        improvedText = "# Professional CV" + summarySection + improvedText;
      }
    }
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
