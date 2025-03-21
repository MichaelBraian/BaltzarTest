import { useRef, useCallback, RefObject, useEffect } from 'react';

interface FocusManagementOptions {
  /**
   * Delay in ms before focusing after an event
   */
  focusDelay?: number;
  
  /**
   * Whether to restore focus to previous element when closing/unmounting
   */
  restoreFocus?: boolean;
  
  /**
   * Whether to trap focus within a container
   */
  trapFocus?: boolean;
  
  /**
   * Callback when focus changes
   */
  onFocusChange?: (element: Element | null) => void;
}

interface FocusManagementResult {
  /**
   * Ref to attach to the container element
   */
  containerRef: RefObject<HTMLElement>;
  
  /**
   * Set focus to a specific element
   */
  setFocus: (element: HTMLElement | null) => void;
  
  /**
   * Set focus to the first focusable element in the container
   */
  focusFirst: () => void;
  
  /**
   * Set focus to the first element after a specified delay
   */
  focusFirstWithDelay: (delay?: number) => void;
  
  /**
   * Set focus to a specific element after a delay
   */
  focusWithDelay: (element: HTMLElement | null, delay?: number) => void;
}

/**
 * Custom hook for managing focus within components
 * Helps with keyboard navigation and screen reader accessibility
 * 
 * @param options Configuration options for focus management
 * @returns Object containing focus management functions and container ref
 */
export function useFocusManagement({
  focusDelay = 300,
  restoreFocus = true,
  trapFocus = false,
  onFocusChange
}: FocusManagementOptions = {}): FocusManagementResult {
  const containerRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  
  // Save the previously focused element when mounting
  useEffect(() => {
    if (restoreFocus && document.activeElement instanceof HTMLElement) {
      previousFocusRef.current = document.activeElement;
    }
    
    return () => {
      // Restore focus when unmounting
      if (restoreFocus && previousFocusRef.current) {
        try {
          previousFocusRef.current.focus();
        } catch (e) {
          console.error('Failed to restore focus:', e);
        }
      }
    };
  }, [restoreFocus]);

  // Focus trap implementation
  useEffect(() => {
    if (!trapFocus || !containerRef.current) return;
    
    const container = containerRef.current;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !container.contains(document.activeElement)) return;
      
      // Get all focusable elements
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      // Handle tab and shift+tab navigation
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [trapFocus]);

  // Track focus changes if needed
  useEffect(() => {
    if (!onFocusChange) return;
    
    const handleFocusChange = () => {
      if (onFocusChange) {
        onFocusChange(document.activeElement);
      }
    };
    
    document.addEventListener('focusin', handleFocusChange);
    
    return () => {
      document.removeEventListener('focusin', handleFocusChange);
    };
  }, [onFocusChange]);

  // Set focus to a specific element
  const setFocus = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    
    try {
      element.focus({ preventScroll: false });
    } catch (e) {
      console.error('Failed to set focus:', e);
    }
  }, []);

  // Focus the first focusable element
  const focusFirst = useCallback(() => {
    if (!containerRef.current) return;
    
    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      setFocus(focusableElements[0] as HTMLElement);
    }
  }, [setFocus]);

  // Focus with delay helpers
  const focusWithDelay = useCallback((element: HTMLElement | null, delay = focusDelay) => {
    if (!element) return;
    setTimeout(() => setFocus(element), delay);
  }, [focusDelay, setFocus]);

  const focusFirstWithDelay = useCallback((delay = focusDelay) => {
    setTimeout(() => focusFirst(), delay);
  }, [focusDelay, focusFirst]);

  return {
    containerRef,
    setFocus,
    focusFirst,
    focusFirstWithDelay,
    focusWithDelay
  };
} 