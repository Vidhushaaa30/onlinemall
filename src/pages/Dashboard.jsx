import React from 'react';
import { TrendingUp, Users, DollarSign, Package, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, Alex. Here's what's happening with your store today.</p>
        </div>
        <button className="primary-btn">
          Generate Report
        </button>
      </div>

      <div className="dashboard-grid">
        <StatCard 
          title="Total Revenue" 
          value="$45,231.89" 
          trend="+20.1%" 
          isPositive={true} 
          icon={<DollarSign size={24} color="var(--accent-primary)" />} 
        />
        <StatCard 
          title="Active Customers" 
          value="2,314" 
          trend="+15.2%" 
          isPositive={true} 
          icon={<Users size={24} color="var(--accent-purple)" />} 
        />
        <StatCard 
          title="Total Orders" 
          value="1,203" 
          trend="-4.3%" 
          isPositive={false} 
          icon={<Package size={24} color="var(--warning)" />} 
        />
        <StatCard 
          title="Conversion Rate" 
          value="3.24%" 
          trend="+1.2%" 
          isPositive={true} 
          icon={<TrendingUp size={24} color="var(--success)" />} 
        />
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* Recent Orders */}
        <div className="glass-panel" style={{ flex: '2 1 600px', padding: '24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.2rem' }}>Recent Orders</h2>
            <button className="icon-btn"><MoreHorizontal size={20} /></button>
          </div>
          <table className="glass-table" style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <TableRow id="#ORD-7352" name="Sarah Jenkins" product="Wireless Headphones" date="Oct 24, 2026" amount="$129.99" status="Delivered" />
              <TableRow id="#ORD-7351" name="Michael Chen" product="Mechanical Keyboard" date="Oct 24, 2026" amount="$149.50" status="Shipped" />
              <TableRow id="#ORD-7350" name="Emma Watson" product="Smart Watch Pro" date="Oct 23, 2026" amount="$299.00" status="Pending" />
              <TableRow id="#ORD-7349" name="James Rodriguez" product="Gaming Mouse" date="Oct 23, 2026" amount="$79.99" status="Delivered" />
              <TableRow id="#ORD-7348" name="Olivia Smith" product="USB-C Hub" date="Oct 22, 2026" amount="$45.00" status="Canceled" />
            </tbody>
          </table>
        </div>

        {/* Top Products / Activity Mockup */}
        <div className="glass-panel" style={{ flex: '1 1 300px', padding: '24px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Top Categories</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             <CategoryRow name="Electronics" sales="45%" color="var(--accent-primary)" />
             <CategoryRow name="Fashion" sales="25%" color="var(--accent-purple)" />
             <CategoryRow name="Home & Garden" sales="15%" color="var(--success)" />
             <CategoryRow name="Sports" sales="10%" color="var(--warning)" />
             <CategoryRow name="Others" sales="5%" color="var(--text-muted)" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, trend, isPositive, icon }) {
  return (
    <div className="glass-panel hover-scale" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>{title}</p>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{value}</h3>
        </div>
        <div style={{ 
          width: '48px', height: '48px', borderRadius: '12px', 
          background: 'rgba(255,255,255,0.03)', border: '1px solid var(--panel-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {icon}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ 
          display: 'flex', alignItems: 'center', gap: '4px',
          color: isPositive ? 'var(--success)' : 'var(--danger)', fontSize: '0.85rem', fontWeight: 600 
        }}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {trend}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>vs last month</span>
      </div>
    </div>
  )
}

function TableRow({ id, name, product, date, amount, status }) {
  let badgeClass = 'badge ';
  if (status === 'Delivered') badgeClass += 'success';
  else if (status === 'Pending' || status === 'Shipped') badgeClass += 'warning';
  else badgeClass += 'danger';

  return (
    <tr>
      <td style={{ fontWeight: 500 }}>{id}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}&backgroundColor=transparent`} style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)' }} />
          <span>{name}</span>
        </div>
      </td>
      <td style={{ color: 'var(--text-secondary)' }}>{product}</td>
      <td style={{ color: 'var(--text-secondary)' }}>{date}</td>
      <td style={{ fontWeight: 500 }}>{amount}</td>
      <td><span className={badgeClass}>{status}</span></td>
    </tr>
  )
}

function CategoryRow({ name, sales, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
        <span>{name}</span>
        <span style={{ fontWeight: 600 }}>{sales}</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: sales, height: '100%', background: color, borderRadius: '3px' }}></div>
      </div>
    </div>
  )
}
