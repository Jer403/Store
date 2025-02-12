import { Link } from "react-router-dom";
import type { PurchasedProduct } from "../types";
import { IMG_API_URL, monthsEn } from "../consts";

interface ProductCardProps {
  product: PurchasedProduct;
}

export function PurchasedProductCard({ product }: ProductCardProps) {
  const date = new Date(product.purchased_at);
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="border rounded-lg p-4">
        <img
          src={`${IMG_API_URL}${product.image}`}
          alt={product.title}
          className="w-full h-72 object-cover rounded-lg aspect-auto"
        />
        <h3 className="mt-4 text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 text-sm mt-1">{`Purchased at ${
          monthsEn[date.getMonth()]
        } ${date.getDate()}, ${date.getFullYear()}`}</p>
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          Download
        </button>
      </div>
    </Link>
  );
}
