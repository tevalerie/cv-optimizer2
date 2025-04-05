/**
 * Real API functions for CV optimization
 */

import { getApiKey } from "./api-keys";

/**
 * Analyze a CV using OpenAI API
 * @param cvText The CV text to analyze
 * @param modelIds The AI models to use
 */
export const analyzeCV = async (
  cvText: string,
  modelIds: string | string[],
): Promise<any> => {
  // Convert single modelId to array for consistent handling
  const modelIdsArray = Array.isArray(modelIds) ? modelIds : [modelIds];

  // Get OpenAI API key
  const openaiApiKey = getApiKey("openai").key;

  if (!openaiApiKey) {
    throw new Error("OpenAI API key is required for CV analysis");
  }

  try {
    // Prepare the prompt for OpenAI
    const prompt = `Analyze and optimize the following CV for professional impact. 
    Provide specific improvements to make the CV more effective and impactful.
    
    CV Content:
    ${cvText}
    
    IMPORTANT: If the CV content contains "Additional Competencies" section, use that information to create a complete professional CV. Do not use any placeholder or mock data. Use only the information provided in the input.
    
    Format the CV in a professional structure with clear sections like:
    # TELOJO 'VALERIE' ONU
    [Contact Information]
    
    ## PROFESSIONAL SUMMARY
    [Concise summary of expertise and value]
    
    ## PROFESSIONAL EXPERIENCE
    [Position Title] | [Organization] | [Date Range]
    - [Achievement with metrics]
    - [Achievement with metrics]
    
    ## EDUCATION
    [Degree] | [Institution] | [Year]
    
    ## SKILLS & CERTIFICATIONS
    [List of relevant skills and certifications]
    
    Please return a JSON response with the following structure:
    {
      "improvedText": "The formatted CV content based ONLY on the information provided",
      "suggestions": [
        {
          "section": "Professional Summary",
          "suggestion": "Specific improvement suggestion for this section"
        },
        {
          "section": "Experience",
          "suggestion": "Specific improvement suggestion for this section"
        },
        {
          "section": "Skills",
          "suggestion": "Specific improvement suggestion for this section"
        },
        {
          "section": "Education",
          "suggestion": "Specific improvement suggestion for this section"
        }
      ]
    }`;

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // Using GPT-4 for best results
        messages: [
          {
            role: "system",
            content:
              "You are an expert CV optimizer that helps improve professional CVs for maximum impact.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `API error: ${errorData.error?.message || response.statusText}`,
      );
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse API response:", e);
      // If parsing fails, create a basic structure with the content
      parsedResponse = {
        improvedText: content,
        suggestions: [],
      };
    }

    return {
      originalText: cvText,
      improvedText: parsedResponse.improvedText,
      suggestions: parsedResponse.suggestions || [],
      modelsUsed: modelIdsArray,
    };
  } catch (error) {
    console.error("Error analyzing CV:", error);
    throw error;
  }
};

/**
 * Generate a PDF of the CV
 */
export const generatePDF = async (
  cvText: string,
  template: string,
): Promise<Blob> => {
  // For now, we'll just return a text blob since we don't have a PDF generation service
  // In a real implementation, this would call a PDF generation service
  return new Blob([cvText], { type: "application/pdf" });
};

/**
 * Generate a DOCX of the CV
 */
export const generateDOCX = async (
  cvText: string,
  template: string,
): Promise<Blob> => {
  // For now, we'll just return a text blob since we don't have a DOCX generation service
  // In a real implementation, this would call a DOCX generation service
  return new Blob([cvText], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
};
