export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  gallery?: string[];
}

export interface CartProduct {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface Payment {
  id: string;
  cart: CartProduct[];
  state: number;
  shortURL: string;
  created_at: string;
  price: string;
}

export interface preferences {
  language: string;
  theme: string;
  currency: string;
}

export interface PurchasedProduct {
  id: string;
  title: string;
  image: string;
  purchased_at: string;
}

export interface Comment {
  id: string;
  userId: string;
  productId: string;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
  };
}
