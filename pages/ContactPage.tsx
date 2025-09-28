import React from 'react';
import Layout from '../components/Layout';

const ContactPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-medium-text">
            Have a question, feedback, or need support? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-light-text mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  className="block w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text placeholder-medium-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-light-text mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="you@example.com"
                  className="block w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text placeholder-medium-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="subject" className="block text-sm font-medium text-light-text mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Regarding file conversion..."
                className="block w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text placeholder-medium-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                required
              />
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-sm font-medium text-light-text mb-2">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                placeholder="Please describe your issue or feedback in detail."
                className="block w-full bg-dark-bg border border-dark-border rounded-lg py-3 px-4 text-light-text placeholder-medium-text focus:ring-2 focus:ring-primary focus:border-primary transition-colors shadow-sm"
                required
              ></textarea>
            </div>
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-primary"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
