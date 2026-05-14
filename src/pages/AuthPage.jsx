import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Store,
  ShoppingBag,
  ShoppingBasket,
  ArrowRight
} from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // 'vendor' or 'buyer'
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'vendor') navigate('/vendor');
    if (role === 'buyer') navigate('/buyer');
  };

  return (
    <div style={{ 
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel" style={{ 
        width: '100%', maxWidth: '1000px', display: 'flex', overflow: 'hidden',
        minHeight: '600px', borderRadius: '24px'
      }}>
        {/* Left Side - Branding */}
        <div style={{ 
          flex: 1, padding: '48px', 
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
          color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
              <div className="brand-logo">
                    <ShoppingBag size={24} strokeWidth={2.2} />
              </div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>NexusMall</h1>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2, marginBottom: '20px' }}>
              Your ultimate<br />shopping destination.
            </h2>
            <p style={{ opacity: 0.8, fontSize: '1.1rem', lineHeight: 1.6 }}>
              Whether you're looking to scale your business or find the best products globally, we've got you covered.
            </p>
          </div>
        </div>

        {/* Right Side - Forms */}
        <div style={{ flex: 1, padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {!role ? (
            <div style={{ animation: 'fadeIn 0.3s ease-in' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Welcome!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Please select how you want to use NexusMall.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button 
                  onClick={() => setRole('buyer')}
                  className="hover-scale"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '20px', padding: '24px',
                    background: '#fff', border: '1px solid var(--panel-border)', borderRadius: '16px',
                    cursor: 'pointer', textAlign: 'left', width: '100%'
                  }}
                >
                  <div className="buyer-icon">
                    <ShoppingBasket size={28} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>I'm a Buyer</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Browse shops, buy products, and track orders.</p>
                  </div>
                </button>

                <button 
                  onClick={() => setRole('vendor')}
                  className="hover-scale"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '20px', padding: '24px',
                    background: '#fff', border: '1px solid var(--panel-border)', borderRadius: '16px',
                    cursor: 'pointer', textAlign: 'left', width: '100%'
                  }}
                >
                  <div className="vendor-icon">
                    <Store size={28} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>I'm a Vendor</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Set up your shop, add products, and manage orders.</p>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.3s ease-in', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
              <button 
                onClick={() => setRole(null)} 
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginBottom: '24px', fontSize: '0.9rem' }}
              >
                &larr; Back to Role Selection
              </button>

              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>
                {isLogin ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                {role === 'vendor' ? 'Access your vendor dashboard.' : 'Start shopping your favorite stores.'}
              </p>

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" className="input-field" placeholder="John Doe" required />
                  </div>
                )}
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="input-field" placeholder="john@example.com" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="input-field" placeholder="••••••••" required />
                </div>
                
                <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '16px', padding: '14px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={20} />
                </button>
              </form>

              <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span 
                  onClick={() => setIsLogin(!isLogin)} 
                  style={{ color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer' }}
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
