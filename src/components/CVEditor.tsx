import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ArrowLeft, ArrowRight, Save, FileDown } from "lucide-react";

interface CVEditorProps {
  originalCV?: string;
  optimizedCV?: string;
  onSave?: (content: string) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const CVEditor = ({
  originalCV = "# Original CV\n\n## Education\nMaster's in Computer Science, Stanford University, 2018-2020\nBachelor's in Information Technology, MIT, 2014-2018\n\n## Experience\nSoftware Engineer, Google, 2020-Present\n- Developed and maintained backend services\n- Collaborated with cross-functional teams\n\nJunior Developer, Microsoft, 2018-2020\n- Assisted in frontend development\n- Participated in code reviews",
  optimizedCV = "# Optimized CV\n\n## Education\nMaster of Science in Computer Science\nStanford University | 2018-2020\nGPA: 3.9/4.0\n\nBachelor of Science in Information Technology\nMassachusetts Institute of Technology | 2014-2018\nGPA: 3.8/4.0\n\n## Professional Experience\nSenior Software Engineer\nGoogle | 2020-Present\n- Architected and implemented scalable backend services using Go and Python, reducing system latency by 40%\n- Led a team of 5 engineers in developing a new API gateway that processes 1M+ requests daily\n- Collaborated with product and design teams to deliver features that increased user engagement by 25%\n\nSoftware Developer\nMicrosoft | 2018-2020\n- Developed responsive frontend components using React and TypeScript\n- Improved test coverage from 65% to 90%, reducing production bugs by 30%\n- Participated in bi-weekly code reviews and mentored 2 junior developers",
  onSave = () => {},
  onBack = () => {},
  onNext = () => {},
}: CVEditorProps) => {
  const [editedCV, setEditedCV] = useState(optimizedCV);
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [activeTab, setActiveTab] = useState("edit");

  const handleSave = () => {
    onSave(editedCV);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#2B6CB0] font-montserrat">
          CV Optimizer
        </h1>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="edit">Edit Content</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-[#2B6CB0]">Original CV</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="h-[500px] font-mono"
                  value={originalCV}
                  readOnly
                />
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-[#2B6CB0]">Optimized CV</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="h-[500px] font-mono"
                  value={editedCV}
                  onChange={(e) => setEditedCV(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
            >
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-[#2B6CB0]">CV Preview</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Template:</span>
                    <Select
                      value={selectedTemplate}
                      onValueChange={setSelectedTemplate}
                    >
                      <SelectTrigger className="w-[180px]">
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
            <CardContent>
              <div className="bg-white border rounded-md p-8 min-h-[600px] font-open-sans">
                {/* Preview content would be rendered here with proper formatting */}
                <div className="prose max-w-none">
                  {editedCV.split("\n").map((line, index) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1 key={index} className="text-2xl font-bold mb-4">
                          {line.substring(2)}
                        </h1>
                      );
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2
                          key={index}
                          className="text-xl font-semibold mt-6 mb-3 text-[#2B6CB0]"
                        >
                          {line.substring(3)}
                        </h2>
                      );
                    } else if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="ml-6">
                          {line.substring(2)}
                        </li>
                      );
                    } else if (line === "") {
                      return <br key={index} />;
                    } else {
                      return (
                        <p key={index} className="mb-2">
                          {line}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CVEditor;
