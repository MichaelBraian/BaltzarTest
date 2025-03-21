"use client"

import React, { useRef } from "react"
import { useScrollEffect } from "../hooks/useScrollEffect"
import { useFocusManagement } from "../hooks/useFocusManagement"
import { AppProviders } from "../components/app-providers"
import { Header } from "../components/sections/header"
import FooterSection from "../components/sections/footer-section"

// Import all sections directly
import { HeroSection } from "../components/sections/hero-section"
import { AboutSection } from "../components/sections/about-section"
import { TechnologySection } from "../components/sections/technology-section"
import { ServicesSection } from "../components/sections/services-section"
import { ContactSection } from "../components/sections/contact-section"
import RegionSkaneSection from "../components/sections/region-skane-section"

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
        {/* Hero Section */}
        <HeroSection 
          title="Digital Precision, Personlig Omsorg"
          subtitle="Välkommen till framtidens tandvård – där teknisk innovation möter omtänksam behandling för bästa resultat."
          ctaText="Boka konsultation"
          secondaryButtonText="Läs mer om oss"
          onCtaClick={() => {
            // Open your modal or handle navigation
            const { openModal } = require("../contexts/AppContext").useAppContext();
            openModal(
              "Digital Tandvård på Baltzar", 
              `<p>På Baltzar Tandvård kombinerar vi den senaste digitala tekniken med högklassig personlig service för att ge dig bästa möjliga tandvård.</p>
              <p>Vårt team av specialister använder avancerad 3D-scanning, AI-diagnostik och digital planering för precisionsbehandlingar med optimala resultat.</p>
              <p>Vi erbjuder allt från invisalign ortodonti och tandimplantat till estetisk tandvård, allt utformat med digitala verktyg för maximal komfort och minimala ingrepp.</p>
              <p>Boka en tid idag för att uppleva skillnaden med digital tandvård på Baltzar.</p>`
            );
          }}
          onSecondaryClick={() => {
            // Open the secondary modal
            const { openModal } = require("../contexts/AppContext").useAppContext();
            openModal(
              "Om vår klinik", 
              `<p>Baltzar Tandvård representerar en ny generation av tandvårdskliniker där digital teknologi står i centrum för alla behandlingar.</p>
              <p>Vår klinik i centrala Malmö är utrustad med den senaste teknologin för 3D-scanning, digital behandlingsplanering och minimalt invasiva ingrepp.</p>
              <p>Vi har specialister inom:</p>
              <ul>
                <li>Digital implantatbehandling</li>
                <li>Estetisk tandvård</li>
                <li>Ortodonti med Invisalign</li>
                <li>Digital protetik med eget laboratorium</li>
              </ul>
              <p>Välkommen att upptäcka en ny standard inom modern tandvård!</p>`
            );
          }}
        />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Region Skåne Section - Specialist care for children and young adults */}
        <RegionSkaneSection />
        
        {/* Technology Section */}
        <TechnologySection />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Contact Section */}
        <ContactSection />
      </main>

      <FooterSection />
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

