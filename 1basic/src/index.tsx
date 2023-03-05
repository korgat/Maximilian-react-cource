import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import CartProvider from './store/CartProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <CartProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    ,
  </CartProvider>,
);
