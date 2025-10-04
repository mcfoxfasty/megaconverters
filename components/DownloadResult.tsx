import React from 'react';
import Icon from './Icon';

interface DownloadResultProps {
  fileName: string;
  fileSize: string;
  outputFormat: string;
  onDownload: () => void;
  onConvertAnother: () => void;
  color?: string;
  downloadUrl?: string;
}

const DownloadResult: React.FC<DownloadResultProps> = ({
  fileName,
  fileSize,
  outputFormat,
  onDownload,
  onConvertAnother,
  color = 'purple',
  downloadUrl
}) => {
  return (
    <div className="bg-dark-card border border-green-500/20 rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-green-500/10 p-3 rounded-full">
          <Icon name="check-circle" className="w-8 h-8 text-green-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-light-text">Conversion Successful!</h3>
          <p className="text-sm text-medium-text mt-1">Your file is ready to download</p>
        </div>
      </div>

      <div className="bg-dark-bg rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Icon name="file" className={`w-6 h-6 text-${color}-500`} />
          <div className="flex-1">
            <p className="text-light-text font-medium">{fileName}</p>
            <div className="flex gap-4 mt-1">
              <p className="text-sm text-medium-text">
                Format: <span className="text-light-text uppercase">{outputFormat}</span>
              </p>
              <p className="text-sm text-medium-text">
                Size: <span className="text-light-text">{fileSize}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onDownload}
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <Icon name="download" className="w-5 h-5" />
          Download File
        </button>
        <button
          onClick={onConvertAnother}
          className={`w-full bg-${color}-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-${color}-700 transition-colors`}
        >
          Convert Another File
        </button>
      </div>

      {downloadUrl && (
        <p className="text-xs text-medium-text text-center mt-4">
          File will be automatically deleted from our servers after 24 hours
        </p>
      )}
    </div>
  );
};

export default DownloadResult;
