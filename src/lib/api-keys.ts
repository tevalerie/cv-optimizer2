/**
 * Utility functions for managing API keys for different AI models
 */

export type AIModelKey = {
  key: string;
  isAvailable: boolean;
};

export const getApiKey = (model: string): AIModelKey => {
  const keys: Record<string, string> = {
    openai: import.meta.env.VITE_OPENAI_API_KEY,
    claude: import.meta.env.VITE_CLAUDE_API_KEY,
    gemini: import.meta.env.VITE_GEMINI_API_KEY,
    qwen: import.meta.env.VITE_QWEN_API_KEY,
    deepseek: import.meta.env.VITE_DEEPSEEK_API_KEY,
  };

  return {
    key: keys[model] || "",
    isAvailable: Boolean(keys[model]),
  };
};

/**
 * Check if any API keys are configured
 */
export const hasAnyApiKeys = (): boolean => {
  return [
    import.meta.env.VITE_OPENAI_API_KEY,
    import.meta.env.VITE_CLAUDE_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY,
    import.meta.env.VITE_QWEN_API_KEY,
    import.meta.env.VITE_DEEPSEEK_API_KEY,
  ].some(Boolean);
};

/**
 * Get all available AI models based on configured API keys
 */
export const getAvailableModels = (): string[] => {
  const models = [
    { id: "openai", key: import.meta.env.VITE_OPENAI_API_KEY },
    { id: "claude", key: import.meta.env.VITE_CLAUDE_API_KEY },
    { id: "gemini", key: import.meta.env.VITE_GEMINI_API_KEY },
    { id: "qwen", key: import.meta.env.VITE_QWEN_API_KEY },
    { id: "deepseek", key: import.meta.env.VITE_DEEPSEEK_API_KEY },
  ];

  return models.filter((model) => Boolean(model.key)).map((model) => model.id);
};
