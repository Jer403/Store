import axios from "./axios.ts";

export const getProductsRequest = async () => {
  return await axios.get(`/product`);
};

export const getProductRequest = async (id: string) => {
  return await axios.get(`/product/${id}`);
};
