import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function BuyerCart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  const subtotal = getCartTotal();
  const shipping = cart.length > 0 ? 500 : 0; // ₹500 flat shipping or 0
  const total = subtotal + shipping;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Your Cart</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Review your items before proceeding to checkout.</p>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div className="glass-panel" style={{ flex: '2 1 500px', padding: '24px' }}>
          {cart.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Your cart is empty.
              <br/><br/>
              <button className="primary-btn" onClick={() => navigate('/buyer/home')}>Browse Products</button>
            </div>
          ) : (
            cart.map((item, index) => (
              <React.Fragment key={item.id}>
                <CartItem 
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onUpdateQty={(delta) => updateQuantity(item.id, delta)}
                />
                {index < cart.length - 1 && <div style={{ height: '1px', background: 'var(--panel-border)', margin: '24px 0' }}></div>}
              </React.Fragment>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="glass-panel" style={{ flex: '1 1 300px', padding: '32px' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: 'var(--text-secondary)' }}>
              <span>Subtotal ({getCartCount()} items)</span>
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
              style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}
              onClick={() => navigate('/buyer/checkout')}
            >
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function CartItem({ item, onRemove, onUpdateQty }) {
  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <div style={{ width: '100px', height: '100px', borderRadius: '12px', background: `url(${item.image}) center/cover` }}></div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{item.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>Sold by: {item.shop}</p>
        <span style={{ fontWeight: 600, color: 'var(--accent-primary)' }}>₹{item.price.toLocaleString('en-IN')}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: '8px' }}>
          <button onClick={() => onUpdateQty(-1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
          <span style={{ fontWeight: 500 }}>{item.qty}</span>
          <button onClick={() => onUpdateQty(1)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
        </div>
        <button className="icon-btn" style={{ color: 'var(--danger)' }} onClick={onRemove}><Trash2 size={20} /></button>
      </div>
    </div>
  )
}
