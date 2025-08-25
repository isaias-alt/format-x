"use client";

import React from "react";
import InputPanel from "./input-panel";
import OutputPanel from "./output-panel";
import { FormatType } from "@/lib/constants";

interface ConverterPanelsProps {
  inputValue: string;
  outputValue: string;
  inputFormat: FormatType;
  outputFormat: FormatType;
  error: string | null;
  onInputChange: (value: string) => void;
  onInputCopy: () => void;
  onOutputCopy: () => void;
}

const ConverterPanels: React.FC<ConverterPanelsProps> = ({
  inputValue,
  outputValue,
  inputFormat,
  outputFormat,
  error,
  onInputChange,
  onInputCopy,
  onOutputCopy,
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <InputPanel
        value={inputValue}
        format={inputFormat}
        onChange={onInputChange}
        onCopy={onInputCopy}
      />

      <OutputPanel
        value={outputValue}
        format={outputFormat}
        error={error}
        onCopy={onOutputCopy}
      />
    </div>
  );
};

export default ConverterPanels;
