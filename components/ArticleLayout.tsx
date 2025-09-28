import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import { navigate } from '../utils/navigation';

export const ArticleSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-light-text mb-4 pb-2 border-b border-dark-border">{title}</h2>
        <div className="space-y-4 text-medium-text">{children}</div>
    </div>
);

export const ArticleCTA: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <div className="mt-12 text-center p-6 bg-dark-bg rounded-lg border border-dark-border">
        <a
            href={href}
            onClick={(e) => {
                e.preventDefault();
                navigate(href);
            }}
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors text-lg"
        >
            {children}
        </a>
    </div>
);

const ArticleLayout: React.FC<{ children: React.ReactNode; title: string; description: string; }> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-dark-bg text-light-text font-sans flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-dark-card border-b border-dark-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">{title}</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-medium-text">
                    {description}
                </p>
            </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <article className="prose prose-invert prose-lg max-w-none bg-dark-card p-8 sm:p-12 rounded-xl border border-dark-border">
                {children}
            </article>
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default ArticleLayout;