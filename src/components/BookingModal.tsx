import React, { useState } from 'react';
import { Expert } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: Expert | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, expert }) => {
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { bookExpert } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (expert) {
      bookExpert(expert.id);
      setIsSubmitted(true);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setDate('');
    setMessage('');
    onClose();
  };

  if (!isOpen || !expert) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'modal-overlay--open' : ''}`} onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">
            {isSubmitted ? '🎉 Booking Confirmed!' : 'Book Expert Guide'}
          </h3>
          <button className="modal__close" onClick={handleClose}>×</button>
        </div>

        <div className="modal__body">
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>✅</div>
              <h4>Booking Request Sent!</h4>
              <p style={{ color: 'var(--color-gray)', margin: 'var(--spacing-lg) 0' }}>
                Your booking request has been sent to <strong>{expert.name}</strong>.
                You'll be notified once they accept your request.
              </p>
              <p style={{ 
                background: 'var(--color-cream)', 
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem'
              }}>
                💬 Chat will be unlocked after the expert accepts your booking!
              </p>
              <button 
                className="btn btn--primary" 
                onClick={handleClose}
                style={{ marginTop: 'var(--spacing-xl)' }}
              >
                Got it!
              </button>
            </div>
          ) : (
            <>
              {/* Expert Info */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-xl)',
                padding: 'var(--spacing-lg)',
                background: 'var(--color-cream)',
                borderRadius: 'var(--radius-lg)'
              }}>
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--color-secondary)'
                  }}
                />
                <div>
                  <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>{expert.name}</h4>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--color-gray)',
                    marginBottom: 'var(--spacing-xs)'
                  }}>
                    📍 {expert.location}
                  </p>
                  <p style={{ 
                    fontSize: '0.9rem', 
                    color: 'var(--color-secondary)',
                    fontWeight: 600
                  }}>
                    ⭐ {expert.rating} • {expert.toursCompleted}+ tours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message to Expert</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Tell the expert about your interests, group size, and any special requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <div style={{
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                  marginTop: 'var(--spacing-lg)'
                }}>
                  <button type="button" className="btn btn--outline-dark" onClick={handleClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--primary" style={{ flex: 1 }}>
                    Send Booking Request
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
