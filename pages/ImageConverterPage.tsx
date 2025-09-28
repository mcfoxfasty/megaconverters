import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const ImageConverterPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState('png');
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB limit
        setError('File size exceeds 50MB limit.');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setConvertedUrl(null);
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
    setConvertedUrl(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL(`image/${outputFormat}`);
          setConvertedUrl(dataUrl);
        } else {
            setError('Could not process the image.');
        }
        setIsConverting(false);
      };
      img.onerror = () => {
          setError('Could not load the image file.');
          setIsConverting(false);
      }
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
        setError('Failed to read the file.');
        setIsConverting(false);
    }
    reader.readAsDataURL(file);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white">Image Converter</h1>
          <p className="mt-2 text-lg text-medium-text">Convert images between JPG, PNG, and WEBP formats locally in your browser.</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          {!file ? (
             <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer hover:border-primary transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-input')?.click()}
             >
                <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                        <Icon name="upload" className="w-8 h-8 text-primary"/>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-light-text">Upload your image</h3>
                <p className="text-medium-text mt-2">Drag and drop a file here, or click to browse</p>
                <input
                    type="file"
                    id="file-input"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
             </div>
          ) : (
            <div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-light-text mb-4">Original Image</h3>
                  <img src={preview!} alt="Preview" className="rounded-lg max-h-80 mx-auto" />
                  <p className="text-sm text-medium-text mt-2 text-center">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-semibold text-light-text mb-4">Conversion Options</h3>
                    <div>
                        <label htmlFor="format" className="block text-sm font-medium text-light-text mb-2">Convert to:</label>
                        <select
                            id="format"
                            value={outputFormat}
                            onChange={(e) => setOutputFormat(e.target.value)}
                            className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        >
                            <option value="png">PNG</option>
                            <option value="jpeg">JPEG</option>
                            <option value="webp">WEBP</option>
                        </select>
                    </div>
                    <button
                        onClick={handleConvert}
                        disabled={isConverting}
                        className="mt-6 w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                        {isConverting ? 'Converting...' : 'Convert File'}
                    </button>
                    <button
                      onClick={() => { setFile(null); setPreview(null); setConvertedUrl(null); setError(null); }}
                      className="mt-3 w-full bg-slate-700 text-light-text px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                    >
                      Choose a different file
                    </button>
                </div>
              </div>
              {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
              {convertedUrl && (
                <div className="mt-8 pt-6 border-t border-dark-border text-center">
                    <h3 className="text-lg font-semibold text-light-text mb-4">Converted Image</h3>
                    <img src={convertedUrl} alt="Converted result" className="rounded-lg max-h-80 mx-auto mb-4" />
                    <a
                        href={convertedUrl}
                        download={`converted.${outputFormat}`}
                        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                       <Icon name="download" className="w-5 h-5" />
                        Download Converted File
                    </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ImageConverterPage;
