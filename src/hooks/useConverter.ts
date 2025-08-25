import { FormatType } from "@/lib/constants";
import { convertFormat } from "@/lib/converters";
import { detectFormat } from "@/lib/formatDetector";
import { useState, useEffect } from "react";

interface UseConverterProps {
  initialInput?: string;
  initialInputFormat?: FormatType;
  initialOutputFormat?: FormatType;
  autoDetect?: boolean;
}

interface UseConverterReturn {
  inputValue: string;
  outputValue: string;
  inputFormat: FormatType;
  outputFormat: FormatType;
  isProcessing: boolean;
  error: string | null;
  isValid: boolean;
  setInputValue: (value: string) => void;
  setInputFormat: (format: FormatType) => void;
  setOutputFormat: (format: FormatType) => void;
  clearAll: () => void;
  swapPanels: () => void;
}

export const useConverter = ({
  initialInput = "",
  initialInputFormat = "plaintext",
  initialOutputFormat = "json",
  autoDetect = true,
}: UseConverterProps = {}): UseConverterReturn => {
  const [inputValue, setInputValueState] = useState(initialInput);
  const [outputValue, setOutputValue] = useState("");
  const [inputFormat, setInputFormat] =
    useState<FormatType>(initialInputFormat);
  const [outputFormat, setOutputFormat] =
    useState<FormatType>(initialOutputFormat);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  // Enhanced setInputValue with auto-detection
  const setInputValue = (value: string) => {
    setInputValueState(value);

    // Auto-detection of format if enabled
    if (autoDetect && value.trim()) {
      const detectedFormat = detectFormat(value);
      if (detectedFormat !== inputFormat && detectedFormat !== "plaintext") {
        setInputFormat(detectedFormat);
      }
    }
  };

  // Auto-conversion effect
  useEffect(() => {
    if (!inputValue.trim()) {
      setOutputValue("");
      setError(null);
      setIsValid(false);
      return;
    }

    setIsProcessing(true);

    // Use setTimeout to avoid blocking the UI
    const timeoutId = setTimeout(() => {
      try {
        const result = convertFormat(inputValue, inputFormat, outputFormat);
        setOutputValue(result);
        setError(null);
        setIsValid(true);
      } catch (err) {
        setError(
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message: string }).message
            : String(err)
        );
        setOutputValue("");
        setIsValid(false);
      } finally {
        setIsProcessing(false);
      }
    }, 100); // Small delay to avoid too frequent conversions

    return () => clearTimeout(timeoutId);
  }, [inputValue, inputFormat, outputFormat]);

  const clearAll = () => {
    setInputValueState("");
    setOutputValue("");
    setError(null);
    setIsValid(false);
  };

  const swapPanels = () => {
    const tempValue = inputValue;
    const tempFormat = inputFormat;

    setInputValueState(outputValue);
    setInputFormat(outputFormat);
    setOutputFormat(tempFormat);
    // Note: outputValue will be updated by the useEffect
  };

  return {
    inputValue,
    outputValue,
    inputFormat,
    outputFormat,
    isProcessing,
    error,
    isValid,
    setInputValue,
    setInputFormat,
    setOutputFormat,
    clearAll,
    swapPanels,
  };
};
