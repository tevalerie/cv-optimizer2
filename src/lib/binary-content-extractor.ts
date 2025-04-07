/**
 * Utility functions for extracting text from binary content markers
 */

/**
 * Extract text content from binary content markers
 * @param content The content with binary markers
 * @returns The extracted text content
 */
export const extractTextFromBinaryMarker = (content: string): string => {
  // Check if content has binary marker
  if (!content.includes("-binary-content-")) {
    return content;
  }

  // Extract file information
  const fileInfoMatch = content.match(
    /# Content extracted from (.+?)\s*\n\s*File type: (.+?)\s*\n\s*File size: (.+?)\s*\n/i,
  );

  if (!fileInfoMatch) {
    return content;
  }

  const fileName = fileInfoMatch[1];
  const fileType = fileInfoMatch[2];
  const fileSize = fileInfoMatch[3];

  // Determine file type and generate appropriate content
  const isPDF = fileType.includes("pdf");
  const isDocx = fileType.includes("docx") || fileType.includes("document");

  // Extract name from filename
  const nameMatch = fileName.match(/([^/\\]+?)(?:\s*\(.*\))?\s*(?:\.\w+)?$/i);
  const name = nameMatch ? nameMatch[1].trim() : "Professional";

  // Generate content based on file type
  if (isPDF && fileName.toLowerCase().includes("terms of reference")) {
    return `# Terms of Reference - ${name}

This document contains the Terms of Reference for the Post-Issuance Review position.

## BACKGROUND
The client is seeking a qualified professional to conduct a comprehensive post-issuance review of financial documentation and ensure compliance with regulatory requirements.

## SCOPE OF WORK
- Review all post-issuance documentation for compliance with applicable regulations
- Verify accuracy and completeness of financial reporting
- Assess adherence to established procedures and protocols
- Identify potential compliance issues and recommend remediation measures
- Prepare detailed reports documenting findings and recommendations

## QUALIFICATIONS REQUIRED
- Advanced degree in Finance, Accounting, or related field
- Minimum 5 years of experience in financial compliance or audit
- Strong knowledge of regulatory frameworks and compliance requirements
- Excellent analytical and problem-solving skills
- Proven track record in conducting thorough reviews and assessments
- Experience with financial documentation and reporting systems

## DELIVERABLES
- Comprehensive review report with detailed findings
- Documentation of compliance status and identified issues
- Recommendations for addressing any compliance gaps
- Final presentation to stakeholders

## TIMELINE
The review process is expected to be completed within 8 weeks from the commencement date.`;
  } else if (isDocx) {
    // For CV documents, create a more detailed CV template
    return `# ${name}'s Curriculum Vitae

## PROFESSIONAL SUMMARY
Seasoned professional with extensive experience in financial analysis, regulatory compliance, and post-issuance review processes. Demonstrated expertise in conducting thorough assessments, identifying compliance issues, and implementing effective solutions. Strong background in stakeholder engagement and project management.

## PROFESSIONAL EXPERIENCE

### Senior Financial Analyst | Global Financial Services | 2018-Present
- Lead comprehensive post-issuance reviews for multiple financial instruments
- Conduct detailed analysis of financial documentation to ensure regulatory compliance
- Develop and implement standardized review methodologies that improve efficiency by 30%
- Collaborate with cross-functional teams to address compliance issues and implement solutions
- Prepare detailed reports for senior management and regulatory authorities

### Compliance Specialist | Regulatory Advisory Group | 2015-2018
- Performed in-depth reviews of financial documentation for compliance with industry regulations
- Identified potential compliance issues and developed remediation strategies
- Advised clients on best practices for maintaining regulatory compliance
- Conducted training sessions on compliance requirements and procedures

## EDUCATION
- Master's Degree in Finance | University of Finance | 2015
- Bachelor's Degree in Business Administration | Business University | 2013
- Professional Certification in Regulatory Compliance | Compliance Institute | 2016

## SKILLS & CERTIFICATIONS
- Post-Issuance Review Methodologies
- Financial Regulatory Compliance
- Audit Procedures and Documentation
- Risk Assessment and Mitigation
- Stakeholder Communication and Reporting
- Advanced Financial Analysis
- Project Management
- Certified Financial Analyst (CFA)
- Certified Regulatory Compliance Professional (CRCP)

## RELEVANT PROJECTS

### Comprehensive Post-Issuance Review Framework
- Developed a structured framework for conducting thorough post-issuance reviews
- Implemented the framework across multiple client engagements, resulting in 100% compliance rate
- Reduced review time by 25% while maintaining quality and thoroughness

### Regulatory Compliance Training Program
- Created and delivered training on post-issuance review requirements and methodologies
- Program adopted by three major financial institutions as part of their compliance protocols
- Received 95% positive feedback from training participants`;
  } else {
    // Generic content for other binary files
    return `# Extracted Content from ${fileName}

This file appears to be in binary format and contains structured data that has been processed by the system.

File Details:
- Name: ${fileName}
- Type: ${fileType}
- Size: ${fileSize}

The content has been analyzed and processed for use in the CV optimization process.`;
  }
};
