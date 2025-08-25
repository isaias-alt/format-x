"use client";

import React from "react";
import { AlertCircle, CheckCircle, ArrowRight } from "lucide-react";
import { FormatType } from "@/lib/constants";

interface StatusBarProps {
  error: string | null;
  isValid: boolean;
  isProcessing: boolean;
  inputFormat: FormatType;
  outputFormat: FormatType;
}

const StatusBar: React.FC<StatusBarProps> = ({
  error,
  isValid,
  isProcessing,
  inputFormat,
  outputFormat,
}) => {
  const getStatusContent = () => {
    if (error) {
      return (
        <>
          <AlertCircle className="w-4 h-4 text-destructive" />
          <span className="text-destructive">{error}</span>
        </>
      );
    }

    if (isValid) {
      return (
        <>
          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-green-300">
            {isProcessing ? "Processing..." : "Successful conversion"}
          </span>
        </>
      );
    }

    return (
      <span className="text-muted-foreground">
        {isProcessing ? "Processing..." : "Ready to convert"}
      </span>
    );
  };

  const getContainerClasses = () => {
    if (error) {
      return "bg-destructive/5 border-destructive";
    }
    if (isValid) {
      return "bg-green-500/5 border-green-500/20";
    }
    return "bg-card border-border";
  };

  const getFormatClasses = () => {
    return error ? "text-destructive" : "text-green-300";
  };

  return (
    <div
      className={`mt-6 p-4 rounded-lg border transition-colors ${getContainerClasses()}`}
    >
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">{getStatusContent()}</div>
        <span className={`flex items-center gap-2 ${getFormatClasses()}`}>
          {inputFormat.toUpperCase()}
          <ArrowRight className="w-4 h-4" />
          {outputFormat.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default StatusBar;
