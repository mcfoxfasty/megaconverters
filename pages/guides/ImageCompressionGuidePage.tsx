import React from 'react';
import ArticleLayout, { ArticleSection, ArticleCTA } from '../../components/ArticleLayout';

const ImageCompressionGuidePage: React.FC = () => {
  return (
    <ArticleLayout
      title="Understanding Image Compression: Lossy vs. Lossless"
      description="Learn the crucial difference between lossy and lossless compression to make informed decisions when saving and sharing your images."
    >
      <ArticleSection title="What Is Image Compression?">
        <p>
          Image compression is the process of reducing the file size of a graphics file without (or with minimal) degradation of the image quality. Smaller file sizes allow images to be stored more efficiently and downloaded much faster, which is essential for web performance.
        </p>
      </ArticleSection>

      <ArticleSection title="Lossy Compression: Smaller Size, Some Quality Loss">
        <p>
          Lossy compression reduces file size by permanently eliminating certain information, especially redundant information. When the file is uncompressed, only a part of the original information is still there, but what's left has been reassembled to be as close to the original as possible.
        </p>
        <ul>
          <li><strong>Pros:</strong> Results in significantly smaller file sizes. Perfect for websites and sharing on social media.</li>
          <li><strong>Cons:</strong> Some loss of quality occurs. This loss is irreversible. Each time you save a file with lossy compression, the quality degrades further.</li>
          <li><strong>Common Formats:</strong> JPEG, WEBP (in lossy mode).</li>
          <li><strong>When to Use:</strong> Use for photographs and complex images where a slight loss of quality is acceptable in exchange for a much smaller file size.</li>
        </ul>
      </ArticleSection>

      <ArticleSection title="Lossless Compression: Perfect Quality, Larger Size">
        <p>
          Lossless compression reduces file size without any loss of quality. It works by identifying and eliminating statistical redundancy. No information is discarded during compression. When the file is uncompressed, it is an exact replica of the original.
        </p>
        <ul>
          <li><strong>Pros:</strong> No loss of image quality. Ideal for archival and professional use.</li>
          <li><strong>Cons:</strong> File sizes are larger than with lossy compression.</li>
          <li><strong>Common Formats:</strong> PNG, BMP, RAW, GIF.</li>
          <li><strong>When to Use:</strong> Use for images with sharp lines and solid colors, like logos, illustrations, and technical drawings. Also use it when you need to edit an image multiple times, as it won't degrade with each save.</li>
        </ul>
      </ArticleSection>

      <ArticleCTA href="/image-converter">Optimize Your Images with Our Compressor</ArticleCTA>
    </ArticleLayout>
  );
};

export default ImageCompressionGuidePage;
