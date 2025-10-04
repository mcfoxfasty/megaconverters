import React, { useState } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const QRBarcodeGeneratorPage: React.FC = () => {
  const [codeType, setCodeType] = useState('qr');
  const [inputData, setInputData] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  const handleGenerate = () => {
    setGeneratedCode('Code generation feature coming soon!');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-500/10 p-4 rounded-full">
              <Icon name="qr-code" className="w-12 h-12 text-indigo-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">QR & Barcode Generator</h1>
          <p className="mt-2 text-lg text-medium-text">Generate QR codes and barcodes for text, URLs, and data.</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          <div className="mb-6">
            <label className="block text-sm font-medium text-light-text mb-2">Code Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCodeType('qr')}
                className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                  codeType === 'qr'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-dark-bg text-light-text hover:bg-slate-700'
                }`}
              >
                QR Code
              </button>
              <button
                onClick={() => setCodeType('barcode')}
                className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                  codeType === 'barcode'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-dark-bg text-light-text hover:bg-slate-700'
                }`}
              >
                Barcode
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-light-text mb-2">
              {codeType === 'qr' ? 'Data (Text, URL, etc.)' : 'Barcode Data'}
            </label>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={codeType === 'qr' ? 'Enter text, URL, or data' : 'Enter numeric or alphanumeric data'}
              rows={4}
              className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          {codeType === 'barcode' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-light-text mb-2">Barcode Format</label>
              <select className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors">
                <option value="code128">Code 128</option>
                <option value="code39">Code 39</option>
                <option value="ean13">EAN-13</option>
                <option value="upc">UPC</option>
              </select>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!inputData}
            className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Generate {codeType === 'qr' ? 'QR Code' : 'Barcode'}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          {generatedCode && (
            <div className="mt-8 pt-6 border-t border-dark-border">
              <div className="bg-white p-8 rounded-lg flex items-center justify-center min-h-[200px]">
                <canvas ref={canvasRef} />
              </div>
              <p className="text-center text-green-400 mt-2">{generatedCode}</p>
              <button 
                onClick={() => {
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const link = document.createElement('a');
                    link.download = `${codeType === 'qr' ? 'qrcode' : 'barcode'}.png`;
                    link.href = canvas.toDataURL();
                    link.click();
                  }
                }}
                className="mt-4 w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon name="download" className="w-5 h-5" />
                  Download Image
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 bg-dark-card p-6 rounded-xl border border-dark-border">
          <h2 className="text-2xl font-bold text-white mb-4">About QR & Barcode Generator</h2>
          <p className="text-medium-text mb-4">
            Generate QR codes and barcodes for various purposes including product labels, business cards, 
            website links, and more. Download high-resolution images for print or digital use.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">QR Codes</h3>
                <p className="text-sm text-medium-text">For URLs, text, contact info</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Barcodes</h3>
                <p className="text-sm text-medium-text">Multiple formats supported</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Downloadable</h3>
                <p className="text-sm text-medium-text">High-res PNG images</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QRBarcodeGeneratorPage;
