import { useCallback, useEffect, useState } from "react";
import {
  X,
  ShoppingCart,
  LogIn,
  Download,
  Clock,
  CircleDashed,
} from "lucide-react";
import type { Product } from "../types";
import { useAuth } from "../hooks/useAuth";
import { useProduct } from "../hooks/useProduct";
import { IMG_API_URL } from "../consts";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";

// {
//   id: "1",
//   title: "Adventure Game Pro",
//   description:
//     "An exciting adventure game with stunning graphics and immersive gameplay. Features include:\n\n- Open world exploration\n- Rich character customization\n- Multiplayer support\n- Regular content updates",
//   price: 29.99,
//   image:
//     "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80",
//   gallery: [
//     "https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80",
//     "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&w=800&q=80",
//     "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
//   ],
//   specs: {
//     platform: "Windows, Mac, Linux",
//     releaseDate: "2024-03-15",
//     developer: "GameStudio Pro",
//     publisher: "Digital Publishing Co.",
//     languages: ["English", "Spanish", "French", "German"],
//     size: "25 GB",
//   },
// },

const specs = {
  platform: "Windows, Mac, Linux",
  releaseDate: "2024-03-15",
  developer: "GameStudio Pro",
  publisher: "Digital Publishing Co.",
  languages: ["English", "Spanish", "French", "German"],
  size: "25 GB",
};

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  handleProductAction: (
    id: string,
    isInCart: boolean,
    isInWaiting: boolean,
    isInPurchased: boolean
  ) => void;
  isOpen: boolean;
  setCurrentImage: (string: string) => void;
  currentImage: string | null;
  checkProductInCart: (product: Product) => boolean;
  checkProductInWaiting: (product: Product) => boolean;
  checkProductInPurchased: (product: Product) => boolean;
}

function ProductDetails({
  product,
  onClose,
  isOpen,
  handleProductAction,
  setCurrentImage,
  currentImage,
  checkProductInCart,
  checkProductInWaiting,
  checkProductInPurchased,
}: ProductDetailsProps) {
  const { logged } = useAuth();
  const { state: cart } = useCart();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isInWaiting, setIsInWaiting] = useState<boolean>(false);
  const [isInPurchased, setIsInPurchased] = useState<boolean>(false);

  useEffect(() => {
    setIsInCart(checkProductInCart(product));
    setIsInWaiting(checkProductInWaiting(product));
    setIsInPurchased(checkProductInPurchased(product));
  }, [
    cart,
    checkProductInCart,
    checkProductInPurchased,
    checkProductInWaiting,
    product,
  ]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    if (currentImage != e.currentTarget.src) {
      setCurrentImage(e.currentTarget.src);
    }
  };

  return (
    <div
      className={`relative overflow-y-auto w-full lg:w-[500px] xl:w-[650px] 2xl:w-[800px] max-h-screen bg-white shadow-xl transition-transform duration-300 ease-out right-0 top-0 lg:left-[calc(100%-500px)] xl:left-[calc(100%-650px)] 2xl:left-[calc(100%-800px)] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute right-0 top-0 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="h-full overflow-y-auto">
        <div className="p-6">
          <div className="relative aspect-video mt-3 bg-gray-100 rounded-lg overflow-hidden group">
            <img
              src={product.gallery ? `${currentImage}` : ""}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-full flex flex-row flex-wrap max-w-3xl gap-2 mt-2 mb-6">
            <img
              key={"main-image"}
              src={`${IMG_API_URL}${product.image}`}
              alt={`Preview main-image`}
              onMouseEnter={handleMouseEnter}
              className="w-14 h-14 object-cover rounded-md border-2 border-gray-300"
            />
            {product.gallery ? (
              product.gallery.map((image, index) => (
                <img
                  key={index}
                  src={`${IMG_API_URL}${image}`}
                  alt={`Preview ${index + 1}`}
                  onMouseEnter={handleMouseEnter}
                  className="w-14 h-14 object-cover rounded-md border-2 border-gray-300"
                />
              ))
            ) : (
              <></>
            )}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {product.title}
          </h2>
          <div className="flex items-center justify-between mb-6">
            <span className="text-3xl font-bold text-indigo-600">
              ${product.price}
            </span>
            <button
              className={`flex items-center gap-2 px-6 py-3 ${
                logged
                  ? isInPurchased
                    ? "bg-green-500 hover:bg-green-500"
                    : isInWaiting
                    ? "bg-blue-500 hover:bg-blue-500"
                    : isInCart
                    ? "bg-green-600 hover:bg-green-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white rounded-lg  transition-colors`}
              onClick={() =>
                handleProductAction(
                  product.id,
                  isInCart,
                  isInWaiting,
                  isInPurchased
                )
              }
            >
              {logged ? (
                isInPurchased ? (
                  <>
                    <Download className="h-5 w-5" /> Download
                  </>
                ) : isInWaiting ? (
                  <>
                    <Clock className="h-5 w-5" /> Waiting to pay
                  </>
                ) : isInCart ? (
                  <>
                    <ShoppingCart className="h-5 w-5" /> Go to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" /> Add to Cart
                  </>
                )
              ) : (
                <>
                  <LogIn></LogIn> Login to buy
                </>
              )}
            </button>
          </div>

          <div className="prose max-w-none mb-8">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="whitespace-pre-line">{product.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Specifications</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex flex-col py-2 border-b">
                  <dt className="text-sm text-gray-500 capitalize">{key}</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  selectedProduct,
  onClick,
  handleProductAction,
  checkProductInCart,
  checkProductInWaiting,
  checkProductInPurchased,
}: {
  product: Product;
  selectedProduct: Product | null;
  onClick: () => void;
  setCurrentImage: (string: string) => void;
  handleProductAction: (
    id: string,
    isInCart: boolean,
    isInWaiting: boolean,
    isInPurchased: boolean
  ) => void;
  checkProductInCart: (product: Product) => boolean;
  checkProductInWaiting: (product: Product) => boolean;
  checkProductInPurchased: (product: Product) => boolean;
}) {
  const { state: cart } = useCart();
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isInWaiting, setIsInWaiting] = useState<boolean>(false);
  const [isInPurchased, setIsInPurchased] = useState<boolean>(false);
  const { logged } = useAuth();

  useEffect(() => {
    setIsInCart(checkProductInCart(product));
    setIsInWaiting(checkProductInWaiting(product));
    setIsInPurchased(checkProductInPurchased(product));
  }, [
    cart,
    checkProductInCart,
    checkProductInPurchased,
    checkProductInWaiting,
    product,
  ]);

  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-between group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <div className="aspect-[1/1] bg-gray-100">
        <img
          src={`${IMG_API_URL}${product.image}`}
          alt={product.title}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-200 aspect-auto"
        />
      </div>
      <div className="p-4 h-full flex flex-col justify-between">
        <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>
        {/* <p className="mt-1 text-sm text-gray-500">AAAAAAAAAAAA</p> */}
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-indigo-600">${product.price}</span>

          <button
            className={`${
              selectedProduct ? "w-1/4 min-w-12" : "w-1/3 min-w-36"
            } h-10 rounded-lg text-white ${
              logged
                ? isInPurchased
                  ? "bg-green-500 hover:bg-green-500"
                  : isInWaiting
                  ? "bg-blue-500 hover:bg-blue-500"
                  : isInCart
                  ? "bg-green-600 hover:bg-green-600"
                  : "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } items-center justify-center flex gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              handleProductAction(
                product.id,
                isInCart,
                isInWaiting,
                isInPurchased
              );
            }}
          >
            {selectedProduct ? (
              logged ? (
                isInPurchased ? (
                  <>
                    <Download className="h-5 w-5" />
                  </>
                ) : isInWaiting ? (
                  <>
                    <Clock className="h-5 w-5" />
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
                  Download
                </>
              ) : isInWaiting ? (
                <>
                  <Clock className="h-5 w-5" />
                  Waiting to pay
                </>
              ) : isInCart ? (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Go to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to cart
                </>
              )
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Login to buy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function StoreTest() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const { products, loadingProducts } = useProduct();
  const { addToCart } = useCart();
  const { logged } = useAuth();
  const { state: cart, purchased, waitingForPay } = useCart();
  const navigate = useNavigate();

  const handleProductAction = (
    id: string,
    isInCart: boolean,
    isInWaiting: boolean,
    isInPurchased: boolean
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
    if (isInWaiting) {
      navigate("/dashboard/payments");
      window.scrollTo({ top: 0 });
      return;
    }
    if (isInCart) {
      navigate("/cart");
      window.scrollTo({ top: 0 });
      return;
    }
    addToCart(id);
  };

  const checkProductInCart = useCallback(
    (product: Product) => {
      return cart.some((item) => item.id == product.id);
    },
    [cart]
  );
  const checkProductInWaiting = useCallback(
    (product: Product) => {
      return waitingForPay.some((item) => item.id == product.id);
    },
    [waitingForPay]
  );
  const checkProductInPurchased = useCallback(
    (product: Product) => {
      return purchased.some((item) => item.id == product.id);
    },
    [purchased]
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 relative">
      <div className="max-w-[115rem] mx-auto px-4 lg:px-3 2xl:px-2">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Digital Store</h1>

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
              <>
                <CircleDashed className="loader"></CircleDashed>
              </>
            ) : products != null ? (
              <div
                className={`relative grid grid-cols-1 md:grid-cols-2 ${
                  selectedProduct
                    ? "lg:grid-cols-2 xl:grid-cols-3"
                    : "lg:grid-cols-3 xl:grid-cols-4"
                } gap-6`}
              >
                {products.length > 0 ? (
                  products.map((product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        selectedProduct={selectedProduct}
                        setCurrentImage={setCurrentImage}
                        handleProductAction={handleProductAction}
                        checkProductInCart={checkProductInCart}
                        checkProductInWaiting={checkProductInWaiting}
                        checkProductInPurchased={checkProductInPurchased}
                        onClick={() => {
                          setSelectedProduct(product);
                          setCurrentImage(`${IMG_API_URL}${product.image}`);
                        }}
                      />
                    );
                  })
                ) : (
                  <p className="text-2xl sm:text-3xl md:text-5xl mt-12 flex items-center justify-center">
                    There are no products yet
                  </p>
                )}
              </div>
            ) : (
              <p className="text-2xl sm:text-3xl md:text-5xl mt-12 flex items-center justify-center">
                Something went wrong.
                <a className="ml-4 underline " href="/">
                  Reload
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
            checkProductInWaiting={checkProductInWaiting}
            checkProductInPurchased={checkProductInPurchased}
          />
        )}
      </div>
    </div>
  );
}
