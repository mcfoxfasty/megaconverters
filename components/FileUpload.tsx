
import React from 'react';
import Icon from './Icon';

const SupportedFileType: React.FC<{ name: string, types: string }> = ({ name, types }) => (
  <div className="text-center p-3 border border-dark-border rounded-lg bg-dark-bg">
    <p className="font-semibold text-sm text-light-text">{name}</p>
    <p className="text-xs text-medium-text mt-1">{types}</p>
  </div>
);

const FileUpload: React.FC = () => {
  return (
    <div className="bg-dark-card p-6 rounded-xl shadow-sm border border-dark-border">
      <div className="border-2 border-dashed border-slate-600 rounded-lg p-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icon name="upload" className="w-8 h-8 text-primary"/>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-light-text">Upload your files</h3>
        <p className="text-medium-text mt-2">Drag and drop files here, or click to browse</p>
        <button className="mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors">
          Choose Files
        </button>
      </div>
      <div className="mt-6">
        <p className="text-center text-sm font-medium text-medium-text mb-4">Supported File Types</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <SupportedFileType name="Images" types="JPG, PNG, GIF, BMP" />
          <SupportedFileType name="Documents" types="PDF, DOCX, TXT" />
          <SupportedFileType name="Spreadsheets" types="XLSX, CSV" />
          <SupportedFileType name="Audio" types="MP3, WAV, M4A" />
          <SupportedFileType name="Video" types="MP4, MOV, AVI" />
          <SupportedFileType name="Archives" types="ZIP, TAR, 7Z" />
        </div>
        <p className="text-center text-xs text-slate-500 mt-6">Maximum file size (50MB) per file - All processing happens locally - your files never leave your device</p>
      </div>
    </div>
  );
};

export default FileUpload;