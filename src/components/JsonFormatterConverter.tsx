"use client";

import React, { useState } from "react";
import { Copy, ArrowLeftRight, Trash2, Star, Github } from "lucide-react";

const JsonFormatterConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [inputFormat, setInputFormat] = useState("json");
  const [outputFormat, setOutputFormat] = useState("json");
  const [isProcessing, setIsProcessing] = useState(false);

  const formats = [
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "yaml", label: "YAML" },
    { value: "csv", label: "CSV" },
    { value: "plaintext", label: "Plain Text" },
  ];

  const handleInputChange = (value: React.SetStateAction<string>) => {
    setInputValue(value);
    // TODO: Implementar conversión en tiempo real
    setOutputValue(value); // Placeholder por ahora
  };

  const handleCopy = async (text: string, type: "Input" | "Output") => {
    try {
      await navigator.clipboard.writeText(text);
      // TODO: Mostrar toast de éxito
      console.log(`${type} copiado al portapapeles`);
    } catch (err) {
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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-100">Format-X</h1>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
          >
            <Star className="w-4 h-4" />
            <span className="text-sm">Star on GitHub</span>
            <Github className="w-4 h-4" />
          </a>
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
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
              className="p-2 border border-gray-600 rounded-lg hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Intercambiar paneles"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            {/* Output Format Selector */}
            <select
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
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
            className="flex items-center gap-2 px-3 py-2 border border-gray-600 rounded-lg hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              <h2 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Input ({inputFormat.toUpperCase()})
              </h2>
              <button
                onClick={() => handleCopy(inputValue, "Input")}
                disabled={!inputValue}
                className="p-1.5 border border-gray-600 rounded hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                className="w-full h-96 bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:border-blue-500 transition-colors"
                spellCheck={false}
              />

              {/* Character Count */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {inputValue.length} chars
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                Output ({outputFormat.toUpperCase()})
              </h2>
              <button
                onClick={() => handleCopy(outputValue, "Output")}
                disabled={!outputValue}
                className="p-1.5 border border-gray-600 rounded hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Copiar output"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative">
              <textarea
                value={outputValue}
                readOnly
                placeholder={`El resultado en ${outputFormat.toUpperCase()} aparecerá aquí...`}
                className="w-full h-96 bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm font-mono resize-none focus:outline-none"
                spellCheck={false}
              />

              {/* Character Count */}
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {outputValue.length} chars
              </div>
            </div>
          </div>
        </div>

        {/* Status/Info Bar */}
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>
              {isProcessing ? "Procesando..." : "Listo para convertir"}
            </span>
            <span>
              {inputFormat.toUpperCase()} → {outputFormat.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Mobile: Responsive Note */}
        <div className="lg:hidden mt-4 p-3 bg-blue-950/30 border border-blue-800 rounded-lg">
          <p className="text-sm text-blue-300">
            💡 En pantallas grandes verás ambos paneles lado a lado
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 p-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            Created by <span className="text-gray-300">luisgardev</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default JsonFormatterConverter;
