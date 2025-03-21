import { BREAKPOINTS } from '../hooks/use-mobile';

// Define breakpoint configuration types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Structured version of breakpoints
export const breakpoints = {
  xs: 0,
  sm: BREAKPOINTS.sm,
  md: BREAKPOINTS.md,
  lg: BREAKPOINTS.lg,
  xl: BREAKPOINTS.xl, 
  '2xl': BREAKPOINTS['2xl']
};

/**
 * Creates a media query string for CSS-in-JS libraries
 * @param {Breakpoint} breakpoint - The breakpoint to create a media query for
 * @param {boolean} useMin - Whether to use min-width (true) or max-width (false)
 * @returns {string} The media query string
 */
export const createMediaQuery = (breakpoint: Breakpoint, useMin = true): string => {
  const width = breakpoints[breakpoint];
  const minOrMax = useMin ? 'min' : 'max';
  // Adjust max-width by 0.02px to avoid conflicts with min-width at the exact pixel
  const adjustedWidth = useMin ? width : width - 0.02;
  return `@media (${minOrMax}-width: ${adjustedWidth}px)`;
};

/**
 * Media query shortcuts for CSS-in-JS libraries
 */
export const media = {
  up: (breakpoint: Breakpoint) => createMediaQuery(breakpoint, true),
  down: (breakpoint: Breakpoint) => createMediaQuery(breakpoint, false),
  between: (min: Breakpoint, max: Breakpoint) => {
    return `@media (min-width: ${breakpoints[min]}px) and (max-width: ${breakpoints[max] - 0.02}px)`;
  },
  only: (breakpoint: Breakpoint) => {
    const keys = Object.keys(breakpoints) as Breakpoint[];
    const nextBreakpoint = keys[keys.indexOf(breakpoint) + 1];
    
    if (nextBreakpoint) {
      return media.between(breakpoint, nextBreakpoint);
    }
    return media.up(breakpoint);
  }
};

/**
 * Check if the current viewport matches a specific breakpoint
 * Client-side only
 */
export const isBreakpoint = (breakpoint: Breakpoint): boolean => {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  const keys = Object.keys(breakpoints) as Breakpoint[];
  const breakpointIndex = keys.indexOf(breakpoint);
  const nextBreakpoint = keys[breakpointIndex + 1];
  
  if (nextBreakpoint) {
    return width >= breakpoints[breakpoint] && width < breakpoints[nextBreakpoint];
  }
  
  return width >= breakpoints[breakpoint];
};

/**
 * Calculate responsive value based on breakpoint
 * Useful for spacing, font sizes, etc. that should scale with screen size
 */
export const responsiveValue = <T>(defaultValue: T, options: Partial<Record<Breakpoint, T>>): T => {
  if (typeof window === 'undefined') return defaultValue;
  
  const width = window.innerWidth;
  const keys = Object.keys(breakpoints) as Breakpoint[];
  
  // Find the largest breakpoint that is less than or equal to the current width
  for (let i = keys.length - 1; i >= 0; i--) {
    const breakpoint = keys[i];
    if (width >= breakpoints[breakpoint] && options[breakpoint] !== undefined) {
      return options[breakpoint] as T;
    }
  }
  
  return defaultValue;
}; 