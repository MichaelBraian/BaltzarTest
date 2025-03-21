import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import BackgroundImage, { BackgroundSkeleton } from '@/components/ui/background-image';
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';
import { shouldPrioritizeImage, getResponsiveSizes } from '@/lib/image-utils';
import placeholderImage from '@/public/placeholder.svg';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroSectionProps {
  /**
   * Optional className for the section
   */
  className?: string;
  
  /**
   * Hero title
   */
  title: string;
  
  /**
   * Hero subtitle
   */
  subtitle?: string;
  
  /**
   * Call to action button text
   */
  ctaText?: string;
  
  /**
   * Secondary button text (optional)
   */
  secondaryButtonText?: string;

  /**
   * Call to action button click handler
   */
  onCtaClick?: () => void;
  
  /**
   * Secondary button click handler
   */
  onSecondaryClick?: () => void;
}

/**
 * Hero section component using the default background image
 * 
 * To change the background, simply replace the file at:
 * /public/images/backgrounds/sections/hero/hero-default.webp
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  className,
  title,
  subtitle,
  ctaText = 'Book Appointment',
  secondaryButtonText,
  onCtaClick,
  onSecondaryClick,
}) => {
  // Use the default background image for the hero section
  const { image, isLoading } = useDefaultBackgroundImage('hero');
  
  // Hero sections should prioritize loading
  const isPriority = shouldPrioritizeImage('hero');
  
  // Get the responsive sizes for the hero section
  const sizes = getResponsiveSizes('hero');
  
  // Check if on mobile
  const isMobile = useIsMobile();
  
  return (
    <section className={`relative min-h-[100dvh] ${className || ''}`}>
      <BackgroundImage
        src={image || placeholderImage}
        alt="Hero background"
        isLoading={isLoading}
        loadingPlaceholder={<BackgroundSkeleton />}
        priority={isPriority}
        sizes={sizes}
        overlay="rgba(0,0,0,0.4)"
        overlayOpacity={0.6}
        containerClassName="flex min-h-[100dvh] flex-col items-center justify-center"
      >
        {/* Floating decorative elements - hidden on small mobile devices */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden hidden xs:block">
          <div className="absolute left-[-5%] top-[10%] h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-amber-200 opacity-30 blur-3xl" />
          <div className="absolute right-[-10%] top-[30%] h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-amber-300 opacity-20 blur-3xl" />
          <div className="absolute bottom-[5%] left-[20%] h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-amber-100 opacity-40 blur-3xl" />
        </div>

        {/* Hero content container */}
        <div className="container mx-auto flex flex-col items-center px-4 py-6 sm:py-12 text-center z-10">
          {/* Logo */}
          <div className="mb-4 sm:mb-6 w-full max-w-[200px] sm:max-w-xs">
            <Image
              src="/images/Baltzar_Tandvard.png"
              alt="Baltzar Tandvård"
              width={200}
              height={90}
              className="h-auto w-auto"
              priority
            />
          </div>

          {/* Text content */}
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="mb-6 sm:mb-8 max-w-xl text-base sm:text-lg md:text-xl text-white text-opacity-90">
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="mb-8 sm:mb-16 flex flex-col space-y-3 w-full sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
            {ctaText && (
              <Button 
                size={isMobile ? "default" : "lg"} 
                onClick={onCtaClick}
                className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 text-white transition-all hover:from-amber-600 hover:to-amber-700 w-full sm:w-auto"
              >
                {ctaText}
                <span className="absolute inset-0 -z-10 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
            
            {secondaryButtonText && (
              <Button 
                size={isMobile ? "default" : "lg"} 
                variant="outline" 
                onClick={onSecondaryClick}
                className="border-amber-200 bg-white text-amber-800 hover:bg-amber-50 w-full sm:w-auto"
              >
                {secondaryButtonText}
              </Button>
            )}
          </div>

          {/* Decorative arrow - parallax effect */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
            <div className="flex animate-bounce flex-col items-center">
              <div className="h-6 sm:h-7 w-0.5 bg-amber-300" />
              <div className="mt-1 h-3 w-3 sm:h-4 sm:w-4 rotate-45 border-b-2 border-r-2 border-amber-300" />
            </div>
          </div>
        </div>

        {/* Floating decorative elements - hidden on small screens */}
        <div className="pointer-events-none absolute -right-32 top-32 h-64 w-64 rounded-full border border-amber-200 opacity-60 hidden md:block"></div>
        <div className="pointer-events-none absolute -left-16 top-64 h-32 w-32 rounded-full border border-amber-200 opacity-60 hidden md:block"></div>
        <div className="pointer-events-none absolute bottom-32 left-24 h-48 w-48 animate-pulse rounded-full border border-amber-300 opacity-40 hidden md:block"></div>
      </BackgroundImage>
    </section>
  );
};

export default HeroSection; 