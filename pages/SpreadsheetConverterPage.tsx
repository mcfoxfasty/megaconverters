import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const SpreadsheetConverterPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('xlsx');
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
    setError('Spreadsheet conversion requires server-side processing. This feature is coming soon!');
    setIsConverting(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-red-500/10 p-4 rounded-full">
              <Icon name="spreadsheet" className="w-12 h-12 text-red-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Spreadsheet Converter</h1>
          <p className="mt-2 text-lg text-medium-text">Convert spreadsheet formats. Formats: XLSX, ODS, CSV.</p>
          <p className="mt-1 text-sm text-medium-text">Supported formats: XLSX, XLS, ODS, CSV, TSV</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          {!file ? (
             <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer hover:border-red-500 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('spreadsheet-file-input')?.click()}
             >
                <div className="flex justify-center mb-4">
                    <div className="bg-red-500/10 p-4 rounded-full">
                        <Icon name="upload" className="w-8 h-8 text-red-500"/>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-light-text">Upload your spreadsheet</h3>
                <p className="text-medium-text mt-2">Drag and drop a file here, or click to browse</p>
                <p className="text-sm text-medium-text mt-1">Supports: XLSX, XLS, ODS, CSV, TSV (Max 50MB)</p>
                <input
                    type="file"
                    id="spreadsheet-file-input"
                    className="hidden"
                    accept=".xlsx,.xls,.ods,.csv,.tsv"
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
             </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-dark-bg px-6 py-4 rounded-lg">
                  <Icon name="spreadsheet" className="w-8 h-8 text-red-500" />
                  <div className="text-left">
                    <p className="text-light-text font-semibold">{file.name}</p>
                    <p className="text-sm text-medium-text">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div>
                  <label htmlFor="spreadsheet-format" className="block text-sm font-medium text-light-text mb-2">Convert to:</label>
                  <select
                    id="spreadsheet-format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  >
                    <option value="xlsx">XLSX (Excel)</option>
                    <option value="xls">XLS (Excel Legacy)</option>
                    <option value="ods">ODS (OpenDocument)</option>
                    <option value="csv">CSV</option>
                    <option value="tsv">TSV</option>
                  </select>
                </div>
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="mt-6 w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  {isConverting ? 'Converting...' : 'Convert Spreadsheet'}
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
          <h2 className="text-2xl font-bold text-white mb-4">About Spreadsheet Converter</h2>
          <p className="text-medium-text mb-4">
            Convert between spreadsheet formats like Excel, OpenDocument, and CSV. 
            Perfect for data migration and compatibility across different platforms.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Multiple Formats</h3>
                <p className="text-sm text-medium-text">XLSX, XLS, ODS, CSV, and more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Data Preservation</h3>
                <p className="text-sm text-medium-text">Maintains formatting and formulas when possible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SpreadsheetConverterPage;
