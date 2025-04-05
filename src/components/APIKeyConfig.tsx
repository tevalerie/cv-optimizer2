import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Key, Save, AlertCircle, Info, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { getAvailableModels } from "@/lib/api-keys";

interface APIKeyConfigProps {
  onSave?: (keys: Record<string, string>) => void;
  initialKeys?: Record<string, string>;
}

const APIKeyConfig = ({
  onSave = () => {},
  initialKeys = {},
}: APIKeyConfigProps) => {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>({
    openai: "",
    claude: "",
    gemini: "",
    qwen: "",
    deepseek: "",
    ...initialKeys,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  useEffect(() => {
    // Get models that already have API keys configured in environment
    const envConfiguredModels = getAvailableModels();
    setAvailableModels(envConfiguredModels);
  }, []);

  const handleChange = (model: string, value: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [model]: value,
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    // Save the API keys to localStorage for persistence
    const keysToSave = Object.entries(apiKeys)
      .filter(([_, value]) => value.trim() !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    // Store in localStorage
    localStorage.setItem("user_api_keys", JSON.stringify(keysToSave));

    // Call the onSave callback
    onSave(keysToSave);
    setIsSaved(true);
  };

  const isModelConfigured = (model: string) => {
    return availableModels.includes(model);
  };

  return (
    <Card className="border-[#E0F7FA] shadow-md">
      <CardHeader className="bg-[#F5F5DC] border-b">
        <CardTitle className="text-[#2B6CB0] font-playfair flex items-center">
          <Key className="mr-2 h-5 w-5" /> API Key Configuration
        </CardTitle>
        <CardDescription>
          Configure your own API keys for different AI models
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Bring Your Own Keys</AlertTitle>
          <AlertDescription className="text-blue-700">
            You can provide your own API keys for the AI models you want to use.
            Any keys you add will be stored in your browser and used for future
            sessions.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {Object.keys(apiKeys).map((model) => (
            <div key={model} className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor={`${model}-api-key`}
                  className="capitalize flex items-center"
                >
                  {model} API Key
                  {isModelConfigured(model) && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <Check className="h-3 w-3 mr-1" /> Pre-configured
                    </span>
                  )}
                </Label>
              </div>
              <Input
                id={`${model}-api-key`}
                type="password"
                placeholder={
                  isModelConfigured(model)
                    ? `Pre-configured key available (optional override)`
                    : `Enter your ${model} API key`
                }
                value={apiKeys[model]}
                onChange={(e) => handleChange(model, e.target.value)}
                className="border-[#E0F7FA] focus:border-[#2B6CB0] focus:ring-[#2B6CB0]"
              />
              {model === "openai" &&
                apiKeys[model] === "" &&
                !isModelConfigured(model) && (
                  <p className="text-xs text-amber-600 mt-1">
                    OpenAI key recommended for best results
                  </p>
                )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t flex justify-between">
        <div className="text-sm text-gray-500">
          {availableModels.length > 0 ? (
            <span>
              Pre-configured models:{" "}
              {availableModels
                .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
                .join(", ")}
            </span>
          ) : (
            <span>No pre-configured API keys available</span>
          )}
        </div>
        <Button
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#E0F7FA] text-[#2B6CB0] hover:bg-[#B2EBF2]"
        >
          <Save className="h-4 w-4" /> Save API Keys
        </Button>
      </CardFooter>
      {isSaved && (
        <div className="px-6 pb-6">
          <Alert className="bg-green-50 border-green-200">
            <AlertCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">API Keys Saved</AlertTitle>
            <AlertDescription className="text-green-700">
              Your API keys have been saved successfully. The application will
              now use these keys for AI model requests.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
};

export default APIKeyConfig;
