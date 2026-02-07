import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockUser, mockExpertProfile, bookingRequests, BookingRequest } from '../data/mockData';

const Profile: React.FC = () => {
  const { isAuthenticated, role, userName, userAvatar, bookExpert, bookedExpertId } = useAuth();
  const [requests, setRequests] = useState<BookingRequest[]>(bookingRequests);

  if (!isAuthenticated) {
    return (
      <section className="section section--cream" id="profile">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--spacing-4xl)' }}>
          <p style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>🔐</p>
          <h2>Please Sign In</h2>
          <p style={{ color: 'var(--color-gray)', marginTop: 'var(--spacing-md)' }}>
            Sign in to view your profile and manage your bookings
          </p>
        </div>
      </section>
    );
  }

  const handleRequestAction = (requestId: number, action: 'accepted' | 'rejected') => {
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: action } : req
    ));
    
    if (action === 'accepted') {
      bookExpert(requestId);
    }
  };

  // Expert Profile View
  if (role === 'expert') {
    return (
      <section className="section section--cream" id="profile">
        <div className="container">
          <div className="section__header">
            <p className="section__subtitle">Expert Dashboard</p>
            <h2 className="section__title">Welcome, {userName}</h2>
          </div>

          <div className="profile">
            <div className="profile__sidebar">
              <img
                src={mockExpertProfile.avatar}
                alt={userName}
                className="profile__avatar"
              />
              <h3 className="profile__name">{userName}</h3>
              <p className="profile__role">🎓 Heritage Expert</p>
              
              <div className={`expert-card__status expert-card__status--free`} style={{ marginBottom: 'var(--spacing-md)' }}>
                <span className="expert-card__status-dot"></span>
                Available for Bookings
              </div>

              <div className="profile__stats">
                <div className="profile__stat">
                  <div className="profile__stat-value">⭐ {mockExpertProfile.rating}</div>
                  <div className="profile__stat-label">Rating</div>
                </div>
                <div className="profile__stat">
                  <div className="profile__stat-value">{mockExpertProfile.toursCompleted}</div>
                  <div className="profile__stat-label">Tours</div>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)', marginTop: 'var(--spacing-md)' }}>
                {mockExpertProfile.description}
              </p>
            </div>

            <div className="profile__content">
              {/* Revenue Stats */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-card__icon">💰</div>
                  <div className="stat-card__value">₹{mockExpertProfile.revenue.toLocaleString()}</div>
                  <div className="stat-card__label">Revenue Earned</div>
                </div>
                <div className="stat-card stat-card--secondary">
                  <div className="stat-card__icon">📅</div>
                  <div className="stat-card__value">{mockExpertProfile.daysWorked}</div>
                  <div className="stat-card__label">Days Contributed</div>
                </div>
                <div className="stat-card stat-card--accent">
                  <div className="stat-card__icon">🧭</div>
                  <div className="stat-card__value">{mockExpertProfile.toursCompleted}</div>
                  <div className="stat-card__label">Tours Completed</div>
                </div>
              </div>

              {/* Booking Requests */}
              <div className="profile__section">
                <h4 className="profile__section-title">
                  📩 Booking Requests
                </h4>
                
                {requests.filter(r => r.status === 'pending').length === 0 ? (
                  <p style={{ color: 'var(--color-gray)', textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                    No pending requests
                  </p>
                ) : (
                  requests.filter(r => r.status === 'pending').map((request) => (
                    <div key={request.id} className="booking-request">
                      <img
                        src={request.userAvatar}
                        alt={request.userName}
                        className="booking-request__avatar"
                      />
                      <div className="booking-request__info">
                        <div className="booking-request__name">{request.userName}</div>
                        <div className="booking-request__details">
                          📍 {request.location} • 📅 {request.date}
                        </div>
                        <div className="booking-request__details" style={{ marginTop: 'var(--spacing-xs)' }}>
                          "{request.message}"
                        </div>
                      </div>
                      <div className="booking-request__actions">
                        <button
                          className="btn btn--success btn--sm"
                          onClick={() => handleRequestAction(request.id, 'accepted')}
                        >
                          ✓ Accept
                        </button>
                        <button
                          className="btn btn--error btn--sm"
                          onClick={() => handleRequestAction(request.id, 'rejected')}
                        >
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Specializations */}
              <div className="profile__section">
                <h4 className="profile__section-title">
                  🎯 Specializations
                </h4>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                  <span className="card__tag">{mockExpertProfile.specialization}</span>
                  <span className="card__tag">Mughal History</span>
                  <span className="card__tag">Architectural Tours</span>
                </div>
              </div>

              {/* Languages */}
              <div className="profile__section">
                <h4 className="profile__section-title">
                  🗣️ Languages
                </h4>
                <div className="expert-card__languages" style={{ justifyContent: 'flex-start' }}>
                  {mockExpertProfile.languages.map((lang) => (
                    <span key={lang} className="expert-card__language">{lang}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // User Profile View
  return (
    <section className="section section--cream" id="profile">
      <div className="container">
        <div className="section__header">
          <p className="section__subtitle">Your Profile</p>
          <h2 className="section__title">Welcome, {userName}</h2>
        </div>

        <div className="profile">
          <div className="profile__sidebar">
            <img
              src={userAvatar}
              alt={userName}
              className="profile__avatar"
            />
            <h3 className="profile__name">{userName}</h3>
            <p className="profile__role">🧳 Heritage Explorer</p>

            <div className="profile__stats">
              <div className="profile__stat">
                <div className="profile__stat-value">{mockUser.trips}</div>
                <div className="profile__stat-label">Trips</div>
              </div>
              <div className="profile__stat">
                <div className="profile__stat-value">{mockUser.friends}</div>
                <div className="profile__stat-label">Friends</div>
              </div>
              <div className="profile__stat">
                <div className="profile__stat-value">{mockUser.reviews}</div>
                <div className="profile__stat-label">Reviews</div>
              </div>
            </div>

            <button className="btn btn--outline-dark" style={{ marginTop: 'var(--spacing-lg)', width: '100%' }}>
              Edit Profile
            </button>
          </div>

          <div className="profile__content">
            {/* About */}
            <div className="profile__section">
              <h4 className="profile__section-title">
                📝 About Me
              </h4>
              <p style={{ color: 'var(--color-gray)' }}>
                {mockUser.bio}
              </p>
            </div>

            {/* Trip History */}
            <div className="profile__section">
              <h4 className="profile__section-title">
                🗺️ Trip History
              </h4>
              <div className="grid grid--3" style={{ gap: 'var(--spacing-md)' }}>
                {['Taj Mahal, Agra', 'Red Fort, Delhi', 'Hawa Mahal, Jaipur'].map((trip, i) => (
                  <div key={i} style={{
                    padding: 'var(--spacing-md)',
                    background: 'var(--color-cream)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)'
                  }}>
                    <span>📍</span>
                    <span style={{ fontSize: '0.9rem' }}>{trip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booked Experts */}
            <div className="profile__section">
              <h4 className="profile__section-title">
                👥 Booked Experts
              </h4>
              {bookedExpertId ? (
                <div style={{
                  padding: 'var(--spacing-lg)',
                  background: 'var(--color-cream)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)'
                }}>
                  <span style={{ fontSize: '2rem' }}>🎓</span>
                  <div>
                    <p style={{ fontWeight: 600 }}>Rajesh Kumar</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-gray)' }}>
                      Mughal Architecture Expert • Agra
                    </p>
                  </div>
                  <button className="btn btn--primary btn--sm" style={{ marginLeft: 'auto' }}>
                    💬 Chat
                  </button>
                </div>
              ) : (
                <p style={{ color: 'var(--color-gray)' }}>
                  No experts booked yet. Browse our experts to find your perfect guide!
                </p>
              )}
            </div>

            {/* Friends */}
            <div className="profile__section">
              <h4 className="profile__section-title">
                👥 Friends
              </h4>
              <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--spacing-xs)'
                  }}>
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: 'var(--color-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      👤
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-gray)' }}>
                      Friend {i + 1}
                    </span>
                  </div>
                ))}
                <button style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'var(--color-cream)',
                  border: '2px dashed var(--color-gray-light)',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
