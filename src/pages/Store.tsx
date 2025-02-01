import { ProductCard } from "../components/ProductCard";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { Product } from "../types";

export default function Store() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [detailViewVisible, setDetailViewVisible] = useState(false);
  const { products } = useProduct();

  const handleProductClick = (product: Product) => {
    setDetailViewVisible(true);
    setCurrentProduct(product);
  };

  return (
    <div className="min-h-screen-minus-64 bg-gray-50 flex flex-row">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center mb-4">
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

        <div
          className={`grid grid-cols-1 
          ${
            detailViewVisible
              ? "md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          } gap-6`}
        >
          {products != null &&
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                handleClick={handleProductClick}
              />
            ))}
        </div>
      </div>
      <div
        className="max-w-7xl px-4 absolute w-full sm:w-1/2 xl:w-1/3 2xl:w-2/5 py-8 bg-white mx-3 my-8 sm:sticky top-6 h-fit rounded-lg shadow-md"
        style={{ display: detailViewVisible ? "flex" : "none" }}
      >
        <X
          className="group absolute top-3 left-3 group-hover:scale-105"
          onClick={() => {
            setCurrentProduct(null);
            setDetailViewVisible(false);
          }}
        ></X>
        <div className="flex flex-col gap-6 w-full">
          <img
            src="https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80"
            alt="asd"
            className="w-full h-80 object-cover rounded-md mt-3"
          />
          <p className="text-3xl">
            {currentProduct != null && currentProduct.title}
          </p>
          <div className="flex flex-row justify-between items-center">
            <p className="font-bold text-indigo-600 text-3xl">
              ${currentProduct != null && currentProduct.price}
            </p>
            <button className="w-1/2 h-10 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
              Add to cart
            </button>
          </div>
          <p className="text-2xl">
            {currentProduct != null && currentProduct.description}
          </p>
        </div>
      </div>
    </div>
  );
}
