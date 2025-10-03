
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ConverterGrid from '../components/ConverterGrid';

const ConvertersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">All Converter Tools</h1>
        <p className="text-lg mb-8">A comprehensive suite of tools to handle all your file conversion needs.</p>
        
        <div className="max-w-2xl mx-auto mt-8">
          <input
            type="text"
            placeholder="Search converters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <ConverterGrid searchQuery={searchQuery} />
      </div>
    </Layout>
  );
};

export default ConvertersPage;
