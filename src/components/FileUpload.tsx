import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Progress } from "./ui/progress";

interface FileUploadProps {
  onFileUploaded?: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

const FileUpload = ({
  onFileUploaded = () => {},
  acceptedFileTypes = [".pdf", ".doc", ".docx"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
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

      setFile(selectedFile);
      setIsUploading(true);

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsSuccess(true);
          onFileUploaded(selectedFile);
        }
      }, 300);
    },
    [acceptedFileTypes, maxFileSize, onFileUploaded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  const resetUpload = () => {
    setFile(null);
    setError(null);
    setIsUploading(false);
    setUploadProgress(0);
    setIsSuccess(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold text-[#2B6CB0] mb-4 font-montserrat">
        Upload Your CV
      </h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isSuccess ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">Upload Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your CV has been uploaded successfully.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={resetUpload} variant="outline">
              Upload Another File
            </Button>
            <Button className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]">
              Continue to Analysis
            </Button>
          </div>
        </div>
      ) : isUploading ? (
        <div className="py-8">
          <div className="flex items-center justify-center mb-4">
            <Loader2 className="h-8 w-8 text-[#2B6CB0] animate-spin" />
          </div>
          <p className="text-center text-gray-700 mb-4">
            Uploading {file?.name}...
          </p>
          <Progress value={uploadProgress} className="mb-4" />
          <p className="text-center text-sm text-gray-500">
            {uploadProgress}% complete
          </p>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-[#2B6CB0] bg-blue-50"
              : "border-gray-300 hover:border-[#2B6CB0] hover:bg-blue-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex justify-center mb-4">
            <Upload className="h-12 w-12 text-[#2B6CB0]" />
          </div>
          <h3 className="text-lg font-medium mb-2">Drag & drop your CV here</h3>
          <p className="text-gray-600 mb-4">or click to browse files</p>

          <div className="flex justify-center items-center space-x-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            <span>Accepted formats: {acceptedFileTypes.join(", ")}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Maximum file size: {maxFileSize / (1024 * 1024)}MB
          </p>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Tips for better results:
        </h3>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Ensure your CV is up-to-date with your latest experience</li>
          <li>Make sure the document is not password protected</li>
          <li>For best results, use a clean, simple formatted document</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
