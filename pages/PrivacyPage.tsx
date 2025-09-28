import React from 'react';
import Layout from '../components/Layout';

const PrivacySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-10">
        <h2 className="text-2xl font-bold text-light-text mb-4 pb-2 border-b border-dark-border">{title}</h2>
        <div className="space-y-4 text-medium-text">{children}</div>
    </div>
);

const PrivacyPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-dark-card border-b border-dark-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-medium-text">
                  Your privacy is not just a policy, it's our core architecture.
              </p>
          </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-medium-text mb-8">Last Updated: October 26, 2023</p>

            <PrivacySection title="The MegaConverters Privacy Guarantee">
                <p>
                    MegaConverters is fundamentally different from other online file converters. Our commitment to your privacy is absolute because our technology is designed from the ground up to protect your data. <strong>We do not and cannot access, view, or store your files.</strong>
                </p>
            </PrivacySection>

            <PrivacySection title="Zero Data Collection: How It Works">
                <p>
                    All file processing, conversion, and generation performed by our tools happen entirely within your web browser on your own computer. This is often referred to as "client-side" processing.
                </p>
                <ul>
                    <li><strong>Your Files Never Leave Your Device:</strong> When you select a file, it is opened directly by your browser. It is never uploaded to our servers or any third-party service.</li>
                    <li><strong>No Server Interaction:</strong> The conversion logic runs locally on your machine. The internet connection is only used to load the initial web page and the conversion tool itself.</li>
                    <li><strong>Instant Deletion:</strong> Because the files are never uploaded, there is nothing for us to delete. Once you close the browser tab, the session is over.</li>
                </ul>
            </PrivacySection>

            <PrivacySection title="Information We Do Not Collect">
                <p>To be perfectly clear, we do not collect, log, or store any of the following:</p>
                <ul>
                    <li>The content of your files.</li>
                    <li>The names of your files.</li>
                    <li>Any personally identifiable information (PII) such as your name, email address, or IP address.</li>
                    <li>Any metadata associated with your files.</li>
                </ul>
            </PrivacySection>
            
            <PrivacySection title="Cookies and Analytics">
                 <p>
                    MegaConverters does not use tracking cookies. We may use anonymous, privacy-friendly analytics to count page visits and understand which tools are popular. This data is aggregated and contains no personal information. It helps us improve our services for everyone.
                </p>
            </PrivacySection>

            <PrivacySection title="Changes to This Policy">
                <p>
                    As our services evolve, we may update this Privacy Policy. We will notify users of any significant changes by posting the new policy on this page. Our core guarantee of never uploading or storing your files will not change.
                </p>
            </PrivacySection>

            <PrivacySection title="Contact Us">
                <p>
                    If you have any questions about our privacy practices, please do not hesitate to reach out through our Contact page. We are happy to provide more details on how our privacy-first technology works.
                </p>
            </PrivacySection>

        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
