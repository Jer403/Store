import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Search } from 'lucide-react';
import type { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Adventure Game Pro',
    description: 'An exciting adventure game with stunning graphics',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80',
    category: 'Games',
    rating: 4.5
  },
  // Add more mock products as needed
];

export function Store() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen-minus-64 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Digital Content
          </h1>
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search for games, software, or digital items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}