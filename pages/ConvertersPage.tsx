
import React from 'react';
import { navigate } from '../utils/navigation';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const toolCategories = [
  {
    title: 'Image Tools',
    tools: [
      { name: 'Image Converter', path: '/image-converter', icon: 'image' },
      { name: 'PNG to JPG', path: '/png-to-jpg', icon: 'file-image' },
    ]
  },
  {
    title: 'Document Tools',
    tools: [
      { name: 'PDF to JPG', path: '/pdf-to-jpg', icon: 'file-pdf' },
      { name: 'DOCX to PDF', path: '/docx-to-pdf', icon: 'file-word' },
    ]
  },
];

const ConvertersPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">All Converter Tools</h1>
        <p className="text-lg">A comprehensive suite of tools to handle all your file conversion needs.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {toolCategories.map((category, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">{category.title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.tools.map((tool, toolIndex) => (
                <div 
                  key={toolIndex}
                  onClick={() => navigate(tool.path)}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer flex items-center"
                >
                  <Icon name={tool.icon} className="w-8 h-8 mr-4 text-blue-500" />
                  <div>
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                    <p className="text-gray-600">Convert your files with ease.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ConvertersPage;
