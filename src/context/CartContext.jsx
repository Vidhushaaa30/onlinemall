import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    { id: '#ORD-8502', date: 'Oct 20, 2026', status: 'Shipped', total: 4500, items: [{ name: 'Leather Jacket', qty: 1 }] },
    { id: '#ORD-7011', date: 'Oct 10, 2026', status: 'Delivered', total: 2000, items: [{ name: 'USB-C Hub', qty: 1 }] }
  ]);
  const [user, setUser] = useState({
    name: 'Janani',
    email: 'janani@example.com',
    address: '123 Shopping Blvd, Apt 4B',
    city: 'Mumbai',
    zip: '400001'
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.qty, 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) return null;
    
    const newOrder = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      total: getCartTotal() + 500, // Include shipping
      items: [...cart] // copy cart items
    };
    
    setOrders([newOrder, ...orders]);
    setCart([]);
    return newOrder;
  };

  const updateUser = (newDetails) => {
    setUser({ ...user, ...newDetails });
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartCount,
      orders, placeOrder,
      user, updateUser
    }}>
      {children}
    </CartContext.Provider>
  );
};
