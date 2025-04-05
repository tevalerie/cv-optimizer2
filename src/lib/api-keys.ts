/**
 * Utility functions for managing API keys for different AI models
 */

export type AIModelKey = {
  key: string;
  isAvailable: boolean;
};

/**
 * Get user-provided API keys from localStorage
 */
export const getUserApiKeys = (): Record<string, string> => {
  try {
    const storedKeys = localStorage.getItem("user_api_keys");
    return storedKeys ? JSON.parse(storedKeys) : {};
  } catch (error) {
    console.error("Error retrieving user API keys:", error);
    return {};
  }
};

/**
 * Get API key for a specific model, prioritizing user-provided keys
 */
export const getApiKey = (model: string): AIModelKey => {
  // Environment variables (pre-configured keys)
  const envKeys: Record<string, string> = {
    openai: import.meta.env.VITE_OPENAI_API_KEY,
    claude: import.meta.env.VITE_CLAUDE_API_KEY,
    gemini: import.meta.env.VITE_GEMINI_API_KEY,
    qwen: import.meta.env.VITE_QWEN_API_KEY,
    deepseek: import.meta.env.VITE_DEEPSEEK_API_KEY,
  };

  // User-provided keys from localStorage
  const userKeys = getUserApiKeys();

  // Prioritize user-provided keys over environment variables
  const key = userKeys[model] || envKeys[model] || "";

  return {
    key,
    isAvailable: Boolean(key),
  };
};

/**
 * Check if any API keys are configured (either in env or user-provided)
 */
export const hasAnyApiKeys = (): boolean => {
  // Check environment variables
  const hasEnvKeys = [
    import.meta.env.VITE_OPENAI_API_KEY,
    import.meta.env.VITE_CLAUDE_API_KEY,
    import.meta.env.VITE_GEMINI_API_KEY,
    import.meta.env.VITE_QWEN_API_KEY,
    import.meta.env.VITE_DEEPSEEK_API_KEY,
  ].some(Boolean);

  // Check user-provided keys
  const userKeys = getUserApiKeys();
  const hasUserKeys = Object.values(userKeys).some(Boolean);

  return hasEnvKeys || hasUserKeys;
};

/**
 * Get all available AI models based on configured API keys (env + user-provided)
 */
export const getAvailableModels = (): string[] => {
  // Environment-configured models
  const envModels = [
    { id: "openai", key: import.meta.env.VITE_OPENAI_API_KEY },
    { id: "claude", key: import.meta.env.VITE_CLAUDE_API_KEY },
    { id: "gemini", key: import.meta.env.VITE_GEMINI_API_KEY },
    { id: "qwen", key: import.meta.env.VITE_QWEN_API_KEY },
    { id: "deepseek", key: import.meta.env.VITE_DEEPSEEK_API_KEY },
  ]
    .filter((model) => Boolean(model.key))
    .map((model) => model.id);

  return envModels;
};

/**
 * Get all models that have either env or user-provided keys
 */
export const getAllAvailableModels = (): string[] => {
  // Get models with environment keys
  const envModels = getAvailableModels();

  // Get models with user-provided keys
  const userKeys = getUserApiKeys();
  const userModels = Object.keys(userKeys).filter((model) =>
    Boolean(userKeys[model]),
  );

  // Combine and remove duplicates
  const allModels = [...new Set([...envModels, ...userModels])];

  return allModels;
};
