"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FormatControls from "@/components/converter/format-controls";
import ConverterPanels from "@/components/converter/converter-panels";
import StatusBar from "@/components/converter/status-bar";

import {
  DEFAULT_INPUT_FORMAT,
  DEFAULT_OUTPUT_FORMAT,
  DEFAULT_INPUT_TEXT,
  FormatType,
} from "@/lib/constants";
import { useConverter } from "@/hooks/useConverter";
import { useConverterActions } from "@/hooks/useConverterActions";

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

  const { handleInputCopy, handleOutputCopy, handleSwap, handleClear } =
    useConverterActions({
      inputValue,
      outputValue,
      clearAll,
      swapPanels,
    });

  const hasContent = Boolean(inputValue || outputValue);

  return (
    <div className="h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-7xl mx-auto p-6">
        <FormatControls
          inputFormat={inputFormat}
          outputFormat={outputFormat}
          hasContent={hasContent}
          onInputFormatChange={(format: FormatType) => setInputFormat(format)}
          onOutputFormatChange={(format: FormatType) => setOutputFormat(format)}
          onSwap={handleSwap}
          onClear={handleClear}
        />

        <ConverterPanels
          inputValue={inputValue}
          outputValue={outputValue}
          inputFormat={inputFormat}
          outputFormat={outputFormat}
          error={error}
          onInputChange={setInputValue}
          onInputCopy={handleInputCopy}
          onOutputCopy={handleOutputCopy}
        />

        <StatusBar
          error={error}
          isValid={isValid}
          isProcessing={isProcessing}
          inputFormat={inputFormat}
          outputFormat={outputFormat}
        />
      </main>

      <Footer />
    </div>
  );
}
