import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{news.description}</p>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{news.date}</span>
        <span>{news.country}</span>
        <span>{news.category}</span>
        {news.symbol && <span>{news.symbol}</span>}
      </div>
      <a
        href={news.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-blue-600 hover:underline"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsCard;