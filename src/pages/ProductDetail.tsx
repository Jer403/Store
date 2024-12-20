import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MessageSquare, ShoppingCart } from 'lucide-react';
import type { Comment } from '../types';

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    userId: '1',
    productId: '1',
    content: 'Great game! Really enjoyed the graphics and gameplay.',
    rating: 5,
    createdAt: '2024-03-10',
    user: {
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  }
];

export function ProductDetail() {
  const { id } = useParams();
  const [comment, setComment] = useState('');

  return (
    <div className="min-h-screen-minus-64 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src="https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80"
              alt="Product"
              className="rounded-lg w-full h-[400px] object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Adventure Game Pro</h1>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600">4.5 (128 reviews)</span>
              </div>
              <p className="mt-4 text-gray-600">
                An exciting adventure game with stunning graphics and immersive gameplay.
              </p>
              <div className="mt-6">
                <span className="text-3xl font-bold text-indigo-600">$29.99</span>
              </div>
              <a href="/checkout">
                <button className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-indigo-700">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Buy
                </button>
              </a>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
            <div className="space-y-6">
              {MOCK_COMMENTS.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold">{comment.user.name}</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{comment.rating}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600">{comment.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Add a Comment</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Write your comment..."
              />
              <button className="mt-4 bg-indigo-600 flex items-center text-white py-2 px-6 rounded-lg hover:bg-indigo-700">
                <MessageSquare className="h-5 w-5 mr-2" />
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}