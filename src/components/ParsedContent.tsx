import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ParsedContentProps {
  cvContent: string;
  torContent?: string;
  additionalCompetencies?: string;
}

const ParsedContent = ({
  cvContent,
  torContent,
  additionalCompetencies,
}: ParsedContentProps) => {
  return (
    <Card className="shadow-md border-[#E0F7FA] mt-6">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-[#2B6CB0] font-playfair">
          Parsed Document Content
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="cv" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="cv">CV Content</TabsTrigger>
            {torContent && <TabsTrigger value="tor">TOR Content</TabsTrigger>}
            {additionalCompetencies && (
              <TabsTrigger value="competencies">
                Additional Competencies
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="cv">
            <ScrollArea className="h-[300px] p-4">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {cvContent || "No CV content available"}
              </pre>
            </ScrollArea>
          </TabsContent>
          {torContent && (
            <TabsContent value="tor">
              <ScrollArea className="h-[300px] p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {torContent}
                </pre>
              </ScrollArea>
            </TabsContent>
          )}
          {additionalCompetencies && (
            <TabsContent value="competencies">
              <ScrollArea className="h-[300px] p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {additionalCompetencies}
                </pre>
              </ScrollArea>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ParsedContent;
