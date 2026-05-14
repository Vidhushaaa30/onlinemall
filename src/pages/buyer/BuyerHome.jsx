import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Star, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MOCK_PRODUCTS = [
  { id: 1, name: "Sony WH-1000XM4", shop: "Tech Haven", category: "Electronics", price: 28000, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400&h=300", description: "Industry leading noise-canceling headphones with dual noise sensor technology. Up to 30-hour battery life." },
  { id: 2, name: "Leather Jacket", shop: "Urban Fashion", category: "Clothing", price: 4500, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400&h=300", description: "Premium genuine leather jacket with a modern slim fit. Perfect for casual or semi-formal occasions." },
  { id: 3, name: "Ceramic Planter", shop: "GreenThumb Gardening", category: "Home & Garden", price: 850, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400&h=300", description: "Handcrafted ceramic planter with a minimalist matte finish. Ideal for indoor plants." },
  { id: 4, name: "Mechanical Keyboard", shop: "Tech Haven", category: "Electronics", price: 12500, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400&h=300", description: "RGB mechanical gaming keyboard with custom tactile switches for the best typing experience." }
];

export default function BuyerHome() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.shop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Hero / Search */}
      <div style={{ 
        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
        borderRadius: '24px', padding: '48px', color: 'white', marginBottom: '40px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '600px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Find everything you need.</h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '32px' }}>Browse across thousands of shops and products globally.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '12px', padding: '8px 16px', color: 'var(--text-primary)' }}>
            <Search size={20} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search by product, shop, or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', border: 'none', outline: 'none', padding: '12px', fontSize: '1rem' }} 
            />
          </div>
        </div>
      </div>

      {/* Featured Shops (Only show if not searching) */}
      {!searchQuery && (
        <>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Featured Shops</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            <ShopCard name="Tech Haven" category="Electronics" rating="4.9" onClick={() => setSearchQuery('Tech Haven')} />
            <ShopCard name="Urban Fashion" category="Clothing" rating="4.7" onClick={() => setSearchQuery('Urban Fashion')} />
            <ShopCard name="GreenThumb Gardening" category="Home & Garden" rating="4.8" onClick={() => setSearchQuery('GreenThumb Gardening')} />
          </div>
        </>
      )}

      {/* Trending Products / Search Results */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.5rem' }}>
          {searchQuery ? `Search Results (${filteredProducts.length})` : 'Trending Products'}
        </h2>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')} 
            style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: 600 }}
          >
            Clear Search
          </button>
        )}
      </div>
      
      {filteredProducts.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--panel-bg)', borderRadius: '16px' }}>
          <p>No products found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAdd={() => addToCart(product)}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      )}

      {/* Product Description Modal */}
      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '32px', position: 'relative' }}>
            <button 
              onClick={() => setSelectedProduct(null)} 
              style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} color="var(--text-muted)" />
            </button>
            <div style={{ display: 'flex', gap: '24px' }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{selectedProduct.name}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Sold by {selectedProduct.shop}</p>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '16px' }}>₹{selectedProduct.price.toLocaleString('en-IN')}</div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>{selectedProduct.description}</p>
                <button 
                  className="primary-btn" 
                  style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

function ShopCard({ name, category, rating, onClick }) {
  return (
    <div className="glass-panel hover-scale" style={{ padding: '24px', cursor: 'pointer' }} onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', background: 'var(--bg-secondary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
          🏪
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning)', fontWeight: 600 }}>
          <Star size={16} fill="var(--warning)" /> {rating}
        </div>
      </div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{name}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{category}</p>
    </div>
  )
}

function ProductCard({ product, onAdd, onClick }) {
  return (
    <div className="glass-panel hover-scale" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={onClick}>
      <div style={{ height: '180px', width: '100%', background: `url(${product.image}) center/cover` }}></div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{product.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px' }}>By {product.shop}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-primary)' }}>₹{product.price.toLocaleString('en-IN')}</span>
          <button 
            className="icon-btn" 
            style={{ background: 'var(--bg-secondary)', zIndex: 10 }}
            onClick={(e) => {
              e.stopPropagation(); 
              onAdd();
            }}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
