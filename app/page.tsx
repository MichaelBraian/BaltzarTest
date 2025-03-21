"use client"

import React, { useRef, lazy, Suspense } from "react"
import { useScrollEffect } from "../hooks/useScrollEffect"
import { useFocusManagement } from "../hooks/useFocusManagement"
import { AppProviders } from "../components/app-providers"
import { Header } from "../components/sections/header"
import { Footer } from "../components/sections/footer"
import { LazyComponent } from "../components/ui/lazy-component"

// Import components for initial rendering and type checking
import { Hero } from "../components/sections/hero"
import { About } from "../components/sections/about"

// Lazy load below-the-fold sections for better performance
const Services = lazy(() => import("../components/sections/services").then(mod => ({ default: mod.Services })));
const Technology = lazy(() => import("../components/sections/technology").then(mod => ({ default: mod.Technology })));
const Contact = lazy(() => import("../components/sections/contact").then(mod => ({ default: mod.Contact })));

// Loading placeholder
const SectionPlaceholder = () => (
  <div className="flex h-40 w-full items-center justify-center" aria-hidden="true">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-300 border-t-transparent"></div>
  </div>
);

function HomeContent() {
  // Use scroll effect hook for header behavior
  const { isScrolled, isHeaderVisible } = useScrollEffect({
    threshold: 20,
    hideThreshold: 100
  });
  
  // Use focus management
  const { containerRef } = useFocusManagement({
    trapFocus: false,
    restoreFocus: true
  });
  
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  // Handle viewport height for mobile browsers
  React.useEffect(() => {
    const handleViewportHeight = () => {
      // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Initialize
    handleViewportHeight();
    
    // Update on resize
    window.addEventListener('resize', handleViewportHeight);
    
    // Clean up
    return () => window.removeEventListener('resize', handleViewportHeight);
  }, []);

  return (
    <>
      <Header 
        isScrolled={isScrolled} 
        isHeaderVisible={isHeaderVisible} 
        headerRef={headerRef} 
      />

      <main 
        className="relative min-h-screen overflow-hidden" 
        ref={containerRef as React.RefObject<HTMLDivElement>}
      >
        {/* Hero Section - Always load immediately */}
        <Hero heroRef={heroRef} />
        
        {/* Services Section - Lazy load */}
        <LazyComponent 
          minHeight={300} 
          loadingFallback={<SectionPlaceholder />}
          ariaLabel="Services section loading"
        >
          <Suspense fallback={<SectionPlaceholder />}>
            <Services />
          </Suspense>
        </LazyComponent>
        
        {/* Technology Section - Lazy load */}
        <LazyComponent 
          minHeight={300} 
          loadingFallback={<SectionPlaceholder />}
          ariaLabel="Technology section loading"
        >
          <Suspense fallback={<SectionPlaceholder />}>
            <Technology />
          </Suspense>
        </LazyComponent>
        
        {/* About Section - Not lazy loaded */}
        <About />
        
        {/* Contact Section - Lazy load */}
        <LazyComponent 
          minHeight={300} 
          loadingFallback={<SectionPlaceholder />}
          ariaLabel="Contact section loading"
        >
          <Suspense fallback={<SectionPlaceholder />}>
            <Contact />
          </Suspense>
        </LazyComponent>
      </main>

      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <AppProviders>
      <HomeContent />
    </AppProviders>
  );
}

