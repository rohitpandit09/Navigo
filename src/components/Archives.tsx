import React, { useState, useMemo } from 'react';
import { monuments, states, monumentTypes, Monument } from '../data/mockData';

const Archives: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedType, setSelectedType] = useState('All Types');

  const filteredMonuments = useMemo(() => {
    return monuments.filter((monument) => {
      const matchesSearch = monument.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        monument.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesState = selectedState === 'All States' || monument.state === selectedState;
      const matchesType = selectedType === 'All Types' || monument.type === selectedType;
      return matchesSearch && matchesState && matchesType;
    });
  }, [searchQuery, selectedState, selectedType]);

  const handleAction = (action: string, monument: Monument) => {
    alert(`${action} feature for ${monument.name} coming soon!`);
  };

  return (
    <section className="section section--white" id="archives">
      <div className="container">
        <div className="section__header">
          <p className="section__subtitle">Explore Heritage</p>
          <h2 className="section__title">Tourist Archives</h2>
          <p className="section__description">
            Discover India's magnificent monuments, temples, forts, and heritage sites
          </p>
        </div>

        {/* Search & Filters */}
        <div className="search-bar" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <input
            type="text"
            className="search-bar__input"
            placeholder="Search monuments..."
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
          <select
            className="search-bar__select"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {monumentTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Monument Grid */}
        <div className="grid grid--3">
          {filteredMonuments.map((monument, index) => (
            <div
              key={monument.id}
              className="card archive-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <img
                src={monument.image}
                alt={monument.name}
                className="card__image"
                loading="lazy"
              />
              <div className="card__content">
                <span className="card__tag">{monument.type}</span>
                <h4 className="card__title">{monument.name}</h4>
                <p className="card__subtitle">
                  📍 {monument.location}, {monument.state}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-gray)', marginBottom: 'var(--spacing-md)' }}>
                  {monument.description}
                </p>
                
                <div className="archive-card__actions">
                  {monument.hasAudio && (
                    <button
                      className="archive-card__action-btn"
                      onClick={() => handleAction('Audio Guide', monument)}
                    >
                      <span>🎧</span>
                      Audio
                    </button>
                  )}
                  {monument.hasMap && (
                    <button
                      className="archive-card__action-btn"
                      onClick={() => handleAction('Map', monument)}
                    >
                      <span>🗺️</span>
                      Map
                    </button>
                  )}
                  {monument.has360View && (
                    <button
                      className="archive-card__action-btn"
                      onClick={() => handleAction('360° View', monument)}
                    >
                      <span>🌐</span>
                      360°
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMonuments.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', color: 'var(--color-gray)' }}>
            <p style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>🔍</p>
            <p>No monuments found matching your criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Archives;
