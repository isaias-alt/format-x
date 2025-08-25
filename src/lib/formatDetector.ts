import { FormatType } from "./constants";

export const detectFormat = (text: string): FormatType => {
  if (!text.trim()) return "plaintext";

  try {
    JSON.parse(text);
    return "json";
  } catch {}

  if (text.trim().startsWith("<") && text.trim().endsWith(">")) {
    return "xml";
  }

  if (text.includes("---") || text.match(/^\w+:\s/m)) {
    return "yaml";
  }

  if (text.includes(",") && text.includes("\n")) {
    return "csv";
  }

  return "plaintext";
};
