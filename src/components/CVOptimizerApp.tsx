import React, { useState } from "react";
import FileUpload from "./FileUpload";
import CVEditor from "./CVEditor";
import DownloadOptions from "./DownloadOptions";
import AIModelSelector, { AIModel, AIModels } from "./AIModelSelector";
import { Progress } from "./ui/progress";
import { Loader2, Sparkles } from "lucide-react";

type Step = "upload" | "edit" | "download";

export const CVOptimizerApp = () => {
  const [currentStep, setCurrentStep] = useState<Step>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [cvContent, setCvContent] = useState<string>("");
  const [selectedAIModels, setSelectedAIModels] = useState<AIModels>([
    "openai",
  ]);

  // Mock data for demonstration
  const mockOriginalCV =
    "# Original CV\n\n## Education\nMaster's in Computer Science, Stanford University, 2018-2020\nBachelor's in Information Technology, MIT, 2014-2018\n\n## Experience\nSoftware Engineer, Google, 2020-Present\n- Developed and maintained backend services\n- Collaborated with cross-functional teams\n\nJunior Developer, Microsoft, 2018-2020\n- Assisted in frontend development\n- Participated in code reviews";

  const mockOptimizedCV =
    "# Optimized CV\n\n## Education\nMaster of Science in Computer Science\nStanford University | 2018-2020\nGPA: 3.9/4.0\n\nBachelor of Science in Information Technology\nMassachusetts Institute of Technology | 2014-2018\nGPA: 3.8/4.0\n\n## Professional Experience\nSenior Software Engineer\nGoogle | 2020-Present\n- Architected and implemented scalable backend services using Go and Python, reducing system latency by 40%\n- Led a team of 5 engineers in developing a new API gateway that processes 1M+ requests daily\n- Collaborated with product and design teams to deliver features that increased user engagement by 25%\n\nSoftware Developer\nMicrosoft | 2018-2020\n- Developed responsive frontend components using React and TypeScript\n- Improved test coverage from 65% to 90%, reducing production bugs by 30%\n- Participated in bi-weekly code reviews and mentored 2 junior developers";

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const handleFileUploaded = (data: {
    cvFile: File;
    cvContent: string;
    torFile?: File;
    torContent?: string;
    additionalCompetencies?: string;
  }) => {
    setUploadedFile(data.cvFile);
    // Show analysis in progress
    setIsAnalyzing(true);

    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setAnalysisProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // In a real app, we would process all the files here
        // For now, we'll use the mock data
        setCvContent(mockOptimizedCV);
        setIsAnalyzing(false);
        setCurrentStep("edit");
      }
    }, 200);
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

  const handleDownload = (format: string, template: string) => {
    console.log(`Downloading ${format} with ${template} template`);
    // In a real app, we would generate and download the file here
    alert(
      `Your CV has been downloaded as ${format.toUpperCase()} using the ${template} template.`,
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {currentStep === "upload" && !isAnalyzing && (
        <div className="space-y-8">
          <AIModelSelector
            selectedModels={selectedAIModels}
            onModelsChange={setSelectedAIModels}
          />
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

      {currentStep === "edit" && (
        <CVEditor
          originalCV={mockOriginalCV}
          optimizedCV={cvContent}
          onSave={handleSaveCV}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}

      {currentStep === "download" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#2B6CB0] font-medium"
            >
              ← Back to Editor
            </button>
          </div>
          <DownloadOptions
            cvData={{
              content: cvContent,
              title: "Your Optimized CV",
            }}
            onDownload={handleDownload}
          />
        </div>
      )}
    </div>
  );
};

export default CVOptimizerApp;
