import * as React from "react"

// Define breakpoints that match Tailwind's defaults for consistency
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};

/**
 * Hook to detect if the current viewport is mobile-sized
 * @returns {boolean} true if viewport width is less than BREAKPOINTS.md
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(true)

  React.useEffect(() => {
    const setVHVariable = () => {
      document.documentElement.style.setProperty(
        '--vh', 
        `${window.innerHeight * 0.01}px`
      );
    };
    
    setVHVariable();
    
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md);
      setVHVariable();
    }
    
    mql.addEventListener("change", onChange)
    window.addEventListener('resize', setVHVariable);
    window.addEventListener('orientationchange', setVHVariable);
    
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener('resize', setVHVariable);
      window.removeEventListener('orientationchange', setVHVariable);
    }
  }, [])

  return isMobile
}

/**
 * Hook to get the current breakpoint based on window width
 * @returns {string} Current breakpoint (xs, sm, md, lg, xl, 2xl)
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<string>("xs")

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= BREAKPOINTS["2xl"]) setBreakpoint("2xl");
      else if (width >= BREAKPOINTS.xl) setBreakpoint("xl");
      else if (width >= BREAKPOINTS.lg) setBreakpoint("lg");
      else if (width >= BREAKPOINTS.md) setBreakpoint("md");
      else if (width >= BREAKPOINTS.sm) setBreakpoint("sm");
      else if (width >= BREAKPOINTS.xs) setBreakpoint("xs");
      else setBreakpoint("xs");
    };

    updateBreakpoint();

    window.addEventListener("resize", updateBreakpoint);
    window.addEventListener("orientationchange", updateBreakpoint);
    
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
      window.removeEventListener("orientationchange", updateBreakpoint);
    };
  }, []);

  return breakpoint;
}

/**
 * Hook to detect touch device
 * @returns {boolean} true if device supports touch
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean>(false);

  React.useEffect(() => {
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 || 
      (navigator as any).msMaxTouchPoints > 0;
    
    setIsTouch(isTouchDevice);
  }, []);

  return isTouch;
}

/**
 * Hook to detect iOS devices specifically
 * @returns {boolean} true if running on iOS
 */
export function useIsIOS() {
  const [isIOS, setIsIOS] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      
    setIsIOS(iOS);
  }, []);
  
  return isIOS;
}

/**
 * Hook to detect current orientation
 * @returns {string} 'portrait' or 'landscape'
 */
export function useOrientation() {
  const [orientation, setOrientation] = React.useState<'portrait'|'landscape'>('portrait');
  
  React.useEffect(() => {
    const updateOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };
    
    updateOrientation();
    
    window.addEventListener('resize', updateOrientation);
    window.addEventListener('orientationchange', updateOrientation);
    
    return () => {
      window.removeEventListener('resize', updateOrientation);
      window.removeEventListener('orientationchange', updateOrientation);
    };
  }, []);
  
  return orientation;
}
