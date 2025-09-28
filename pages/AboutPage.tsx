import React from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const InfoCard: React.FC<{ icon: string; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
        <div className="flex items-center gap-3 mb-3">
            <Icon name={icon} className="w-6 h-6 text-primary"/>
            <h3 className="text-xl font-bold text-light-text">{title}</h3>
        </div>
        <p className="text-medium-text">{children}</p>
    </div>
);

const AboutPage: React.FC = () => {
  return (
    <Layout>
        <div className="bg-dark-card border-b border-dark-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">About MegaConverters</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-medium-text">
                    Fast, secure, and private file conversion tools, accessible to everyone.
                </p>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-extrabold text-white mb-4">Our Mission</h2>
                    <p className="text-medium-text space-y-4">
                        At MegaConverters, our mission is to provide powerful, professional-grade file conversion utilities that are simple to use and uncompromising on privacy. We believe that everyone deserves access to high-quality tools without having to worry about their data security.
                        <br/><br/>
                        That's why we've engineered our entire suite of converters to run directly in your browser. Your files are never uploaded to our servers, ensuring that what's yours stays yours.
                    </p>
                </div>
                <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
                    <img src="https://i.imgur.com/uS83b6W.png" alt="Illustration of secure data processing" className="rounded-lg" />
                </div>
            </div>

            <div className="mt-24 text-center">
                <h2 className="text-3xl font-extrabold text-white mb-12">Our Core Principles</h2>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <InfoCard icon="shield" title="Security First">
                        By processing files on your device, we eliminate the risks associated with file uploads. Your data's security and privacy are not just features—they are the foundation of our platform.
                    </InfoCard>
                    <InfoCard icon="bolt" title="Peak Performance">
                        We leverage modern web technologies like WebAssembly to perform complex conversions at near-native speeds. Get your files converted in seconds, not minutes.
                    </InfoCard>
                    <InfoCard icon="globe" title="Universal Access">
                        Our tools are designed to work on any modern browser, on any device, without the need for installations or plugins. High-quality conversion is just a click away.
                    </InfoCard>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default AboutPage;
