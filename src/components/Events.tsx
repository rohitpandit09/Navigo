import React, { useState, useEffect, useMemo } from 'react';
import { events, states, TourEvent } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Events: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ongoing' | 'upcoming' | 'past'>('all');
  const [selectedState, setSelectedState] = useState('All States');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [localEvents, setLocalEvents] = useState<TourEvent[]>(events);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  
  const { isAuthenticated } = useAuth();

  // New event form state
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    state: 'Rajasthan',
    date: '',
    images: ''
  });

  // Image slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const updated = { ...prev };
        localEvents.forEach((event) => {
          if (event.images.length > 1) {
            updated[event.id] = ((prev[event.id] || 0) + 1) % event.images.length;
          }
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [localEvents]);

  const filteredEvents = useMemo(() => {
    return localEvents.filter((event) => {
      const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
      const matchesState = selectedState === 'All States' || event.state === selectedState;
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesState && matchesSearch;
    });
  }, [localEvents, activeCategory, selectedState, searchQuery]);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventDate = new Date(newEvent.date);
    const now = new Date();
    let category: 'ongoing' | 'upcoming' | 'past' = 'upcoming';
    
    if (eventDate < now) {
      category = 'past';
    } else if (eventDate.toDateString() === now.toDateString()) {
      category = 'ongoing';
    }

    const imageUrls = newEvent.images.split(',').map(url => url.trim()).filter(Boolean);
    if (imageUrls.length === 0) {
      imageUrls.push('https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80');
    }

    const newEventData: TourEvent = {
      id: Date.now(),
      name: newEvent.name,
      description: newEvent.description,
      location: newEvent.location,
      state: newEvent.state,
      date: eventDate,
      images: imageUrls,
      category,
      organizer: 'User Event',
      price: 'TBD'
    };

    setLocalEvents([newEventData, ...localEvents]);
    setNewEvent({ name: '', description: '', location: '', state: 'Rajasthan', date: '', images: '' });
    setShowAddForm(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const categories = [
    { key: 'all', label: 'All Events' },
    { key: 'ongoing', label: 'Ongoing' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past' }
  ];

  return (
    <section className="section section--white" id="events">
      <div className="container">
        <div className="section__header">
          <p className="section__subtitle">Cultural Calendar</p>
          <h2 className="section__title">Events & Festivals</h2>
          <p className="section__description">
            Experience India's vibrant cultural celebrations and heritage festivals
          </p>
        </div>

        {/* Category Tabs */}
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-tab ${activeCategory === cat.key ? 'filter-tab--active' : ''}`}
              onClick={() => setActiveCategory(cat.key as typeof activeCategory)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Add Event */}
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-md)', 
          marginBottom: 'var(--spacing-2xl)',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div className="search-bar" style={{ flex: 1, marginBottom: 0 }}>
            <input
              type="text"
              className="search-bar__input"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="search-bar__select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          {isAuthenticated && (
            <button
              className="btn btn--primary"
              onClick={() => setShowAddForm(true)}
            >
              ➕ Add Event
            </button>
          )}
        </div>

        {/* Add Event Form Modal */}
        {showAddForm && (
          <div className="modal-overlay modal-overlay--open" onClick={() => setShowAddForm(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal__header">
                <h3 className="modal__title">Add New Event</h3>
                <button className="modal__close" onClick={() => setShowAddForm(false)}>×</button>
              </div>
              <div className="modal__body">
                <form onSubmit={handleAddEvent}>
                  <div className="form-group">
                    <label className="form-label">Event Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input form-textarea"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <select
                      className="form-input form-select"
                      value={newEvent.state}
                      onChange={(e) => setNewEvent({ ...newEvent, state: e.target.value })}
                    >
                      {states.filter(s => s !== 'All States').map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Image URLs (comma separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="https://... , https://..."
                      value={newEvent.images}
                      onChange={(e) => setNewEvent({ ...newEvent, images: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
                    Add Event
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid--3">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="card event-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                {event.images.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={img}
                    alt={`${event.name} ${imgIndex + 1}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: (currentImageIndex[event.id] || 0) === imgIndex ? 1 : 0,
                      transition: 'opacity 0.8s ease'
                    }}
                    loading="lazy"
                  />
                ))}
                <div className="event-card__date">
                  <div className="event-card__date-day">
                    {event.date.getDate()}
                  </div>
                  <div className="event-card__date-month">
                    {event.date.toLocaleString('default', { month: 'short' })}
                  </div>
                </div>
              </div>
              
              <div className="card__content">
                <span className={`event-card__category event-card__category--${event.category}`}>
                  {event.category}
                </span>
                <h4 className="card__title">{event.name}</h4>
                <p className="event-card__location">
                  📍 {event.location}, {event.state}
                </p>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--color-gray)',
                  marginTop: 'var(--spacing-sm)',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  {event.description.slice(0, 100)}...
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: 'var(--spacing-md)',
                  borderTop: '1px solid var(--color-gray-lighter)'
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-gray)' }}>
                    {formatDate(event.date)}
                  </span>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 600, 
                    color: 'var(--color-primary)' 
                  }}>
                    {event.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', color: 'var(--color-gray)' }}>
            <p style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📅</p>
            <p>No events found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
