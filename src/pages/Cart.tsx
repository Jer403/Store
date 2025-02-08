import { useCart } from "../hooks/useCart";

import { CircleDashed, CreditCard, Trash2 } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { IMG_API_URL, LANGUAGE } from "../consts";
import { CartProduct, UserInterface } from "../types";
import { useAuth } from "../hooks/useAuth";

export function CartProductItem({
  product,
  user,
  handleRemoveElement,
}: {
  product: CartProduct;
  user: UserInterface | null;
  handleRemoveElement: (id: string) => void;
}) {
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-row p-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-500 rounded-lg">
      <div>
        <img
          src={`${IMG_API_URL}${product.image}`}
          alt={product.title}
          className="h-24 aspect-square object-cover rounded-md border-2 border-gray-400 dark:text-gray-50"
        />
      </div>
      <div className="w-full ml-4 flex flex-row justify-between">
        <p className="w-full text-2xl flex items-start dark:text-gray-50">
          {product.title}
        </p>
        <div className="flex flex-col-reverse justify-between items-end">
          <button
            className="w-20 h-7 px-1 flex flex-row items-center justify-center gap-1 text-sm font-medium rounded-md text-gray-500 dark:text-gray-300 border border-gray-300 dark:hover:bg-gray-700  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            onClick={() => {
              handleRemoveElement(product.id);
              setLoadingSubmit(true);
            }}
          >
            {loadingSubmit ? (
              <CircleDashed className="h-4 w-4 loader dark:text-white" />
            ) : (
              <>
                <Trash2 className="h-4 w-4"></Trash2>
                {user
                  ? LANGUAGE.CART.DELETE[user.preferences.language]
                  : LANGUAGE.CART.DELETE.en}
              </>
            )}
          </button>
          <p className="text-md flex items-center dark:text-gray-50">
            ${product.price}.00
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Cart() {
  const { state: cart, loadCart, removeFromCart, loadingCart } = useCart();
  const { user } = useAuth();
  const itemsCId = useId();
  const titleCId = useId();
  const checkCId = useId();
  const cartCId = useId();
  const anyCId = useId();

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemoveElement = (id: string) => {
    removeFromCart(id);
  };

  return (
    <div className="min-h-screen-minus-64 bg-gray-100 dark:bg-gray-950 py-12">
      <div className="max-w-[1536px] mx-auto px-4">
        <div className="w-full">
          <h1
            key={titleCId}
            className="text-4xl font-bold text-center mb-8 dark:text-white"
          >
            {user
              ? LANGUAGE.CART.TITLE[user.preferences.language]
              : LANGUAGE.CART.TITLE.en}
          </h1>
          <div
            key={cartCId}
            className="flex flex-col-reverse md:flex-row items-center md:items-start gap-2"
          >
            <div
              key={itemsCId}
              className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 flex flex-col gap-2 relative"
            >
              {loadingCart && (
                <CircleDashed className="loader h-6 w-6 absolute top-0 right-0 mr-2 mt-2 dark:text-white"></CircleDashed>
              )}
              {loadingCart && cart.length == 0 ? (
                <p className="text-2xl dark:text-white flex justify-center">
                  {user
                    ? LANGUAGE.CART.LOADING[user.preferences.language]
                    : LANGUAGE.CART.LOADING.en}
                </p>
              ) : cart.length > 0 ? (
                cart.map((product) => {
                  return (
                    <CartProductItem
                      user={user}
                      key={"cr-" + product.id + checkCId}
                      product={product}
                      handleRemoveElement={handleRemoveElement}
                    ></CartProductItem>
                  );
                })
              ) : (
                <>
                  <div
                    key={anyCId}
                    className="flex flex-col items-center justify-center"
                  >
                    <p className="text-xl">
                      {user
                        ? LANGUAGE.CART.ANY_PRODUCT[user.preferences.language]
                        : LANGUAGE.CART.ANY_PRODUCT.en}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div
              key={checkCId}
              className="w-full md:max-w-72 lg:max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 flex flex-col gap-1 max-h-[288px] md:sticky top-10"
            >
              <p className="text-2xl font-bold dark:text-white">
                {user
                  ? LANGUAGE.CART.SUMMARY[user.preferences.language]
                  : LANGUAGE.CART.SUMMARY.en}
              </p>
              <p className="text-xl mb-3 flex justify-between dark:text-gray-200">
                {user
                  ? LANGUAGE.CART.PRODUCT[user.preferences.language]
                  : LANGUAGE.CART.PRODUCT.en}{" "}
                <span>{cart.length}</span>
              </p>
              <p className="text-xl border-t py-2 flex justify-between items-end dark:text-gray-200">
                {user
                  ? LANGUAGE.CART.TOTAL[user.preferences.language]
                  : LANGUAGE.CART.TOTAL.en}{" "}
                <span className="font-bold text-sm">
                  ${cart.reduce((sum = 0, item) => sum + item.price, 0)}.00
                </span>
              </p>

              <Link
                to={"/checkout"}
                className="text-gray-700 hover:text-indigo-600 mt-2"
              >
                <button
                  type="button"
                  disabled={cart.length == 0 || loadingCart}
                  className={`px-4 py-2 w-full flex flex-row ${
                    cart.length == 0 && "cursor-not-allowed bg-indigo-800"
                  } items-center justify-center gap-2 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  <CreditCard></CreditCard>{" "}
                  {user
                    ? LANGUAGE.CART.PAY[user.preferences.language]
                    : LANGUAGE.CART.PAY.en}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// [&>*:nth-child(n+2)]:border-t [&>*:nth-child(n+2)]:border-gray-900
