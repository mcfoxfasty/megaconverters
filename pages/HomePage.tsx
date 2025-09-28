
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FileUpload from '../components/FileUpload';
import SupportedTypes from '../components/SupportedTypes';
import WhyChooseUs from '../components/WhyChooseUs';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero />
        <div className="mt-12">
          <FileUpload />
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
