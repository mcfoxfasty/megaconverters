import React, { useState } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const DigitalConverterPage: React.FC = () => {
  const [conversionType, setConversionType] = useState('number-base');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [fromBase, setFromBase] = useState('decimal');
  const [toBase, setToBase] = useState('binary');

  const handleConvert = () => {
    if (!inputValue) {
      setOutputValue('Please enter a value');
      return;
    }

    try {
      if (conversionType === 'number-base') {
        // Number base conversion
        let decimal: number;
        
        // Convert from source base to decimal
        switch (fromBase) {
          case 'decimal':
            decimal = parseInt(inputValue, 10);
            break;
          case 'binary':
            decimal = parseInt(inputValue, 2);
            break;
          case 'octal':
            decimal = parseInt(inputValue, 8);
            break;
          case 'hexadecimal':
            decimal = parseInt(inputValue, 16);
            break;
          default:
            decimal = parseInt(inputValue, 10);
        }

        if (isNaN(decimal)) {
          setOutputValue('Invalid input for selected base');
          return;
        }

        // Convert from decimal to target base
        let result: string;
        switch (toBase) {
          case 'decimal':
            result = decimal.toString(10);
            break;
          case 'binary':
            result = decimal.toString(2);
            break;
          case 'octal':
            result = decimal.toString(8);
            break;
          case 'hexadecimal':
            result = decimal.toString(16).toUpperCase();
            break;
          default:
            result = decimal.toString(10);
        }
        
        setOutputValue(result);
      } else if (conversionType === 'encoding') {
        // Text encoding/decoding
        // Try to determine if input is Base64 encoded
        const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
        const isBase64 = base64Pattern.test(inputValue.trim());

        if (isBase64 && inputValue.length % 4 === 0) {
          // Try to decode Base64
          try {
            const decoded = atob(inputValue);
            const encoded = btoa(decoded); // Re-encode to verify
            if (encoded === inputValue) {
              setOutputValue(`Decoded (Base64 → Text): ${decoded}\n\nEncoded (Text → Base64): ${inputValue}`);
              return;
            }
          } catch (e) {
            // Not valid Base64, treat as plain text
          }
        }

        // Encode to Base64
        const encoded = btoa(inputValue);
        // URL encode
        const urlEncoded = encodeURIComponent(inputValue);
        
        setOutputValue(`Base64: ${encoded}\n\nURL Encoded: ${urlEncoded}\n\nHex: ${Array.from(inputValue).map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' ')}`);
      } else if (conversionType === 'color') {
        // Color conversion
        const hexPattern = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        const rgbPattern = /^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;
        const hslPattern = /^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/;

        let r: number, g: number, b: number;

        if (hexPattern.test(inputValue)) {
          // HEX to RGB
          let hex = inputValue.replace('#', '');
          if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
          }
          r = parseInt(hex.substr(0, 2), 16);
          g = parseInt(hex.substr(2, 2), 16);
          b = parseInt(hex.substr(4, 2), 16);
        } else if (rgbPattern.test(inputValue)) {
          // RGB string
          const match = inputValue.match(rgbPattern)!;
          r = parseInt(match[1]);
          g = parseInt(match[2]);
          b = parseInt(match[3]);
        } else {
          setOutputValue('Invalid color format. Use HEX (#RRGGBB) or RGB (rgb(r, g, b))');
          return;
        }

        // Convert to all formats
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`.toUpperCase();
        const rgb = `rgb(${r}, ${g}, ${b})`;
        
        // RGB to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          
          switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
          }
        }

        const hsl = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        
        setOutputValue(`HEX: ${hex}\n\nRGB: ${rgb}\n\nHSL: ${hsl}`);
      }
    } catch (error) {
      setOutputValue('Error during conversion. Please check your input.');
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-500/10 p-4 rounded-full">
              <Icon name="digital" className="w-12 h-12 text-teal-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Digital Converter</h1>
          <p className="mt-2 text-lg text-medium-text">Convert between number bases, encodings, colors.</p>
          <p className="mt-1 text-sm text-medium-text">Binary, Hexadecimal, Base64, RGB, and more</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          <div className="mb-6">
            <label className="block text-sm font-medium text-light-text mb-2">Conversion Type</label>
            <select
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value)}
              className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            >
              <option value="number-base">Number Base Conversion</option>
              <option value="encoding">Text Encoding</option>
              <option value="color">Color Conversion</option>
            </select>
          </div>

          {conversionType === 'number-base' && (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-light-text mb-2">From</label>
                  <select
                    value={fromBase}
                    onChange={(e) => setFromBase(e.target.value)}
                    className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors mb-2"
                  >
                    <option value="decimal">Decimal (Base 10)</option>
                    <option value="binary">Binary (Base 2)</option>
                    <option value="octal">Octal (Base 8)</option>
                    <option value="hexadecimal">Hexadecimal (Base 16)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-light-text mb-2">To</label>
                  <select
                    value={toBase}
                    onChange={(e) => setToBase(e.target.value)}
                    className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors mb-2"
                  >
                    <option value="decimal">Decimal (Base 10)</option>
                    <option value="binary">Binary (Base 2)</option>
                    <option value="octal">Octal (Base 8)</option>
                    <option value="hexadecimal">Hexadecimal (Base 16)</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-light-text mb-2">Input Value</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter number"
                  className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                />
              </div>
            </div>
          )}

          {conversionType === 'encoding' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-light-text mb-2">Text to Encode/Decode</label>
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter text"
                rows={4}
                className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>
          )}

          {conversionType === 'color' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-light-text mb-2">Color Value (HEX, RGB, HSL)</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="e.g., #FF5733 or rgb(255,87,51)"
                className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              />
            </div>
          )}

          <button
            onClick={handleConvert}
            className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Convert
          </button>

          {outputValue && (
            <div className="mt-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-lg">
              <p className="text-sm font-medium text-light-text mb-1">Result:</p>
              <p className="text-teal-400 font-mono break-all">{outputValue}</p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-dark-card p-6 rounded-xl border border-dark-border">
          <h2 className="text-2xl font-bold text-white mb-4">About Digital Converter</h2>
          <p className="text-medium-text mb-4">
            Convert between different digital formats including number bases (binary, hexadecimal), 
            text encodings (Base64, UTF-8), and color formats (HEX, RGB, HSL).
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Number Bases</h3>
                <p className="text-sm text-medium-text">Binary, Octal, Decimal, Hexadecimal</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Encodings</h3>
                <p className="text-sm text-medium-text">Base64, URL, UTF-8</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Colors</h3>
                <p className="text-sm text-medium-text">HEX, RGB, HSL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DigitalConverterPage;
