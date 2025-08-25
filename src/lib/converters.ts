import { FormatType } from "./constants";
import { formatJSON, parseTextAsJSON } from "./formatters";

/**
 * Convert JSON to XML format
 */
export const jsonToXML = (jsonText: string): string => {
  try {
    const obj = JSON.parse(jsonText);

    const convertToXML = (obj: any, rootName = "root"): string => {
      if (typeof obj !== "object" || obj === null) {
        return `<${rootName}>${obj}</${rootName}>`;
      }

      if (Array.isArray(obj)) {
        return obj
          .map((item, index) => convertToXML(item, `item_${index}`))
          .join("\n");
      }

      const entries = Object.entries(obj);
      if (entries.length === 0) {
        return `<${rootName}></${rootName}>`;
      }

      const xmlContent = entries
        .map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            return `  <${key}>\n${convertToXML(value, key)
              .split("\n")
              .map((line) => "    " + line)
              .join("\n")}\n  </${key}>`;
          }
          return `  <${key}>${value}</${key}>`;
        })
        .join("\n");

      return `<${rootName}>\n${xmlContent}\n</${rootName}>`;
    };

    return `<?xml version="1.0" encoding="UTF-8"?>\n${convertToXML(obj)}`;
  } catch (error) {
    throw new Error(
      `Error converting JSON to XML: ${
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : String(error)
      }`
    );
  }
};

/**
 * Convert XML to JSON format (basic implementation)
 */
export const xmlToJSON = (xmlText: string): string => {
  try {
    // Remove XML declaration
    const cleanXml = xmlText.replace(/<\?xml.*?\?>/g, "").trim();

    // Simple XML parser (for basic cases)
    const parseXMLToObj = (xmlStr: string): any => {
      const result: any = {};

      // Find tags
      const tagRegex = /<(\w+)(?:[^>]*)>([^<]*)<\/\1>/g;
      let match;

      while ((match = tagRegex.exec(xmlStr)) !== null) {
        const [, tagName, content] = match;
        result[tagName] = content.trim();
      }

      return Object.keys(result).length > 0 ? result : { content: cleanXml };
    };

    const parsed = parseXMLToObj(cleanXml);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error(
      `Error converting XML to JSON: ${
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : String(error)
      }`
    );
  }
};

/**
 * Convert JSON to YAML format
 */
export const jsonToYAML = (jsonText: string): string => {
  try {
    const obj = JSON.parse(jsonText);

    const convertToYAML = (obj: any, indent = 0): string => {
      const spaces = "  ".repeat(indent);

      if (typeof obj !== "object" || obj === null) {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj
          .map((item) => {
            if (typeof item === "object" && item !== null) {
              const yamlStr = convertToYAML(item, indent + 1);
              return `${spaces}- ${yamlStr}`.replace(/\n/g, `\n${spaces}  `);
            }
            return `${spaces}- ${item}`;
          })
          .join("\n");
      }

      return Object.entries(obj)
        .map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            const yamlStr = convertToYAML(value, indent + 1);
            return `${spaces}${key}:\n${yamlStr}`;
          }
          return `${spaces}${key}: ${value}`;
        })
        .join("\n");
    };

    return convertToYAML(obj);
  } catch (error) {
    throw new Error(
      `Error converting JSON to YAML: ${
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : String(error)
      }`
    );
  }
};

/**
 * Convert JSON to CSV format
 */
export const jsonToCSV = (jsonText: string): string => {
  try {
    const data = JSON.parse(jsonText);

    if (!Array.isArray(data)) {
      throw new Error("JSON must be an array to convert to CSV");
    }

    if (data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(",");

    const csvRows = data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(",")
    );

    return [csvHeaders, ...csvRows].join("\n");
  } catch (error) {
    throw new Error(
      `Error converting JSON to CSV: ${
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : String(error)
      }`
    );
  }
};

/**
 * Main conversion function that handles all format conversions
 */
export const convertFormat = (
  text: string,
  fromFormat: FormatType,
  toFormat: FormatType
): string => {
  if (!text.trim()) return "";

  try {
    // If formats are the same, just format the text
    if (fromFormat === toFormat) {
      if (fromFormat === "json") {
        return formatJSON(text);
      }
      return text;
    }

    // Handle conversions based on format combination
    switch (`${fromFormat}_to_${toFormat}`) {
      case "json_to_xml":
        return jsonToXML(text);
      case "json_to_yaml":
        return jsonToYAML(text);
      case "json_to_csv":
        return jsonToCSV(text);
      case "json_to_plaintext":
        return formatJSON(text);
      case "xml_to_json":
        return xmlToJSON(text);
      case "plaintext_to_json":
        return parseTextAsJSON(text);
      default:
        // For unsupported conversions, return the original text
        return text;
    }
  } catch (error) {
    throw error;
  }
};
