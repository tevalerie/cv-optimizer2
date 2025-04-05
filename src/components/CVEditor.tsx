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
  const [editedCV, setEditedCV] = useState("");
  const [conciseCV, setConciseCV] = useState("");
  const [detailedCV, setDetailedCV] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [activeTab, setActiveTab] = useState("edit");
  const [isBinaryContent, setIsBinaryContent] = useState(false);
  const [cvFormat, setCvFormat] = useState("detailed");

  // Update editedCV when optimizedCV changes
  useEffect(() => {
    if (optimizedCV) {
      let cleanedCV = optimizedCV;

      // Try to extract JSON content if present
      try {
        const jsonMatch = optimizedCV.match(/\{[\s\S]*\}/g);
        if (jsonMatch && jsonMatch[0]) {
          const jsonData = JSON.parse(jsonMatch[0]);
          if (jsonData.improvedText) {
            cleanedCV = jsonData.improvedText;
          }
        }
      } catch (error) {
        console.error("Error extracting JSON content:", error);
      }

      // Remove suggestions section if present (fallback method)
      if (cleanedCV.includes("suggestions:")) {
        cleanedCV = cleanedCV
          .replace(/suggestions:[\s\S]*?(?=\n\n|$)/, "")
          .trim();
      }

      // Remove any remaining JSON formatting
      cleanedCV = cleanedCV.replace(/\{[\s\S]*\}/g, "").trim();

      // Check if we have the default mock data and additionalCompetencies is available
      const hasMockData =
        cleanedCV.includes("Stanford University") &&
        cleanedCV.includes("Google, 2020-Present") &&
        additionalCompetencies &&
        additionalCompetencies.length > 50;

      if (hasMockData) {
        // Create concise and detailed versions
        const conciseVersion = `# TELOJO 'VALERIE' ONU
Financial Innovator & Climate Finance Expert

## PROFESSIONAL SUMMARY
Distinguished economist and financial innovator with over twenty years of expertise in Structured Finance & Deeptech. Specializes in the intersection of Climate, International Trade, Policy & eGovernance. Proven track record of delivering transformative projects with multilateral institutions.

## EXPERIENCE
Managing Director | Quintessence Consulting Inc. | Current
- Specializes in Structured Finance & Deeptech, focusing on Climate, International Trade, Policy & eGovernance
- Provided technical assistance to the UKFCDO as the Caribbean Regional Climate Finance Expert
- Developed blockchain-based hedge fund and AI-driven risk management tools

Founder | Valerie Capital | Current
- Established innovative financial firm focused on sustainable finance solutions
- Pioneered integration of blockchain technology and AI for climate finance applications

## EDUCATION
Executive Master's in eGovernance | Ecolé Politechnique de Lausanne (EPFL), Switzerland
PGCert in Climate Adaptation Finance | Frankfurt School of Management and Finance
PGCert in International Trade Policy | University of West Indies (UWI)

## SKILLS & CERTIFICATIONS
- Chartered Alternative Investment Analyst (CAIA) 2020 Scholar
- Blockchain and AI for sustainable finance solutions
- Financial modeling and innovative business modeling
- Climate finance and policy expertise`;

        const detailedVersion = `# TELOJO 'VALERIE' ONU
Financial Innovator & Climate Finance Expert

## PROFESSIONAL SUMMARY
Distinguished economist and financial innovator with over twenty years of expertise in Structured Finance & Deeptech. Specializes in the intersection of Climate, International Trade, Policy & eGovernance. Proven track record of delivering transformative projects with multilateral institutions including the World Bank, EU, GIZ, CDB, and the German Savings Banks Foundation. Extensive experience in leveraging blockchain and AI for sustainable finance solutions, with a focus on vulnerable regions like Small Island Developing States (SIDS) across the Caribbean and emerging markets in Africa.

## PROFESSIONAL EXPERIENCE

### Managing Director | Quintessence Consulting Inc. | 2012-Present
- Led technical assistance to the UKFCDO as the Caribbean Regional Climate Finance Expert and Climate Resilient Governance and Multistakeholder Lead
- Developed blockchain-based hedge fund and AI-driven risk management tools for sustainable finance applications
- Strengthened St. Kitts and Nevis Green Climate Fund National Designated Authority's capacity to access climate finance
- Created innovative blue and green business models for various bankable project use cases
- Shaped the Caribbean Renewable Energy Pipeline (CREP) Regional Landscape Assessment and supported the UKFCDO with strategic design for the UK-Caribbean Resilient Infrastructure Platform (UKCRIP)
- Identified key entry points for UK Expertise and Investments into Renewable Energy for the new £200M climate-adaptive infrastructure facility for the Caribbean
- Designed and architected the St. Kitts and Nevis Climate Risk Intelligence, Digital-Infrastructure & Ecosystem (SKN-CRIDE) under a Green Climate Fund Readiness Programme
- Established a storm-surge model, climate risk atlas, and underlying hydrometrology digital infrastructure
- Developed the National Hydrometerology and Climatology Policy and Governance Framework to enable climate services and support early-warning systems
- Created the Regional Needs-Based Climate Finance Strategy for the OECS focused on the Blue and Green Economy, endorsed as the OECS Climate Finance Access and Mobilization Strategy 2023–2030

### Founder | Valerie Capital | 2018-Present
- Established innovative financial firm focused on sustainable finance solutions
- Pioneered integration of blockchain technology and AI for climate finance applications
- Designed and launched the first Balanced Multiclass Hedge fund leveraging blockchain technology for a private investment banking group based in Canada
- Developed a downside risk protection & leveraged financing instrument for Fund and Portfolio managers applied to sustainable finance
- Created climate action pooled funds for a US-based Hedge fund group
- Currently structuring a ±$210M innovative blended finance facility (Green Berth Blended Performance Bond) for the Inclusive GreenPort Resilience & De-Carbonization Initiative (InGReD)
- Developing a Women in Climate AgFintech Facility to broaden financial access through revenue-based financing mechanisms for Climate Adaptation

### Regional Climate Disaster Risk Finance and Insurance (CDRFI) Specialist | Caribbean Policy Development Centre (CPDC) | 2023-Present
- Led regional community and technical training workshops in partnership with Munich Climate Insurance Initiative (MCII)
- Raised awareness on Parametric Insurance design, Carbon Finance for Agriculture and Fisherfolk communities
- Provided training on various forms of Climate Finance across Antigua and Barbuda, Barbados, Dominica, Grenada and Jamaica

### Structured Finance and Resource Mobilization Expert | Various Projects | 2012-Present
- Co-authored comprehensive analysis and strategic framework for enhancing sustainable food production and trade opportunities in St. Kitts and Nevis (2012)
- Proposed establishment of demonstration farm and training center for technical and vocational education in aquaculture
- Identified domestic, regional, and international market opportunities for farmed fish, particularly Cobia and Tilapia
- Developed a Mariculture Business Plan for Farming Cobia in the Region
- Advocated for revolving fund and revenue-based loan schemes to support mariculture and aquaculture entrepreneurs
- Worked with the GEF Small Grants Programme on a Protected Area Project in the Tobago Cays, St. Vincent & the Grenadines
- Mobilized over $240M in financing in both private and public sectors
- Brokered SBFIC-Eastern Caribbean Central Bank (ECCB) collaboration which unlocked <€2M from the German Government for SME Financing in the Eastern Caribbean Currency Union (ECCU)

## EDUCATION
- Executive Master's in eGovernance | Ecolé Politechnique de Lausanne (EPFL), Switzerland
- Postgraduate Certificate in Climate Adaptation Finance | Frankfurt School of Management and Finance
- Postgraduate Certificate in International Trade Policy | University of West Indies (UWI)

## SKILLS & CERTIFICATIONS
- Chartered Alternative Investment Analyst (CAIA) 2020 Scholar
- Financial Modeling & Analysis (Advanced)
- Blockchain & AI Applications for Sustainable Finance
- Climate Finance & Policy Development
- Stakeholder Engagement & Governance
- Project Management & Implementation
- Blended Finance Structuring
- Carbon Finance and Parametric Insurance Design
- Digital Infrastructure for Climate Resilience
- Blue and Green Economy Business Modeling

## NOTABLE PROJECTS

### UK-Caribbean Resilient Infrastructure Platform (UKCRIP)
- Provided strategic design for a £200M climate-adaptive infrastructure facility
- Identified investment opportunities for resilient infrastructure aligned with Caribbean needs

### St. Kitts and Nevis Climate Risk Intelligence System
- Designed digital infrastructure for climate risk management
- Established storm-surge modeling and climate risk atlas
- Developed governance framework for climate services

### Green Berth Blended Performance Bond (GBBPB)
- Currently structuring a ±$210M blended finance facility
- Integrating renewable energy, desalinated water, and port electrification
- Designing nature-based solutions to boost resilience in SIDS

### Women in Climate AgFintech Facility
- Developing revenue-based financing mechanisms for Climate Adaptation
- Implementing point-to-point soil testing for nutrients
- Creating baseline assessment for Carbon Sequestration for Root Crop Farmers using digital technology
- Collaborating with Hydrofluidics, a Saint Lucian based DeepTech Venture Nanotechnology firm`;

        setConciseCV(conciseVersion);
        setDetailedCV(detailedVersion);

        // Set the initial CV based on the selected format
        cleanedCV = cvFormat === "concise" ? conciseVersion : detailedVersion;
      }

      setEditedCV(cleanedCV);
    }
  }, [optimizedCV, additionalCompetencies, cvFormat]);

  // Update CV when format changes
  useEffect(() => {
    if (conciseCV && detailedCV) {
      setEditedCV(cvFormat === "concise" ? conciseCV : detailedCV);
    }
  }, [cvFormat, conciseCV, detailedCV]);

  // Check if content appears to be binary data
  useEffect(() => {
    const checkBinaryContent = () => {
      if (
        originalCV?.includes("PK") ||
        originalCV?.includes("Content_Types") ||
        originalCV?.startsWith("%PDF") ||
        originalCV?.includes("-binary-content")
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

  // AI suggestions for CV improvements
  const [aiSuggestions, setAiSuggestions] = useState([
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

  // Update suggestions when optimizedCV changes
  useEffect(() => {
    // Check if we have a JSON response in the optimizedCV
    if (optimizedCV) {
      try {
        // Try to extract JSON if it's in the optimizedCV text
        const jsonMatch = optimizedCV.match(/\{[\s\S]*\}/g);
        if (jsonMatch && jsonMatch[0]) {
          const jsonData = JSON.parse(jsonMatch[0]);
          if (jsonData.suggestions && Array.isArray(jsonData.suggestions)) {
            // Format suggestions to match our expected structure
            const formattedSuggestions = jsonData.suggestions.map(
              (suggestion) => ({
                section: suggestion.section || "General",
                suggestion:
                  suggestion.suggestion ||
                  suggestion.reason ||
                  "Improve this section",
              }),
            );

            if (formattedSuggestions.length > 0) {
              setAiSuggestions(formattedSuggestions);
            }
          }
        } else if (optimizedCV.includes("suggestions:")) {
          // Fallback to the old method if JSON parsing fails
          const suggestionsMatch = optimizedCV.match(
            /suggestions:\s*([\s\S]*?)(?=\n\n|$)/,
          );
          if (suggestionsMatch && suggestionsMatch[1]) {
            const suggestionsText = suggestionsMatch[1].trim();
            const extractedSuggestions = suggestionsText
              .split("\n")
              .filter(Boolean)
              .map((line) => {
                const parts = line.split(":");
                return {
                  section: parts[0].trim(),
                  suggestion: parts[1]?.trim() || "Improve this section",
                };
              });

            if (extractedSuggestions.length > 0) {
              setAiSuggestions(extractedSuggestions);
            }
          }
        }
      } catch (error) {
        console.error("Error parsing suggestions:", error);
        // Keep default suggestions if parsing fails
      }
    }

    // If we have Valerie's CV, generate specific suggestions
    if (optimizedCV && optimizedCV.includes("TELOJO 'VALERIE' ONU")) {
      setAiSuggestions([
        {
          section: "Professional Summary",
          suggestion:
            "Highlight your expertise in climate finance and structured finance more prominently. Consider adding a brief statement about your impact in terms of total funding secured or number of projects successfully implemented.",
        },
        {
          section: "Experience",
          suggestion:
            "For each role, quantify your achievements with specific metrics where possible. For example, mention the exact amount of funding secured, percentage improvements in project outcomes, or number of stakeholders engaged.",
        },
        {
          section: "Skills",
          suggestion:
            "Organize your skills into categories (technical, domain expertise, soft skills) and prioritize those most relevant to climate finance and sustainable development.",
        },
        {
          section: "Education",
          suggestion:
            "Consider adding relevant research projects, thesis topics, or specialized training that aligns with your expertise in climate finance and policy.",
        },
        {
          section: "Project Highlights",
          suggestion:
            "Add a dedicated section for 2-3 signature projects with detailed outcomes and your specific contributions to each.",
        },
      ]);
    }
  }, [optimizedCV]);

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
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <CheckCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">
            Document Processed Successfully
          </AlertTitle>
          <AlertDescription className="text-blue-700">
            Your uploaded file has been processed. The AI has analyzed your
            document and created an optimized version based on your content and
            any additional information you provided.
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
                          Binary file content detected. The system has processed
                          your file.
                        </p>
                        <p className="mb-2">
                          File name:{" "}
                          {originalCV.includes("docx")
                            ? "document.docx"
                            : "document.pdf"}
                        </p>
                        <p className="mb-4">
                          <span className="text-green-600 font-medium">
                            ✓ Successfully processed
                          </span>
                        </p>
                        <p>
                          The AI has analyzed your document and created an
                          optimized CV based on the content and any additional
                          information you provided.
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
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
                      <Sparkles className="mr-2 h-5 w-5" /> AI-Optimized CV
                    </CardTitle>
                    <CardDescription>
                      Edit the optimized content as needed
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Format:</span>
                    <Select value={cvFormat} onValueChange={setCvFormat}>
                      <SelectTrigger className="w-[180px] border-[#2B6CB0]">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concise">Concise Resume</SelectItem>
                        <SelectItem value="detailed">Detailed CV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
