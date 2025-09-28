import React from 'react';
import Icon from './Icon';
import { navigate } from '../utils/navigation';


const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <li>
    <a href={href} onClick={(e) => { e.preventDefault(); navigate(href); }} className="text-medium-text hover:text-primary transition-colors text-sm">
      {children}
    </a>
  </li>
);

const FooterTextItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li>
        <span className="text-medium-text text-sm">{children}</span>
    </li>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-card border-t border-dark-border mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="logo" className="w-8 h-8 text-primary"/>
              <span className="text-xl font-bold text-light-text">
                <span style={{ color: '#EB4300' }}>M</span>ega<span style={{ color: '#F8BD00' }}>C</span>onverters
              </span>
            </div>
            <p className="text-sm text-medium-text max-w-sm">
              Convert any file format instantly with professional-grade quality. All processing happens locally in your browser for maximum security and privacy.
            </p>
             <p className="text-sm text-medium-text mt-2">
              Made with ❤️ for seamless file conversion.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-text tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/pdf-to-word-guide">PDF to Word Guide</FooterLink>
              <FooterLink href="/image-formats-explained">Image Formats</FooterLink>
              <FooterLink href="/reduce-file-size-guide">Reduce File Size</FooterLink>
              <FooterLink href="/file-to-pdf-guide">File to PDF Guide</FooterLink>
              <FooterLink href="/pdf-to-csv-guide">PDF to CSV Guide</FooterLink>
              <FooterLink href="/jpg-vs-jpeg">JPG vs JPEG</FooterLink>
              <FooterLink href="/word-to-pdf-guide">Word to PDF Guide</FooterLink>
              <FooterLink href="/image-compression-guide">Image Compression</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-light-text tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-3">
              <FooterTextItem>100% Secure &amp; Private</FooterTextItem>
              <FooterTextItem>Lightning-Fast Processing</FooterTextItem>
              <FooterTextItem>Works in Any Browser</FooterTextItem>
            </ul>
          </div>
           <div>
            <h3 className="text-sm font-semibold text-light-text tracking-wider uppercase">Supported</h3>
            <ul className="mt-4 space-y-3">
              <FooterTextItem>Image (JPG, PNG, GIF, etc.)</FooterTextItem>
              <FooterTextItem>Document (PDF, DOC, etc.)</FooterTextItem>
              <FooterTextItem>Audio &amp; Video files</FooterTextItem>
              <FooterTextItem>Archive formats</FooterTextItem>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-dark-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-medium-text">© 2024 MegaConverters. All rights reserved. Your files are processed locally and never uploaded to our servers.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
             <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }} className="text-sm text-medium-text hover:text-white">Privacy First</a>
             <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }} className="text-sm text-medium-text hover:text-white">No Data Collection</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;