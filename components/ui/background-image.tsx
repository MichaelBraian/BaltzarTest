import React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface BackgroundImageProps extends Omit<ImageProps, 'alt'> {
  /**
   * Optional CSS class to apply to the container
   */
  containerClassName?: string;
  
  /**
   * Optional CSS class to apply to the image
   */
  imageClassName?: string;
  
  /**
   * Optional overlay color (e.g., 'rgba(0,0,0,0.5)')
   */
  overlay?: string;
  
  /**
   * Overlay opacity (0-1)
   */
  overlayOpacity?: number;
  
  /**
   * Children to render on top of the background
   */
  children?: React.ReactNode;
  
  /**
   * Alt text for the background image
   */
  alt: string;
  
  /**
   * Whether the image is currently loading
   */
  isLoading?: boolean;
  
  /**
   * Optional skeleton/placeholder to show while loading
   */
  loadingPlaceholder?: React.ReactNode;
}

/**
 * A reusable component for adding background images to sections
 * with proper optimization and responsive handling
 */
export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt,
  containerClassName,
  imageClassName,
  overlay,
  overlayOpacity = 0.5,
  children,
  priority = false,
  quality = 85,
  sizes = '100vw',
  isLoading = false,
  loadingPlaceholder,
  ...props
}) => {
  return (
    <div className={cn('relative w-full h-full overflow-hidden', containerClassName)}>
      {isLoading && loadingPlaceholder ? (
        <>{loadingPlaceholder}</>
      ) : (
        src && (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            quality={quality}
            sizes={sizes}
            className={cn(
              'object-cover w-full h-full transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100',
              imageClassName
            )}
            {...props}
          />
        )
      )}
      
      {overlay && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: overlay,
            opacity: overlayOpacity,
          }}
          aria-hidden="true"
        />
      )}
      
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * Simple skeleton loader for background images
 */
export const BackgroundSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div 
    className={cn(
      "absolute inset-0 bg-gray-200 animate-pulse", 
      className
    )}
    aria-hidden="true"
  />
);

export default BackgroundImage; 