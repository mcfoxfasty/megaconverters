
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FileUpload from '../components/FileUpload';
import SupportedTypes from '../components/SupportedTypes';
import WhyChooseUs from '../components/WhyChooseUs';
import ConverterGrid from '../components/ConverterGrid';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero />
        <div className="mt-12">
          <FileUpload />
        </div>
        
        {/* Converter Tools Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-light-text mb-4">All Converter Tools</h2>
            <p className="text-lg text-medium-text mb-8">Choose from our comprehensive suite of conversion tools</p>
          </div>
          <ConverterGrid searchQuery="" />
        </div>

        <div className="mt-24">
          <SupportedTypes />
        </div>
        <div className="mt-24">
          <WhyChooseUs />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
