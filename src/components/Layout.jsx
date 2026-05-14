import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className="glass-panel" style={{ 
        width: 'var(--sidebar-width)', 
        margin: '16px 0 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: 'calc(100vh - 32px)',
        zIndex: 100
      }}>
        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: '36px', height: '36px', 
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px var(--accent-glow)'
          }}>
            <ShoppingBag size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.03em' }}>NexusMall</span>
        </div>

        <nav style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<ShoppingBag size={20} />} label="Products" />
          <NavItem icon={<ShoppingCart size={20} />} label="Orders" badge="12" />
          <NavItem icon={<Users size={20} />} label="Customers" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" />
        </nav>

        <div style={{ padding: '16px' }}>
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ 
        marginLeft: 'calc(var(--sidebar-width) + 16px)', 
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <header className="glass-header" style={{
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--panel-border)',
              padding: '8px 16px',
              borderRadius: '20px',
              width: '300px',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--accent-glow)';
            }}
            onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--panel-border)';
                e.currentTarget.style.boxShadow = 'none';
            }}
            tabIndex={-1}
            >
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: 'var(--text-primary)', width: '100%', fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button className="icon-btn" style={{ position: 'relative' }}>
              <Bell size={20} />
              <span style={{
                position: 'absolute', top: '8px', right: '10px',
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--danger)', border: '2px solid var(--panel-bg)'
              }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent" 
                alt="User" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid var(--panel-border)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Alex Vendor</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Admin</span>
              </div>
              <ChevronDown size={16} color="var(--text-muted)" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: '32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, badge }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 16px',
      borderRadius: '12px',
      cursor: 'pointer',
      background: active ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.1), transparent)' : 'transparent',
      color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
      borderLeft: active ? '3px solid var(--accent-primary)' : '3px solid transparent',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.color = 'var(--text-primary)';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon}
        <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{label}</span>
      </div>
      {badge && (
        <span style={{
          background: 'var(--accent-primary)', color: 'white',
          fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '10px'
        }}>{badge}</span>
      )}
    </div>
  )
}
