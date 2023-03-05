import { useReducer } from 'react';
import { TAction, TCartState, TItem } from '../@types/types';
import { CartContext } from './CartContext';

const initialCartState: TCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state: TCartState, action: TAction) => {
  switch (action.type) {
    case 'ADD':
      const total = (state.totalPrice + action.payload.price * action.payload.amount).toFixed(2);
      const existingItem = state.items.find((obj) => obj.id === action.payload.id);

      let newItems = [...state.items];

      if (existingItem) {
        existingItem.price = parseFloat((action.payload.price * action.payload.amount).toFixed(2));
        existingItem.amount = existingItem.amount + action.payload.amount;
      } else {
        const newItem = {
          title: action.payload.title,
          price: action.payload.price,
          id: action.payload.id,
          amount: 1,
        };
        console.log(newItems, 'reducer');
        newItems = [...newItems, newItem];
      }

      return {
        items: newItems,
        totalPrice: parseFloat(total),
      };

    case 'REMOVE':
      const cartItem = state.items.find((obj) => obj.id === action.payload);
      debugger;
      if (cartItem && cartItem.amount > 1) {
        cartItem.amount--;
        return {
          ...state,
          items: [...state.items],
          totalPrice: parseFloat((state.totalPrice - cartItem.price).toFixed(2)),
        };
      }

      if (cartItem) {
        return {
          ...state,
          items: state.items.filter((obj) => obj.id !== action.payload),
          totalPrice: state.totalPrice - parseFloat((cartItem.amount * cartItem.price).toFixed(2)),
        };
      }
      return state;
    default:
      return state;
  }
};

type TProps = {
  children: React.ReactNode;
};

const CartProvider: React.FC<TProps> = ({ children }) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, initialCartState);

  const addToCartHandler = (value: TItem) => {
    dispatchCartState({ type: 'ADD', payload: value });
  };

  const removeFromHandler = (id: number) => {
    dispatchCartState({ type: 'REMOVE', payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    asd: 3,
    addToCart: addToCartHandler,
    removeFromCart: removeFromHandler,
  };

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
};

export default CartProvider;
