import { createContext, useEffect, useState } from "react";
import { getProductsRequest } from "../Api/products";
import { Product } from "../types";

interface ProductContextType {
  products: Product[] | null;
}

interface ProductProviderProps {
  children: import("react").ReactElement;
}

export const ProductContext = createContext<ProductContextType>({
  products: null,
});

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      if (res.status == 200) {
        setProducts(res.data);
      } else {
        setProducts(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
