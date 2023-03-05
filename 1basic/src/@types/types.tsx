export type TAction = {
  type: 'ADD' | 'REMOVE';
  payload: any;
};

export type TItem = {
  title: string;
  price: number;
  id: number;
  amount: number;
};

export type TCartState = {
  items: Array<TItem>;
  totalPrice: number;
};
