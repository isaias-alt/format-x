import { FormatType } from "./constants";

/**
 * Detect the format of the input text automatically
 */
export const detectFormat = (text: string): FormatType => {
  if (!text.trim()) return "plaintext";

  // Try to parse as JSON
  try {
    JSON.parse(text);
    return "json";
  } catch {}

  // Check for XML-like structure
  if (text.trim().startsWith("<") && text.trim().endsWith(">")) {
    return "xml";
  }

  // Check for YAML-like structure
  if (text.includes("---") || text.match(/^\w+:\s/m)) {
    return "yaml";
  }

  // Check for CSV-like structure
  if (text.includes(",") && text.includes("\n")) {
    return "csv";
  }

  return "plaintext";
};
