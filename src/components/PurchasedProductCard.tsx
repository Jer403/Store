import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import type { PurchasedProduct } from '../types';

interface ProductCardProps {
  product: PurchasedProduct;
}


export function PurchasedProductCard({ product }: ProductCardProps) {
  const date = new Date(product.purchasedDate)
  return (
    <Link to={`/product/${product.id}`} className="group">
        <div className="border rounded-lg p-4">
            <img
            src={product.image}
            alt={product.description}
            className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{date.getDate()}</p>
            <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Download
            </button>
        </div>
    </Link>
  );
}