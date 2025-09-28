
import React from 'react';
import Icon from './Icon';

interface TypeCardProps {
  icon: string;
  title: string;
  description: string;
  formats: string;
  color: string;
}

const TypeCard: React.FC<TypeCardProps> = ({ icon, title, description, formats, color }) => (
  <div className="bg-dark-card p-6 rounded-xl border border-dark-border flex flex-col">
    <div className="flex items-center gap-4 mb-3">
      {/* Fix: The Icon component does not accept a 'style' prop. Moved the color style to the parent div, which the SVG icon inherits via 'currentColor'. */}
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}2A`, color: color }}>
        <Icon name={icon} className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-light-text">{title}</h3>
    </div>
    <p className="text-medium-text text-sm flex-grow">{description}</p>
    <div className="mt-4">
      <span className="inline-block bg-primary/20 text-indigo-400 text-xs font-semibold px-3 py-1.5 rounded-md">
        {formats}
      </span>
    </div>
  </div>
);

const SupportedTypes: React.FC = () => {
    const types = [
        { icon: 'image', title: 'Image Conversion', description: 'Convert common formats like WEBP, BMP, AVIF, PNG, JPG, GIF, Tiff, SVG, ICO, and professional RAW formats.', formats: '20+ formats supported', color: '#60A5FA' },
        { icon: 'document', title: 'Document Processing', description: 'Convert DOCX, PPTX, Word documents, text files, and more with professional-grade conversion tools.', formats: '15+ formats supported', color: '#34D399' },
        { icon: 'audio', title: 'Audio Conversion', description: 'Convert audio files between MP3, WAV, M4A, FLAC, and OGG with quality presets and metadata preservation.', formats: '10+ formats supported', color: '#A78BFA' },
        { icon: 'video', title: 'Video Processing', description: 'Convert video files between MP4, AVI, MOV, MKV, WebM and more with advanced codecs with custom settings.', formats: '15+ formats supported', color: '#F8BD00' },
        { icon: 'archiveManagement', title: 'Archive Management', description: 'Create and extract common ZIP, RAR, 7Z, TAR, GZ and more archive formats with ease.', formats: '10+ formats supported', color: '#EB4300' },
        { icon: 'ruler', title: 'Unit Conversion', description: 'Convert between different units of measurement including length, weight, temperature, energy, time, and speed.', formats: '50+ units supported', color: '#F472B6' },
        { icon: 'chip', title: 'Digital Conversion', description: 'Convert between number bases, text encodings, hash functions, and color formats.', formats: 'Multiple formats', color: '#2DD4BF' },
        { icon: 'sparkles', title: 'AI-Powered Optimization', description: 'Get format recommendations and automatic optimization based on your file content and use.', formats: 'Intelligent suggestions', color: '#E879F9' },
    ];
  return (
    <section className="text-center">
      <h2 className="text-3xl font-extrabold text-white">Supported Conversion Types</h2>
      <p className="mt-3 max-w-xl mx-auto text-medium-text">Convert between 150+ file formats and measurement units.</p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {types.map(type => <TypeCard key={type.title} {...type} />)}
      </div>
    </section>
  );
};

export default SupportedTypes;