
export enum Page {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
  DETAIL = 'DETAIL',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  ACCOUNT = 'ACCOUNT',
  CONTACT = 'CONTACT',
  ADD_PRODUCT = 'ADD_PRODUCT',
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'Stickers' | 'T-Shirts' | 'Hoodies' | 'Signs';
  imageUrl: string;
  variants: {
    type: 'Size' | 'Color' | 'Material';
    options: string[];
  }[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant: { [key: string]: string };
}