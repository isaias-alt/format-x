"use client";

import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/monaco-loader";
import { FormatType } from "@/lib/constants";

interface OutputPanelProps {
  value: string;
  format: FormatType;
  error: string | null;
  onCopy: () => void;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  value,
  format,
  error,
  onCopy,
}) => {
  const placeholder = error
    ? `Conversion error - check input format`
    : `The result in ${format.toUpperCase()} will appear here automatically...`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Output ({format.toUpperCase()})
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
            title="Copy output"
          >
            <Copy className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <CodeEditor
        value={value}
        onChange={() => {}}
        language={format}
        readOnly
        placeholder={placeholder}
      />
    </div>
  );
};

export default OutputPanel;
