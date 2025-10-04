import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const DocumentConverterPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
        setError('File size exceeds 50MB limit.');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleConvert = () => {
    if (!file) return;
    setIsConverting(true);
    setError('Document conversion requires server-side processing. This feature is coming soon!');
    setIsConverting(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500/10 p-4 rounded-full">
              <Icon name="document" className="w-12 h-12 text-green-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Document Converter</h1>
          <p className="mt-2 text-lg text-medium-text">Convert document formats with average quality output.</p>
          <p className="mt-1 text-sm text-medium-text">Supported formats: PDF, DOCX, TXT, RTF, ODT</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          {!file ? (
             <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer hover:border-green-500 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('doc-file-input')?.click()}
             >
                <div className="flex justify-center mb-4">
                    <div className="bg-green-500/10 p-4 rounded-full">
                        <Icon name="upload" className="w-8 h-8 text-green-500"/>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-light-text">Upload your document</h3>
                <p className="text-medium-text mt-2">Drag and drop a file here, or click to browse</p>
                <p className="text-sm text-medium-text mt-1">Supports: PDF, DOCX, TXT, RTF, ODT (Max 50MB)</p>
                <input
                    type="file"
                    id="doc-file-input"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
             </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-dark-bg px-6 py-4 rounded-lg">
                  <Icon name="document" className="w-8 h-8 text-green-500" />
                  <div className="text-left">
                    <p className="text-light-text font-semibold">{file.name}</p>
                    <p className="text-sm text-medium-text">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div>
                  <label htmlFor="doc-format" className="block text-sm font-medium text-light-text mb-2">Convert to:</label>
                  <select
                    id="doc-format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    <option value="pdf">PDF</option>
                    <option value="docx">DOCX (Word)</option>
                    <option value="txt">TXT (Plain Text)</option>
                    <option value="rtf">RTF (Rich Text)</option>
                    <option value="odt">ODT (OpenDocument)</option>
                  </select>
                </div>
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  {isConverting ? 'Converting...' : 'Convert Document'}
                </button>
                <button
                  onClick={() => { setFile(null); setError(null); }}
                  className="mt-3 w-full bg-slate-700 text-light-text px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                >
                  Choose a different file
                </button>
              </div>

              {error && (
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-400 text-center">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 bg-dark-card p-6 rounded-xl border border-dark-border">
          <h2 className="text-2xl font-bold text-white mb-4">About Document Converter</h2>
          <p className="text-medium-text mb-4">
            Convert between various document formats including PDF, Word documents, and text files. 
            Perfect for converting documents for different applications and platforms.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Multiple Formats</h3>
                <p className="text-sm text-medium-text">Support for PDF, DOCX, TXT, RTF, and more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Quality Output</h3>
                <p className="text-sm text-medium-text">Maintains formatting when possible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentConverterPage;
