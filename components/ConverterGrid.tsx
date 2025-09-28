
import React from 'react';
import Icon from './Icon';
import { navigate } from '../utils/navigation';

interface ConverterCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  href: string;
}

const ConverterCard: React.FC<ConverterCardProps> = ({ icon, title, description, color, href }) => (
  <div className="bg-dark-card p-5 rounded-lg border border-dark-border hover:shadow-md transition-shadow flex flex-col">
    <div className="flex items-center gap-4 mb-3">
      <div className={`p-2 rounded-md`} style={{ backgroundColor: `${color}2A`, color: color }}>
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <h3 className="font-bold text-light-text">{title}</h3>
    </div>
    <p className="text-sm text-medium-text mb-4 flex-grow">{description}</p>
    <a 
      href={href} 
      onClick={(e) => { e.preventDefault(); navigate(href); }}
      className="block mt-auto w-full text-center py-2 text-sm font-semibold bg-slate-700 hover:bg-slate-600 text-light-text rounded-md transition-colors"
    >
      Open Tool
    </a>
  </div>
);

interface ConverterGridProps {
  searchQuery: string;
}

const ConverterGrid: React.FC<ConverterGridProps> = ({ searchQuery }) => {
  const converters = [
    { icon: 'image', title: 'Image Converter', description: 'Convert and optimize images. Formats: WEBP, JPG, PNG...', color: '#60A5FA', href: '/image-converter' },
    { icon: 'document', title: 'Document Converter', description: 'Convert document formats with average quality output.', color: '#34D399', href: '/document-converter' },
    { icon: 'audio', title: 'Audio Converter', description: 'Convert audio formats with MP3, WAV, M4A.', color: '#A78BFA', href: '/audio-converter' },
    { icon: 'archive', title: 'Archive Converter', description: 'Convert ZIP, 7Z, and TAR and other archive formats.', color: '#F8BD00', href: '/archive-converter' },
    { icon: 'spreadsheet', title: 'Spreadsheet Converter', description: 'Convert spreadsheet formats. Formats: XLSX, ODS, CSV.', color: '#EB4300', href: '/spreadsheet-converter' },
    { icon: 'ruler', title: 'Unit Converter', description: 'Convert between different units for length, weight, temperature.', color: '#F472B6', href: '/unit-converter' },
    { icon: 'chip', title: 'Digital Converter', description: 'Convert between number bases, encodings, colors.', color: '#2DD4BF', href: '/digital-converter' },
    { icon: 'qr', title: 'QR & Barcode Generator', description: 'Generate QR codes and barcodes for text, URLs, and data.', color: '#818CF8', href: '/qr-barcode-generator' },
    { icon: 'globe', title: 'Website Image Scraper', description: 'Scrape images from any website with ease, see progress.', color: '#38BDF8', href: '/image-scraper' },
    { icon: 'scissors', title: 'SVG Cut & Scrape', description: 'Extract designs from business cards, logos, magazines.', color: '#E879F9', href: '/svg-cut-scrape' },
  ];

  const filteredConverters = converters.filter(converter =>
    converter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    converter.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {filteredConverters.map(converter => <ConverterCard key={converter.title} {...converter} />)}
    </div>
  );
};

export default ConverterGrid;
