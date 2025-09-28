
import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FaqPage from './pages/FaqPage';
import PrivacyPage from './pages/PrivacyPage';
import PlaceholderPage from './pages/PlaceholderPage';
import ContactPage from './pages/ContactPage';
import ImageConverterPage from './pages/ImageConverterPage';
import ToolPlaceholderPage from './pages/ToolPlaceholderPage';
import PdfToJpgPage from './pages/PdfToJpgPage';
import DocxToPdfPage from './pages/DocxToPdfPage';
import PngToJpgPage from './pages/PngToJpgPage';
import ConvertersPage from './pages/ConvertersPage';

// Guide Pages
import PdfToWordGuidePage from './pages/guides/PdfToWordGuidePage';
import ImageFormatsExplainedPage from './pages/guides/ImageFormatsExplainedPage';
import ReduceFileSizeGuidePage from './pages/guides/ReduceFileSizeGuidePage';
import FileToPdfGuidePage from './pages/guides/FileToPdfGuidePage';
import PdfToCsvGuidePage from './pages/guides/PdfToCsvGuidePage';
import JpgVsJpegPage from './pages/guides/JpgVsJpegPage';
import WordToPdfGuidePage from './pages/guides/WordToPdfGuidePage';
import ImageCompressionGuidePage from './pages/guides/ImageCompressionGuidePage';


const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    
    const handleNavigate = (event: Event) => {
        if (event instanceof CustomEvent) {
            setRoute(event.detail.path);
        }
    };
    window.addEventListener('navigate', handleNavigate);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('navigate', handleNavigate);
    };
  }, []);

  const renderPage = () => {
    switch (route) {
      case '/':
        return <HomePage />;
      case '/about':
        return <AboutPage />;
      case '/faq':
        return <FaqPage />;
      case '/privacy':
        return <PrivacyPage />;
      case '/blog':
        return <PlaceholderPage title="Blog" />;
      case '/contact':
          return <ContactPage />;
      case '/converters':
        return <ConvertersPage />;
      case '/image-converter':
        return <ImageConverterPage />;
      case '/pdf-to-jpg':
        return <PdfToJpgPage />;
      case '/docx-to-pdf':
        return <DocxToPdfPage />;
      case '/png-to-jpg':
        return <PngToJpgPage />;
      case '/document-converter':
        return <ToolPlaceholderPage title="Document Converter" />;
      case '/audio-converter':
        return <ToolPlaceholderPage title="Audio Converter" />;
      case '/archive-converter':
        return <ToolPlaceholderPage title="Archive Converter" />;
      case '/spreadsheet-converter':
        return <ToolPlaceholderPage title="Spreadsheet Converter" />;
      case '/unit-converter':
        return <ToolPlaceholderPage title="Unit Converter" />;
      case '/digital-converter':
        return <ToolPlaceholderPage title="Digital Converter" />;
      case '/qr-barcode-generator':
        return <ToolPlaceholderPage title="QR & Barcode Generator" />;
      case '/image-scraper':
        return <ToolPlaceholderPage title="Website Image Scraper" />;
      case '/svg-cut-scrape':
        return <ToolPlaceholderPage title="SVG Cut & Scrape" />;

      // Guide Pages
      case '/pdf-to-word-guide':
          return <PdfToWordGuidePage />;
      case '/image-formats-explained':
          return <ImageFormatsExplainedPage />;
      case '/reduce-file-size-guide':
          return <ReduceFileSizeGuidePage />;
      case '/file-to-pdf-guide':
          return <FileToPdfGuidePage />;
      case '/pdf-to-csv-guide':
          return <PdfToCsvGuidePage />;
      case '/jpg-vs-jpeg':
          return <JpgVsJpegPage />;
      case '/word-to-pdf-guide':
          return <WordToPdfGuidePage />;
      case '/image-compression-guide':
          return <ImageCompressionGuidePage />;
          
      default:
        return <HomePage />;
    }
  };

  return <>{renderPage()}</>;
};

export default App;
