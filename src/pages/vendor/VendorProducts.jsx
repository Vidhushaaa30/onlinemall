import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

export default function VendorProducts() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>My Products</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your inventory and add new products to your shop.</p>
        </div>
        <button className="primary-btn" onClick={() => setShowAddForm(!showAddForm)} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} /> {showAddForm ? 'Cancel' : 'Add New Product'}
        </button>
      </div>

      {showAddForm && (
        <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px', animation: 'fadeIn 0.3s ease-in' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Add New Product</h2>
          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Product Title</label>
              <input type="text" className="input-field" placeholder="e.g. Wireless Noise-Cancelling Headphones" />
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" className="input-field" placeholder="0.00" />
            </div>
            <div className="form-group">
              <label>Stock Quantity</label>
              <input type="number" className="input-field" placeholder="100" />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select className="input-field">
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home & Garden</option>
                <option>Sports</option>
              </select>
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="text" className="input-field" placeholder="https://..." />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Description</label>
              <textarea className="input-field" rows="4" placeholder="Describe your product..."></textarea>
            </div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="primary-btn" onClick={() => setShowAddForm(false)}>Save Product</button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.03)', padding: '8px 16px', borderRadius: '12px', width: '300px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input type="text" placeholder="Search products..." style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%' }} />
          </div>
        </div>

        <table className="glass-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <ProductRow name="Sony WH-1000XM4" category="Electronics" price="₹28,000" stock="45" status="In Stock" />
            <ProductRow name="Mechanical Keyboard" category="Electronics" price="₹12,500" stock="12" status="Low Stock" />
            <ProductRow name="Running Shoes" category="Sports" price="₹4,500" stock="0" status="Out of Stock" />
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ProductRow({ name, category, price, stock, status }) {
  let badgeClass = 'badge ';
  if (status === 'In Stock') badgeClass += 'success';
  else if (status === 'Low Stock') badgeClass += 'warning';
  else badgeClass += 'danger';

  return (
    <tr>
      <td style={{ fontWeight: 500 }}>{name}</td>
      <td style={{ color: 'var(--text-secondary)' }}>{category}</td>
      <td style={{ fontWeight: 600 }}>{price}</td>
      <td>{stock}</td>
      <td><span className={badgeClass}>{status}</span></td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="icon-btn" style={{ width: '32px', height: '32px' }}><Edit size={16} /></button>
          <button className="icon-btn" style={{ width: '32px', height: '32px', color: 'var(--danger)' }}><Trash2 size={16} /></button>
        </div>
      </td>
    </tr>
  )
}
