import React from 'react';
import Icon from './Icon';

interface ProgressTrackerProps {
  progress: number; // 0-100
  status: 'uploading' | 'converting' | 'processing' | 'completed' | 'error';
  message?: string;
  fileName?: string;
  color?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  progress,
  status,
  message,
  fileName,
  color = 'purple'
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'error':
        return 'red';
      default:
        return color;
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return 'upload';
      case 'converting':
      case 'processing':
        return 'refresh';
      case 'completed':
        return 'check-circle';
      case 'error':
        return 'x-circle';
      default:
        return 'refresh';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading file...';
      case 'converting':
        return 'Converting audio...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Conversion complete!';
      case 'error':
        return 'Conversion failed';
      default:
        return 'Processing...';
    }
  };

  const statusColor = getStatusColor();

  return (
    <div className={`bg-dark-card border border-${statusColor}-500/20 rounded-lg p-6`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`bg-${statusColor}-500/10 p-3 rounded-full ${status === 'converting' || status === 'processing' ? 'animate-spin' : ''}`}>
          <Icon name={getStatusIcon()} className={`w-6 h-6 text-${statusColor}-500`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-light-text">{getStatusText()}</h3>
          {fileName && (
            <p className="text-sm text-medium-text mt-1">{fileName}</p>
          )}
          {message && (
            <p className="text-sm text-medium-text mt-1">{message}</p>
          )}
        </div>
      </div>

      {status !== 'error' && status !== 'completed' && (
        <div>
          <div className="w-full bg-dark-bg rounded-full h-2.5 overflow-hidden">
            <div
              className={`bg-${statusColor}-500 h-2.5 rounded-full transition-all duration-300 ease-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-medium-text text-right mt-2">{progress}%</p>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
