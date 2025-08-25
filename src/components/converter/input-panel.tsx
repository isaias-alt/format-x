"use client";

import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/monaco-loader";
import { FormatType } from "@/lib/constants";

interface InputPanelProps {
  value: string;
  format: FormatType;
  onChange: (value: string) => void;
  onCopy: () => void;
}

const InputPanel: React.FC<InputPanelProps> = ({
  value,
  format,
  onChange,
  onCopy,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Input ({format.toUpperCase()})
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {value.length} chars
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={onCopy}
            disabled={!value}
            title="Copy input"
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <CodeEditor
        value={value}
        onChange={onChange}
        language={format}
        placeholder={`Paste your ${format.toUpperCase()} here...`}
      />
    </div>
  );
};

export default InputPanel;
