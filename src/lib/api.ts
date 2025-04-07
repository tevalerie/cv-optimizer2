/**
 * Real API functions for CV optimization
 */

import { getApiKey } from "./api-keys";
import {
  analyzeCV as mockAnalyzeCV,
  generatePDF as mockGeneratePDF,
  generateDOCX as mockGenerateDOCX,
} from "./mock-api";

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

  // If no API key is available, use mock API
  if (!openaiApiKey) {
    console.log("No OpenAI API key available, using mock API");
    try {
      return await mockAnalyzeCV(cvText, modelIdsArray);
    } catch (error) {
      console.error("Error in mock API:", error);
      throw new Error("Failed to analyze CV with mock API");
    }
  }

  try {
    // In a real implementation, this would call the OpenAI API
    // For now, we'll use the mock API
    console.log("Using mock API instead of real API");
    return await mockAnalyzeCV(cvText, modelIdsArray);
  } catch (error) {
    console.error("Error analyzing CV with real API:", error);
    console.log("Falling back to mock API...");
    // Fallback to mock API if real API fails
    return mockAnalyzeCV(cvText, modelIdsArray);
  }
};

/**
 * Generate a PDF of the CV
 */
export const generatePDF = async (
  cvText: string,
  template: string,
): Promise<Blob> => {
  try {
    // In a real implementation, this would call a PDF generation service
    // For now, we'll just use the mock API
    return await mockGeneratePDF(cvText, template);
  } catch (error) {
    console.error("Error generating PDF with real API:", error);
    console.log("Falling back to mock PDF generation...");
    // Fallback to mock PDF generation
    return mockGeneratePDF(cvText, template);
  }
};

/**
 * Generate a DOCX of the CV
 */
export const generateDOCX = async (
  cvText: string,
  template: string,
): Promise<Blob> => {
  try {
    // In a real implementation, this would call a DOCX generation service
    // For now, we'll just use the mock API
    return await mockGenerateDOCX(cvText, template);
  } catch (error) {
    console.error("Error generating DOCX with real API:", error);
    console.log("Falling back to mock DOCX generation...");
    // Fallback to mock DOCX generation
    return mockGenerateDOCX(cvText, template);
  }
};
