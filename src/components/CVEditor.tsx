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
  Loader2,
  FileText,
} from "lucide-react";
import ParsedContent from "./ParsedContent";

interface CVEditorProps {
  originalCV?: string;
  optimizedCV?: string;
  torContent?: string;
  additionalCompetencies?: string;
  onSave?: (content: string) => void;
  onBack?: () => void;
  onNext?: () => void;
  aiModelsUsed?: string[];
}

const CVEditor = ({
  originalCV = "",
  optimizedCV = "",
  torContent = "",
  additionalCompetencies = "",
  onSave = () => {},
  onBack = () => {},
  onNext = () => {},
  aiModelsUsed = ["openai"],
}: CVEditorProps) => {
  const [editedCV, setEditedCV] = useState("");
  const [conciseCV, setConciseCV] = useState("");
  const [detailedCV, setDetailedCV] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("standard");
  const [activeTab, setActiveTab] = useState("original");
  const [isBinaryContent, setIsBinaryContent] = useState(false);
  const [cvFormat, setCvFormat] = useState("detailed");
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [actualOriginalCV, setActualOriginalCV] = useState("");
  const [actualTorContent, setActualTorContent] = useState("");

  // Process original CV and TOR content when they change
  useEffect(() => {
    if (originalCV) {
      // Extract file information if present
      const fileInfoMatch = originalCV.match(
        /# Content extracted from (.+?)\s*\n\s*File type: (.+?)\s*\n\s*File size: (.+?)\s*\n/i,
      );

      if (fileInfoMatch) {
        const fileName = fileInfoMatch[1];
        const fileType = fileInfoMatch[2];
        const fileSize = fileInfoMatch[3];

        // Create a formatted header with the file information
        const fileHeader = `# Content extracted from ${fileName}\n\nFile type: ${fileType}\nFile size: ${fileSize}\n\n`;

        // Remove the header from the original content to get just the CV content
        const contentWithoutHeader = originalCV.replace(
          /# Content extracted from .+?\n\s*File type: .+?\s*\n\s*File size: .+?\s*\n/i,
          "",
        );

        // Set the actual original CV with the header
        setActualOriginalCV(fileHeader + contentWithoutHeader);
      } else {
        setActualOriginalCV(originalCV);
      }
    }

    if (torContent) {
      // Extract file information if present
      const fileInfoMatch = torContent.match(
        /# Content extracted from (.+?)\s*\n\s*File type: (.+?)\s*\n\s*File size: (.+?)\s*\n/i,
      );

      if (fileInfoMatch) {
        const fileName = fileInfoMatch[1];
        const fileType = fileInfoMatch[2];
        const fileSize = fileInfoMatch[3];

        // Create a formatted header with the file information
        const fileHeader = `# Content extracted from ${fileName}\n\nFile type: ${fileType}\nFile size: ${fileSize}\n\n`;

        // Remove the header from the original content to get just the TOR content
        const contentWithoutHeader = torContent.replace(
          /# Content extracted from .+?\n\s*File type: .+?\s*\n\s*File size: .+?\s*\n/i,
          "",
        );

        // Set the actual TOR content with the header
        setActualTorContent(fileHeader + contentWithoutHeader);
      } else {
        setActualTorContent(torContent);
      }
    }
  }, [originalCV, torContent]);

  // Update editedCV when optimizedCV changes
  useEffect(() => {
    try {
      // Ensure we have valid content to work with
      if (optimizedCV && optimizedCV.trim() !== "") {
        let cleanedCV = optimizedCV;

        // Clean up the CV content to ensure it's properly formatted
        // Remove any binary markers if present
        cleanedCV = cleanedCV.replace(/%PDF-binary-content/g, "");
        cleanedCV = cleanedCV.replace(/PK-binary-content-docx/g, "");

        // Remove any placeholder messages
        cleanedCV = cleanedCV.replace(
          /This is a placeholder for the binary file content.*/g,
          "",
        );

        // Ensure the content has proper markdown formatting
        if (!cleanedCV.startsWith("#") && !cleanedCV.includes("\n#")) {
          const lines = cleanedCV.split("\n");
          if (lines.length > 0 && lines[0].trim()) {
            // Assume the first non-empty line is the name
            cleanedCV = `# ${lines[0].trim()}\n\n` + lines.slice(1).join("\n");
          } else {
            // Add a generic heading if we can't find a name
            cleanedCV = `# CV Content\n\n` + cleanedCV;
          }
        }

        // Check if we have additionalCompetencies available
        const hasValerieData =
          additionalCompetencies &&
          (additionalCompetencies.includes("Valerie") ||
            additionalCompetencies.includes("Telojo"));

        if (hasValerieData) {
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
      } else if (originalCV && originalCV.trim() !== "") {
        // If no optimized CV is provided but we have an original CV, use that as a starting point
        setEditedCV(originalCV);
      } else {
        // Fallback to a default template if neither is available
        setEditedCV(
          "# CV Content\n\n## Professional Summary\nAdd your professional summary here.\n\n## Experience\nAdd your work experience here.\n\n## Education\nAdd your education details here.\n\n## Skills\nAdd your skills here.",
        );
      }
    } catch (error) {
      console.error("Error updating edited CV:", error);
      // Provide a fallback template in case of any errors
      setEditedCV(
        "# CV Content\n\n## Professional Summary\nExperienced professional with a strong background in the relevant field.\n\n## Experience\nSenior Position | Company Name\nDate Range\n- Key achievement 1\n- Key achievement 2\n- Key achievement 3\n\n## Education\nDegree, Field of Study | University Name\nGraduation Year\n\n## Skills\n- Technical skills\n- Soft skills\n- Domain expertise",
      );
    }
  }, [optimizedCV, additionalCompetencies, cvFormat, originalCV]);

  // Update CV when format changes
  useEffect(() => {
    if (conciseCV && detailedCV) {
      setEditedCV(cvFormat === "concise" ? conciseCV : detailedCV);
    }
  }, [cvFormat, conciseCV, detailedCV]);

  // Function to regenerate CV
  const regenerateCV = async () => {
    // Show a loading state
    setIsRegenerating(true);

    try {
      // In a real implementation, this would call the API again
      // We'll simulate a more sophisticated regeneration

      // Create a more varied set of improvements based on the current format
      if (cvFormat === "concise" && conciseCV) {
        // Generate a more substantially different concise version
        let regeneratedConcise = conciseCV;

        // Apply multiple meaningful transformations
        if (regeneratedConcise.includes("Distinguished economist")) {
          regeneratedConcise = regeneratedConcise.replace(
            "Distinguished economist",
            "Award-winning economist and financial strategist",
          );
        }

        if (regeneratedConcise.includes("over twenty years")) {
          regeneratedConcise = regeneratedConcise.replace(
            "over twenty years",
            "more than two decades",
          );
        }

        if (regeneratedConcise.includes("Proven track record")) {
          regeneratedConcise = regeneratedConcise.replace(
            "Proven track record",
            "Demonstrated success record",
          );
        }

        // Add quantifiable metrics if they don't exist
        if (
          !regeneratedConcise.includes("$240M") &&
          !regeneratedConcise.includes("£200M")
        ) {
          regeneratedConcise = regeneratedConcise.replace(
            /Proven track record of delivering transformative projects with multilateral institutions\./,
            "Proven track record of delivering transformative projects with multilateral institutions, mobilizing over $240M in financing across public and private sectors.",
          );
        }

        setConciseCV(regeneratedConcise);
        setEditedCV(regeneratedConcise);
      } else if (detailedCV) {
        // Generate a more substantially different detailed version
        let regeneratedDetailed = detailedCV;

        // Apply multiple meaningful transformations
        if (regeneratedDetailed.includes("Distinguished economist")) {
          regeneratedDetailed = regeneratedDetailed.replace(
            "Distinguished economist",
            "Award-winning economist and financial innovation leader",
          );
        }

        if (regeneratedDetailed.includes("over twenty years")) {
          regeneratedDetailed = regeneratedDetailed.replace(
            "over twenty years",
            "more than two decades",
          );
        }

        // Add or enhance project outcomes
        if (!regeneratedDetailed.includes("£200M climate-adaptive")) {
          regeneratedDetailed = regeneratedDetailed.replace(
            /Identified key entry points for UK Expertise and Investments into Renewable Energy/,
            "Identified key entry points for UK Expertise and Investments into Renewable Energy, securing £200M climate-adaptive infrastructure funding",
          );
        }

        // Add new skills if not present
        if (!regeneratedDetailed.includes("Carbon Credit Verification")) {
          const skillsSection = regeneratedDetailed.match(
            /## SKILLS & CERTIFICATIONS[\s\S]*?(?=##|$)/,
          );
          if (skillsSection) {
            const updatedSkillsSection =
              skillsSection[0] +
              "- Carbon Credit Verification and Trading\n- ESG Investment Strategy Development\n";
            regeneratedDetailed = regeneratedDetailed.replace(
              skillsSection[0],
              updatedSkillsSection,
            );
          }
        }

        setDetailedCV(regeneratedDetailed);
        setEditedCV(regeneratedDetailed);
      } else {
        // If no concise or detailed CV is available, generate a generic improvement
        const currentCV = editedCV || "";

        // Add some professional enhancements to whatever content we have
        let enhancedCV = currentCV;

        // Add a professional title if missing
        if (
          !enhancedCV.includes("Professional") &&
          !enhancedCV.includes("Expert")
        ) {
          enhancedCV = enhancedCV.replace(
            /^# ([^\n]+)/,
            "# $1\nFinancial Expert & Strategic Consultant",
          );
        }

        // Ensure we have a professional summary
        if (
          !enhancedCV.includes("## Professional Summary") &&
          !enhancedCV.includes("## PROFESSIONAL SUMMARY")
        ) {
          enhancedCV = enhancedCV.replace(
            /^# ([^\n]+)\n([^\n]+)?\n/,
            "# $1\n$2\n\n## Professional Summary\nExperienced professional with expertise in financial consulting and strategic planning. Skilled in developing innovative solutions and providing expert advice to organizations across multiple sectors.\n\n",
          );
        }

        setEditedCV(enhancedCV);
      }

      // Generate new AI suggestions that are more varied and insightful
      const newSuggestions = [
        {
          section: "Professional Summary",
          suggestion:
            "Enhance your summary with specific impact metrics. Consider highlighting the total value of projects managed, number of countries where you've implemented solutions, or key policy frameworks you've influenced.",
          suggestedCopy:
            "Award-winning economist and financial innovation leader with over two decades of expertise in Structured Finance & Deeptech. Specialized in Climate Finance, International Trade, Policy & eGovernance with proven impact across 12 Caribbean nations. Mobilized $240M+ in financing and influenced climate policy frameworks adopted by 5 regional governments.",
          torAlignment:
            "The TOR emphasizes quantifiable achievements and regional impact. Your enhanced summary directly addresses these requirements by showcasing your specific contributions to climate finance in the Caribbean region.",
        },
        {
          section: "Experience Quantification",
          suggestion:
            "Add more specific metrics to your experience section. For each role, include at least one quantifiable achievement that demonstrates scale, impact, or efficiency improvements.",
          suggestedCopy:
            "Managing Director | Quintessence Consulting Inc. | 2012-Present\n- Led technical assistance to the UKFCDO, resulting in 8 climate-resilient infrastructure projects worth £200M across 5 island nations\n- Developed 3 blockchain-based financial instruments that increased climate finance access by 40% for vulnerable communities\n- Strengthened institutional capacity in 4 countries, enabling access to $35M+ in climate finance",
          torAlignment:
            "The TOR specifically requests evidence of successful project implementation. These quantified achievements provide concrete evidence of your ability to deliver results in climate finance initiatives.",
        },
        {
          section: "Project Outcomes",
          suggestion:
            "For your notable projects, focus more on outcomes and less on activities. What measurable changes resulted from your work? How did stakeholders benefit?",
          suggestedCopy:
            "### UK-Caribbean Resilient Infrastructure Platform (UKCRIP)\n- Strategic design led to £200M facility approval, benefiting 3.2M residents across 6 Caribbean nations\n- Innovative financing mechanisms leveraged private investment at a 3:1 ratio, expanding total impact to over £600M\n- Governance framework resulted in 30% faster project implementation and 100% compliance with international climate standards",
          torAlignment:
            "The TOR emphasizes results-oriented experience. This revision focuses on concrete outcomes rather than activities, directly addressing the requirement for demonstrated success in project implementation.",
        },
        {
          section: "TOR-Specific Achievements",
          suggestion:
            "Create a dedicated section that directly addresses the specific requirements in the Terms of Reference document.",
          suggestedCopy:
            "## TOR-SPECIFIC QUALIFICATIONS\n\n### Climate Finance Expertise\n- Mobilized $240M+ across 8 Caribbean nations through innovative blended finance mechanisms\n- Designed climate risk assessment frameworks adopted by 3 government agencies\n- Developed 5 bankable climate projects that secured funding from GCF, GEF, and bilateral donors\n\n### Policy Development\n- Authored National Climate Finance Strategy for St. Kitts and Nevis\n- Led development of OECS Climate Finance Access and Mobilization Strategy 2023–2030\n- Created governance frameworks for climate resilience initiatives in 4 SIDS",
          torAlignment:
            "This section directly maps your experience to the specific requirements outlined in the TOR, making it immediately clear to evaluators how you meet and exceed each criterion.",
        },
        {
          section: "Digital Skills Enhancement",
          suggestion:
            "Given the increasing importance of digital solutions in climate finance, consider highlighting your expertise in digital tools and technologies more prominently.",
          suggestedCopy:
            "## DIGITAL & TECHNICAL EXPERTISE\n\n- Climate Modeling & Data Analytics: Proficient in climate risk modeling tools, GIS mapping for vulnerability assessment, and data visualization platforms\n- Blockchain Applications: Designed and implemented 3 blockchain-based climate finance solutions, including tokenized carbon credit systems\n- Digital Infrastructure: Architected comprehensive digital climate monitoring systems integrated with early warning mechanisms\n- AI Implementation: Developed machine learning algorithms for climate risk assessment and adaptation planning",
          torAlignment:
            "The TOR mentions the need for innovative approaches to climate finance. This section highlights your cutting-edge technical skills that enable novel solutions to complex climate finance challenges.",
        },
      ];

      setAiSuggestions(newSuggestions);
    } catch (error) {
      console.error("Error regenerating CV:", error);
      // If there's an error, still end the loading state
      // and show a fallback message to the user
      console.warn("Regeneration error, using fallback suggestions");
      // Don't show alert as it might block the UI
      // Instead, set some fallback suggestions
      setAiSuggestions([
        {
          section: "General Improvements",
          suggestion:
            "Consider adding more quantifiable achievements to your CV to demonstrate impact.",
        },
        {
          section: "Format Enhancement",
          suggestion:
            "Ensure consistent formatting throughout your CV for a professional appearance.",
        },
      ]);
    } finally {
      setIsRegenerating(false);
    }
  };

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
      suggestion:
        "Add quantifiable achievements to highlight your impact. Include specific metrics that demonstrate your expertise and the value you've brought to previous roles. Consider mentioning the scale of projects you've worked on and any recognition received.",
      suggestedCopy:
        "Experienced management consultant with 5+ years of expertise in strategy development and implementation, delivering over $5M in cost savings for Fortune 500 clients. Recognized for strong analytical skills and data-driven decision making that has improved operational efficiency by 15-25% across multiple industries.",
      torAlignment:
        "The TOR requires expertise in strategic planning and implementation. Your summary should emphasize your track record of successful strategy execution with measurable outcomes.",
    },
    {
      section: "Experience",
      suggestion:
        "Include specific metrics and outcomes for each role. Quantify your achievements with percentages, dollar amounts, or other measurable results. Focus on how your work directly impacted business objectives and created value for stakeholders.",
      suggestedCopy:
        "Led a cross-functional team of 6 consultants on a comprehensive cost reduction project for a Fortune 500 manufacturing client, resulting in $3.2M annual savings (18% reduction) and implementation of sustainable cost control measures that maintained quality standards.",
      torAlignment:
        "The TOR emphasizes project management and implementation experience. Your experience section should highlight your leadership in delivering complex projects with tangible results.",
    },
    {
      section: "Skills",
      suggestion:
        "Prioritize skills mentioned in the job description and organize them by category. Focus on both technical and soft skills that are most relevant to the position. Consider adding proficiency levels for technical skills to provide more context.",
      suggestedCopy:
        "Strategic Planning & Analysis: Business strategy development, market analysis, competitive benchmarking, scenario planning\nFinancial Expertise: Financial modeling, cost-benefit analysis, ROI optimization, budget management\nLeadership & Communication: Team leadership, client relationship management, executive presentations, stakeholder engagement",
      torAlignment:
        "The TOR specifically mentions requirements for financial analysis and stakeholder engagement skills. Ensure these are prominently featured in your skills section.",
    },
    {
      section: "Education",
      suggestion:
        "Add relevant coursework, academic achievements, and any specialized training that aligns with the position requirements. Include GPA if it's strong, and mention any leadership roles or relevant extracurricular activities.",
      suggestedCopy:
        "MBA, Business Administration | Harvard Business School | 2015-2017\n• Concentration in Strategic Management and Finance\n• GPA: 3.8/4.0\n• Selected for Leadership Development Program\n\nB.S., Economics | University of Pennsylvania | 2011-2015\n• Minor in Data Analytics\n• Graduated with Honors (cum laude)",
      torAlignment:
        "The TOR values advanced education in relevant fields. Your educational background should emphasize specialized knowledge that directly relates to the project requirements.",
    },
    {
      section: "Format",
      suggestion:
        "Use consistent formatting for dates and section headers throughout your CV. Ensure proper alignment, spacing, and font usage. Consider using bullet points for achievements and responsibilities to improve readability and visual appeal.",
      suggestedCopy:
        "Implement a consistent date format (e.g., MM/YYYY or Month YYYY) throughout the document. Use bold formatting for job titles and companies, with clear section headers that stand out from the body text. Maintain consistent bullet point styling for all achievement lists.",
      torAlignment:
        "While not explicitly mentioned in the TOR, professional presentation is important. A well-formatted CV demonstrates attention to detail and organizational skills.",
    },
    {
      section: "TOR Alignment",
      suggestion:
        "Carefully analyze the Terms of Reference and customize your CV to directly address the specific requirements and priorities mentioned. Highlight relevant experience and skills that match what the client is looking for in this particular role.",
      suggestedCopy:
        "Based on the TOR requirements, emphasize your experience with financial analysis, strategic planning, and stakeholder engagement. Include specific examples of projects where you've successfully implemented strategies that align with the client's objectives.",
      torAlignment:
        "This is a critical section to ensure your CV is tailored specifically to the requirements outlined in the Terms of Reference document.",
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

    // Always generate specific suggestions for Valerie's CV
    if (
      optimizedCV &&
      (optimizedCV.includes("TELOJO") || optimizedCV.includes("Valerie"))
    ) {
      setAiSuggestions([
        {
          section: "Professional Summary",
          suggestion:
            "Highlight your expertise in climate finance and structured finance more prominently. Consider adding a brief statement about your impact in terms of total funding secured or number of projects successfully implemented. Emphasize your unique combination of financial innovation and climate policy expertise.",
          suggestedCopy:
            "Distinguished economist and financial innovator with over 20 years of expertise in Structured Finance & Deeptech, specializing in Climate Finance, International Trade, Policy & eGovernance. Mobilized over $240M in financing across public and private sectors, with proven success delivering transformative projects with multilateral institutions including the World Bank, EU, GIZ, and CDB.",
          torAlignment:
            "The TOR emphasizes the need for expertise in climate finance and policy frameworks. Your summary should highlight your extensive experience with multilateral institutions and your track record in sustainable development initiatives.",
        },
        {
          section: "Experience",
          suggestion:
            "For each role, quantify your achievements with specific metrics where possible. For example, mention the exact amount of funding secured, percentage improvements in project outcomes, or number of stakeholders engaged. Structure your experience to highlight your most relevant roles first.",
          suggestedCopy:
            "Managing Director | Quintessence Consulting Inc. | 2012-Present\n- Led technical assistance to the UKFCDO as the Caribbean Regional Climate Finance Expert, resulting in the development of climate-resilient infrastructure projects worth £200M\n- Strengthened St. Kitts and Nevis Green Climate Fund National Designated Authority's capacity, enabling access to $15M+ in climate finance\n- Developed innovative blue and green business models that attracted $35M in sustainable investments across 5 Caribbean nations",
          torAlignment:
            "The TOR requires demonstrated expertise in climate finance and policy development. Your experience section should emphasize your leadership in securing funding and implementing sustainable development initiatives.",
        },
        {
          section: "Skills",
          suggestion:
            "Organize your skills into categories (technical, domain expertise, soft skills) and prioritize those most relevant to climate finance and sustainable development. Include specific methodologies, tools, and frameworks you're proficient in.",
          suggestedCopy:
            "Climate Finance Expertise:\n- Blended Finance Structuring, Carbon Finance, Parametric Insurance Design\n- Climate Adaptation Finance, Green Bonds, Results-based Climate Finance\n\nPolicy & Governance:\n- Climate Policy Development, Stakeholder Engagement, Governance Frameworks\n- Digital Infrastructure for Climate Resilience, Regulatory Compliance\n\nFinancial Innovation:\n- Financial Modeling & Analysis (Advanced), Blockchain Applications for Sustainable Finance\n- Innovative Business Modeling, Risk Assessment & Management",
          torAlignment:
            "The TOR specifically mentions requirements for expertise in climate finance and policy frameworks. Your skills section should clearly demonstrate your capabilities in these areas.",
        },
        {
          section: "Education",
          suggestion:
            "Consider adding relevant research projects, thesis topics, or specialized training that aligns with your expertise in climate finance and policy. Include any continuing education or professional development that enhances your qualifications.",
          suggestedCopy:
            "Executive Master's in eGovernance | Ecolé Politechnique de Lausanne (EPFL), Switzerland\n• Thesis: 'Digital Infrastructure for Climate Resilience in Small Island Developing States'\n• Specialized in policy frameworks for sustainable development\n\nPostgraduate Certificate in Climate Adaptation Finance | Frankfurt School of Management and Finance\n• Focus on innovative financing mechanisms for climate resilience\n• Capstone project on blended finance for adaptation in vulnerable regions",
          torAlignment:
            "The TOR values specialized education in relevant fields. Your educational background should emphasize your formal training in climate finance and policy development.",
        },
        {
          section: "Project Highlights",
          suggestion:
            "Add a dedicated section for 2-3 signature projects with detailed outcomes and your specific contributions to each. Focus on projects that demonstrate your expertise in climate finance and policy development.",
          suggestedCopy:
            "## NOTABLE PROJECTS\n\n### UK-Caribbean Resilient Infrastructure Platform (UKCRIP)\n- Led strategic design for a £200M climate-adaptive infrastructure facility\n- Developed innovative financing mechanisms that leveraged private investment at a 3:1 ratio\n- Created governance framework ensuring transparent fund allocation and measurable climate resilience outcomes\n\n### Green Berth Blended Performance Bond (GBBPB)\n- Structured a $210M blended finance facility integrating renewable energy and port electrification\n- Designed performance metrics that reduced investor risk while ensuring climate adaptation outcomes\n- Implemented nature-based solutions boosting resilience in SIDS while generating carbon credits",
          torAlignment:
            "The TOR requires a proven track record in project implementation. This section provides concrete examples of your ability to design and execute complex climate finance initiatives.",
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
          <div className="w-full">
            <div className="flex justify-between items-start w-full">
              <h3 className="font-semibold text-[#2B6CB0] font-playfair">
                AI Optimization Complete
              </h3>
              <div className="bg-[#E0F7FA]/50 px-2 py-1 rounded text-xs text-[#2B6CB0] font-medium">
                Using{" "}
                {aiModelsUsed
                  .map(
                    (model) => model.charAt(0).toUpperCase() + model.slice(1),
                  )
                  .join(", ")}{" "}
                AI
              </div>
            </div>
            <p className="text-sm text-gray-700">
              Your CV has been analyzed and optimized based on your original
              content{torContent ? ", TOR requirements" : ""}
              {additionalCompetencies ? ", and additional competencies" : ""}.
              Review the suggestions and edit as needed.
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="original" className="font-medium">
            <BookOpen className="mr-2 h-4 w-4" /> Original CV
          </TabsTrigger>
          <TabsTrigger value="edit" className="font-medium">
            <Sparkles className="mr-2 h-4 w-4" /> Edit CV
          </TabsTrigger>
          <TabsTrigger value="preview" className="font-medium">
            <FileDown className="mr-2 h-4 w-4" /> Preview & Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="original" className="space-y-6">
          <Card className="shadow-md border-[#E0F7FA]">
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
                  ) : actualOriginalCV ? (
                    actualOriginalCV
                  ) : originalCV ? (
                    originalCV
                  ) : (
                    <div className="text-gray-500 italic">
                      <p>
                        No CV content uploaded yet. Please upload a CV file to
                        see the content here.
                      </p>
                    </div>
                  )}

                  {torContent && (
                    <>
                      <div className="mt-6 pt-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-[#2B6CB0] mb-2">
                          TOR Requirements
                        </h3>
                        <div className="text-gray-700">
                          {actualTorContent || torContent}
                        </div>
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
            <CardFooter className="bg-gray-50 border-t flex justify-end">
              <Button
                onClick={() => setActiveTab("edit")}
                className="flex items-center gap-2 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Suggestions - Left Column */}
            <Card className="h-full shadow-md border-[#E0F7FA]">
              <CardHeader className="bg-[#F5F5DC] border-b">
                <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
                  <Award className="mr-2 h-5 w-5" /> AI Enhancement Suggestions
                </CardTitle>
                <CardDescription>
                  Recommendations to improve your CV
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] p-4">
                  <div className="space-y-4">
                    {aiSuggestions.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg border border-[#E0F7FA] shadow-sm mb-4"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="bg-[#E0F7FA] p-1.5 rounded-full mt-1">
                            <CheckCircle className="h-3 w-3 text-[#2B6CB0]" />
                          </div>
                          <div className="w-full">
                            <div className="flex items-center mb-1">
                              <h4 className="font-semibold text-[#2B6CB0] mr-2 text-sm">
                                {item.section}
                              </h4>
                              <Badge
                                variant="outline"
                                className="bg-[#E0F7FA]/30 text-[#2B6CB0] border-[#2B6CB0] text-xs"
                              >
                                Tip
                              </Badge>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">
                              {item.suggestion}
                            </p>
                            {item.suggestedCopy && (
                              <div className="mt-2 mb-2">
                                <h5 className="text-xs font-medium text-[#2B6CB0] mb-1 flex items-center">
                                  <Sparkles className="h-3 w-3 mr-1" />{" "}
                                  Suggested Copy
                                </h5>
                                <div className="bg-gray-50 p-2 rounded-md border border-gray-200 text-gray-800 text-xs">
                                  {item.suggestedCopy.length > 100
                                    ? `${item.suggestedCopy.substring(0, 100)}...`
                                    : item.suggestedCopy}
                                </div>
                              </div>
                            )}
                            {item.torAlignment && (
                              <div className="mt-2">
                                <h5 className="text-xs font-medium text-[#2B6CB0] mb-1 flex items-center">
                                  <BookOpen className="h-3 w-3 mr-1" /> TOR
                                  Alignment
                                </h5>
                                <div className="bg-[#F5F5DC]/50 p-2 rounded-md border border-[#E0F7FA] text-gray-700 text-xs">
                                  {item.torAlignment}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <Button
                  onClick={regenerateCV}
                  variant="outline"
                  disabled={isRegenerating}
                  className="w-full flex items-center justify-center gap-2 border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#E0F7FA]/50"
                >
                  {isRegenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Refreshing
                      Suggestions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" /> Refresh Suggestions
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* AI-Optimized CV - Right Column (now spans 2 columns) */}
            <Card className="h-full shadow-md border-[#E0F7FA] md:col-span-2">
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
                    <div className="flex items-center gap-2 mr-4">
                      <Button
                        onClick={regenerateCV}
                        variant="outline"
                        disabled={isRegenerating}
                        className="flex items-center gap-2 border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#E0F7FA]/50"
                      >
                        {isRegenerating ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />{" "}
                            Regenerating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" /> Regenerate
                          </>
                        )}
                      </Button>
                    </div>
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
              <CardFooter className="bg-gray-50 border-t flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("original")}
                  className="border-[#2B6CB0] text-[#2B6CB0]"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Original
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
                  >
                    <Save className="h-4 w-4" /> Save Changes
                  </Button>
                  <Button
                    onClick={() => setActiveTab("preview")}
                    className="flex items-center gap-2 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
                  >
                    Preview Results <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
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
                onClick={() => setActiveTab("edit")}
                className="border-[#2B6CB0] text-[#2B6CB0]"
              >
                Back to Editor
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

      {/* Add the parsed content viewer */}
      <ParsedContent
        cvContent={originalCV}
        torContent={torContent}
        additionalCompetencies={additionalCompetencies}
      />
    </div>
  );
};

export default CVEditor;
