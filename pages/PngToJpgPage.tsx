
import React from 'react';
import FileUpload from '../components/FileUpload';
import Layout from '../components/Layout';

const PngToJpgPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">PNG to JPG Converter</h1>
        <p className="text-lg">Convert your PNG images to high-quality JPG format.</p>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <FileUpload 
          fileType="PNG"
          conversionType="JPG"
          processingEndpoint="/api/png-to-jpg"
        />
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1. Upload PNG</h3>
              <p>Select the PNG file you want to convert.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">2. Convert</h3>
              <p>Our tool will process your file and convert it to JPG format.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">3. Download JPG</h3>
              <p>Download your converted high-quality JPG image.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PngToJpgPage;
