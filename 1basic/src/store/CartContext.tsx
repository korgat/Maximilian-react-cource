import { createContext, useContext } from 'react';
import { TItem } from '../@types/types';

export const CartContext = createContext({
  items: [] as TItem[],
  totalPrice: 0,
  addToCart: (item: TItem) => {},
  removeFromCart: (id: number) => {},
});

export const useCart = () => {
  return useContext(CartContext);
};
