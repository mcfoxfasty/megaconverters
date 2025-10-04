import React, { useState, useCallback } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const AudioConverterPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > 100 * 1024 * 1024) { // 100MB limit
        setError('File size exceeds 100MB limit.');
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
    setError('Audio conversion requires server-side processing. This feature is coming soon!');
    setIsConverting(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-500/10 p-4 rounded-full">
              <Icon name="music" className="w-12 h-12 text-purple-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Audio Converter</h1>
          <p className="mt-2 text-lg text-medium-text">Convert audio formats with MP3, WAV, M4A.</p>
          <p className="mt-1 text-sm text-medium-text">Supported formats: MP3, WAV, M4A, OGG, FLAC, AAC</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          {!file ? (
             <div 
                className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer hover:border-purple-500 transition-colors"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('audio-file-input')?.click()}
             >
                <div className="flex justify-center mb-4">
                    <div className="bg-purple-500/10 p-4 rounded-full">
                        <Icon name="upload" className="w-8 h-8 text-purple-500"/>
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-light-text">Upload your audio file</h3>
                <p className="text-medium-text mt-2">Drag and drop a file here, or click to browse</p>
                <p className="text-sm text-medium-text mt-1">Supports: MP3, WAV, M4A, OGG, FLAC, AAC (Max 100MB)</p>
                <input
                    type="file"
                    id="audio-file-input"
                    className="hidden"
                    accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac,.aac"
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                />
             </div>
          ) : (
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-dark-bg px-6 py-4 rounded-lg">
                  <Icon name="music" className="w-8 h-8 text-purple-500" />
                  <div className="text-left">
                    <p className="text-light-text font-semibold">{file.name}</p>
                    <p className="text-sm text-medium-text">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <div>
                  <label htmlFor="audio-format" className="block text-sm font-medium text-light-text mb-2">Convert to:</label>
                  <select
                    id="audio-format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  >
                    <option value="mp3">MP3</option>
                    <option value="wav">WAV</option>
                    <option value="m4a">M4A</option>
                    <option value="ogg">OGG</option>
                    <option value="flac">FLAC</option>
                    <option value="aac">AAC</option>
                  </select>
                </div>
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="mt-6 w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                >
                  {isConverting ? 'Converting...' : 'Convert Audio'}
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
          <h2 className="text-2xl font-bold text-white mb-4">About Audio Converter</h2>
          <p className="text-medium-text mb-4">
            Convert audio files between various formats. Perfect for optimizing audio for different platforms,
            devices, or quality requirements.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Multiple Formats</h3>
                <p className="text-sm text-medium-text">MP3, WAV, M4A, OGG, FLAC, and more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">High Quality</h3>
                <p className="text-sm text-medium-text">Maintains audio quality during conversion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AudioConverterPage;
