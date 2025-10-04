import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const SVGCutScrapePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) { // 20MB limit
        setError('File size exceeds 20MB limit.');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
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

  const handleProcess = () => {
    if (!file) return;
    setIsProcessing(true);
    setError('SVG extraction and cutting requires advanced processing. This feature is coming soon!');
    setIsProcessing(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-fuchsia-500/10 p-4 rounded-full">
              <Icon name="scissors" className="w-12 h-12 text-fuchsia-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">SVG Cut & Scrape</h1>
          <p className="mt-2 text-lg text-medium-text">Extract designs from business cards, logos, magazines.</p>
          <p className="mt-1 text-sm text-medium-text">Upload images to extract vector graphics</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          {!file ? (
             <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer hover:border-fuchsia-500 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('svg-file-input')?.click()}
             >
                <div className="flex justify-center mb-4">
                    <div className="bg-fuchsia-500/10 p-4 rounded-full">
                        <Icon name="upload" className="w-8 h-8 text-fuchsia-500"/>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-light-text">Upload your image</h3>
                <p className="text-medium-text mt-2">Drag and drop a file here, or click to browse</p>
                <p className="text-sm text-medium-text mt-1">Supports: JPG, PNG, SVG, PDF (Max 20MB)</p>
                <input
                    type="file"
                    id="svg-file-input"
                    className="hidden"
                    accept="image/*,.svg,.pdf"
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
             </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                {preview && (
                  <div className="inline-block bg-white p-4 rounded-lg mb-4">
                    <img src={preview} alt="Preview" className="max-h-64 mx-auto" />
                  </div>
                )}
                <div className="inline-flex items-center gap-3 bg-dark-bg px-6 py-4 rounded-lg">
                  <Icon name="document" className="w-8 h-8 text-fuchsia-500" />
                  <div className="text-left">
                    <p className="text-light-text font-semibold">{file.name}</p>
                    <p className="text-sm text-medium-text">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-light-text mb-2">Processing Options</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-medium-text">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Extract vector shapes</span>
                    </label>
                    <label className="flex items-center gap-2 text-medium-text">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Remove background</span>
                    </label>
                    <label className="flex items-center gap-2 text-medium-text">
                      <input type="checkbox" className="rounded" />
                      <span>Optimize paths</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="mt-6 w-full bg-fuchsia-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-fuchsia-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Extract SVG'}
                </button>
                <button
                  onClick={() => { setFile(null); setPreview(null); setError(null); }}
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
          <h2 className="text-2xl font-bold text-white mb-4">About SVG Cut & Scrape</h2>
          <p className="text-medium-text mb-4">
            Extract vector designs from images of business cards, logos, and magazines. 
            Convert raster images to scalable SVG files perfect for editing and printing.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-fuchsia-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Vector Extraction</h3>
                <p className="text-sm text-medium-text">Convert to scalable SVG</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-fuchsia-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Background Removal</h3>
                <p className="text-sm text-medium-text">Clean extraction</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-fuchsia-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Editable Output</h3>
                <p className="text-sm text-medium-text">Ready for design software</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SVGCutScrapePage;
