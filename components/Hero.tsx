import React from 'react';
import Icon from './Icon';
import { navigate } from '../utils/navigation';

interface QuickActionCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, title, description, href }) => (
  <a 
    href={href}
    onClick={(e) => { e.preventDefault(); navigate(href); }}
    className="bg-dark-card p-6 rounded-lg border border-dark-border hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer h-full block"
  >
    <div className="flex items-start gap-4">
      <div className="bg-primary/20 p-2 rounded-md">
         <Icon name={icon} className="w-6 h-6 text-primary"/>
      </div>
      <div>
        <h3 className="text-md font-semibold text-light-text">{title}</h3>
        <p className="text-sm text-medium-text mt-1">{description}</p>
      </div>
    </div>
  </a>
);

const Hero: React.FC = () => {
  const actions = [
    { icon: 'file', title: 'File Conversion', description: 'Convert common file formats like images, documents, audio...', href: '/image-converter' },
    { icon: 'ruler', title: 'Unit Conversion', description: 'Convert between different units of measurement, length, weight...', href: '/unit-converter' },
    { icon: 'chip', title: 'Digital Conversion', description: 'Convert between different number bases, encodings, colors...', href: '/digital-converter' },
    { icon: 'code', title: 'Code Generator', description: 'Convert between different code syntaxes and formats', href: '/qr-barcode-generator' },
  ];

  return (
    <section className="text-center pt-16 pb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
        <span className="block font-poppins text-5xl md:text-6xl tracking-wide"><span style={{ color: '#EB4300' }}>M</span>ega<span style={{ color: '#F8BD00' }}>C</span>onverters</span>
        <span className="block text-3xl md:text-4xl mt-2">Universal File Converter</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-medium-text">
        Convert any file format instantly with professional-grade quality. Images, documents, audio, video, and more - all processed securely in your browser.
      </p>
      <div className="mt-12">
        <div className="max-w-2xl mx-auto mb-10">
          <label htmlFor="search-converter" className="sr-only">Search for a converter</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="search" className="w-5 h-5 text-medium-text" />
            </div>
            <input
              type="search"
              name="search-converter"
              id="search-converter"
              placeholder="Search for a converter (e.g., 'PDF to Word', 'JPG to PNG')..."
              className="block w-full bg-dark-card border border-dark-border rounded-lg py-3.5 pl-12 pr-4 text-light-text placeholder-medium-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors shadow-sm"
              aria-label="Search for a converter"
            />
          </div>
        </div>
        
        <h2 className="text-lg font-semibold text-light-text mb-4">Quick File Upload</h2>
        <p className="text-sm text-medium-text mb-6">Or drag and drop files directly for supported conversion</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {actions.map(action => <QuickActionCard key={action.title} {...action} />)}
        </div>
      </div>
    </section>
  );
};

export default Hero;
