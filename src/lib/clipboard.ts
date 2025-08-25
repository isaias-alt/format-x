/**
 * Copy text to clipboard with error handling
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  if (!text) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);

    // Fallback method for older browsers
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand("copy");
      document.body.removeChild(textArea);
      return result;
    } catch (fallbackError) {
      console.error("Fallback copy method failed:", fallbackError);
      return false;
    }
  }
};
