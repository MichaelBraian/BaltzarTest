import React, { Suspense, ReactNode, useState, useEffect } from 'react';
import { useLazyLoad } from '../../hooks/useLazyLoad';

export interface LazyLoadProps {
  /**
   * Minimum height to maintain before component loads
   */
  minHeight?: string | number;
  
  /**
   * Custom loading component
   */
  loadingFallback?: ReactNode;
  
  /**
   * Root margin for intersection observer
   */
  rootMargin?: string;
  
  /**
   * Whether to completely skip lazy loading
   */
  skipLazyLoading?: boolean;
  
  /**
   * Additional className for the container
   */
  className?: string;
  
  /**
   * Children elements
   */
  children: ReactNode;

  /**
   * Accessibility label for the container element
   */
  ariaLabel?: string;
}

/**
 * Renders a component only when it enters the viewport
 * Use this component to wrap lazy-loaded components for performance optimization
 * 
 * @example
 * const MyLazyComponent = React.lazy(() => import('./MyComponent'));
 * 
 * // In your JSX:
 * <LazyComponent loadingFallback={<Loading />}>
 *   <Suspense fallback={<Loading />}>
 *     <MyLazyComponent />
 *   </Suspense>
 * </LazyComponent>
 */
export const LazyComponent: React.FC<LazyLoadProps> = ({
  minHeight = 'auto',
  loadingFallback = null,
  rootMargin = '200px 0px',
  skipLazyLoading = false,
  className = '',
  children,
  ariaLabel
}) => {
  const { isVisible, ref } = useLazyLoad({
    rootMargin,
    triggerOnce: true,
    initialVisible: skipLazyLoading
  });
  
  // Convert minHeight to string with px if it's a number
  const minHeightStyle = typeof minHeight === 'number' 
    ? `${minHeight}px` 
    : minHeight;

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{ minHeight: minHeightStyle }}
      aria-label={ariaLabel}
      aria-busy={!isVisible}
    >
      {isVisible ? children : loadingFallback}
    </div>
  );
};

/**
 * Provides a container with Suspense for lazy-loaded components
 * This combines the LazyComponent with Suspense for convenience
 */
export const SuspenseContainer: React.FC<{
  children: ReactNode;
  fallback: ReactNode;
  minHeight?: string | number;
  className?: string;
  rootMargin?: string;
  skipLazyLoading?: boolean;
  ariaLabel?: string;
}> = ({
  children,
  fallback,
  minHeight = 'auto',
  className = '',
  rootMargin = '200px 0px',
  skipLazyLoading = false,
  ariaLabel
}) => {
  // State to determine if the component should be mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure component is only mounted client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted && typeof window === 'undefined') {
    return fallback as JSX.Element;
  }
  
  return (
    <LazyComponent
      minHeight={minHeight}
      loadingFallback={fallback}
      rootMargin={rootMargin}
      skipLazyLoading={skipLazyLoading}
      className={className}
      ariaLabel={ariaLabel}
    >
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </LazyComponent>
  );
}; 