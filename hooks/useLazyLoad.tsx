import { useState, useRef, useEffect, useCallback, RefObject } from 'react';

interface LazyLoadOptions {
  /**
   * Root margin for IntersectionObserver
   */
  rootMargin?: string;
  
  /**
   * Threshold for IntersectionObserver (0-1)
   */
  threshold?: number | number[];
  
  /**
   * Whether to trigger only once
   */
  triggerOnce?: boolean;
  
  /**
   * Initial visibility state
   */
  initialVisible?: boolean;
  
  /**
   * Delay in ms before setting visible (useful for staggered animations)
   */
  delay?: number;
  
  /**
   * Custom root element for IntersectionObserver
   */
  root?: Element | Document | null;
}

interface LazyLoadResult {
  /**
   * Whether the element is visible
   */
  isVisible: boolean;
  
  /**
   * Ref to attach to the container element
   */
  ref: RefObject<HTMLElement>;
  
  /**
   * Force element to be visible
   */
  forceVisible: () => void;
  
  /**
   * Reset visibility to initial state
   */
  reset: () => void;
}

/**
 * Custom hook for lazy loading components when they enter the viewport
 * 
 * @param options Configuration options for lazy loading
 * @returns Object containing visibility state and ref to attach to element
 */
export function useLazyLoad({
  rootMargin = '0px',
  threshold = 0.1,
  triggerOnce = true,
  initialVisible = false,
  delay = 0,
  root = null
}: LazyLoadOptions = {}): LazyLoadResult {
  const [isVisible, setIsVisible] = useState<boolean>(initialVisible);
  const ref = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Force visibility
  const forceVisible = useCallback(() => {
    setIsVisible(true);
  }, []);
  
  // Reset to initial state
  const reset = useCallback(() => {
    setIsVisible(initialVisible);
  }, [initialVisible]);

  useEffect(() => {
    // Don't observe if browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }
    
    const currentRef = ref.current;
    if (!currentRef) return;
    
    // Cleanup any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Create intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If already visible and trigger once, don't do anything
        if (isVisible && triggerOnce) return;
        
        if (entry.isIntersecting) {
          // Set visible after delay if specified
          if (delay > 0) {
            timeoutRef.current = setTimeout(() => {
              setIsVisible(true);
            }, delay);
          } else {
            setIsVisible(true);
          }
          
          // Unobserve after becoming visible if triggerOnce is true
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          // Set not visible if trigger multiple times is enabled
          setIsVisible(false);
        }
      },
      { rootMargin, threshold, root }
    );
    
    // Start observing the target element
    observer.observe(currentRef);
    
    // Cleanup observer and timeout when component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [rootMargin, threshold, triggerOnce, delay, isVisible, root]);
  
  return { 
    isVisible, 
    ref,
    forceVisible,
    reset
  };
} 