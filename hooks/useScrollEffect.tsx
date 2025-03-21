import { useState, useEffect, useCallback } from 'react';

interface ScrollEffectOptions {
  /**
   * Threshold in pixels for when scrolling is considered significant
   */
  threshold?: number;
  
  /**
   * Amount of scrollY needed to trigger header hiding
   */
  hideThreshold?: number;
  
  /**
   * Debounce delay in ms
   */
  debounceDelay?: number;
  
  /**
   * Additional callback when scroll state changes
   */
  onScrollStateChange?: (isScrolled: boolean, isVisible: boolean) => void;
}

interface ScrollEffectResult {
  /**
   * Whether the page has been scrolled beyond the threshold
   */
  isScrolled: boolean;
  
  /**
   * Whether the header should be visible (based on scroll direction)
   */
  isHeaderVisible: boolean;
  
  /**
   * Current scroll position
   */
  scrollY: number;
  
  /**
   * Scroll direction: 1 for down, -1 for up, 0 for no movement
   */
  scrollDirection: number;
}

/**
 * Custom hook for handling scroll effects like header behavior
 * 
 * @param options Configuration options for scroll behaviors
 * @returns Object containing scroll state information
 */
export function useScrollEffect({
  threshold = 20,
  hideThreshold = 100,
  debounceDelay = 10,
  onScrollStateChange
}: ScrollEffectOptions = {}): ScrollEffectResult {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);
  
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    const currentScrollY = window.scrollY;
    const previousScrollY = scrollY;
    
    // Check if page is scrolled more than threshold
    const newScrolled = currentScrollY > threshold;
    if (newScrolled !== isScrolled) {
      setIsScrolled(newScrolled);
    }
    
    // Determine scroll direction
    const direction = currentScrollY === previousScrollY 
      ? 0 
      : currentScrollY > previousScrollY 
        ? 1 
        : -1;
    
    setScrollDirection(direction);
    setScrollY(currentScrollY);
    
    // Determine if header should be visible based on scroll direction
    // Only update header visibility when scrolling up or at the top
    if (currentScrollY <= threshold || direction < 0) {
      if (!isHeaderVisible) {
        setIsHeaderVisible(true);
      }
    } else if (direction > 0 && currentScrollY > hideThreshold) {
      // Only hide header after scrolling down significantly
      if (isHeaderVisible) {
        setIsHeaderVisible(false);
      }
    }
    
    // Call external handler if provided
    if (onScrollStateChange) {
      onScrollStateChange(newScrolled, 
        currentScrollY <= threshold || direction < 0 || !(direction > 0 && currentScrollY > hideThreshold));
    }
  }, [threshold, hideThreshold, isScrolled, isHeaderVisible, scrollY, onScrollStateChange]);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        // Use requestAnimationFrame for better performance
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);
  
  return {
    isScrolled,
    isHeaderVisible,
    scrollY,
    scrollDirection
  };
} 