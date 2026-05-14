import React from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function BuyerOrders() {
  const { orders } = useCart();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>My Orders</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Track and manage your recent purchases.</p>

      {orders.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--panel-bg)', borderRadius: '16px' }}>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {orders.map(order => (
            <OrderTracker 
              key={order.id}
              id={order.id} 
              date={order.date} 
              status={order.status} 
              total={`₹${order.total.toLocaleString('en-IN')}`} 
              items={order.items.map(item => `${item.name} (${item.qty})`)} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

function OrderTracker({ id, date, status, total, items }) {
  let statusIcon;
  let statusColor;

  if (status === 'Processing') {
    statusIcon = <Package size={20} />;
    statusColor = 'var(--accent-primary)';
  } else if (status === 'Shipped') {
    statusIcon = <Truck size={20} />;
    statusColor = 'var(--warning)';
  } else {
    statusIcon = <CheckCircle size={20} />;
    statusColor = 'var(--success)';
  }

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Order {id}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Placed on {date}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{total}</div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>Items:</div>
        {items.map((item, idx) => (
          <div key={idx} style={{ fontWeight: 500 }}>• {item}</div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          background: `rgba(${statusColor === 'var(--success)' ? '16, 185, 129' : statusColor === 'var(--warning)' ? '245, 158, 11' : '37, 99, 235'}, 0.1)`, 
          color: statusColor, padding: '8px 16px', borderRadius: '20px', 
          display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem' 
        }}>
          {statusIcon} Status: {status}
        </div>
      </div>
    </div>
  )
}
