import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  onAuthClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection, onAuthClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, userName, logout } = useAuth();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const navLinks = ['Home', 'Archives', 'Experts', 'Events', 'Profile'];

  const handleNavClick = (section: string) => {
    onNavigate(section.toLowerCase());
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--solid' : 'navbar--transparent'}`}>
        <div className="navbar__logo">
          <span className="navbar__logo-icon">🏛️</span>
          Incredible India
        </div>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link}>
              <button
                className={`navbar__link ${activeSection === link.toLowerCase() ? 'navbar__link--active' : ''}`}
                onClick={() => handleNavClick(link)}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ 
                color: isScrolled ? 'var(--color-dark)' : 'var(--color-white)',
                fontWeight: 500
              }}>
                Hi, {userName}
              </span>
              <button className="btn btn--primary btn--sm" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btn btn--primary" onClick={onAuthClick}>
              Sign In
            </button>
          )}

          <button
            className="navbar__menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${isMobileMenuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <button
            key={link}
            className="navbar__mobile-link"
            onClick={() => handleNavClick(link)}
          >
            {link}
          </button>
        ))}
        {isAuthenticated ? (
          <button className="btn btn--primary" onClick={logout}>
            Logout
          </button>
        ) : (
          <button className="btn btn--primary" onClick={() => {
            onAuthClick();
            setIsMobileMenuOpen(false);
          }}>
            Sign In
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;
