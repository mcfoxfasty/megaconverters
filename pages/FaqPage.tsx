import React, { useState } from 'react';
import Layout from '../components/Layout';

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-dark-border">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-5 px-6 focus:outline-none"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-semibold text-light-text">{title}</span>
                <svg
                    className={`w-5 h-5 text-medium-text transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="px-6 pb-5 text-medium-text">
                    {children}
                </div>
            </div>
        </div>
    );
};


const FaqPage: React.FC = () => {
    const faqs = [
        {
            q: 'Is MegaConverters free to use?',
            a: 'Yes, all our file conversion tools are completely free to use. There are no hidden charges or subscription fees.'
        },
        {
            q: 'How secure are my files?',
            a: 'Your files are 100% secure. All conversion processes run directly in your web browser. This means your files are never uploaded to our or any third-party servers. They do not leave your computer.'
        },
        {
            q: 'What is the maximum file size I can convert?',
            a: 'The current maximum file size is 50MB per file. This limit ensures that the conversions can be handled efficiently by your browser without performance issues.'
        },
        {
            q: 'What browsers do you support?',
            a: 'MegaConverters is designed to work on all modern web browsers, including the latest versions of Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge. For the best performance, we recommend using an up-to-date browser.'
        },
        {
            q: 'Why did my file conversion fail?',
            a: 'Conversions can sometimes fail if the file is corrupted, not a supported format, or if it exceeds the size limit. Since all processing is done locally, your device\'s performance can also be a factor. Please try again with a different file or a smaller file if the problem persists.'
        },
        {
            q: 'Do you offer an API?',
            a: 'Currently, we do not offer a public API. MegaConverters is designed as a browser-based tool for end-users. We may consider an API in the future based on user demand.'
        }
    ];

  return (
    <Layout>
      <div className="bg-dark-card border-b border-dark-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Frequently Asked Questions</h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-medium-text">
                  Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
              </p>
          </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-dark-card rounded-xl border border-dark-border overflow-hidden">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} title={faq.q}>
                    <p>{faq.a}</p>
                </AccordionItem>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;