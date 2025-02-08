import { useCallback, useState } from "react";
import { CircleDashed } from "lucide-react";
import type { Product } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useProduct } from "../hooks/useProduct";
import { IMG_API_URL, LANGUAGE } from "../consts";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { ProductDetails } from "../components/ProductDetail";

export function StoreTest() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const { products, loadingProducts } = useProduct();
  const { addToCart } = useCart();
  const { logged, user } = useAuth();
  const { state: cart, purchased } = useCart();
  const navigate = useNavigate();

  const handleProductAction = (
    id: string,
    isInCart: boolean,
    isInPurchased: boolean,
    setLoadingSubmit: (b: boolean) => void
  ) => {
    if (!logged) {
      navigate(`/login`);
      return;
    }
    if (isInPurchased) {
      navigate("/dashboard");
      window.scrollTo({ top: 0 });
      return;
    }
    if (isInCart) {
      navigate("/cart");
      window.scrollTo({ top: 0 });
      return;
    }
    addToCart(id);
    setLoadingSubmit(true);
  };

  const checkProductInCart = useCallback(
    (product: Product) => {
      return cart.some((item) => item.id == product.id);
    },
    [cart]
  );
  const checkProductInPurchased = useCallback(
    (product: Product) => {
      return purchased.some((item) => item.id == product.id);
    },
    [purchased]
  );
  //  bg-gray-50 dark:bg-gray-950 bg-radial
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 relative">
      <div className="max-w-[115rem] mx-auto px-4 lg:px-3 2xl:px-2">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 dark:text-gray-50">
          {user
            ? LANGUAGE.STORE.TITLE[user.preferences.language]
            : LANGUAGE.STORE.TITLE.en}
        </h1>

        <div className="flex">
          <div
            className={`flex-1 transition-all duration-300 
               ${
                 selectedProduct
                   ? "lg:pr-[500px] xl:pr-[650px] 2xl:pr-[800px]"
                   : ""
               } 
              `}
          >
            {loadingProducts ? (
              <div className=" mt-12 flex items-center justify-center gap-2">
                <CircleDashed className="loader h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12"></CircleDashed>
                <span className="text-2xl sm:text-4xl lg:text-4xl">
                  {user
                    ? LANGUAGE.STORE.LOADING[user.preferences.language]
                    : LANGUAGE.STORE.LOADING.en}
                </span>
              </div>
            ) : products != null ? (
              products.length > 0 ? (
                <div
                  className={`relative grid grid-cols-1 md:grid-cols-2 ${
                    selectedProduct
                      ? "lg:grid-cols-2 xl:grid-cols-3"
                      : "lg:grid-cols-3 xl:grid-cols-4"
                  } gap-6`}
                >
                  {products.map((product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selectedProduct={selectedProduct}
                        setCurrentImage={setCurrentImage}
                        handleProductAction={handleProductAction}
                        checkProductInCart={checkProductInCart}
                        checkProductInPurchased={checkProductInPurchased}
                        onClick={() => {
                          setSelectedProduct(product);
                          setCurrentImage(`${IMG_API_URL}${product.image}`);
                        }}
                      />
                    );
                  })}
                </div>
              ) : (
                <p className="text-2xl sm:text-3xl md:text-4xl mt-12 flex items-center justify-center">
                  {user
                    ? LANGUAGE.STORE.NO_PRODUCTS[user.preferences.language]
                    : LANGUAGE.STORE.NO_PRODUCTS.en}
                </p>
              )
            ) : (
              <p className="text-2xl sm:text-3xl md:text-4xl mt-12 flex items-center justify-center">
                {user
                  ? LANGUAGE.STORE.WRONG[user.preferences.language]
                  : LANGUAGE.STORE.WRONG.en}
                <a className="ml-4 underline " href="/">
                  {user
                    ? LANGUAGE.STORE.RELOAD[user.preferences.language]
                    : LANGUAGE.STORE.RELOAD.en}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0  right-0 z-50 transition-transform duration-300 ease-out lg:fixed ${
          selectedProduct ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        {selectedProduct && (
          <ProductDetails
            handleProductAction={handleProductAction}
            product={selectedProduct}
            setCurrentImage={setCurrentImage}
            currentImage={currentImage}
            onClose={() => setSelectedProduct(null)}
            isOpen={!!selectedProduct}
            checkProductInCart={checkProductInCart}
            checkProductInPurchased={checkProductInPurchased}
          />
        )}
      </div>
    </div>
  );
}
