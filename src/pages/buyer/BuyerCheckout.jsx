import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Wallet, Banknote, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function BuyerCheckout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, getCartCount, placeOrder, user } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(null);

  const subtotal = getCartTotal();
  const shipping = cart.length > 0 ? 500 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    const order = placeOrder();
    if (order) {
      setOrderPlaced(order);
    }
  };

  if (orderPlaced) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <CheckCircle size={64} color="var(--success)" style={{ marginBottom: '24px' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Order Placed Successfully!</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px' }}>Thank you for shopping at NexusMall. Your order {orderPlaced.id} is being processed.</p>
        <button className="primary-btn" onClick={() => navigate('/buyer/orders')}>Track Order</button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <h2>Your cart is empty.</h2>
        <button className="primary-btn" style={{ marginTop: '16px' }} onClick={() => navigate('/buyer/home')}>Back to Shop</button>
      </div>
    )
  }

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Checkout</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Complete your purchase securely.</p>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Shipping Address */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Shipping Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Full Name</label>
                <input type="text" className="input-field" defaultValue={user.name} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <label>Address</label>
                <input type="text" className="input-field" defaultValue={user.address} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" className="input-field" defaultValue={user.city} />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" className="input-field" defaultValue={user.zip} />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Payment Method</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div 
                onClick={() => setPaymentMethod('card')}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: `2px solid ${paymentMethod === 'card' ? 'var(--accent-primary)' : 'var(--panel-border)'}`, borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'card' ? 'rgba(37,99,235,0.05)' : 'transparent' }}
              >
                <CreditCard size={24} color={paymentMethod === 'card' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                <span style={{ fontWeight: 500 }}>Credit/Debit Card</span>
              </div>

              <div 
                onClick={() => setPaymentMethod('paypal')}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: `2px solid ${paymentMethod === 'paypal' ? 'var(--accent-primary)' : 'var(--panel-border)'}`, borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'paypal' ? 'rgba(37,99,235,0.05)' : 'transparent' }}
              >
                <Wallet size={24} color={paymentMethod === 'paypal' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                <span style={{ fontWeight: 500 }}>UPI / Mobile Wallet</span>
              </div>

              <div 
                onClick={() => setPaymentMethod('cod')}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: `2px solid ${paymentMethod === 'cod' ? 'var(--accent-primary)' : 'var(--panel-border)'}`, borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'cod' ? 'rgba(37,99,235,0.05)' : 'transparent' }}
              >
                <Banknote size={24} color={paymentMethod === 'cod' ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                <span style={{ fontWeight: 500 }}>Cash on Delivery</span>
              </div>

            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="glass-panel" style={{ flex: '1 1 300px', padding: '32px', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Order Summary</h2>
          
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '16px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                 <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                 <div>
                   <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</div>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Qty: {item.qty}</div>
                 </div>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: 'var(--panel-border)', margin: '16px 0' }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
            <span>Shipping</span>
            <span>₹{shipping.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ height: '1px', background: 'var(--panel-border)', margin: '16px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', fontSize: '1.2rem', fontWeight: 700 }}>
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button 
            className="primary-btn" 
            style={{ width: '100%', padding: '14px', background: 'var(--success)' }}
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}
