import React, { useState } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';
import FileUpload from '../components/FileUpload';
import ConversionOptions from '../components/ConversionOptions';
import ProgressTracker from '../components/ProgressTracker';
import DownloadResult from '../components/DownloadResult';

// Audio format detection
const detectAudioFormat = (file: File): string => {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  const formats: { [key: string]: string } = {
    'mp3': 'MP3',
    'wav': 'WAV',
    'm4a': 'M4A',
    'ogg': 'OGG',
    'flac': 'FLAC',
    'aac': 'AAC',
    'wma': 'WMA',
    'opus': 'OPUS'
  };
  return formats[ext] || 'Unknown';
};

// Estimate output size based on bitrate and duration (rough estimation)
const estimateOutputSize = (inputSize: number, inputFormat: string, outputFormat: string, bitrate: string): string => {
  // This is a rough estimation - actual size depends on encoding
  const bitrateKbps = parseInt(bitrate);
  const estimatedSize = (inputSize * bitrateKbps) / 128; // Assuming average 128 kbps for input
  
  if (estimatedSize < 1024 * 1024) {
    return `${(estimatedSize / 1024).toFixed(2)} KB`;
  } else {
    return `${(estimatedSize / (1024 * 1024)).toFixed(2)} MB`;
  }
};

interface ConversionState {
  status: 'idle' | 'uploading' | 'converting' | 'completed' | 'error';
  progress: number;
  message?: string;
  downloadUrl?: string;
  outputFileName?: string;
  outputFileSize?: string;
}

const AudioConverterPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [bitrate, setBitrate] = useState('192');
  const [detectedFormat, setDetectedFormat] = useState<string>('');
  const [estimatedSize, setEstimatedSize] = useState<string>('');
  const [batchMode, setBatchMode] = useState(false);
  const [conversionState, setConversionState] = useState<ConversionState>({
    status: 'idle',
    progress: 0
  });

  const audioFormats = [
    { label: 'MP3', value: 'mp3' },
    { label: 'WAV', value: 'wav' },
    { label: 'M4A', value: 'm4a' },
    { label: 'OGG', value: 'ogg' },
    { label: 'FLAC', value: 'flac' },
    { label: 'AAC', value: 'aac' }
  ];

  const popularConversions = [
    { from: 'Any', to: 'MP3', label: 'to MP3' },
    { from: 'Any', to: 'WAV', label: 'to WAV' },
    { from: 'MP3', to: 'FLAC', label: 'MP3 → FLAC' },
    { from: 'WAV', to: 'MP3', label: 'WAV → MP3' }
  ];

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const format = detectAudioFormat(selectedFile);
    setDetectedFormat(format);
    
    // Estimate output size
    const estimated = estimateOutputSize(selectedFile.size, format, outputFormat, bitrate);
    setEstimatedSize(estimated);
    
    // Reset conversion state
    setConversionState({
      status: 'idle',
      progress: 0
    });
  };

  const handleQuickConversion = (format: string) => {
    setOutputFormat(format);
    if (file) {
      const estimated = estimateOutputSize(file.size, detectedFormat, format, bitrate);
      setEstimatedSize(estimated);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    // Simulated conversion process (since real audio conversion requires server-side processing)
    setConversionState({
      status: 'uploading',
      progress: 0,
      message: 'Uploading file to server...'
    });

    // Simulate upload progress
    await simulateProgress('uploading', 30);

    setConversionState({
      status: 'converting',
      progress: 30,
      message: 'Converting audio format...'
    });

    // Simulate conversion progress
    await simulateProgress('converting', 100);

    // For demonstration, show that server-side processing is required
    setConversionState({
      status: 'error',
      progress: 100,
      message: 'Audio conversion requires server-side processing with FFmpeg. This feature needs backend API integration.'
    });
  };

  const simulateProgress = (status: string, targetProgress: number): Promise<void> => {
    return new Promise((resolve) => {
      let currentProgress = conversionState.progress;
      const interval = setInterval(() => {
        currentProgress += 5;
        setConversionState(prev => ({
          ...prev,
          progress: currentProgress
        }));

        if (currentProgress >= targetProgress) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  };

  const handleDownload = () => {
    // In a real implementation, this would download the converted file
    alert('Download functionality requires backend integration');
  };

  const handleConvertAnother = () => {
    setFile(null);
    setDetectedFormat('');
    setEstimatedSize('');
    setConversionState({
      status: 'idle',
      progress: 0
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-500/10 p-4 rounded-full">
              <Icon name="music" className="w-12 h-12 text-purple-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Audio Converter</h1>
          <p className="mt-2 text-lg text-medium-text">Convert audio files between different formats with ease</p>
        </div>

        {/* Supported Formats Badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {audioFormats.map(format => (
            <span
              key={format.value}
              className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-400"
            >
              {format.label}
            </span>
          ))}
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          {/* Batch Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-light-text">Conversion Mode</h3>
              <p className="text-sm text-medium-text">Single file or batch processing</p>
            </div>
            <button
              onClick={() => setBatchMode(!batchMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                batchMode ? 'bg-purple-600' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  batchMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {batchMode && (
            <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-purple-400 text-sm">
                <Icon name="sparkles" className="w-4 h-4 inline mr-2" />
                Batch mode: Upload multiple files for conversion (Coming soon)
              </p>
            </div>
          )}

          {!file ? (
            <>
              {/* Popular Conversions Quick Buttons */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-light-text mb-3">Popular Conversions:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {popularConversions.map((conv, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickConversion(conv.to.toLowerCase())}
                      className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm font-medium text-purple-400 hover:bg-purple-500/20 transition-colors"
                    >
                      {conv.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Component */}
              <FileUpload
                accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac,.aac"
                maxSize={100}
                onFileSelect={handleFileSelect}
                supportedFormats={['MP3', 'WAV', 'M4A', 'OGG', 'FLAC', 'AAC']}
                icon="music"
                color="purple"
              />
            </>
          ) : (
            <div>
              {/* File Info with Real-time Format Detection */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 bg-dark-bg px-6 py-4 rounded-lg">
                  <Icon name="music" className="w-8 h-8 text-purple-500" />
                  <div className="text-left">
                    <p className="text-light-text font-semibold">{file.name}</p>
                    <div className="flex gap-4 mt-1">
                      <p className="text-sm text-medium-text">
                        Format: <span className="text-purple-400 font-medium">{detectedFormat}</span>
                      </p>
                      <p className="text-sm text-medium-text">
                        Size: <span className="text-light-text">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Options Component */}
              <div className="max-w-md mx-auto mb-6">
                <ConversionOptions
                  outputFormat={outputFormat}
                  onFormatChange={(format) => {
                    setOutputFormat(format);
                    const estimated = estimateOutputSize(file.size, detectedFormat, format, bitrate);
                    setEstimatedSize(estimated);
                  }}
                  formats={audioFormats}
                  bitrate={bitrate}
                  onBitrateChange={(newBitrate) => {
                    setBitrate(newBitrate);
                    const estimated = estimateOutputSize(file.size, detectedFormat, outputFormat, newBitrate);
                    setEstimatedSize(estimated);
                  }}
                  showBitrate={true}
                  color="purple"
                />

                {/* Estimated Output File Size */}
                {estimatedSize && (
                  <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-sm text-medium-text">
                      Estimated output size: <span className="text-purple-400 font-medium">{estimatedSize}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Convert Button */}
              {conversionState.status === 'idle' && (
                <div className="max-w-md mx-auto space-y-3">
                  <button
                    onClick={handleConvert}
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon name="bolt" className="w-5 h-5" />
                    Convert to {outputFormat.toUpperCase()}
                  </button>
                  <button
                    onClick={() => setFile(null)}
                    className="w-full bg-slate-700 text-light-text px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                  >
                    Choose Different File
                  </button>
                </div>
              )}

              {/* Progress Tracker Component */}
              {(conversionState.status === 'uploading' || 
                conversionState.status === 'converting' || 
                conversionState.status === 'error') && (
                <div className="mt-6">
                  <ProgressTracker
                    progress={conversionState.progress}
                    status={conversionState.status}
                    message={conversionState.message}
                    fileName={file.name}
                    color="purple"
                  />
                  {conversionState.status === 'error' && (
                    <button
                      onClick={handleConvertAnother}
                      className="mt-4 w-full bg-slate-700 text-light-text px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                    >
                      Try Another File
                    </button>
                  )}
                </div>
              )}

              {/* Download Result Component */}
              {conversionState.status === 'completed' && conversionState.outputFileName && (
                <div className="mt-6">
                  <DownloadResult
                    fileName={conversionState.outputFileName}
                    fileSize={conversionState.outputFileSize || estimatedSize}
                    outputFormat={outputFormat}
                    onDownload={handleDownload}
                    onConvertAnother={handleConvertAnother}
                    color="purple"
                    downloadUrl={conversionState.downloadUrl}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feature Highlights Section */}
        <div className="mt-12 bg-dark-card p-6 rounded-xl border border-dark-border">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Our Audio Converter?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-500/10 p-4 rounded-full mb-3">
                <Icon name="bolt" className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-light-text mb-2">Lightning Fast</h3>
              <p className="text-sm text-medium-text">
                Quick conversion with optimized processing
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-500/10 p-4 rounded-full mb-3">
                <Icon name="shield" className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-light-text mb-2">100% Free</h3>
              <p className="text-sm text-medium-text">
                No hidden fees, no subscriptions required
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-500/10 p-4 rounded-full mb-3">
                <Icon name="lock" className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-light-text mb-2">Secure & Private</h3>
              <p className="text-sm text-medium-text">
                Files are automatically deleted after 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AudioConverterPage;
