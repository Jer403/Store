import { Link } from "react-router-dom";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  handleClick: (product: Product) => void;
}

export function ProductCard({ product, handleClick }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group"
      onClick={(e) => {
        e.preventDefault();
        handleClick(product);
      }}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105">
        <img
          src="https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80"
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-800">
              {product.title}
            </p>
            <span className="text-lg font-bold text-indigo-600">
              ${product.price}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1 max-w-96">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-4 gap-2">
            <button className="w-1/2 h-10 rounded-lg border-gray-300 border hover:bg-gray-100">
              Details
            </button>
            <button className="w-1/2 h-10 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
