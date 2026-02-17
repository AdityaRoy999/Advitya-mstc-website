import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useSmoothScroll from './hooks/useSmoothScroll';
import Hero from './sections/Hero';
import EventCards from './sections/EventCards';
import Footer from './sections/Footer';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Initialize smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();
    
    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-deep-black overflow-x-hidden">
      {/* Hero Section */}
      <Hero />
      
      {/* Event Cards Section */}
      <section id="events">
        <EventCards />
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}

export default App;
