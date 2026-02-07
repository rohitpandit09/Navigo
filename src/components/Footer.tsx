import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span>🏛️</span>
              Incredible India
            </div>
            <p className="footer__description">
              Discover the rich heritage and cultural treasures of India. From ancient monuments
              to vibrant festivals, embark on a journey through time and tradition.
            </p>
          </div>

          <div>
            <h4 className="footer__title">Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#home" className="footer__link">Home</a></li>
              <li><a href="#archives" className="footer__link">Archives</a></li>
              <li><a href="#experts" className="footer__link">Expert Guides</a></li>
              <li><a href="#events" className="footer__link">Events</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer__title">Popular Destinations</h4>
            <ul className="footer__links">
              <li><a href="#archives" className="footer__link">Taj Mahal</a></li>
              <li><a href="#archives" className="footer__link">Red Fort</a></li>
              <li><a href="#archives" className="footer__link">Hawa Mahal</a></li>
              <li><a href="#archives" className="footer__link">Hampi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer__title">Contact</h4>
            <ul className="footer__links">
              <li className="footer__link">📧 info@incredibleindia.com</li>
              <li className="footer__link">📞 +91 1800 111 363</li>
              <li className="footer__link">📍 New Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 Incredible India Tourism. All rights reserved.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Facebook">📘</a>
            <a href="#" className="footer__social" aria-label="Twitter">🐦</a>
            <a href="#" className="footer__social" aria-label="Instagram">📸</a>
            <a href="#" className="footer__social" aria-label="YouTube">📺</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
