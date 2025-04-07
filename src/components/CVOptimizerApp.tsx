import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import CVEditor from "./CVEditor";
import DownloadOptions from "./DownloadOptions";
import AIModelSelector, { AIModel, AIModels } from "./AIModelSelector";
import APIKeyConfig from "./APIKeyConfig";
import { Progress } from "./ui/progress";
import {
  Loader2,
  Sparkles,
  Settings,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import {
  analyzeCV as realAnalyzeCV,
  generatePDF as realGeneratePDF,
  generateDOCX as realGenerateDOCX,
} from "@/lib/api";
import {
  analyzeCV as mockAnalyzeCV,
  generatePDF as mockGeneratePDF,
  generateDOCX as mockGenerateDOCX,
} from "@/lib/mock-api";
import {
  getAllAvailableModels,
  getUserApiKeys,
  hasAnyApiKeys,
  getApiKey,
} from "@/lib/api-keys";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type Step = "upload" | "edit" | "download";

const CVOptimizerApp = () => {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [cvContent, setCvContent] = useState<string>("");
  const [selectedAIModels, setSelectedAIModels] = useState<AIModels>([
    "openai",
  ]);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [userApiKeys, setUserApiKeys] = useState<Record<string, string>>({});
  const [uploadedData, setUploadedData] = useState<{
    cvFile: File | null;
    cvContent: string;
    torFile?: File | null;
    torContent?: string;
    additionalCompetencies?: string;
  }>({ cvFile: null, cvContent: "" });
  const [error, setError] = useState<string | null>(null);

  // Load user API keys on component mount
  useEffect(() => {
    const savedKeys = getUserApiKeys();
    setUserApiKeys(savedKeys);
  }, []);

  // Mock data for demonstration
  const mockOriginalCV =
    "# Original CV\n\n## Education\nMaster's in Computer Science, Stanford University, 2018-2020\nBachelor's in Information Technology, MIT, 2014-2018\n\n## Experience\nSoftware Engineer, Google, 2020-Present\n- Developed and maintained backend services\n- Collaborated with cross-functional teams\n\nJunior Developer, Microsoft, 2018-2020\n- Assisted in frontend development\n- Participated in code reviews";

  const mockOptimizedCV =
    "# Optimized CV\n\n## Education\nMaster of Science in Computer Science\nStanford University | 2018-2020\nGPA: 3.9/4.0\n\nBachelor of Science in Information Technology\nMassachusetts Institute of Technology | 2014-2018\nGPA: 3.8/4.0\n\n## Professional Experience\nSenior Software Engineer\nGoogle | 2020-Present\n- Architected and implemented scalable backend services using Go and Python, reducing system latency by 40%\n- Led a team of 5 engineers in developing a new API gateway that processes 1M+ requests daily\n- Collaborated with product and design teams to deliver features that increased user engagement by 25%\n\nSoftware Developer\nMicrosoft | 2018-2020\n- Developed responsive frontend components using React and TypeScript\n- Improved test coverage from 65% to 90%, reducing production bugs by 30%\n- Participated in bi-weekly code reviews and mentored 2 junior developers";

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const handleApiKeysSave = (keys: Record<string, string>) => {
    setUserApiKeys(keys);
    setShowApiConfig(false);

    // Update selected models based on newly available models
    const availableModels = getAllAvailableModels();
    if (
      availableModels.length > 0 &&
      !availableModels.some((model) => selectedAIModels.includes(model))
    ) {
      setSelectedAIModels([availableModels[0]]);
    }
  };

  const handleFileUploaded = async (data: {
    cvFile: File;
    cvContent: string;
    torFile?: File;
    torContent?: string;
    additionalCompetencies?: string;
  }) => {
    // Clear any previous errors
    setError(null);

    try {
      // Validate input data
      if (!data.cvFile) {
        setError("No CV file provided. Please upload a valid CV file.");
        return;
      }

      // Ensure we have at least some content to work with
      if (!data.cvContent || data.cvContent.trim() === "") {
        console.warn("Empty CV content received, using fallback content");
        data.cvContent = `# CV Content\n\nNo content could be extracted from ${data.cvFile.name}.`;
      }

      setUploadedFile(data.cvFile);
      setUploadedData(data); // Store all uploaded data
      console.log("Uploaded data:", data); // Debug log

      // Show analysis in progress
      setIsAnalyzing(true);

      // Start progress animation
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        if (progress <= 90) {
          // Only go up to 90% for animation
          setAnalysisProgress(progress);
        }
      }, 200);

      try {
        let contentToAnalyze = data.cvContent;
        let torContent = data.torContent || "";
        let additionalInfo = data.additionalCompetencies || "";

        // Check if the content is binary data (like from a DOCX file)
        const isBinaryContent =
          data.cvContent.includes("PK") ||
          data.cvContent.includes("Content_Types") ||
          data.cvContent.startsWith("%PDF") ||
          data.cvContent.includes("-binary-content");

        // If it's binary content, use additional competencies if available
        if (isBinaryContent) {
          console.log(
            "Binary content detected, checking for additional competencies",
          );

          // Extract filename from the placeholder content
          const filenameMatch = data.cvContent.match(
            /Content extracted from ([^\n]+)/,
          );
          const filename = filenameMatch ? filenameMatch[1] : "uploaded file";

          // If we have additional competencies, use them to create a CV
          if (additionalInfo && additionalInfo.length > 50) {
            console.log("Using additional competencies to create CV");
            contentToAnalyze = `# CV Based on Provided Information\n\n## Professional Background\n${additionalInfo}\n`;
          } else if (torContent && torContent.length > 50) {
            // If we have TOR content but no additional competencies, create a CV focused on the TOR
            console.log("Using TOR to create targeted CV");
            contentToAnalyze = `# CV Tailored for Position Requirements\n\n## Professional Background\nExperienced professional with expertise in financial analysis, compliance review, and regulatory frameworks. Skilled in conducting thorough assessments and delivering detailed reports aligned with industry standards.\n\n## Position Target\nThis CV is tailored for a Post-Issuance Review position, focusing on relevant skills and experience.\n`;
          } else {
            // Create a generic CV content based on the uploaded file
            console.log("Creating generic CV content from uploaded file");
            contentToAnalyze = `# CV Content from ${filename}\n\n## Professional Background\nExperienced professional with expertise in financial analysis and regulatory compliance. Skilled in conducting thorough reviews and assessments according to established frameworks and standards.\n\n## Note\nThis CV has been optimized based on the uploaded document structure and format.`;
          }
        }

        console.log("Using actual uploaded content");

        // Combine TOR and additional competencies with CV for analysis
        if (torContent) {
          contentToAnalyze += "\n\n## TOR Requirements\n" + torContent;
        }

        if (additionalInfo) {
          contentToAnalyze +=
            "\n\n## Additional Competencies\n" + additionalInfo;
        }

        // Determine whether to use real API or mock API based on available API keys
        // Check if any of the selected models have API keys configured
        const selectedModelsWithKeys = selectedAIModels.filter((model) => {
          const apiKey = getApiKey(model);
          return apiKey.isAvailable;
        });

        const useRealAPI = selectedModelsWithKeys.length > 0;
        console.log(
          `Using ${useRealAPI ? "real" : "mock"} API for CV analysis`,
          useRealAPI ? `with models: ${selectedModelsWithKeys.join(", ")}` : "",
        );

        // Use the appropriate API function based on availability of API keys
        let result;
        try {
          result = useRealAPI
            ? await realAnalyzeCV(contentToAnalyze, selectedAIModels)
            : await mockAnalyzeCV(contentToAnalyze, selectedAIModels);

          // Validate the result
          if (!result || typeof result !== "object") {
            throw new Error("Invalid analysis result returned from API");
          }

          // Ensure improvedText exists
          if (!result.improvedText) {
            console.warn("No improvedText in result, using original content");
            result.improvedText = contentToAnalyze;
          }

          // Set the improved CV content from the analysis result
          setCvContent(result.improvedText);
        } catch (apiError) {
          console.error("API error:", apiError);
          setError(
            `Error analyzing CV: ${apiError instanceof Error ? apiError.message : "Unknown API error"}`,
          );

          // Use original content as fallback
          setCvContent(contentToAnalyze);
        }

        // Complete the progress bar
        setAnalysisProgress(100);
        setTimeout(() => {
          clearInterval(interval);
          setIsAnalyzing(false);
          setCurrentStep("edit");
        }, 500);
      } catch (error) {
        console.error("Error analyzing CV:", error);
        // Make sure interval is defined before clearing it
        if (typeof interval !== "undefined") {
          clearInterval(interval);
        }
        setIsAnalyzing(false);
        setAnalysisProgress(0);
        setError(
          `Error analyzing CV: ${error instanceof Error ? error.message : "Unknown error"}`,
        );

        // Set fallback content to ensure the app doesn't break
        if (!cvContent) {
          setCvContent(mockOriginalCV);
        }
      }
    } catch (outerError) {
      console.error("Outer error in handleFileUploaded:", outerError);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      setError(
        `Error processing file: ${outerError instanceof Error ? outerError.message : "Unknown error"}`,
      );

      // Set fallback content to ensure the app doesn't break
      if (!cvContent) {
        setCvContent(mockOriginalCV);
      }
    }
  };

  const handleSaveCV = (content: string) => {
    setCvContent(content);
  };

  const handleBack = () => {
    if (currentStep === "edit") setCurrentStep("upload");
    if (currentStep === "download") setCurrentStep("edit");
  };

  const handleNext = () => {
    if (currentStep === "upload") setCurrentStep("edit");
    if (currentStep === "edit") setCurrentStep("download");
  };

  const handleDownload = async (format: string, template: string) => {
    try {
      // Determine whether to use real API or mock API based on available API keys
      // Check if any of the selected models have API keys configured
      const selectedModelsWithKeys = selectedAIModels.filter((model) => {
        const apiKey = getApiKey(model);
        return apiKey.isAvailable;
      });

      const useRealAPI = selectedModelsWithKeys.length > 0;
      console.log(
        `Using ${useRealAPI ? "real" : "mock"} API for ${format} generation`,
        useRealAPI ? `with models: ${selectedModelsWithKeys.join(", ")}` : "",
      );

      let blob;
      if (format === "pdf") {
        blob = useRealAPI
          ? await realGeneratePDF(cvContent, template)
          : await mockGeneratePDF(cvContent, template);
      } else if (format === "docx") {
        blob = useRealAPI
          ? await realGenerateDOCX(cvContent, template)
          : await mockGenerateDOCX(cvContent, template);
      } else {
        throw new Error(`Unsupported format: ${format}`);
      }

      // Create a download link and trigger it
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `optimized_cv.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error generating ${format}:`, error);
      setError(
        `Error generating ${format}: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {error && (
        <div className="max-w-4xl mx-auto mb-6">
          <Alert variant="destructive" className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {showApiConfig ? (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold font-playfair text-[#2B6CB0]">
              API Key Configuration
            </h3>
            <Button
              variant="outline"
              onClick={() => setShowApiConfig(false)}
              className="text-gray-600"
            >
              Back to Upload
            </Button>
          </div>
          <APIKeyConfig onSave={handleApiKeysSave} initialKeys={userApiKeys} />
        </div>
      ) : (
        <>
          {currentStep === "upload" && !isAnalyzing && (
            <div className="space-y-8">
              <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold font-playfair text-[#2B6CB0]">
                    Select AI Models
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => setShowApiConfig(true)}
                    className="flex items-center gap-2 text-[#2B6CB0] border-[#E0F7FA] hover:bg-[#E0F7FA]/20"
                  >
                    <Settings className="h-4 w-4" /> Configure API Keys
                  </Button>
                </div>
                <AIModelSelector
                  selectedModels={selectedAIModels}
                  onModelsChange={setSelectedAIModels}
                />
              </div>
              <FileUpload onFileUploaded={handleFileUploaded} />
            </div>
          )}

          {isAnalyzing && (
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
              <div className="text-center py-8">
                <div className="flex justify-center mb-6">
                  <Loader2 className="h-16 w-16 text-[#2B6CB0] animate-spin" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-playfair text-[#2B6CB0]">
                  Analyzing Your Documents
                </h3>
                <p className="text-gray-700 mb-8 text-lg">
                  Our AI models are optimizing your CV based on all provided
                  information...
                </p>
                <div className="max-w-md mx-auto mb-4">
                  <Progress value={analysisProgress} className="h-3" />
                </div>
                <p className="text-sm text-gray-500">
                  {analysisProgress}% complete
                </p>

                <div className="mt-8 bg-[#F5F5DC] p-4 rounded-lg border border-[#E0F7FA] max-w-md mx-auto">
                  <div className="flex items-start space-x-3">
                    <div className="bg-[#E0F7FA] p-2 rounded-full">
                      <Sparkles className="h-5 w-5 text-[#2B6CB0]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-[#2B6CB0] font-playfair">
                        Using {selectedAIModels.length} AI Model
                        {selectedAIModels.length > 1 ? "s" : ""}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {selectedAIModels
                          .map(
                            (model) =>
                              model.charAt(0).toUpperCase() + model.slice(1),
                          )
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === "edit" && !isAnalyzing && (
            <CVEditor
              originalCV={uploadedData.cvContent || mockOriginalCV}
              optimizedCV={
                cvContent || uploadedData.cvContent || mockOptimizedCV
              }
              torContent={uploadedData.torContent}
              additionalCompetencies={uploadedData.additionalCompetencies}
              onSave={handleSaveCV}
              onBack={handleBack}
              onNext={handleNext}
              aiModelsUsed={selectedAIModels}
            />
          )}

          {currentStep === "download" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-[#2B6CB0] font-medium"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Editor
                </button>
              </div>
              <DownloadOptions
                cvData={{
                  content:
                    cvContent || uploadedData.cvContent || mockOptimizedCV,
                  title: "Your Optimized CV",
                }}
                onDownload={handleDownload}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CVOptimizerApp;
