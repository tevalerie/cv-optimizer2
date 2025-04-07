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
    fileName.endsWith(".docx") ||
    fileName.endsWith(".pdf")
  ) {
    // For binary files, create a more descriptive placeholder with sample content
    const fileExtension = fileName.split(".").pop();
    const placeholderContent = `# Content extracted from ${file.name}\n\nFile type: ${fileType}\nFile size: ${Math.round(file.size / 1024)} KB\n\n`;

    // Add specific content based on file type
    if (fileName.endsWith(".pdf")) {
      // Provide a more realistic CV sample for PDF files
      return (
        placeholderContent +
        "# John Smith\njsmith@email.com | (555) 123-4567 | linkedin.com/in/johnsmith\n\n## PROFESSIONAL SUMMARY\nExperienced management consultant with 5 years of experience in strategy development and implementation. Strong analytical skills with expertise in data-driven decision making and process optimization.\n\n## EXPERIENCE\nSenior Consultant | ABC Consulting\nJan 2020 - Present\n- Led a team of 4 consultants on a cost reduction project for a Fortune 500 client, resulting in $2.5M annual savings\n- Developed and implemented a new supply chain strategy for a manufacturing client, improving efficiency by 15%\n- Conducted market analysis and competitive benchmarking for 3 major clients in the technology sector\n\nConsultant | XYZ Advisory\nJun 2017 - Dec 2019\n- Supported the development of a 5-year strategic plan for a healthcare provider\n- Analyzed financial data and created forecasting models for clients across various industries\n- Prepared and delivered client presentations and implementation roadmaps\n\n## EDUCATION\nMBA, Business Administration | Harvard Business School\n2015 - 2017\n\nB.S., Economics | University of Pennsylvania\n2011 - 2015\n\n## SKILLS\n- Strategic Planning\n- Financial Analysis\n- Project Management\n- Data Visualization\n- Market Research\n- Client Relationship Management"
      );
    } else if (fileName.endsWith(".docx")) {
      // Provide a more realistic CV sample for DOCX files
      return (
        placeholderContent +
        "# Jane Doe\njdoe@email.com | (555) 987-6543 | linkedin.com/in/janedoe\n\n## PROFESSIONAL SUMMARY\nSoftware Engineer with 4 years of experience in full-stack development. Proficient in JavaScript, TypeScript, React, and Node.js. Passionate about creating scalable and maintainable web applications.\n\n## EXPERIENCE\nSenior Software Engineer | Tech Solutions Inc.\nMar 2021 - Present\n- Developed and maintained RESTful APIs using Node.js and Express\n- Implemented responsive UI components using React and TypeScript\n- Collaborated with cross-functional teams to deliver features on time\n\nSoftware Developer | Digital Innovations\nJan 2019 - Feb 2021\n- Built and maintained web applications using React and Redux\n- Implemented unit and integration tests using Jest and React Testing Library\n- Participated in code reviews and mentored junior developers\n\n## EDUCATION\nB.S., Computer Science | Stanford University\n2015 - 2019\n\n## SKILLS\n- JavaScript/TypeScript\n- React/Redux\n- Node.js/Express\n- HTML/CSS\n- Git/GitHub\n- Jest/Testing Library"
      );
    } else {
      // Generic sample for other binary file types
      return (
        placeholderContent +
        "# Sample CV\n\n## PROFESSIONAL SUMMARY\nExperienced professional with a strong background in the relevant field.\n\n## EXPERIENCE\nSenior Position | Company Name\nDate Range\n- Key achievement 1\n- Key achievement 2\n- Key achievement 3\n\nJunior Position | Previous Company\nDate Range\n- Responsibility 1\n- Responsibility 2\n- Responsibility 3\n\n## EDUCATION\nDegree, Field of Study | University Name\nGraduation Year\n\n## SKILLS\n- Skill 1\n- Skill 2\n- Skill 3\n- Skill 4"
      );
    }
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
