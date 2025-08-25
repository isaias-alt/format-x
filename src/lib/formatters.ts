/**
 * Format JSON with proper indentation
 */
export const formatJSON = (text: string, minify = false): string => {
  try {
    const parsed = JSON.parse(text);
    return minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error(
      `Invalid JSON: ${
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : String(error)
      }`
    );
  }
};

/**
 * Try to parse plain text as JSON
 */
export const parseTextAsJSON = (text: string): string => {
  try {
    // If it's already valid JSON, format it
    return formatJSON(text);
  } catch {
    // If not valid JSON, try to create a JSON structure from plain text
    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length === 0) {
      return JSON.stringify({ content: "" }, null, 2);
    }

    if (lines.length === 1) {
      return JSON.stringify({ content: text.trim() }, null, 2);
    }

    // Try to detect key-value pairs
    const keyValuePairs: Record<string, any> = {};
    let hasKeyValuePairs = false;

    for (const line of lines) {
      const match = line.match(/^(.+?):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        keyValuePairs[key.trim()] = value.trim();
        hasKeyValuePairs = true;
      }
    }

    if (hasKeyValuePairs && Object.keys(keyValuePairs).length > 0) {
      return JSON.stringify(keyValuePairs, null, 2);
    }

    // Otherwise, create an array of lines
    return JSON.stringify({ lines }, null, 2);
  }
};
