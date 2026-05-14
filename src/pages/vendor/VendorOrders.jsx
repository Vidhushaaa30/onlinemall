import React from 'react';
import { Search, Filter } from 'lucide-react';

export default function VendorOrders() {
  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Orders Received</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage and update the status of your customers' orders.</p>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.03)', padding: '8px 16px', borderRadius: '12px', width: '300px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input type="text" placeholder="Search order ID or customer..." style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%' }} />
          </div>
          <button className="icon-btn" style={{ background: 'rgba(0,0,0,0.03)' }}><Filter size={18} /></button>
        </div>

        <table className="glass-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <OrderRow id="#ORD-9021" customer="Jane Doe" date="Oct 25, 2026" amount="₹28,500" status="Pending" />
            <OrderRow id="#ORD-9020" customer="Mark Smith" date="Oct 24, 2026" amount="₹12,500" status="Shipped" />
            <OrderRow id="#ORD-9019" customer="Alice Johnson" date="Oct 23, 2026" amount="₹4,500" status="Delivered" />
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrderRow({ id, customer, date, amount, status }) {
  let badgeClass = 'badge ';
  if (status === 'Delivered') badgeClass += 'success';
  else if (status === 'Shipped') badgeClass += 'warning';
  else badgeClass += 'warning'; // pending is also warning colored for now

  return (
    <tr>
      <td style={{ fontWeight: 500 }}>{id}</td>
      <td>{customer}</td>
      <td style={{ color: 'var(--text-secondary)' }}>{date}</td>
      <td style={{ fontWeight: 600 }}>{amount}</td>
      <td><span className={badgeClass}>{status}</span></td>
      <td>
        <select className="input-field" style={{ padding: '6px 12px', fontSize: '0.85rem', width: 'auto' }} defaultValue={status}>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </td>
    </tr>
  )
}
