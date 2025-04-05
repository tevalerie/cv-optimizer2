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
import { Download, FileType2 } from "lucide-react";

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

  const handleDownload = () => {
    onDownload(selectedFormat, selectedTemplate);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white">
      <Card className="w-full shadow-md">
        <CardHeader className="bg-[#2B6CB0] text-white">
          <CardTitle className="font-montserrat text-xl">
            Download Your Optimized CV
          </CardTitle>
          <CardDescription className="text-gray-100">
            Choose your preferred template and format
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 font-montserrat">
                Select Template
              </h3>
              <Tabs
                defaultValue={selectedTemplate}
                onValueChange={setSelectedTemplate}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="eu">EU Template</TabsTrigger>
                  <TabsTrigger value="worldbank">
                    World Bank Template
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="eu" className="mt-4">
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="aspect-w-8 aspect-h-11 bg-white border shadow-sm mb-3">
                      <div className="p-4">
                        <div className="h-8 bg-[#2B6CB0] mb-4 rounded"></div>
                        <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
                        <div className="h-4 bg-gray-200 w-1/2 mb-6 rounded"></div>
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="h-3 bg-gray-200 rounded"
                              ></div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-center">EU Standard Format</p>
                  </div>
                </TabsContent>
                <TabsContent value="worldbank" className="mt-4">
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="aspect-w-8 aspect-h-11 bg-white border shadow-sm mb-3">
                      <div className="p-4">
                        <div className="h-8 bg-gray-800 mb-4 rounded"></div>
                        <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
                        <div className="h-4 bg-gray-200 w-1/2 mb-6 rounded"></div>
                        <div className="space-y-2">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div
                                key={i}
                                className="h-3 bg-gray-200 rounded"
                              ></div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-center">World Bank Format</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 font-montserrat">
                Select Format
              </h3>
              <Tabs
                defaultValue={selectedFormat}
                onValueChange={setSelectedFormat}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pdf">PDF</TabsTrigger>
                  <TabsTrigger value="docx">DOCX</TabsTrigger>
                </TabsList>
                <TabsContent value="pdf" className="mt-4">
                  <div className="flex items-center p-4 border rounded-md bg-gray-50">
                    <Download className="h-8 w-8 text-[#2B6CB0] mr-3" />
                    <div>
                      <h4 className="font-medium">PDF Format</h4>
                      <p className="text-sm text-gray-500">
                        Best for sharing and printing
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="docx" className="mt-4">
                  <div className="flex items-center p-4 border rounded-md bg-gray-50">
                    <FileType2 className="h-8 w-8 text-[#2B6CB0] mr-3" />
                    <div>
                      <h4 className="font-medium">DOCX Format</h4>
                      <p className="text-sm text-gray-500">
                        Editable in Microsoft Word
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="text-lg font-semibold mb-2 font-montserrat">
                Final Review
              </h3>
              <p className="text-sm mb-4">
                You're about to download:{" "}
                <span className="font-medium">{cvData.title}</span>
              </p>
              <div className="text-xs text-gray-500 mb-4 max-h-24 overflow-y-auto p-2 border rounded bg-white">
                {cvData.content}
              </div>
              <p className="text-xs text-gray-500">
                Template:{" "}
                {selectedTemplate === "eu" ? "EU Standard" : "World Bank"} |
                Format: {selectedFormat.toUpperCase()}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t p-4">
          <Button variant="outline">Cancel</Button>
          <Button
            className="bg-[#E0F7FA] hover:bg-[#B2EBF2] text-[#2B6CB0]"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download {selectedFormat.toUpperCase()}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DownloadOptions;
