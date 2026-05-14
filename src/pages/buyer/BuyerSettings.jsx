import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { User, Mail, MapPin } from 'lucide-react';

export default function BuyerSettings() {
  const { user, updateUser } = useCart();
  const [formData, setFormData] = useState(user);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Account Settings</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Update your personal details and shipping address.</p>

      <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#e2e8f0' }} />
            <div>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{user.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Premium Member</p>
            </div>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><User size={16} /> Full Name</label>
            <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> Email Address</label>
            <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Address</label>
            <input type="text" name="address" className="input-field" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" className="input-field" value={formData.city} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Zip Code</label>
            <input type="text" name="zip" className="input-field" value={formData.zip} onChange={handleChange} required />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
            <button type="submit" className="primary-btn" style={{ padding: '12px 32px' }}>Save Changes</button>
            {saved && <span style={{ color: 'var(--success)', fontWeight: 500, animation: 'fadeIn 0.3s' }}>Changes saved successfully!</span>}
          </div>

        </form>
      </div>
    </div>
  )
}
