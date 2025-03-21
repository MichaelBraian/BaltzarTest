"use client"

import React, { useEffect } from "react"
import { ThemeProvider } from "./theme-provider"
import { FramerMotionProvider } from "./framer-motion-provider"
import { AppProvider } from "../contexts/AppContext"
import { Modal } from "./ui/modal"
import { useAppContext } from "../contexts/AppContext"

/**
 * Mobile Viewport Handler Component
 * Manages viewport height for mobile browsers
 */
function MobileViewportHandler() {
  useEffect(() => {
    // Fix for mobile 100vh issue by setting a CSS variable
    const setVhVariable = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Fix for iOS Safari elastic scrolling
    const preventElasticScroll = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      const isScrollable = 
        target.scrollHeight > target.clientHeight && 
        ['auto', 'scroll'].includes(getComputedStyle(target).overflowY);
      
      // Only prevent default behavior if the element is not scrollable
      if (!isScrollable) {
        e.preventDefault();
      }
    };

    // Add event listeners
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
    window.addEventListener('orientationchange', setVhVariable);
    
    // Handle iOS-specific issues
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      document.addEventListener('touchmove', preventElasticScroll, { passive: false });
      document.body.style.overscrollBehavior = 'none';
    }

    return () => {
      window.removeEventListener('resize', setVhVariable);
      window.removeEventListener('orientationchange', setVhVariable);
      document.removeEventListener('touchmove', preventElasticScroll);
    };
  }, []);

  return null;
}

/**
 * Detect device orientation changes and ensure proper layout adjustments
 */
function OrientationHandler() {
  useEffect(() => {
    // Fix delayed orientation change issues on iOS
    const handleOrientationChange = () => {
      // Force layout recalculation
      window.scrollTo(0, 0);
      
      // Add a timeout to handle the iOS delay in reporting accurate dimensions
      setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        window.scrollTo(0, 0);
      }, 100);
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);
  
  return null;
}

/**
 * Modal container that wraps the Modal component
 */
function ModalContainer() {
  const { modalContent, closeModal } = useAppContext();
  
  return (
    <Modal 
      isOpen={modalContent.isOpen}
      onClose={closeModal}
      title={modalContent.title}
      content={modalContent.content}
      clickPosition={modalContent.clickPosition}
    />
  );
}

export function Providers({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <FramerMotionProvider>
        <AppProvider>
          <MobileViewportHandler />
          <OrientationHandler />
          {children}
          <ModalContainer />
        </AppProvider>
      </FramerMotionProvider>
    </ThemeProvider>
  )
} 