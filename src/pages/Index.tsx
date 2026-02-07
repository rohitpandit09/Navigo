import React, { useState, useRef } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Expert } from '../data/mockData';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Archives from '../components/Archives';
import Experts from '../components/Experts';
import Events from '../components/Events';
import Profile from '../components/Profile';
import Chat from '../components/Chat';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import BookingModal from '../components/BookingModal';
import '../styles/main.css';

const IndexContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const homeRef = useRef<HTMLDivElement>(null);
  const archivesRef = useRef<HTMLDivElement>(null);
  const expertsRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      home: homeRef,
      archives: archivesRef,
      experts: expertsRef,
      events: eventsRef,
      profile: profileRef
    };

    const ref = refs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingRequest = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="app">
      <Navbar
        onNavigate={scrollToSection}
        activeSection={activeSection}
        onAuthClick={() => setIsAuthModalOpen(true)}
      />

      <div ref={homeRef}>
        <Hero onExplore={() => scrollToSection('archives')} />
      </div>

      <div ref={archivesRef}>
        <Archives />
      </div>

      <div ref={expertsRef}>
        <Experts onBookingRequest={handleBookingRequest} />
      </div>

      <div ref={eventsRef}>
        <Events />
      </div>

      <div ref={profileRef}>
        <Profile />
      </div>

      <Footer />

      <Chat />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        expert={selectedExpert}
      />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <IndexContent />
    </AuthProvider>
  );
};

export default Index;
