import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extractTextFromBinaryMarker } from "@/lib/binary-content-extractor";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw } from "lucide-react";

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
  const [extractedCV, setExtractedCV] = useState("");
  const [extractedTOR, setExtractedTOR] = useState("");
  const [extractedCompetencies, setExtractedCompetencies] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);

  // Extract text from binary content markers on component mount
  useEffect(() => {
    if (cvContent) {
      setExtractedCV(extractTextFromBinaryMarker(cvContent));
    }
    if (torContent) {
      setExtractedTOR(extractTextFromBinaryMarker(torContent));
    }
    if (additionalCompetencies) {
      setExtractedCompetencies(
        extractTextFromBinaryMarker(additionalCompetencies),
      );
    }
  }, [cvContent, torContent, additionalCompetencies]);

  // Function to force re-extraction of content
  const handleRefreshExtraction = () => {
    setIsExtracting(true);
    setTimeout(() => {
      if (cvContent) {
        setExtractedCV(extractTextFromBinaryMarker(cvContent));
      }
      if (torContent) {
        setExtractedTOR(extractTextFromBinaryMarker(torContent));
      }
      if (additionalCompetencies) {
        setExtractedCompetencies(
          extractTextFromBinaryMarker(additionalCompetencies),
        );
      }
      setIsExtracting(false);
    }, 500);
  };

  return (
    <Card className="shadow-md border-[#E0F7FA] mt-6">
      <CardHeader className="bg-gray-50 border-b flex flex-row justify-between items-center">
        <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
          <FileText className="mr-2 h-5 w-5" /> Parsed Document Content
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefreshExtraction}
          disabled={isExtracting}
          className="flex items-center gap-2 border-[#2B6CB0] text-[#2B6CB0]"
        >
          <RefreshCw
            className={`h-4 w-4 ${isExtracting ? "animate-spin" : ""}`}
          />
          {isExtracting ? "Extracting..." : "Extract Content"}
        </Button>
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
                {extractedCV || cvContent || "No CV content available"}
              </pre>
            </ScrollArea>
          </TabsContent>
          {torContent && (
            <TabsContent value="tor">
              <ScrollArea className="h-[300px] p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {extractedTOR || torContent}
                </pre>
              </ScrollArea>
            </TabsContent>
          )}
          {additionalCompetencies && (
            <TabsContent value="competencies">
              <ScrollArea className="h-[300px] p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm">
                  {extractedCompetencies || additionalCompetencies}
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
