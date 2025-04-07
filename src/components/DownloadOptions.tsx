import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileType2,
  CheckCircle,
  ArrowLeft,
  FileDown,
  FileText,
  Sparkles,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface DownloadOptionsProps {
  cvData?: {
    content: string;
    title: string;
  };
  onDownload?: (format: string, template: string) => void;
}

const DownloadOptions = ({
  cvData = {
    content:
      "This is a sample CV content with professional experience and skills.",
    title: "John Doe - Software Engineer",
  },
  onDownload = (format, template) =>
    console.log(`Downloading ${format} with ${template} template`),
}: DownloadOptionsProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState("eu");
  const [selectedFormat, setSelectedFormat] = useState("pdf");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      await onDownload(selectedFormat, selectedTemplate);
      // Success - no need to do anything as the file should download
    } catch (error) {
      console.error(`Error downloading ${selectedFormat}:`, error);
      setDownloadError(
        `Unable to generate ${selectedFormat.toUpperCase()} file. ` +
          `Please try ${selectedFormat === "pdf" ? "DOCX" : "PDF"} format instead.`,
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white">
      <div className="bg-[#F5F5DC] p-4 rounded-lg mb-6 border border-[#E0F7FA]">
        <div className="flex items-start space-x-3">
          <div className="bg-[#E0F7FA] p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-[#2B6CB0]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#2B6CB0] font-playfair">
              Ready for Download
            </h3>
            <p className="text-sm text-gray-700">
              Your optimized CV is ready. Choose your preferred template and
              format below.
            </p>
          </div>
        </div>
      </div>

      <Card className="w-full shadow-md border-[#E0F7FA]">
        <CardHeader className="bg-[#2B6CB0] text-white">
          <CardTitle className="font-playfair text-xl flex items-center">
            <FileDown className="mr-2 h-5 w-5" /> Download Your Optimized CV
          </CardTitle>
          <CardDescription className="text-gray-100">
            Choose your preferred template and format
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 font-playfair text-[#2B6CB0] flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Select Template
              </h3>
              <Tabs
                defaultValue={selectedTemplate}
                onValueChange={setSelectedTemplate}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="eu" className="font-medium">
                    EU Template
                  </TabsTrigger>
                  <TabsTrigger value="worldbank" className="font-medium">
                    World Bank Template
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="eu" className="mt-4">
                  <div className="border rounded-md p-6 bg-gray-50 border-[#E0F7FA]">
                    <div className="aspect-w-8 aspect-h-11 bg-white border shadow-md mb-4 overflow-hidden rounded-md">
                      <div className="p-4">
                        <div className="h-10 bg-[#2B6CB0] mb-4 rounded-sm"></div>
                        <div className="h-5 bg-gray-200 w-3/4 mb-2 rounded-sm"></div>
                        <div className="h-5 bg-gray-200 w-1/2 mb-6 rounded-sm"></div>
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="h-3 bg-gray-200 rounded-sm"
                              ></div>
                            ))}
                        </div>
                        <div className="mt-6 h-6 bg-[#E0F7FA] rounded-sm"></div>
                        <div className="mt-4 space-y-2">
                          {Array(3)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="h-3 bg-gray-200 rounded-sm"
                              ></div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Badge className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#E0F7FA] border-[#2B6CB0]">
                        EU Standard Format
                      </Badge>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="worldbank" className="mt-4">
                  <div className="border rounded-md p-6 bg-gray-50 border-[#E0F7FA]">
                    <div className="aspect-w-8 aspect-h-11 bg-white border shadow-md mb-4 overflow-hidden rounded-md">
                      <div className="p-4">
                        <div className="h-10 bg-gray-800 mb-4 rounded-sm"></div>
                        <div className="h-5 bg-gray-200 w-3/4 mb-2 rounded-sm"></div>
                        <div className="h-5 bg-gray-200 w-1/2 mb-6 rounded-sm"></div>
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="h-3 bg-gray-200 rounded-sm"
                              ></div>
                            ))}
                        </div>
                        <div className="mt-6 h-6 bg-gray-800 rounded-sm"></div>
                        <div className="mt-4 space-y-2">
                          {Array(3)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="h-3 bg-gray-200 rounded-sm"
                              ></div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Badge className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#E0F7FA] border-[#2B6CB0]">
                        World Bank Format
                      </Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 font-playfair text-[#2B6CB0] flex items-center">
                <Download className="mr-2 h-5 w-5" /> Select Format
              </h3>
              <Tabs
                defaultValue={selectedFormat}
                onValueChange={setSelectedFormat}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pdf" className="font-medium">
                    PDF
                  </TabsTrigger>
                  <TabsTrigger value="docx" className="font-medium">
                    DOCX
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pdf" className="mt-4">
                  <div className="flex items-center p-6 border rounded-md bg-gray-50 border-[#E0F7FA]">
                    <div className="bg-[#E0F7FA] p-3 rounded-full mr-4">
                      <Download className="h-8 w-8 text-[#2B6CB0]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">PDF Format</h4>
                      <p className="text-sm text-gray-600">
                        Best for sharing and printing. Creates a professional
                        document that maintains consistent formatting across all
                        devices.
                      </p>
                      <div className="mt-2">
                        <Badge className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#E0F7FA] border-[#2B6CB0]">
                          Recommended
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="docx" className="mt-4">
                  <div className="flex items-center p-6 border rounded-md bg-gray-50 border-[#E0F7FA]">
                    <div className="bg-[#E0F7FA] p-3 rounded-full mr-4">
                      <FileType2 className="h-8 w-8 text-[#2B6CB0]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">DOCX Format</h4>
                      <p className="text-sm text-gray-600">
                        Editable in Microsoft Word. Perfect if you need to make
                        additional changes or adjustments to your CV after
                        downloading.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="p-6 border rounded-md bg-[#F5F5DC] border-[#E0F7FA]">
              <h3 className="text-lg font-semibold mb-3 font-playfair text-[#2B6CB0] flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> Final Review
              </h3>
              <p className="text-sm mb-4 text-gray-700">
                You're about to download:{" "}
                <span className="font-medium text-[#2B6CB0]">
                  {cvData.title || "Your Optimized CV"}
                </span>
              </p>
              <ScrollArea className="h-32 mb-4 border rounded-md bg-white p-3 shadow-inner">
                <div className="text-sm text-gray-700 whitespace-pre-wrap">
                  {typeof cvData.content === "string" &&
                  cvData.content.startsWith("{")
                    ? "Your optimized CV content is ready for download"
                    : cvData.content}
                </div>
              </ScrollArea>
              {downloadError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
                    <p>{downloadError}</p>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#E0F7FA] border-[#2B6CB0]">
                  Template:{" "}
                  {selectedTemplate === "eu" ? "EU Standard" : "World Bank"}
                </Badge>
                <Badge className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#E0F7FA] border-[#2B6CB0]">
                  Format: {selectedFormat.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between space-x-2 border-t p-4 bg-gray-50">
          <Button variant="outline" className="border-[#2B6CB0] text-[#2B6CB0]">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Editor
          </Button>
          <Button
            className="bg-[#E0F7FA] hover:bg-[#B2EBF2] text-[#2B6CB0] px-6 py-2 font-medium"
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download {selectedFormat.toUpperCase()}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DownloadOptions;
