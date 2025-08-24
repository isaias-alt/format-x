"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const CodeEditor = dynamic(() => import("./code-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-96 border rounded-lg bg-[#1e1e1e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="text-sm">Loading editor...</span>
      </div>
    </div>
  ),
});

export default CodeEditor;
