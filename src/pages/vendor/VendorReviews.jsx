import React from 'react';
import { Star } from 'lucide-react';

export default function VendorReviews() {
  const reviews = [
    { id: 1, product: "Sony WH-1000XM4", customer: "Janani", rating: 5, date: "Oct 26, 2026", comment: "Amazing quality and fast shipping! Will buy again." },
    { id: 2, product: "Mechanical Keyboard", customer: "Alex Smith", rating: 4, date: "Oct 24, 2026", comment: "Great keyboard, but the packaging was slightly damaged." },
    { id: 3, product: "Sony WH-1000XM4", customer: "Priya", rating: 5, date: "Oct 20, 2026", comment: "Best noise cancellation I have ever experienced." },
    { id: 4, product: "Leather Jacket", customer: "Rahul", rating: 4, date: "Oct 18, 2026", comment: "Fits perfectly, but took a bit long to arrive." }
  ];

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Customer Reviews</h1>
        <p style={{ color: 'var(--text-muted)' }}>See what your customers are saying about your products.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="glass-panel hover-scale" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.customer}`} style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e2e8f0' }} />
           <div>
             <div style={{ fontWeight: 600 }}>{review.customer}</div>
             <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{review.date}</div>
           </div>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < review.rating ? "var(--warning)" : "transparent"} color={i < review.rating ? "var(--warning)" : "var(--text-muted)"} />
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--bg-secondary)', padding: '8px 12px', borderRadius: '8px', display: 'inline-block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '12px' }}>
        Product: {review.product}
      </div>
      <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>"{review.comment}"</p>
    </div>
  )
}
