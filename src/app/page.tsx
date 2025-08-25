"use client";

import React from "react";
import {
  Copy,
  ArrowLeftRight,
  Trash2,
  AlertCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Footer from "@/components/footer";
import Header from "@/components/header";
import CodeEditor from "@/components/monaco-loader";

import {
  FORMATS,
  DEFAULT_INPUT_FORMAT,
  DEFAULT_OUTPUT_FORMAT,
  FormatType,
  DEFAULT_INPUT_TEXT,
} from "@/lib/constants";
import { useConverter } from "@/hooks/useConverter";
import { copyToClipboard } from "@/lib/clipboard";

export default function HomePage() {
  const {
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
  } = useConverter({
    initialInput: DEFAULT_INPUT_TEXT,
    initialInputFormat: DEFAULT_INPUT_FORMAT,
    initialOutputFormat: DEFAULT_OUTPUT_FORMAT,
    autoDetect: true,
  });

  const handleCopy = async (text: string, type: string) => {
    if (!text) {
      toast.error("No content to copy");
      return;
    }

    const success = await copyToClipboard(text);
    if (success) {
      toast.success(`${type} copied to clipboard`, {
        duration: 2000,
      });
    } else {
      toast.error("Error copying to clipboard");
    }
  };

  const handleSwap = () => {
    if (!inputValue && !outputValue) {
      toast.error("No content to swap");
      return;
    }

    swapPanels();
    toast.success("Panels swapped");
  };

  const handleClear = () => {
    if (!inputValue && !outputValue) {
      toast.error("No content to clear");
      return;
    }

    clearAll();
    toast.success("Content cleared");
  };

  return (
    <div className="h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Input Format Selector */}
            <Select
              value={inputFormat}
              onValueChange={(value: FormatType) => setInputFormat(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Input format" />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Swap Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              disabled={!inputValue && !outputValue}
              title="Swap panels"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </Button>

            {/* Output Format Selector */}
            <Select
              value={outputFormat}
              onValueChange={(value: FormatType) => setOutputFormat(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Output format" />
              </SelectTrigger>
              <SelectContent>
                {FORMATS.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Clear Button */}
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!inputValue && !outputValue}
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>

        {/* Panels */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Input ({inputFormat.toUpperCase()})
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {inputValue.length} chars
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(inputValue, "Input")}
                  disabled={!inputValue}
                  title="Copy input"
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <CodeEditor
              value={inputValue}
              onChange={setInputValue}
              language={inputFormat}
              placeholder={`Paste your ${inputFormat.toUpperCase()} here...`}
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Output ({outputFormat.toUpperCase()})
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {outputValue.length} chars
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(outputValue, "Output")}
                  disabled={!outputValue}
                  title="Copy output"
                >
                  <Copy className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <CodeEditor
              value={outputValue}
              onChange={() => {}}
              language={outputFormat}
              readOnly
              placeholder={
                error
                  ? `Conversion error - check input format`
                  : `The result in ${outputFormat.toUpperCase()} will appear here automatically...`
              }
            />
          </div>
        </div>

        {/* Status/Info Bar */}
        <div
          className={`mt-6 p-4 rounded-lg border transition-colors ${
            error
              ? "bg-destructive/5 border-destructive"
              : isValid
              ? "bg-green-500/5 border-green-500/20"
              : "bg-card border-border"
          }`}
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {error ? (
                <>
                  <AlertCircle className="w-4 h-4 text-destructive" />
                  <span className="text-destructive">{error}</span>
                </>
              ) : isValid ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-green-300">
                    {isProcessing ? "Processing..." : "Successful conversion"}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">
                  {isProcessing ? "Processing..." : "Ready to convert"}
                </span>
              )}
            </div>
            <span
              className={`flex items-center gap-2 ${
                error ? "text-destructive" : "text-green-300"
              }`}
            >
              {inputFormat.toUpperCase()}
              <ArrowRight className="w-4 h-4" />
              {outputFormat.toUpperCase()}
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
