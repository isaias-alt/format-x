"use client";

import React, { useState, useEffect } from "react";
import {
  Copy,
  ArrowLeftRight,
  Trash2,
  Star,
  Github,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const JsonFormatterConverter = () => {
  const [inputValue, setInputValue] = useState(`{
  "name": "Juan Pérez",
  "age": 30,
  "email": "juan@example.com",
  "address": {
    "street": "Calle Principal 123",
    "city": "Madrid",
    "country": "España"
  },
  "hobbies": ["programación", "música", "viajes"]
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
        `JSON inválido: ${
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
        `Error convirtiendo JSON a XML: ${
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
        `Error convirtiendo XML a JSON: ${
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
        `Error convirtiendo JSON a YAML: ${
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
        throw new Error("JSON debe ser un array para convertir a CSV");
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
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      // Mostrar feedback temporal
      const originalError = error;
      setError(null);
      setIsValid(true);

      setTimeout(() => {
        setError(originalError);
        setIsValid(!!inputValue && !originalError);
      }, 2000);

      console.log(`${type} copiado al portapapeles`);
    } catch (err) {
      setError("Error al copiar al portapapeles");
      console.error("Error al copiar:", err);
    }
  };

  const handleSwap = () => {
    setInputValue(outputValue);
    setOutputValue(inputValue);

    // Intercambiar formatos
    const tempFormat = inputFormat;
    setInputFormat(outputFormat);
    setOutputFormat(tempFormat);
  };

  const handleClear = () => {
    setInputValue("");
    setOutputValue("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              JSON Formatter & Converter
            </h1>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm">Star on GitHub</span>
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Input Format Selector */}
            <select
              value={inputFormat}
              onChange={(e) => setInputFormat(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              {formats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              disabled={!inputValue && !outputValue}
              className="p-2 rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Intercambiar paneles"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            {/* Output Format Selector */}
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              {formats.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            disabled={!inputValue && !outputValue}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Limpiar todo"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Clear</span>
          </button>
        </div>

        {/* Panels */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Input ({inputFormat.toUpperCase()})
              </h2>
              <button
                onClick={() => handleCopy(inputValue, "Input")}
                disabled={!inputValue}
                className="p-1.5 rounded border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Copiar input"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={`Pega aquí tu ${inputFormat.toUpperCase()}...`}
                className="w-full h-96 bg-card border border-border rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                spellCheck={false}
              />

              {/* Character Count */}
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
                {inputValue.length} chars
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Output ({outputFormat.toUpperCase()})
              </h2>
              <button
                onClick={() => handleCopy(outputValue, "Output")}
                disabled={!outputValue}
                className="p-1.5 rounded border border-border bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Copiar output"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative">
              <textarea
                value={outputValue}
                readOnly
                placeholder={
                  error
                    ? `Error en la conversión - revisa el formato de entrada`
                    : `El resultado en ${outputFormat.toUpperCase()} aparecerá aquí automáticamente...`
                }
                className={`w-full h-96 border rounded-lg p-4 text-sm font-mono resize-none focus:outline-none transition-colors ${
                  error
                    ? "bg-destructive/5 border-destructive text-destructive"
                    : "bg-card border-border"
                }`}
                spellCheck={false}
              />

              {/* Character Count */}
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
                {outputValue.length} chars
              </div>
            </div>
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
                  <span className="text-green-700 dark:text-green-300">
                    {isProcessing ? "Procesando..." : "Conversión exitosa"}
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">
                  {isProcessing ? "Procesando..." : "Listo para convertir"}
                </span>
              )}
            </div>
            <span className="text-muted-foreground">
              {inputFormat.toUpperCase()} → {outputFormat.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Mobile: Responsive Note */}
        <div className="lg:hidden mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡 En pantallas grandes verás ambos paneles lado a lado
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            Created by{" "}
            <span className="text-foreground font-medium">luisgardev</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default JsonFormatterConverter;
