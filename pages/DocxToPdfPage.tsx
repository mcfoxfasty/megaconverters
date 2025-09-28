
import React from 'react';
import FileUpload from '../components/FileUpload';
import Layout from '../components/Layout';

const DocxToPdfPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">DOCX to PDF Converter</h1>
        <p className="text-lg">Convert your DOCX files to professional-quality PDFs.</p>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <FileUpload 
          fileType="DOCX"
          conversionType="PDF"
          processingEndpoint="/api/docx-to-pdf"
        />
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1. Upload DOCX</h3>
              <p>Select the DOCX file you want to convert.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">2. Convert</h3>
              <p>Our tool will process your file and convert it to PDF format.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">3. Download PDF</h3>
              <p>Download your converted professional-quality PDF file.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocxToPdfPage;
