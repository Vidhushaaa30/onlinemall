import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import VendorLayout from './components/VendorLayout';
import VendorProducts from './pages/vendor/VendorProducts';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorReviews from './pages/vendor/VendorReviews';

import BuyerLayout from './components/BuyerLayout';
import BuyerHome from './pages/buyer/BuyerHome';
import BuyerCart from './pages/buyer/BuyerCart';
import BuyerCheckout from './pages/buyer/BuyerCheckout';
import BuyerOrders from './pages/buyer/BuyerOrders';
import BuyerSettings from './pages/buyer/BuyerSettings';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth / Landing */}
          <Route path="/" element={<AuthPage />} />
          
          {/* Vendor Routes */}
          <Route path="/vendor" element={<VendorLayout />}>
            <Route index element={<Navigate to="/vendor/products" replace />} />
            <Route path="products" element={<VendorProducts />} />
            <Route path="orders" element={<VendorOrders />} />
            <Route path="reviews" element={<VendorReviews />} />
          </Route>

          {/* Buyer Routes */}
          <Route path="/buyer" element={<BuyerLayout />}>
            <Route index element={<Navigate to="/buyer/home" replace />} />
            <Route path="home" element={<BuyerHome />} />
            <Route path="cart" element={<BuyerCart />} />
            <Route path="checkout" element={<BuyerCheckout />} />
            <Route path="orders" element={<BuyerOrders />} />
            <Route path="settings" element={<BuyerSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
