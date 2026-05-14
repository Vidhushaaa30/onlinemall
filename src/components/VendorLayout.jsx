import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Store, Package, ShoppingCart, LogOut, Bell, ChevronDown, Star } from 'lucide-react';

export default function VendorLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/vendor/products', icon: <Package size={20} />, label: 'My Products' },
    { path: '/vendor/orders', icon: <ShoppingCart size={20} />, label: 'Orders Received' },
    { path: '/vendor/reviews', icon: <Star size={20} />, label: 'Reviews' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="glass-panel" style={{ 
        width: 'var(--sidebar-width)', margin: '16px 0 16px 16px',
        display: 'flex', flexDirection: 'column', position: 'fixed', height: 'calc(100vh - 32px)', zIndex: 100
      }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--accent-purple), #9333ea)', borderRadius: '10px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Store size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Vendor Portal</span>
        </div>

        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map(item => {
            const active = location.pathname.includes(item.path);
            return (
              <div key={item.path} onClick={() => navigate(item.path)} style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer',
                background: active ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                color: active ? 'var(--accent-purple)' : 'var(--text-secondary)',
                fontWeight: active ? 600 : 500, transition: 'all 0.2s'
              }}>
                {item.icon}
                <span>{item.label}</span>
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
            <button className="icon-btn"><Bell size={20} /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Tech Haven Shop</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vendor Account</div>
              </div>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vendor" alt="Vendor" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
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
