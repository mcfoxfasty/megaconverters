import React from 'react';
import Icon from './Icon';

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
    color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => (
    <div className="bg-dark-card p-6 rounded-xl border border-dark-border">
        <div className="flex items-center gap-4">
            {/* Fix: The Icon component does not accept a 'style' prop. Moved the color style to the parent div, which the SVG icon inherits via 'currentColor'. */}
            <div className="p-2 rounded-md" style={{ backgroundColor: `${color}2A`, color: color }}>
                <Icon name={icon} className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-light-text">{title}</h3>
            </div>
        </div>
        <p className="mt-3 text-sm text-medium-text">{description}</p>
    </div>
);

const WhyChooseUs: React.FC = () => {
    const features = [
        { icon: 'bolt', title: 'Lightning Fast', description: 'Client-side processing means instant conversions without network delays.', color: '#34D399' },
        { icon: 'shield', title: '100% Secure', description: 'Your files never leave your device. Maximum privacy and security guaranteed.', color: '#60A5FA' },
        { icon: 'globe', title: 'Universal Access', description: 'Works in any modern browser on any device. No downloads or installations required.', color: '#A78BFA' },
        { icon: 'beaker', title: 'Advanced Processing', description: 'Professional-grade conversion algorithms with customizable quality settings.', color: '#34D399' },
        { icon: 'lock', title: 'Privacy First', description: 'Zero data collection. Your files and conversions remain completely private.', color: '#60A5FA' },
        { icon: 'sparkles', title: 'AI Enhanced', description: 'Smart recommendations and automatic optimization for the best results.', color: '#A78BFA' },
    ];
    return (
        <section className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Why Choose MegaConverters?</h2>
            <p className="mt-3 max-w-2xl mx-auto text-medium-text">Professional-grade conversion tools with unmatched security and performance.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {features.map(feature => <FeatureCard key={feature.title} {...feature} />)}
            </div>
        </section>
    );
};

export default WhyChooseUs;