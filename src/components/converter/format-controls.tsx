"use client";

import React from "react";
import { ArrowLeftRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORMATS, FormatType } from "@/lib/constants";

interface FormatControlsProps {
  inputFormat: FormatType;
  outputFormat: FormatType;
  hasContent: boolean;
  onInputFormatChange: (format: FormatType) => void;
  onOutputFormatChange: (format: FormatType) => void;
  onSwap: () => void;
  onClear: () => void;
}

const FormatControls: React.FC<FormatControlsProps> = ({
  inputFormat,
  outputFormat,
  hasContent,
  onInputFormatChange,
  onOutputFormatChange,
  onSwap,
  onClear,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {/* Input Format Selector */}
        <Select value={inputFormat} onValueChange={onInputFormatChange}>
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
          onClick={onSwap}
          disabled={!hasContent}
          title="Swap panels"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </Button>

        {/* Output Format Selector */}
        <Select value={outputFormat} onValueChange={onOutputFormatChange}>
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
      <Button variant="outline" onClick={onClear} disabled={!hasContent}>
        <Trash2 className="w-4 h-4" />
        Clear
      </Button>
    </div>
  );
};

export default FormatControls;
