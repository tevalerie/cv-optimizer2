import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Sparkles, Brain, Zap, Bot, Cpu } from "lucide-react";

export type AIModel = "openai" | "claude" | "gemini" | "qwen" | "deepseek";

interface AIModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

const AIModelSelector = ({
  selectedModel = "openai",
  onModelChange,
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

  return (
    <Card className="border-[#E0F7FA] shadow-md">
      <CardHeader className="bg-[#F5F5DC] border-b">
        <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
          <Sparkles className="mr-2 h-5 w-5" /> Select AI Model
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <RadioGroup
          value={selectedModel}
          onValueChange={(value) => onModelChange(value as AIModel)}
          className="space-y-3"
        >
          {models.map((model) => (
            <div
              key={model.id}
              className={`flex items-center space-x-2 rounded-lg border p-4 ${selectedModel === model.id ? model.color : "border-gray-200"}`}
            >
              <RadioGroupItem value={model.id} id={model.id} />
              <Label
                htmlFor={model.id}
                className="flex flex-1 cursor-pointer items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${selectedModel === model.id ? model.color : "bg-gray-100"}`}
                  >
                    {model.icon}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${selectedModel === model.id ? model.textColor : "text-gray-700"}`}
                    >
                      {model.name}
                    </p>
                    <p className="text-sm text-gray-500">{model.description}</p>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default AIModelSelector;
