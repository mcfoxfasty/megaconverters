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
    setOutputValue('Conversion feature coming soon!');
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
