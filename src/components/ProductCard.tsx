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
  const { state: cart, rate } = useCart();
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
    if (isInCart) {
      if (loadingSubmit) {
        setLoadingSubmit(false);
      }
    }
  }, [isInCart, loadingSubmit]);

  return (
    <div
      onClick={onClick}
      className="relative flex flex-col justify-between group bg-white hover:scale-105 rounded-lg shadow-md hover:shadow-lg transition-[box-shadow,transform] duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div className="aspect-[1/1] bg-gray-100 rounded-t-lg">
        <img
          src={`${IMG_API_URL}${product.image}.webp`}
          alt={product.title}
          className="w-full h-full object-contain transform group-  rounded-t-lg transition-transform duration-200 aspect-auto"
        />
      </div>
      <div className="p-4 h-full flex flex-col justify-between">
        <h3 className="font-semibold text-gray-900 text-lg dark:text-white group-hover:text-[--secondary] transition-colors">
          {product.title}
        </h3>
        {/* <p className="mt-1 text-sm text-gray-500">AAAAAAAAAAAA</p> */}
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-[--secondary] flex justify-start items-center gap-1">
            <span className="text-2xl">
              {LANGUAGE.CURRENCIES[preferences.currency]}
              {preferences.currency == "USD"
                ? rate == 1
                  ? product.price
                  : Math.floor((product.price / rate) * 100) / 100
                : product.price}
            </span>
          </span>

          <button
            className={`${
              selectedProduct ? "w-1/4 min-w-12" : "w-auto px-1 min-w-36"
            } h-10 rounded-lg transition-colors ${
              logged
                ? isInPurchased
                  ? "bg-green-500 hover:bg-green-500"
                  : isInCart
                  ? "bg-[--secondary_comp] text-gray-800"
                  : "bg-[--secondary] hover:bg-[--secondary_comp]"
                : "bg-[--secondary] hover:bg-[--secondary_comp]"
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
