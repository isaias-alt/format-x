"use client";

import { Editor } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import type { editor } from "monaco-editor";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
  placeholder?: string;
}

const CodeEditor = ({
  value,
  onChange,
  language,
  readOnly = false,
  placeholder = "",
}: CodeEditorProps) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Mapear formatos a lenguajes de Monaco
  const getMonacoLanguage = (format: string) => {
    switch (format.toLowerCase()) {
      case "json":
        return "json";
      case "xml":
        return "xml";
      case "yaml":
        return "yaml";
      case "csv":
        return "plaintext";
      case "plaintext":
        return "plaintext";
      default:
        return "plaintext";
    }
  };

  const monacoLanguage = getMonacoLanguage(language);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    if (!value && placeholder) {
      editor.setValue(`// ${placeholder}`);
      editor.setSelection(new (window as any).monaco.Selection(1, 1, 1, 1));
    }
  };

  const handleEditorChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      if (newValue.trim().startsWith(`// ${placeholder}`)) {
        onChange("");
      } else {
        onChange(newValue);
      }
    }
  };

  useEffect(() => {
    if (editorRef.current && !value && placeholder) {
      editorRef.current.setValue(`// ${placeholder}`);
    } else if (editorRef.current && value) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== value) {
        editorRef.current.setValue(value);
      }
    }
  }, [value, placeholder]);

  return (
    <div className="h-[600px] border rounded-lg overflow-hidden bg-[#1e1e1e]">
      <Editor
        height="100%"
        language={monacoLanguage}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
          lineNumbers: "on",
          folding: true,
          selectOnLineNumbers: true,
          automaticLayout: true,
          fontSize: 14,
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
          tabSize: 2,
          insertSpaces: true,
          detectIndentation: false,
          renderWhitespace: "selection",
          renderControlCharacters: false,
          contextmenu: true,
          mouseWheelZoom: true,
          smoothScrolling: true,
          cursorBlinking: "blink",
          cursorSmoothCaretAnimation: "on",
          renderLineHighlight: "line",
          selectionHighlight: true,
          occurrencesHighlight: "singleFile",
          find: {
            autoFindInSelection: "never",
            seedSearchStringFromSelection: "selection",
          },
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true,
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: "on",
          bracketPairColorization: {
            enabled: true,
          },
          guides: {
            bracketPairs: true,
            indentation: true,
          },
          autoIndent: "full",
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
