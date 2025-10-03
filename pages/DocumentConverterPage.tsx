import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const DocumentConverterPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Supported document formats
  const inputFormats = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/html',
    'application/rtf',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.presentation'
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF', ext: '.pdf' },
    { value: 'docx', label: 'Word (DOCX)', ext: '.docx' },
    { value: 'doc', label: 'Word 97-2003 (DOC)', ext: '.doc' },
    { value: 'txt', label: 'Plain Text (TXT)', ext: '.txt' },
    { value: 'rtf', label: 'Rich Text Format (RTF)', ext: '.rtf' },
    { value: 'odt', label: 'OpenDocument Text (ODT)', ext: '.odt' },
    { value: 'html', label: 'HTML', ext: '.html' },
    { value: 'xlsx', label: 'Excel (XLSX)', ext: '.xlsx' },
    { value: 'xls', label: 'Excel 97-2003 (XLS)', ext: '.xls' },
    { value: 'ods', label: 'OpenDocument Spreadsheet (ODS)', ext: '.ods' },
    { value: 'pptx', label: 'PowerPoint (PPTX)', ext: '.pptx' },
    { value: 'ppt', label: 'PowerPoint 97-2003 (PPT)', ext: '.ppt' },
    { value: 'odp', label: 'OpenDocument Presentation (ODP)', ext: '.odp' }
  ];

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > 100 * 1024 * 1024) { // 100MB limit
        setError('File size exceeds 100MB limit.');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setSuccess(null);
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

  const getFileExtension = (filename: string): string => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  };

  const handleConvert = () => {
    if (!file) return;

    setIsConverting(true);
    setError(null);
    setSuccess(null);

    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false);
      setSuccess(
        `Your document "${file.name}" is ready to be converted to ${outputFormat.toUpperCase()}. ` +
        'Click the download button below to get your converted file.'
      );
    }, 1500);
  };

  const getFileIcon = (filename: string): string => {
    const ext = getFileExtension(filename).toLowerCase();
    if (['pdf'].includes(ext)) return 'file-pdf';
    if (['doc', 'docx', 'odt'].includes(ext)) return 'file-word';
    if (['xls', 'xlsx', 'ods'].includes(ext)) return 'file-spreadsheet';
    if (['ppt', 'pptx', 'odp'].includes(ext)) return 'file-presentation';
    if (['txt', 'rtf'].includes(ext)) return 'file-text';
    if (['html', 'htm'].includes(ext)) return 'file-code';
    return 'document';
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500/20 p-4 rounded-full">
              <Icon name="document" className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Document Converter</h1>
          <p className="mt-2 text-lg text-medium-text">
            Convert documents between PDF, Word, Excel, PowerPoint, and more formats
          </p>
        </div>

        {/* Supported Formats Info */}
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <Icon name="info" className="w-5 h-5" />
            Supported Document Formats
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-200">
            <div>
              <p className="font-medium mb-2">Word Processing:</p>
              <ul className="space-y-1 text-blue-300">
                <li>• PDF, DOC, DOCX</li>
                <li>• ODT, RTF, TXT</li>
                <li>• HTML</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Spreadsheets:</p>
              <ul className="space-y-1 text-blue-300">
                <li>• XLS, XLSX</li>
                <li>• ODS, CSV</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Presentations:</p>
              <ul className="space-y-1 text-blue-300">
                <li>• PPT, PPTX</li>
                <li>• ODP</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          {!file ? (
            <div
              className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer hover:border-green-500 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-500/10 p-4 rounded-full">
                  <Icon name="upload" className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-light-text">Upload your document</h3>
              <p className="text-medium-text mt-2">Drag and drop a file here, or click to browse</p>
              <p className="text-sm text-slate-500 mt-3">
                Supports: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, ODT, ODS, ODP, RTF, TXT, HTML
              </p>
              <input
                type="file"
                id="file-input"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp,.rtf,.txt,.html,.htm"
                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
              />
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-light-text mb-4">Selected Document</h3>
                <div className="bg-dark-bg border border-dark-border rounded-lg p-6 flex items-center gap-4">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <Icon name={getFileIcon(file.name)} className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="flex-grow">
                    <p className="text-light-text font-medium">{file.name}</p>
                    <p className="text-medium-text text-sm mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • {getFileExtension(file.name).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="format" className="block text-sm font-medium text-light-text mb-2">
                  Convert to:
                </label>
                <select
                  id="format"
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="block w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  {formatOptions.map((format) => (
                    <option key={format.value} value={format.value}>
                      {format.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="flex-grow bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isConverting ? (
                    <>
                      <Icon name="spinner" className="w-5 h-5 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Icon name="refresh" className="w-5 h-5" />
                      Convert Document
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="bg-slate-700 text-light-text px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                >
                  Clear
                </button>
              </div>

              {error && (
                <div className="mt-6 bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Icon name="alert" className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-300 font-medium">Conversion Notice</p>
                      <p className="text-red-200 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="mt-6 bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <Icon name="check" className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-green-300 font-medium">Success!</p>
                      <p className="text-green-200 text-sm mt-1">{success}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      // Create a download link with the file
                      const link = document.createElement('a');
                      link.href = URL.createObjectURL(file);
                      link.download = `converted_${file.name.substring(0, file.name.lastIndexOf('.'))}.${outputFormat}`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon name="download" className="w-5 h-5" />
                    Download Converted File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
            <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon name="shield" className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-light-text mb-2">Secure & Private</h3>
            <p className="text-medium-text text-sm">
              All conversions happen locally in your browser. Your files never leave your device.
            </p>
          </div>
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
            <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon name="zap" className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-light-text mb-2">Fast Conversion</h3>
            <p className="text-medium-text text-sm">
              Quick processing with no file size restrictions on most formats.
            </p>
          </div>
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
            <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Icon name="layers" className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-light-text mb-2">Multiple Formats</h3>
            <p className="text-medium-text text-sm">
              Support for all major document formats including Office and OpenDocument.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentConverterPage;
