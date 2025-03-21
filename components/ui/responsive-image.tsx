"use client"

import * as React from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "../../lib/utils"
import { useIsMobile } from "../../hooks/use-mobile"

interface ResponsiveImageProps extends Omit<ImageProps, 'src'> {
  src: {
    mobile?: string;
    desktop?: string;
    default: string;
  };
  aspectRatio?: {
    mobile?: string;
    desktop?: string;
  };
  imgClassName?: string;
  containerClassName?: string;
  fadeIn?: boolean;
}

export function ResponsiveImage({
  src,
  aspectRatio = {
    mobile: "aspect-square",
    desktop: "aspect-video"
  },
  alt,
  width,
  height,
  fill = false,
  imgClassName,
  containerClassName,
  fadeIn = true,
  ...props
}: ResponsiveImageProps) {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  // Determine which source to use
  const imgSrc = React.useMemo(() => {
    if (isMobile && src.mobile) {
      return src.mobile;
    } else if (!isMobile && src.desktop) {
      return src.desktop;
    }
    return src.default;
  }, [isMobile, src]);
  
  // Determine which aspect ratio to use
  const containerAspectRatio = isMobile 
    ? aspectRatio.mobile 
    : aspectRatio.desktop;

  return (
    <div 
      className={cn(
        "relative overflow-hidden", 
        containerAspectRatio,
        containerClassName
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-500",
          fadeIn && !isLoaded ? "opacity-0" : "opacity-100",
          imgClassName
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}

// Dynamic background image component
interface ResponsiveBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  src: {
    mobile?: string;
    desktop?: string;
    default: string;
  };
  children: React.ReactNode;
  overlayColor?: string;
  fadeIn?: boolean;
}

export function ResponsiveBackground({
  src,
  children,
  overlayColor = "bg-black/40",
  fadeIn = true,
  className,
  ...props
}: ResponsiveBackgroundProps) {
  const isMobile = useIsMobile();
  const [isLoaded, setIsLoaded] = React.useState(false);
  
  // Determine which source to use
  const imgSrc = React.useMemo(() => {
    if (isMobile && src.mobile) {
      return src.mobile;
    } else if (!isMobile && src.desktop) {
      return src.desktop;
    }
    return src.default;
  }, [isMobile, src]);
  
  // Preload the image
  React.useEffect(() => {
    const img = new window.Image();
    img.src = imgSrc;
    img.onload = () => setIsLoaded(true);
    
    return () => {
      img.onload = null;
    };
  }, [imgSrc]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-cover bg-center bg-no-repeat",
        fadeIn && isLoaded ? "bg-loaded" : "bg-loading",
        className
      )}
      style={{
        backgroundImage: `url(${imgSrc})`,
        transition: 'opacity 0.5s ease-in-out'
      }}
      {...props}
    >
      <div className={cn("absolute inset-0", overlayColor)} />
      <div className="relative z-10">{children}</div>
    </div>
  );
} 