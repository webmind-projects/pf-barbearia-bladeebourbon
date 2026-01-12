import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { BookingSystem } from './components/BookingSystem';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Header } from './components/Header';
import { SectionDivider } from './components/SectionDivider';

function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 font-sans">
      <Header />
      <main className="relative">
        {/* Fixed Hero Section for Parallax Effect */}
        <div className="fixed inset-0 z-0 h-screen w-full">
          <Hero />
        </div>
        
        {/* Scrollable Content Overlay */}
        {/* mt-[100vh] ensures content starts below the hero */}
        {/* bg-zinc-900 ensures content is opaque and covers the hero as it scrolls up */}
        <div className="relative z-10 mt-[100vh] bg-zinc-900 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.7)]">
          <About />
          
          {/* Gradient transition: About (zinc-900) -> Booking (black) */}
          <SectionDivider gradientClass="from-zinc-900 to-black" />
          
          <BookingSystem />
          
          {/* Gradient transition: Booking (black) -> Contact (zinc-900) */}
          <SectionDivider gradientClass="from-black to-zinc-900" />
          
          <Contact />
          
          {/* Gradient transition: Contact (zinc-900) -> Footer (black) - No Icon */}
          <div className="h-12 w-full bg-gradient-to-b from-zinc-900 to-black" />
          
          <Footer />
        </div>
      </main>
      
      <WhatsAppButton />
    </div>
  );
}

export default App;