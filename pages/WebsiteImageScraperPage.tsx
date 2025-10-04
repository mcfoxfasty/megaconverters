import React, { useState } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const WebsiteImageScraperPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isScr aping, setIsScraping] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }
    setIsScraping(true);
    setError('Image scraping requires server-side processing. This feature is coming soon!');
    setIsScraping(false);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500/10 p-4 rounded-full">
              <Icon name="globe" className="w-12 h-12 text-blue-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Website Image Scraper</h1>
          <p className="mt-2 text-lg text-medium-text">Scrape images from any website with ease, see progress.</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          <div className="mb-6">
            <label className="block text-sm font-medium text-light-text mb-2">Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            onClick={handleScrape}
            disabled={isScraping || !url}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isScraping ? 'Scraping...' : 'Scrape Images'}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-center">{error}</p>
            </div>
          )}

          {images.length > 0 && (
            <div className="mt-8 pt-6 border-t border-dark-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-light-text">Found {images.length} Images</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Download All
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="bg-dark-bg p-2 rounded-lg border border-dark-border">
                    <div className="aspect-square bg-slate-700 rounded flex items-center justify-center">
                      <Icon name="image" className="w-12 h-12 text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 bg-dark-card p-6 rounded-xl border border-dark-border">
          <h2 className="text-2xl font-bold text-white mb-4">About Website Image Scraper</h2>
          <p className="text-medium-text mb-4">
            Extract all images from any website URL. Perfect for research, design inspiration, or backing up image assets. 
            See real-time progress and download images individually or in bulk.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Fast Scraping</h3>
                <p className="text-sm text-medium-text">Quickly extract all images</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Preview</h3>
                <p className="text-sm text-medium-text">See thumbnails before download</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Bulk Download</h3>
                <p className="text-sm text-medium-text">Download all at once</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WebsiteImageScraperPage;
