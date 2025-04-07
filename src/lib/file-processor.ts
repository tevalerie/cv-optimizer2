/**
 * Utility functions for processing uploaded files
 */

/**
 * Extract text content from a file
 * @param file The file to extract text from
 */
export const extractTextFromFile = async (file: File): Promise<string> => {
  // Check file type to determine how to read it
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // For binary files like DOCX/PDF, we need a different approach
  if (
    fileType.includes("application/vnd.openxmlformats") ||
    fileType.includes("application/pdf") ||
    fileType.includes("application/msword") ||
    fileName.endsWith(".docx") ||
    fileName.endsWith(".pdf") ||
    fileName.endsWith(".doc")
  ) {
    // For binary files, create a more descriptive placeholder with metadata
    const fileExtension = fileName.split(".").pop();
    const placeholderContent = `# Content extracted from ${file.name}\n\nFile type: ${fileType}\nFile size: ${Math.round(file.size / 1024)} KB\n\n`;

    // Return a special marker that indicates this is binary content
    // This will be used by CVOptimizerApp to determine whether to use the actual content or not
    return placeholderContent + `-binary-content-${fileExtension}`;
  }

  // For text files, read as text
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error("Failed to read file content"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsText(file);
  });
};

/**
 * Process CV content for analysis
 * @param content The CV content as text
 */
export const processCVContent = (content: string): string => {
  // Clean and format the CV text
  let processedContent = content;

  // Remove any binary markers if present
  processedContent = processedContent.replace(/%PDF-binary-content/g, "");
  processedContent = processedContent.replace(/PK-binary-content-docx/g, "");

  // Remove any placeholder messages
  processedContent = processedContent.replace(
    /This is a placeholder for the binary file content.*/g,
    "",
  );

  // Ensure the content has proper markdown formatting
  if (!processedContent.startsWith("#") && !processedContent.includes("\n#")) {
    // If there's no heading, try to extract a name from the first line
    const lines = processedContent.split("\n");
    if (lines.length > 0 && lines[0].trim()) {
      // Assume the first non-empty line is the name
      processedContent = `# ${lines[0].trim()}\n\n` + lines.slice(1).join("\n");
    } else {
      // Add a generic heading if we can't find a name
      processedContent = `# CV Content\n\n` + processedContent;
    }
  }

  return processedContent.trim();
};

/**
 * Process TOR content for analysis
 * @param content The TOR content as text
 */
export const processTORContent = (content: string): string => {
  // Clean and format the TOR text
  let processedContent = content;

  // Remove any binary markers if present
  processedContent = processedContent.replace(/%PDF-binary-content/g, "");
  processedContent = processedContent.replace(/PK-binary-content-docx/g, "");

  // Remove any placeholder messages
  processedContent = processedContent.replace(
    /This is a placeholder for the binary file content.*/g,
    "",
  );

  // Ensure the content has proper markdown formatting
  if (!processedContent.startsWith("#") && !processedContent.includes("\n#")) {
    processedContent = `# Terms of Reference\n\n` + processedContent;
  }

  return processedContent.trim();
};
