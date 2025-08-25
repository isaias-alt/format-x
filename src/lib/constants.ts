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

export const DESCRIPTION =
  "A powerful tool for converting between different data formats: JSON, XML, YAML, CSV, and Plain Text. Format, validate, and transform your data with ease.";

export const KEYWORDS = [
  "JSON formatter",
  "JSON validator",
  "data converter",
  "XML to JSON",
  "YAML converter",
  "CSV converter",
  "format converter",
  "data transformation",
  "online tools",
  "developer tools",
];

export const OPEN_GRAPH = {
  type: "website",
  locale: "en_US",
  url: "https://format-x.vercel.app",
  title: "Format-X - JSON Formatter and Data Converter",
  description:
    "A powerful tool for converting between different data formats: JSON, XML, YAML, CSV, and Plain Text. Format, validate, and transform your data with ease.",
  siteName: "Format-X",
  images: [
    {
      url: "/og.webp",
      width: 1200,
      height: 630,
      alt: "Format-X - JSON Formatter and Data Converter",
      type: "image/webp",
    },
  ],
};

export const TWITTER = {
  card: "summary_large_image",
  title: "Format-X - JSON Formatter and Data Converter",
  description:
    "A powerful tool for converting between different data formats: JSON, XML, YAML, CSV, and Plain Text. Format, validate, and transform your data with ease.",
  images: ["/og.webp"],
  creator: "@lucascodev",
};

export const ICONS = {
  icon: [
    {
      url: "/logo.png",
      sizes: "32x32",
      type: "image/png",
    },
  ],
  apple: [
    {
      url: "/logo.png",
      sizes: "180x180",
      type: "image/png",
    },
  ],
};
