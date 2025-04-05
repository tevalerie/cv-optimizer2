import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  Sparkles,
  Brain,
  Zap,
  Bot,
  Cpu,
  AlertCircle,
  Check,
} from "lucide-react";
import { getApiKey } from "@/lib/api-keys";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type AIModel = "openai" | "claude" | "gemini" | "qwen" | "deepseek";
export type AIModels = AIModel[];

interface AIModelSelectorProps {
  selectedModels: AIModels;
  onModelsChange: (models: AIModels) => void;
}

const AIModelSelector = ({
  selectedModels = ["openai"],
  onModelsChange,
}: AIModelSelectorProps) => {
  const models = [
    {
      id: "openai",
      name: "OpenAI GPT-4",
      description:
        "Powerful language model with strong CV optimization capabilities",
      icon: <Sparkles className="h-5 w-5 text-emerald-600" />,
      color: "bg-emerald-50 border-emerald-200",
      textColor: "text-emerald-700",
    },
    {
      id: "claude",
      name: "Claude 3.7 Sonnet",
      description:
        "Excellent at nuanced content improvements and professional tone",
      icon: <Brain className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
    },
    {
      id: "gemini",
      name: "Google Gemini",
      description: "Comprehensive analysis with industry insights",
      icon: <Zap className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      id: "qwen",
      name: "Qwen",
      description: "Multilingual support with technical expertise",
      icon: <Bot className="h-5 w-5 text-orange-600" />,
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700",
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      description: "Specialized for technical and academic CVs",
      icon: <Cpu className="h-5 w-5 text-indigo-600" />,
      color: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-700",
    },
  ];

  // Function to toggle a model selection
  const toggleModelSelection = (modelId: AIModel) => {
    if (selectedModels.includes(modelId)) {
      // Don't allow deselecting the last model
      if (selectedModels.length > 1) {
        onModelsChange(selectedModels.filter((id) => id !== modelId));
      }
    } else {
      onModelsChange([...selectedModels, modelId]);
    }
  };

  return (
    <Card className="border-[#E0F7FA] shadow-md">
      <CardHeader className="bg-[#F5F5DC] border-b">
        <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
          <Sparkles className="mr-2 h-5 w-5" /> Select AI Models
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Select one or more AI models to optimize your CV:
          </p>

          {models.map((model) => {
            const isSelected = selectedModels.includes(model.id as AIModel);
            return (
              <div
                key={model.id}
                className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${isSelected ? model.color : "border-gray-200"}`}
                onClick={() => toggleModelSelection(model.id as AIModel)}
              >
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${isSelected ? model.color : "bg-gray-100"}`}
                    >
                      {model.icon}
                    </div>
                    <div>
                      <p
                        className={`font-medium ${isSelected ? model.textColor : "text-gray-700"}`}
                      >
                        {model.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {model.description}
                      </p>
                      {!getApiKey(model.id).isAvailable && (
                        <p className="text-xs text-red-500 flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" /> API key not
                          configured
                        </p>
                      )}
                    </div>
                  </div>
                  {isSelected && <Check className="h-5 w-5 text-green-600" />}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIModelSelector;
