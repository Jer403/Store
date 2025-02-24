import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { Product } from "../types";
import { useAuth } from "../hooks/useAuth";
import { IMG_API_URL, LANGUAGE } from "../consts";
import { CircleDashed, Download, LogIn, ShoppingCart } from "lucide-react";
import { usePreferences } from "../hooks/usePreferences";

export function ProductCard({
  product,
  selectedProduct,
  onClick,
  handleProductAction,
  checkProductInCart,
  checkProductInPurchased,
}: {
  product: Product;
  selectedProduct: Product | null;
  onClick: () => void;
  setCurrentImage: (string: string) => void;
  handleProductAction: (
    id: string,
    isInCart: boolean,
    isInPurchased: boolean,
    setLoadingSubmit: (b: boolean) => void
  ) => void;
  checkProductInCart: (product: Product) => boolean;
  checkProductInPurchased: (product: Product) => boolean;
}) {
  const { state: cart } = useCart();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isInPurchased, setIsInPurchased] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const { logged } = useAuth();
  const { preferences } = usePreferences();

  useEffect(() => {
    setIsInCart(checkProductInCart(product));
    setIsInPurchased(checkProductInPurchased(product));
  }, [cart, checkProductInCart, checkProductInPurchased, product]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = `${IMG_API_URL}${product.image}`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [product.image]);

  useEffect(() => {
    if (isInCart) {
      if (loadingSubmit) {
        setLoadingSubmit(false);
      }
    }
  }, [isInCart, loadingSubmit]);

  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between group bg-white hover:scale-105 dark:bg-gray-900 dark:shadow-gray-800 rounded-lg shadow-md hover:shadow-lg transition-[box-shadow,transform] duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div className="aspect-[1/1] bg-gray-100">
        <img
          src={`${IMG_API_URL}${product.image}`}
          alt={product.title}
          className="w-full h-full object-contain transform group- transition-transform duration-200 aspect-auto"
        />
      </div>
      <div className="p-4 h-full flex flex-col justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>
        {/* <p className="mt-1 text-sm text-gray-500">AAAAAAAAAAAA</p> */}
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-indigo-600">${product.price}</span>

          <button
            className={`${
              selectedProduct ? "w-1/4 min-w-12" : "w-auto px-1 min-w-36"
            } h-10 rounded-lg text-white ${
              logged
                ? isInPurchased
                  ? "bg-green-500 hover:bg-green-500"
                  : isInCart
                  ? "bg-blue-500 hover:bg-blue-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } items-center justify-center flex gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              handleProductAction(
                product.id,
                isInCart,
                isInPurchased,
                setLoadingSubmit
              );
            }}
            disabled={loadingSubmit}
          >
            {selectedProduct ? (
              logged ? (
                isInPurchased ? (
                  <>
                    <Download className="h-5 w-5" />
                  </>
                ) : loadingSubmit ? (
                  <>
                    <CircleDashed className="h-5 w-5 loader" />
                  </>
                ) : isInCart ? (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                  </>
                )
              ) : (
                <LogIn className="h-5 w-5" />
              )
            ) : logged ? (
              isInPurchased ? (
                <>
                  <Download className="h-5 w-5" />

                  {LANGUAGE.PRODUCT_BUTTON.DOWNLOAD[preferences.language]}
                </>
              ) : loadingSubmit ? (
                <>
                  <CircleDashed className="h-5 w-5 loader" />
                </>
              ) : isInCart ? (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  {LANGUAGE.PRODUCT_BUTTON.GO_TO_CART[preferences.language]}
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  {LANGUAGE.PRODUCT_BUTTON.ADD[preferences.language]}
                </>
              )
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                {LANGUAGE.PRODUCT_BUTTON.ADD[preferences.language]}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
