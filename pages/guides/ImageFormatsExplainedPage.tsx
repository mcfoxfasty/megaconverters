import React from 'react';
import ArticleLayout, { ArticleSection, ArticleCTA } from '../../components/ArticleLayout';

const ImageFormatsExplainedPage: React.FC = () => {
  return (
    <ArticleLayout 
        title="Image Formats Explained: JPG, PNG, GIF, WEBP, and More"
        description="Choosing the right image format is key to quality and performance. Understand the difference between the most common formats and when to use each."
    >
        <ArticleSection title="The Basics: Raster vs. Vector">
            <p>Before diving into formats, it's important to understand the two main types of digital images:</p>
            <ul>
                <li><strong>Raster Images:</strong> Made up of a grid of pixels. They are resolution-dependent, meaning they lose quality when scaled up. Photos are raster images. (e.g., JPG, PNG, GIF).</li>
                <li><strong>Vector Images:</strong> Made of mathematical paths and curves. They are resolution-independent and can be scaled to any size without losing quality. Logos and illustrations are often vectors. (e.g., SVG, AI).</li>
            </ul>
        </ArticleSection>

        <ArticleSection title="Common Raster Formats">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b border-dark-border text-left">Format</th>
                            <th className="px-4 py-2 border-b border-dark-border text-left">Best For</th>
                            <th className="px-4 py-2 border-b border-dark-border text-left">Key Features</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 border-b border-dark-border align-top font-semibold">JPG / JPEG</td>
                            <td className="px-4 py-2 border-b border-dark-border align-top">Photographs, complex images with many colors.</td>
                            <td className="px-4 py-2 border-b border-dark-border align-top">Lossy compression (small file size), no transparency.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border-b border-dark-border align-top font-semibold">PNG</td>
                            <td className="px-4 py-2 border-b border-dark-border align-top">Web graphics, logos, images requiring transparency.</td>
                            <td className="px-4 py-2 border-b border-dark-border align-top">Lossless compression (higher quality, larger file), supports transparency.</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border-b border-dark-border align-top font-semibold">GIF</td>
                            <td className="px-4 py-2 border-b border-dark-border align-top">Simple animations, graphics with limited colors.</td>
                            <td className="px-4 py-2 border-b border-dark-border align-top">Limited to 256 colors, supports animation and transparency.</td>
                        </tr>
                         <tr>
                            <td className="px-4 py-2 border-b-0 border-dark-border align-top font-semibold">WEBP</td>
                            <td className="px-4 py-2 border-b-0 border-dark-border align-top">Web images (replaces JPG, PNG, GIF).</td>
                            <td className="px-4 py-2 border-b-0 border-dark-border align-top">Excellent lossy/lossless compression, transparency, animation. Great for web performance.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ArticleSection>
        
        <ArticleCTA href="/image-converter">Choose the Right Format with Our Image Converter</ArticleCTA>
    </ArticleLayout>
  );
};

export default ImageFormatsExplainedPage;