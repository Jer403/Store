/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  CART_ACTIONS,
  cartInitialState,
  cartReducer,
} from "../reducers/cart.reducer.ts";
import {
  addProductToCartRequest,
  getCartRequest,
  removeProductFromCartRequest,
} from "../Api/cart.ts";
import { CartProduct, PurchasedProduct } from "../types/index.ts";
import { getPurchasedRequest } from "../Api/payment.ts";

export const CartContext = createContext({
  state: [] as CartProduct[],
  addToCart: (id: string) => {},
  removeFromCart: (id: string) => {},
  clearCart: () => {},
  clearPurchased: () => {},
  clearCartFromClient: () => {},
  loadCart: () => {},
  loadPurchased: () => {},
  loadingCart: false,
  loadingPurchased: true,
  purchased: [] as PurchasedProduct[],
});

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingPurchased, setLoadingPurchased] = useState(true);
  const [purchased, setPurchased] = useState([] as PurchasedProduct[]);

  const loadCart = async () => {
    if (loadingCart) return;
    setLoadingCart(true);
    try {
      console.log("Starting cart request");
      const res = await getCartRequest();
      console.log("Response from cart: ", res);
      if (res.status === 200) {
        dispatch({
          type: CART_ACTIONS.SET_CART,
          payload: res.data,
        });
      } else {
        console.error("Error loading cart");
      }
    } catch (error) {
      console.error("Error fetching cart data", error);
    } finally {
      setLoadingCart(false);
    }
  };

  const loadPurchased = async () => {
    setLoadingPurchased(true);
    try {
      const res = await getPurchasedRequest();
      if (res.status === 200) {
        setPurchased(res.data);
      } else {
        console.error("Error loading purchased");
      }
    } catch (error) {
      console.error("Error fetching purchased data", error);
    } finally {
      setLoadingPurchased(false);
    }
  };

  useEffect(() => {
    loadCart();
    loadPurchased();
  }, []);

  const addToCart = async (id: string) => {
    const res = await addProductToCartRequest(id);

    if (res.status === 200) {
      dispatch({
        type: CART_ACTIONS.SET_CART,
        payload: res.data,
      });
    } else {
      console.error("Error adding product to cart");
    }
  };

  const removeFromCart = async (id: string) => {
    const res = await removeProductFromCartRequest(id);

    if (res.status === 200) {
      dispatch({
        type: CART_ACTIONS.SET_CART,
        payload: res.data,
      });
    } else {
      console.error("Error removing product from cart");
    }
  };

  const clearCart = async () => {
    dispatch({
      type: CART_ACTIONS.CLEAR_CART,
      payload: [],
    });
  };

  const clearPurchased = async () => {
    setPurchased([] as PurchasedProduct[]);
  };

  const clearCartFromClient = async () => {
    dispatch({
      type: CART_ACTIONS.CLEAR_CART,
      payload: [],
    });
  };

  return {
    state,
    addToCart,
    removeFromCart,
    loadingCart,
    clearCart,
    clearCartFromClient,
    loadCart,
    loadingPurchased,
    purchased,
    loadPurchased,
    clearPurchased,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const {
    state,
    addToCart,
    removeFromCart,
    loadingCart,
    clearCart,
    clearCartFromClient,
    loadCart,
    loadingPurchased,
    purchased,
    loadPurchased,
    clearPurchased,
  } = useCartReducer();

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        loadingCart,
        clearCart,
        clearCartFromClient,
        loadCart,
        loadingPurchased,
        purchased,
        loadPurchased,
        clearPurchased,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
