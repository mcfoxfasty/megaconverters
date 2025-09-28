import React from 'react';
import Layout from '../components/Layout';
import { navigate } from '../utils/navigation';

interface ToolPlaceholderPageProps {
  title: string;
}

const ToolPlaceholderPage: React.FC<ToolPlaceholderPageProps> = ({ title }) => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg text-medium-text">This tool is currently under development.</p>
        <p className="text-medium-text font-semibold text-primary mt-2">Coming Soon!</p>
        <div className="mt-8">
            <a 
                href="/"
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                }}
                className="bg-primary text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
            >
                Return to Homepage
            </a>
        </div>
      </div>
    </Layout>
  );
};

export default ToolPlaceholderPage;
