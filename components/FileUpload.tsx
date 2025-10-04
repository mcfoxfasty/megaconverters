import React, { useCallback } from 'react';
import Icon from './Icon';

interface FileUploadProps {
  accept: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File) => void;
  supportedFormats: string[];
  icon?: string;
  color?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxSize = 100,
  onFileSelect,
  supportedFormats,
  icon = 'upload',
  color = 'purple'
}) => {
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size exceeds ${maxSize}MB limit.`);
        return;
      }
      onFileSelect(file);
    }
  }, [maxSize, onFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size exceeds ${maxSize}MB limit.`);
        return;
      }
      onFileSelect(file);
    }
  };

  const inputId = `file-upload-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div 
      className={`border-2 border-dashed border-slate-600 rounded-lg p-10 text-center cursor-pointer hover:border-${color}-500 transition-colors`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => document.getElementById(inputId)?.click()}
    >
      <div className="flex justify-center mb-4">
        <div className={`bg-${color}-500/10 p-4 rounded-full`}>
          <Icon name={icon} className={`w-8 h-8 text-${color}-500`}/>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-light-text">Upload your file</h3>
      <p className="text-medium-text mt-2">Drag and drop a file here, or click to browse</p>
      <p className="text-sm text-medium-text mt-1">
        Supports: {supportedFormats.join(', ')} (Max {maxSize}MB)
      </p>
      <input
        type="file"
        id={inputId}
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
