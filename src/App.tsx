import React, { useState, useEffect } from 'react';
import { NewsItem, NewsCategory } from './types';
import NewsList from './components/NewsList';
import FilterBar from './components/FilterBar';
import { Globe, TrendingUp } from 'lucide-react';

const API_URL = '/api/top-headlines?country=us&category=business';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const formattedNews: NewsItem[] = data.articles.map((article: any, index: number) => ({
          id: index.toString(),
          title: article.title,
          description: article.description,
          url: article.url,
          country: article.source.name || 'Unknown',
          category: mapToNewsCategory(article.source.category),
          symbol: extractSymbol(article.title),
          date: new Date(article.publishedAt).toLocaleDateString(),
        }));

        setNews(formattedNews);
        setFilteredNews(formattedNews);

        const uniqueCountries = Array.from(new Set(formattedNews.map((item) => item.country)));
        const uniqueCategories = Array.from(new Set(formattedNews.map((item) => item.category))) as NewsCategory[];
        const uniqueSymbols = Array.from(new Set(formattedNews.map((item) => item.symbol).filter(Boolean)));

        setCountries(uniqueCountries);
        setCategories(uniqueCategories);
        setSymbols(uniqueSymbols as string[]);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleFilterChange = (type: 'country' | 'category' | 'symbol', value: string) => {
    setFilteredNews(news.filter((item) => {
      if (type === 'country' && value !== '') {
        return item.country === value;
      }
      if (type === 'category' && value !== '') {
        return item.category === value;
      }
      if (type === 'symbol' && value !== '') {
        return item.symbol === value;
      }
      return true;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center">
          <Globe className="mr-2" />
          <TrendingUp className="mr-2" />
          <h1 className="text-2xl font-bold">Global Investment News</h1>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <FilterBar
          countries={countries}
          categories={categories}
          symbols={symbols}
          onFilterChange={handleFilterChange}
        />
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <NewsList news={filteredNews} />
        )}
      </main>
    </div>
  );
};

const mapToNewsCategory = (category: string): NewsCategory => {
  const categoryMap: { [key: string]: NewsCategory } = {
    'business': 'Stocks',
    'economy': 'Bonds',
    'commodities': 'Commodities',
    'forex': 'Forex',
    'cryptocurrency': 'Crypto',
  };
  return categoryMap[category.toLowerCase()] || 'Stocks';
};

const extractSymbol = (title: string): string | undefined => {
  const symbolRegex = /\(([A-Z]+)\)/;
  const match = title.match(symbolRegex);
  return match ? match[1] : undefined;
};

export default App;