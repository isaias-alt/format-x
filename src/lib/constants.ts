export const FORMATS = [
  { value: "plaintext", label: "Plain Text" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "yaml", label: "YAML" },
  { value: "csv", label: "CSV" },
] as const;

export type FormatType = (typeof FORMATS)[number]["value"];

export const DEFAULT_INPUT_FORMAT: FormatType = "plaintext";
export const DEFAULT_OUTPUT_FORMAT: FormatType = "json";

export const DEFAULT_INPUT_TEXT = `Welcome to Format-X!
This is a powerful tool for converting between different data formats.

You can:
- Convert plain text to structured JSON
- Transform JSON to XML, YAML, or CSV
- Validate and format your data
- Auto-detect input formats

name: John Doe
age: 30
email: john@example.com
hobbies: programming, music, travel`;

export const MONACO_LANGUAGE_MAP: Record<FormatType, string> = {
  json: "json",
  xml: "xml",
  yaml: "yaml",
  csv: "plaintext",
  plaintext: "plaintext",
} as const;
