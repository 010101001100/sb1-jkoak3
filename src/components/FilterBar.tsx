import React from 'react';
import { NewsCategory } from '../types';

interface FilterBarProps {
  countries: string[];
  categories: NewsCategory[];
  symbols: string[];
  onFilterChange: (type: 'country' | 'category' | 'symbol', value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ countries, categories, symbols, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        onChange={(e) => onFilterChange('country', e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Countries</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => onFilterChange('category', e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => onFilterChange('symbol', e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Symbols</option>
        {symbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;