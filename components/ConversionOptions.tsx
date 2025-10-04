import React from 'react';

interface ConversionOption {
  label: string;
  value: string;
}

interface ConversionOptionsProps {
  outputFormat: string;
  onFormatChange: (format: string) => void;
  formats: ConversionOption[];
  quality?: number;
  onQualityChange?: (quality: number) => void;
  showQuality?: boolean;
  bitrate?: string;
  onBitrateChange?: (bitrate: string) => void;
  showBitrate?: boolean;
  color?: string;
}

const ConversionOptions: React.FC<ConversionOptionsProps> = ({
  outputFormat,
  onFormatChange,
  formats,
  quality = 90,
  onQualityChange,
  showQuality = false,
  bitrate = '192',
  onBitrateChange,
  showBitrate = false,
  color = 'purple'
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="output-format" className="block text-sm font-medium text-light-text mb-2">
          Convert to:
        </label>
        <select
          id="output-format"
          value={outputFormat}
          onChange={(e) => onFormatChange(e.target.value)}
          className={`block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500 transition-colors`}
        >
          {formats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
      </div>

      {showQuality && onQualityChange && (
        <div>
          <label htmlFor="quality" className="block text-sm font-medium text-light-text mb-2">
            Quality: {quality}%
          </label>
          <input
            type="range"
            id="quality"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => onQualityChange(parseInt(e.target.value))}
            className="w-full h-2 bg-dark-bg rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-medium-text mt-1">
            <span>Lower size</span>
            <span>Higher quality</span>
          </div>
        </div>
      )}

      {showBitrate && onBitrateChange && (
        <div>
          <label htmlFor="bitrate" className="block text-sm font-medium text-light-text mb-2">
            Bitrate:
          </label>
          <select
            id="bitrate"
            value={bitrate}
            onChange={(e) => onBitrateChange(e.target.value)}
            className={`block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-${color}-500 focus:border-${color}-500 transition-colors`}
          >
            <option value="128">128 kbps (Good)</option>
            <option value="192">192 kbps (Better)</option>
            <option value="256">256 kbps (High)</option>
            <option value="320">320 kbps (Best)</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default ConversionOptions;
