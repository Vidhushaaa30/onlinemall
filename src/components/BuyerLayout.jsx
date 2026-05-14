import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Store, ShoppingBag, ShoppingCart, LogOut, Bell, ChevronDown, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function BuyerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount, user } = useCart();
  const cartCount = getCartCount();

  const navItems = [
    { path: '/buyer/home', icon: <Store size={20} />, label: 'Marketplace' },
    { path: '/buyer/cart', icon: <ShoppingCart size={20} />, label: 'My Cart', badge: cartCount > 0 ? cartCount.toString() : null },
    { path: '/buyer/orders', icon: <ShoppingBag size={20} />, label: 'My Orders' },
    { path: '/buyer/settings', icon: <User size={20} />, label: 'Settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="glass-panel" style={{ 
        width: 'var(--sidebar-width)', margin: '16px 0 16px 16px',
        display: 'flex', flexDirection: 'column', position: 'fixed', height: 'calc(100vh - 32px)', zIndex: 100
      }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--accent-primary), #3b82f6)', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Buyer Portal</span>
        </div>

        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map(item => {
            const active = location.pathname.includes(item.path);
            return (
              <div key={item.path} onClick={() => navigate(item.path)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                background: active ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: active ? 600 : 500, transition: 'all 0.2s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{ background: 'var(--accent-primary)', color: 'white', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                    {item.badge}
                  </span>
                )}
              </div>
            )
          })}
        </nav>

        <div style={{ padding: '16px' }}>
          <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', color: 'var(--danger)', cursor: 'pointer', borderRadius: '12px' }} className="hover-scale">
            <LogOut size={20} />
            <span style={{ fontWeight: 500 }}>Sign Out</span>
          </div>
        </div>
      </aside>

      <div style={{ marginLeft: 'calc(var(--sidebar-width) + 16px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header className="glass-header" style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 32px', position: 'sticky', top: 0, zIndex: 90 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button className="icon-btn" onClick={() => navigate('/buyer/cart')} style={{ position: 'relative' }}>
              <ShoppingCart size={20} />
              {cartCount > 0 && <span style={{ position: 'absolute', top: '5px', right: '5px', background: 'var(--accent-primary)', color: 'white', fontSize: '0.6rem', width: '14px', height: '14px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Premium Member</div>
              </div>
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Buyer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
              <ChevronDown size={16} color="var(--text-muted)" />
            </div>
          </div>
        </header>

        <main style={{ padding: '32px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
