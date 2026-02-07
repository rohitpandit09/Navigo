import React, { useState, useEffect, useCallback } from 'react';
import { heroSlides } from '../data/mockData';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="hero" id="home">
      <div className="hero__slideshow">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero__slide ${index === currentSlide ? 'hero__slide--active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content">
        <p className="hero__subtitle">Welcome to</p>
        <h1 className="hero__title">{heroSlides[currentSlide].title}</h1>
        <p className="hero__description">{heroSlides[currentSlide].subtitle}</p>
        <div className="hero__buttons">
          <button className="btn btn--primary btn--lg" onClick={onExplore}>
            Explore Monuments
          </button>
          <button className="btn btn--outline btn--lg" onClick={onExplore}>
            Find an Expert
          </button>
        </div>
      </div>

      <div className="hero__indicators">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`hero__indicator ${index === currentSlide ? 'hero__indicator--active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="hero__scroll-hint">
        <span>Scroll to explore</span>
        <span style={{ fontSize: '1.5rem' }}>↓</span>
      </div>
    </section>
  );
};

export default Hero;
