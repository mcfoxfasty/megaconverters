import React, { useState } from 'react';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const UnitConverterPage: React.FC = () => {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const unitCategories = {
    length: { name: 'Length', units: ['meters', 'feet', 'inches', 'kilometers', 'miles', 'centimeters', 'millimeters', 'yards'] },
    weight: { name: 'Weight', units: ['kilograms', 'pounds', 'ounces', 'grams', 'tons', 'milligrams'] },
    temperature: { name: 'Temperature', units: ['celsius', 'fahrenheit', 'kelvin'] },
    volume: { name: 'Volume', units: ['liters', 'gallons', 'milliliters', 'cubic meters', 'cubic feet', 'cups', 'pints', 'quarts'] },
    area: { name: 'Area', units: ['square meters', 'square feet', 'square kilometers', 'acres', 'hectares'] },
    speed: { name: 'Speed', units: ['meters/second', 'kilometers/hour', 'miles/hour', 'feet/second', 'knots'] }
  };

  const handleConvert = () => {
    setOutputValue('Conversion feature coming soon!');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-pink-500/10 p-4 rounded-full">
              <Icon name="unit" className="w-12 h-12 text-pink-500"/>
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Unit Converter</h1>
          <p className="mt-2 text-lg text-medium-text">Convert between different units for length, weight, temperature.</p>
        </div>

        <div className="bg-dark-card p-8 rounded-xl border border-dark-border">
          <div className="mb-6">
            <label className="block text-sm font-medium text-light-text mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setFromUnit(unitCategories[e.target.value as keyof typeof unitCategories].units[0]);
                setToUnit(unitCategories[e.target.value as keyof typeof unitCategories].units[1]);
              }}
              className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
            >
              {Object.entries(unitCategories).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-light-text mb-2">From</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors mb-2"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              >
                {unitCategories[category as keyof typeof unitCategories].units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-light-text mb-2">To</label>
              <div className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text mb-2 h-[42px] flex items-center">
                {outputValue || '—'}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="block w-full bg-dark-bg border border-dark-border rounded-lg py-2.5 px-3 text-light-text focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors"
              >
                {unitCategories[category as keyof typeof unitCategories].units.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleConvert}
            className="mt-6 w-full bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Convert
          </button>
        </div>

        <div className="mt-12 bg-dark-card p-6 rounded-xl border border-dark-border">
          <h2 className="text-2xl font-bold text-white mb-4">About Unit Converter</h2>
          <p className="text-medium-text mb-4">
            Convert between different measurement units including length, weight, temperature, volume, area, and speed. 
            Perfect for quick conversions in everyday tasks.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">6 Categories</h3>
                <p className="text-sm text-medium-text">Length, Weight, Temperature, and more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Accurate</h3>
                <p className="text-sm text-medium-text">Precise conversions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="check-circle" className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-light-text">Easy to Use</h3>
                <p className="text-sm text-medium-text">Simple interface</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnitConverterPage;
