"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

export default function HomePage() {
  const [inputValue, setInputValue] = useState(`{
  "name": "Sara Armoa",
  "age": 30,
  "email": "grotela@example.com",
  "address": {
    "street": "Calle Principal 123",
    "city": "Santa Rosa de Lima",
    "country": "Paraguay"
  },
  "hobbies": ["programming", "music", "travel"]
}`);
  const [outputValue, setOutputValue] = useState("");
  const [inputFormat, setInputFormat] = useState("json");
  const [outputFormat, setOutputFormat] = useState("xml");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  const formats = [
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "yaml", label: "YAML" },
    { value: "csv", label: "CSV" },
    { value: "plaintext", label: "Plain Text" },
  ];

  // Auto-detección de formato
  const detectFormat = (text: string) => {
    if (!text.trim()) return "plaintext";

    try {
      JSON.parse(text);
      return "json";
    } catch {}

    if (text.trim().startsWith("<") && text.trim().endsWith(">")) {
      return "xml";
    }

    if (text.includes("---") || text.match(/^\w+:\s/m)) {
      return "yaml";
    }

    if (text.includes(",") && text.includes("\n")) {
      return "csv";
    }

    return "plaintext";
  };

  // Formateo JSON
  const formatJSON = (text: string, minify = false) => {
    try {
      const parsed = JSON.parse(text);
      return minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
    } catch (error) {
      throw new Error(
        `Invalid JSON: ${
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error)
        }`
      );
    }
  };

  // Conversión JSON a XML
  const jsonToXML = (jsonText: string) => {
    try {
      const obj = JSON.parse(jsonText);

      const convertToXML = (obj: any, rootName = "root"): string => {
        if (typeof obj !== "object" || obj === null) {
          return `<${rootName}>${obj}</${rootName}>`;
        }

        if (Array.isArray(obj)) {
          return obj
            .map((item, index) => convertToXML(item, `item_${index}`))
            .join("\n");
        }

        const entries = Object.entries(obj);
        if (entries.length === 0) {
          return `<${rootName}></${rootName}>`;
        }

        const xmlContent = entries
          .map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              return `  <${key}>\n${convertToXML(value, key)
                .split("\n")
                .map((line) => "    " + line)
                .join("\n")}\n  </${key}>`;
            }
            return `  <${key}>${value}</${key}>`;
          })
          .join("\n");

        return `<${rootName}>\n${xmlContent}\n</${rootName}>`;
      };

      return `<?xml version="1.0" encoding="UTF-8"?>\n${convertToXML(obj)}`;
    } catch (error) {
      throw new Error(
        `Error converting JSON to XML: ${
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error)
        }`
      );
    }
  };

  // Conversión XML a JSON (básica)
  const xmlToJSON = (xmlText: string) => {
    try {
      // Remover declaración XML
      const cleanXml = xmlText.replace(/<\?xml.*?\?>/g, "").trim();

      // Parser XML simple (para casos básicos)
      const parseXMLToObj = (xmlStr: string): any => {
        const result: any = {};

        // Encontrar tags
        const tagRegex = /<(\w+)(?:[^>]*)>([^<]*)<\/\1>/g;
        let match;

        while ((match = tagRegex.exec(xmlStr)) !== null) {
          const [, tagName, content] = match;
          result[tagName] = content.trim();
        }

        return Object.keys(result).length > 0 ? result : { content: cleanXml };
      };

      const parsed = parseXMLToObj(cleanXml);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      throw new Error(
        `Error converting XML to JSON: ${
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error)
        }`
      );
    }
  };

  // Conversión JSON a YAML
  const jsonToYAML = (jsonText: string) => {
    try {
      const obj = JSON.parse(jsonText);

      const convertToYAML = (obj: any, indent = 0): string => {
        const spaces = "  ".repeat(indent);

        if (typeof obj !== "object" || obj === null) {
          return obj;
        }

        if (Array.isArray(obj)) {
          return obj
            .map((item) => {
              if (typeof item === "object" && item !== null) {
                const yamlStr = convertToYAML(item, indent + 1);
                return `${spaces}- ${yamlStr}`.replace(/\n/g, `\n${spaces}  `);
              }
              return `${spaces}- ${item}`;
            })
            .join("\n");
        }

        return Object.entries(obj)
          .map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              const yamlStr = convertToYAML(value, indent + 1);
              return `${spaces}${key}:\n${yamlStr}`;
            }
            return `${spaces}${key}: ${value}`;
          })
          .join("\n");
      };

      return convertToYAML(obj);
    } catch (error) {
      throw new Error(
        `Error converting JSON to YAML: ${
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error)
        }`
      );
    }
  };

  // Conversión JSON a CSV (simple)
  const jsonToCSV = (jsonText: string) => {
    try {
      const data = JSON.parse(jsonText);

      if (!Array.isArray(data)) {
        throw new Error("JSON must be an array to convert to CSV");
      }

      if (data.length === 0) {
        return "";
      }

      const headers = Object.keys(data[0]);
      const csvHeaders = headers.join(",");

      const csvRows = data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            return typeof value === "string" && value.includes(",")
              ? `"${value}"`
              : value;
          })
          .join(",")
      );

      return [csvHeaders, ...csvRows].join("\n");
    } catch (error) {
      throw new Error(
        `Error convirtiendo JSON a CSV: ${
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : String(error)
        }`
      );
    }
  };

  // Función principal de conversión
  const convertFormat = (
    text: string,
    fromFormat: string,
    toFormat: string
  ) => {
    if (!text.trim()) return "";

    try {
      if (fromFormat === toFormat) {
        if (fromFormat === "json") {
          return formatJSON(text);
        }
        return text;
      }

      switch (`${fromFormat}_to_${toFormat}`) {
        case "json_to_xml":
          return jsonToXML(text);
        case "json_to_yaml":
          return jsonToYAML(text);
        case "json_to_csv":
          return jsonToCSV(text);
        case "xml_to_json":
          return xmlToJSON(text);
        case "json_to_plaintext":
          return formatJSON(text);
        case "plaintext_to_json":
          return formatJSON(text);
        default:
          return text;
      }
    } catch (error) {
      throw error;
    }
  };

  // Conversión automática cuando cambia input o formatos
  useEffect(() => {
    if (!inputValue.trim()) {
      setOutputValue("");
      setError(null);
      setIsValid(false);
      return;
    }

    setIsProcessing(true);

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
  }, [inputValue, inputFormat, outputFormat]);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    // Auto-detección de formato
    if (value.trim()) {
      const detectedFormat = detectFormat(value);
      if (detectedFormat !== inputFormat && detectedFormat !== "plaintext") {
        setInputFormat(detectedFormat);
      }
    }
  };

  const handleCopy = async (text: string, type: string) => {
    if (!text) {
      toast.error("No content to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${type} copied to clipboard`, {
        duration: 2000,
      });
    } catch (err) {
      console.error("Error copying:", err);
      toast.error("Error copying to clipboard");
    }
  };

  const handleSwap = () => {
    if (!inputValue && !outputValue) {
      toast.error("No content to swap");
      return;
    }

    setInputValue(outputValue);
    setOutputValue(inputValue);

    // Intercambiar formatos
    const tempFormat = inputFormat;
    setInputFormat(outputFormat);
    setOutputFormat(tempFormat);

    toast.success("Panels swapped");
  };

  const handleClear = () => {
    if (!inputValue && !outputValue) {
      toast.error("No content to clear");
      return;
    }

    setInputValue("");
    setOutputValue("");
    setError(null);
    setIsValid(false);

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
            <Select value={inputFormat} onValueChange={setInputFormat}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Input format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
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
            <Select value={outputFormat} onValueChange={setOutputFormat}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Output format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
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
              onChange={handleInputChange}
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
