import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  FileDown,
  CheckCircle,
  AlertCircle,
  Sparkles,
  BookOpen,
  Briefcase,
  Award,
} from "lucide-react";

interface CVEditorProps {
  originalCV?: string;
  optimizedCV?: string;
  torContent?: string;
  additionalCompetencies?: string;
  onSave?: (content: string) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const CVEditor = ({
  originalCV = "# Original CV\n\n## Education\nMaster's in Computer Science, Stanford University, 2018-2020\nBachelor's in Information Technology, MIT, 2014-2018\n\n## Experience\nSoftware Engineer, Google, 2020-Present\n- Developed and maintained backend services\n- Collaborated with cross-functional teams\n\nJunior Developer, Microsoft, 2018-2020\n- Assisted in frontend development\n- Participated in code reviews",
  optimizedCV = "# Optimized CV\n\n## Education\nMaster of Science in Computer Science\nStanford University | 2018-2020\nGPA: 3.9/4.0\n\nBachelor of Science in Information Technology\nMassachusetts Institute of Technology | 2014-2018\nGPA: 3.8/4.0\n\n## Professional Experience\nSenior Software Engineer\nGoogle | 2020-Present\n- Architected and implemented scalable backend services using Go and Python, reducing system latency by 40%\n- Led a team of 5 engineers in developing a new API gateway that processes 1M+ requests daily\n- Collaborated with product and design teams to deliver features that increased user engagement by 25%\n\nSoftware Developer\nMicrosoft | 2018-2020\n- Developed responsive frontend components using React and TypeScript\n- Improved test coverage from 65% to 90%, reducing production bugs by 30%\n- Participated in bi-weekly code reviews and mentored 2 junior developers",
  torContent = "",
  additionalCompetencies = "",
  onSave = () => {},
  onBack = () => {},
  onNext = () => {},
}: CVEditorProps) => {
  const [editedCV, setEditedCV] = useState(optimizedCV);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [activeTab, setActiveTab] = useState("edit");
  const [isBinaryContent, setIsBinaryContent] = useState(false);

  // Check if content appears to be binary data
  useEffect(() => {
    const checkBinaryContent = () => {
      if (
        originalCV.includes("PK") ||
        originalCV.includes("Content_Types") ||
        originalCV.startsWith("%PDF")
      ) {
        setIsBinaryContent(true);
      } else {
        setIsBinaryContent(false);
      }
    };

    checkBinaryContent();
  }, [originalCV]);

  const handleSave = () => {
    onSave(editedCV);
  };

  // Add AI suggestions for CV improvements
  const [aiSuggestions] = useState([
    {
      section: "Professional Summary",
      suggestion: "Add quantifiable achievements to highlight your impact",
    },
    {
      section: "Experience",
      suggestion: "Include specific metrics and outcomes for each role",
    },
    {
      section: "Skills",
      suggestion: "Prioritize skills mentioned in the job description",
    },
    {
      section: "Education",
      suggestion: "Add relevant coursework and academic achievements",
    },
  ]);

  // Add animation effect when component mounts
  useEffect(() => {
    // This would be used for animations in a real implementation
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-8 border-b border-[#E0F7FA] pb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#2B6CB0] font-playfair mb-2">
            AI-Powered CV Optimization
          </h1>
          <p className="text-gray-600">
            Edit and refine your CV with AI-generated suggestions
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 border-[#2B6CB0] text-[#2B6CB0]"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            onClick={onNext}
            className="flex items-center gap-2 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
          >
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isBinaryContent && (
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">
            Binary File Detected
          </AlertTitle>
          <AlertDescription className="text-amber-700">
            Your uploaded file appears to be in a binary format (DOCX/PDF). The
            system is using placeholder content for demonstration. In a
            production environment, we would use proper document parsing
            libraries.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-[#F5F5DC] p-4 rounded-lg mb-6 border border-[#E0F7FA]">
        <div className="flex items-start space-x-3">
          <div className="bg-[#E0F7FA] p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-[#2B6CB0]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#2B6CB0] font-playfair">
              AI Optimization Complete
            </h3>
            <p className="text-sm text-gray-700">
              Your CV has been analyzed and optimized. Review the suggestions
              and edit as needed.
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="edit" className="font-medium">
            <BookOpen className="mr-2 h-4 w-4" /> Edit Content
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="font-medium">
            <Sparkles className="mr-2 h-4 w-4" /> AI Suggestions
          </TabsTrigger>
          <TabsTrigger value="preview" className="font-medium">
            <FileDown className="mr-2 h-4 w-4" /> Preview & Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-full shadow-md border-[#E0F7FA]">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" /> Original CV
                </CardTitle>
                <CardDescription>Your uploaded CV content</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] p-4">
                  <div className="font-mono whitespace-pre-wrap">
                    {isBinaryContent ? (
                      <div className="text-gray-700">
                        <p className="mb-4">
                          Binary file content detected. Showing placeholder
                          content instead.
                        </p>
                        <p className="mb-2">
                          File name:{" "}
                          {originalCV.includes("docx")
                            ? "document.docx"
                            : "document.pdf"}
                        </p>
                        <p>
                          For demonstration purposes, the system is using sample
                          CV content for processing.
                        </p>
                      </div>
                    ) : (
                      originalCV
                    )}

                    {torContent && (
                      <>
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <h3 className="text-lg font-semibold text-[#2B6CB0] mb-2">
                            TOR Requirements
                          </h3>
                          <div className="text-gray-700">{torContent}</div>
                        </div>
                      </>
                    )}

                    {additionalCompetencies && (
                      <>
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <h3 className="text-lg font-semibold text-[#2B6CB0] mb-2">
                            Additional Competencies
                          </h3>
                          <div className="text-gray-700">
                            {additionalCompetencies}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="h-full shadow-md border-[#E0F7FA]">
              <CardHeader className="bg-[#F5F5DC] border-b">
                <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" /> AI-Optimized CV
                </CardTitle>
                <CardDescription>
                  Edit the optimized content as needed
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Textarea
                  className="min-h-[500px] font-mono border-[#E0F7FA] p-4"
                  value={editedCV}
                  onChange={(e) => setEditedCV(e.target.value)}
                />
              </CardContent>
              <CardFooter className="bg-gray-50 border-t flex justify-end">
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
                >
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <Card className="shadow-md border-[#E0F7FA]">
            <CardHeader className="bg-[#F5F5DC] border-b">
              <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
                <Award className="mr-2 h-5 w-5" /> AI Enhancement Suggestions
              </CardTitle>
              <CardDescription>
                Our AI has analyzed your CV and provided these recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {aiSuggestions.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-[#E0F7FA] shadow-sm"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-[#E0F7FA] p-2 rounded-full mt-1">
                        <CheckCircle className="h-4 w-4 text-[#2B6CB0]" />
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-[#2B6CB0] mr-2">
                            {item.section}
                          </h4>
                          <Badge
                            variant="outline"
                            className="bg-[#E0F7FA]/30 text-[#2B6CB0] border-[#2B6CB0]"
                          >
                            Recommendation
                          </Badge>
                        </div>
                        <p className="text-gray-700">{item.suggestion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("edit")}
                className="border-[#2B6CB0] text-[#2B6CB0]"
              >
                Back to Editor
              </Button>
              <Button
                onClick={() => setActiveTab("preview")}
                className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
              >
                Preview Results <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card className="shadow-md border-[#E0F7FA]">
            <CardHeader className="bg-[#F5F5DC] border-b">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
                    <FileDown className="mr-2 h-5 w-5" /> CV Preview
                  </CardTitle>
                  <CardDescription>
                    Preview your optimized CV with different templates
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Template:</span>
                    <Select
                      value={selectedTemplate}
                      onValueChange={setSelectedTemplate}
                    >
                      <SelectTrigger className="w-[180px] border-[#2B6CB0]">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="eu">EU Format</SelectItem>
                        <SelectItem value="worldbank">World Bank</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="flex items-center gap-2 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]">
                    <FileDown className="h-4 w-4" /> Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-white p-8 min-h-[600px] font-work-sans shadow-inner">
                {/* Preview content with proper formatting */}
                <div className="prose max-w-none">
                  {editedCV.split("\n").map((line, index) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1
                          key={index}
                          className="text-2xl font-bold mb-4 text-[#2B6CB0] font-playfair"
                        >
                          {line.substring(2)}
                        </h1>
                      );
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-xl font-semibold mt-6 mb-3 text-[#2B6CB0] font-playfair border-b border-[#E0F7FA] pb-2"
                        >
                          {line.substring(3)}
                        </h2>
                      );
                    } else if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-6 mb-2 text-gray-700">
                          {line.substring(2)}
                        </li>
                      );
                    } else if (line === "") {
                      return <br key={index} />;
                    } else {
                      return (
                        <p key={index} className="mb-2 text-gray-700">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("suggestions")}
                className="border-[#2B6CB0] text-[#2B6CB0]"
              >
                Back to Suggestions
              </Button>
              <Button
                onClick={onNext}
                className="bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
              >
                Continue to Download <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVEditor;
