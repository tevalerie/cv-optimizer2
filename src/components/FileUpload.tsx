import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  FileUp,
  Plus,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";
import {
  extractTextFromFile,
  processCVContent,
  processTORContent,
} from "@/lib/file-processor";

interface FileUploadProps {
  onFileUploaded?: (data: {
    cvFile: File;
    cvContent: string;
    torFile?: File;
    torContent?: string;
    additionalCompetencies?: string;
  }) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

const FileUpload = ({
  onFileUploaded = () => {},
  acceptedFileTypes = [".pdf", ".doc", ".docx", ".txt"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
}: FileUploadProps) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [torFile, setTorFile] = useState<File | null>(null);
  const [cvContent, setCvContent] = useState<string>("");
  const [torContent, setTorContent] = useState<string>("");
  const [additionalCompetencies, setAdditionalCompetencies] =
    useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("cv");

  // Function to process CV file
  const processCvFile = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(10);

      // Extract text from the file using our utility function
      const extractedText = await extractTextFromFile(file);
      setUploadProgress(50);

      // Process the extracted text
      const processedContent = processCVContent(extractedText);
      setUploadProgress(90);

      setCvContent(processedContent);
      setUploadProgress(100);
      setIsUploading(false);
      setIsSuccess(true);
      return processedContent;
    } catch (error) {
      console.error("Error processing CV file:", error);
      setError("Failed to read CV file content. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
      return "";
    }
  };

  // Function to process TOR file
  const processTorFile = async (file: File) => {
    try {
      // Show loading state for TOR processing
      const tempProgress = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 5, 95));
      }, 100);

      // Extract text from the file using our utility function
      const extractedText = await extractTextFromFile(file);

      // Process the extracted text
      const processedContent = processTORContent(extractedText);

      // Clear the interval and complete the progress
      clearInterval(tempProgress);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 500);

      setTorContent(processedContent);
      return processedContent;
    } catch (error) {
      console.error("Error processing TOR file:", error);
      setError("Failed to read TOR file content. Please try again.");
      setUploadProgress(0);
      return "";
    }
  };

  const onDropCv = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length === 0) {
        return;
      }

      const selectedFile = acceptedFiles[0];

      // Check file size
      if (selectedFile.size > maxFileSize) {
        setError(
          `File size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)}MB`,
        );
        return;
      }

      // Check file type
      const fileExtension = `.${selectedFile.name.split(".").pop()?.toLowerCase()}`;
      if (!acceptedFileTypes.includes(fileExtension)) {
        setError(
          `File type not supported. Please upload ${acceptedFileTypes.join(", ")} files.`,
        );
        return;
      }

      setCvFile(selectedFile);
      await processCvFile(selectedFile);
    },
    [acceptedFileTypes, maxFileSize],
  );

  const onDropTor = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length === 0) {
        return;
      }

      const selectedFile = acceptedFiles[0];

      // Check file size
      if (selectedFile.size > maxFileSize) {
        setError(
          `File size exceeds the maximum limit of ${maxFileSize / (1024 * 1024)}MB`,
        );
        return;
      }

      // Check file type
      const fileExtension = `.${selectedFile.name.split(".").pop()?.toLowerCase()}`;
      if (!acceptedFileTypes.includes(fileExtension)) {
        setError(
          `File type not supported. Please upload ${acceptedFileTypes.join(", ")} files.`,
        );
        return;
      }

      setTorFile(selectedFile);
      await processTorFile(selectedFile);
    },
    [acceptedFileTypes, maxFileSize],
  );

  const {
    getRootProps: getCvRootProps,
    getInputProps: getCvInputProps,
    isDragActive: isCvDragActive,
  } = useDropzone({
    onDrop: onDropCv,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  const {
    getRootProps: getTorRootProps,
    getInputProps: getTorInputProps,
    isDragActive: isTorDragActive,
  } = useDropzone({
    onDrop: onDropTor,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  const resetUpload = () => {
    setCvFile(null);
    setTorFile(null);
    setCvContent("");
    setTorContent("");
    setAdditionalCompetencies("");
    setError(null);
    setIsUploading(false);
    setUploadProgress(0);
    setIsSuccess(false);
  };

  const handleContinue = () => {
    if (cvFile) {
      onFileUploaded({
        cvFile,
        cvContent,
        torFile: torFile || undefined,
        torContent: torContent || undefined,
        additionalCompetencies: additionalCompetencies || undefined,
      });
    }
  };

  // Function to handle CV upload success
  const handleCVUploadSuccess = () => {
    setIsSuccess(false); // Hide the success message
    setActiveTab("tor"); // Navigate to TOR tab
  };

  // Function to process the CV file with loading indicator
  const processCvWithLoading = async () => {
    if (!cvFile) return;

    try {
      await processCvFile(cvFile);
    } catch (error) {
      console.error("Error in processCvWithLoading:", error);
      setError("An error occurred while processing your CV. Please try again.");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#2B6CB0] mb-6 font-playfair">
        Q-Genics AI CV Optimizer
      </h2>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSuccess ? (
        <div className="text-center py-8 bg-[#F5F5DC] rounded-xl border border-[#E0F7FA] p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-[#2B6CB0]" />
          </div>
          <h3 className="text-2xl font-bold mb-4 font-playfair text-[#2B6CB0]">
            CV Upload Successful!
          </h3>
          <p className="text-gray-700 mb-8 text-lg">
            Your CV has been uploaded and processed successfully.
          </p>
          <div className="flex justify-center space-x-6">
            <Button
              onClick={resetUpload}
              variant="outline"
              className="px-6 py-3 text-[#2B6CB0] border-[#2B6CB0] hover:bg-[#F5F5DC] font-medium"
            >
              Upload Different CV
            </Button>
            <Button
              onClick={handleCVUploadSuccess}
              className="px-6 py-3 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2] font-medium"
            >
              Continue to TOR Upload
            </Button>
          </div>
        </div>
      ) : isUploading ? (
        <div className="py-8 bg-white rounded-xl border border-[#E0F7FA] p-8">
          <div className="flex items-center justify-center mb-6">
            <Loader2 className="h-12 w-12 text-[#2B6CB0] animate-spin" />
          </div>
          <p className="text-center text-gray-700 mb-6 text-lg font-medium">
            Processing {cvFile?.name}...
          </p>
          <Progress
            value={uploadProgress}
            className="mb-4 h-3"
            indicatorClassName="bg-[#2B6CB0]"
          />
          <p className="text-center text-sm text-gray-500">
            {uploadProgress}% complete
          </p>
        </div>
      ) : (
        <Tabs
          defaultValue="cv"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="cv" className="font-medium">
              <FileText className="mr-2 h-4 w-4" /> CV Upload
            </TabsTrigger>
            <TabsTrigger value="tor" className="font-medium" disabled={!cvFile}>
              <BookOpen className="mr-2 h-4 w-4" /> TOR Upload
            </TabsTrigger>
            <TabsTrigger
              value="competencies"
              className="font-medium"
              disabled={!cvFile}
            >
              <Briefcase className="mr-2 h-4 w-4" /> Additional Competencies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cv" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2B6CB0] font-playfair">
                  Upload Your CV
                </CardTitle>
                <CardDescription>
                  Upload your current CV to be analyzed and optimized
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getCvRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
                    isCvDragActive
                      ? "border-[#2B6CB0] bg-[#E0F7FA]/30"
                      : "border-gray-300 hover:border-[#2B6CB0] hover:bg-[#E0F7FA]/10",
                    cvFile && "border-green-500 bg-green-50",
                  )}
                >
                  <input {...getCvInputProps()} />
                  <div className="flex justify-center mb-6">
                    {cvFile ? (
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    ) : (
                      <Upload className="h-16 w-16 text-[#2B6CB0]" />
                    )}
                  </div>
                  {cvFile ? (
                    <>
                      <h3 className="text-xl font-medium mb-2 text-green-700">
                        CV Uploaded Successfully
                      </h3>
                      <p className="text-gray-600 mb-2">{cvFile.name}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-medium mb-3">
                        Drag & drop your CV here
                      </h3>
                      <p className="text-gray-600 mb-6">
                        or click to browse files
                      </p>
                    </>
                  )}

                  <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
                    <FileText className="h-4 w-4" />
                    <span>
                      Accepted formats: {acceptedFileTypes.join(", ")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum file size: {maxFileSize / (1024 * 1024)}MB
                  </p>
                </div>

                {cvFile && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={processCvWithLoading}
                      className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
                    >
                      Process CV <FileUp className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tor" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2B6CB0] font-playfair">
                  Upload Terms of Reference (TOR)
                </CardTitle>
                <CardDescription>
                  Upload the TOR document to tailor your CV to specific
                  requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getTorRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors",
                    isTorDragActive
                      ? "border-[#2B6CB0] bg-[#E0F7FA]/30"
                      : "border-gray-300 hover:border-[#2B6CB0] hover:bg-[#E0F7FA]/10",
                    torFile && "border-green-500 bg-green-50",
                  )}
                >
                  <input {...getTorInputProps()} />
                  <div className="flex justify-center mb-6">
                    {torFile ? (
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    ) : (
                      <BookOpen className="h-16 w-16 text-[#2B6CB0]" />
                    )}
                  </div>
                  {torFile ? (
                    <>
                      <h3 className="text-xl font-medium mb-2 text-green-700">
                        TOR Uploaded Successfully
                      </h3>
                      <p className="text-gray-600 mb-2">{torFile.name}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-medium mb-3">
                        Drag & drop your TOR here
                      </h3>
                      <p className="text-gray-600 mb-6">
                        or click to browse files
                      </p>
                    </>
                  )}

                  <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
                    <FileText className="h-4 w-4" />
                    <span>
                      Accepted formats: {acceptedFileTypes.join(", ")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum file size: {maxFileSize / (1024 * 1024)}MB
                  </p>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button
                    onClick={() => setActiveTab("cv")}
                    variant="outline"
                    className="border-[#2B6CB0] text-[#2B6CB0]"
                  >
                    Back to CV Upload
                  </Button>
                  <Button
                    onClick={() => setActiveTab("competencies")}
                    className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
                  >
                    {torFile
                      ? "Continue to Additional Competencies"
                      : "Skip (Optional)"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competencies" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#2B6CB0] font-playfair">
                  Additional Competencies
                </CardTitle>
                <CardDescription>
                  Add any additional skills or experiences not included in your
                  CV
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter additional competencies, skills, or experiences here..."
                  className="min-h-[200px] p-4"
                  value={additionalCompetencies}
                  onChange={(e) => setAdditionalCompetencies(e.target.value)}
                />

                <div className="mt-6 flex justify-between">
                  <Button
                    onClick={() => setActiveTab("tor")}
                    variant="outline"
                    className="border-[#2B6CB0] text-[#2B6CB0]"
                  >
                    Back to TOR Upload
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
                    disabled={!cvFile}
                  >
                    Start Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <div className="mt-8 bg-[#F5F5DC] p-6 rounded-lg border border-[#E0F7FA]">
        <h3 className="text-lg font-medium text-[#2B6CB0] mb-4 font-playfair">
          Tips for Optimal Results:
        </h3>
        <ul className="text-sm text-gray-700 space-y-3">
          <li className="flex items-start">
            <span className="inline-block bg-[#E0F7FA] text-[#2B6CB0] rounded-full p-1 mr-2">
              <CheckCircle className="h-4 w-4" />
            </span>
            Ensure your CV is up-to-date with your latest experience and
            achievements
          </li>
          <li className="flex items-start">
            <span className="inline-block bg-[#E0F7FA] text-[#2B6CB0] rounded-full p-1 mr-2">
              <CheckCircle className="h-4 w-4" />
            </span>
            Upload a TOR document to receive tailored optimization for specific
            positions
          </li>
          <li className="flex items-start">
            <span className="inline-block bg-[#E0F7FA] text-[#2B6CB0] rounded-full p-1 mr-2">
              <CheckCircle className="h-4 w-4" />
            </span>
            Include additional competencies that may not be explicitly mentioned
            in your CV
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
