"use client"

import * as React from "react"

interface Viewport {
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
}

/**
 * Hook to get viewport dimensions with responsive updates
 * @returns {Viewport} Current viewport dimensions and orientation
 */
export function useViewport(): Viewport {
  const [viewport, setViewport] = React.useState<Viewport>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isPortrait: typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : true,
    isLandscape: typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : false,
  });
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isPortrait: height > width,
        isLandscape: width > height,
      });
    };
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Set initial values
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return viewport;
}

/**
 * Get real viewport height accounting for mobile browser UI
 * Uses the visual viewport API which is supported by most modern browsers
 * Falls back to window.innerHeight
 * 
 * @returns {number} Real viewport height in pixels
 */
export function useRealViewportHeight(): number {
  const [height, setHeight] = React.useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );
  
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      // Use visual viewport API if available (accounts for browser UI on mobile)
      if (window.visualViewport) {
        setHeight(window.visualViewport.height);
      } else {
        setHeight(window.innerHeight);
      }
    };
    
    // Add event listeners
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }
    
    // Set initial values
    handleResize();
    
    // Clean up event listeners
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  
  return height;
} 