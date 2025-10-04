import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const ArchiveConverterPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('zip');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > 500 * 1024 * 1024) { // 500MB limit
        setError('File size exceeds 500MB limit.');
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
    setError('Archive conversion requires server-side processing. This feature is coming soon!');
    setIsConverting(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500/10 p-4 rounded-full">
              <Icon name="archive" className="w-12 h-12 text-orange-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Archive Converter</h1>
          <p className="mt-2 text-lg text-medium-text">Convert ZIP, 7Z, and TAR and other archive formats.</p>
          <p className="mt-1 text-sm text-medium-text">Supported formats: ZIP, 7Z, TAR, RAR, GZ, BZ2</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          {!file ? (
             <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer hover:border-orange-500 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('archive-file-input')?.click()}
             >
                <div className="flex justify-center mb-4">
                    <div className="bg-orange-500/10 p-4 rounded-full">
                        <Icon name="upload" className="w-8 h-8 text-orange-500"/>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-light-text">Upload your archive</h3>
                <p className="text-medium-text mt-2">Drag and drop a file here, or click to browse</p>
                <p className="text-sm text-medium-text mt-1">Supports: ZIP, 7Z, TAR, RAR, GZ, BZ2 (Max 500MB)</p>
                <input
                    type="file"
                    id="archive-file-input"
                    className="hidden"
                    accept=".zip,.7z,.tar,.rar,.gz,.bz2,.tar.gz,.tar.bz2"
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
             </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-dark-bg px-6 py-4 rounded-lg">
                  <Icon name="archive" className="w-8 h-8 text-orange-500" />
                  <div className="text-left">
                    <p className="text-light-text font-semibold">{file.name}</p>
                    <p className="text-sm text-medium-text">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div>
                  <label htmlFor="archive-format" className="block text-sm font-medium text-light-text mb-2">Convert to:</label>
                  <select
                    id="archive-format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  >
                    <option value="zip">ZIP</option>
                    <option value="7z">7Z</option>
                    <option value="tar">TAR</option>
                    <option value="tar.gz">TAR.GZ</option>
                    <option value="tar.bz2">TAR.BZ2</option>
                  </select>
                </div>
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="mt-6 w-full bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  {isConverting ? 'Converting...' : 'Convert Archive'}
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
          <h2 className="text-2xl font-bold text-white mb-4">About Archive Converter</h2>
          <p className="text-medium-text mb-4">
            Convert between various archive formats like ZIP, 7Z, and TAR. 
            Useful for compatibility with different systems and applications.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Multiple Formats</h3>
                <p className="text-sm text-medium-text">ZIP, 7Z, TAR, RAR, and more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Compression Options</h3>
                <p className="text-sm text-medium-text">Choose optimal compression for your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArchiveConverterPage;
