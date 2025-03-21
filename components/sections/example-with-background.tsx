import React from 'react';
import BackgroundImage, { BackgroundSkeleton } from '@/components/ui/background-image';
import useBackgroundImage from '@/lib/hooks/use-background-image';
import { shouldPrioritizeImage, getResponsiveSizes, ImageFormat, SectionName } from '@/lib/image-utils';
import placeholderImage from '@/public/placeholder.svg';

interface ExampleSectionProps {
  /**
   * The section name (determines which default background to use)
   */
  section: SectionName;
  
  /**
   * Optional className for the section
   */
  className?: string;
  
  /**
   * Section content
   */
  children: React.ReactNode;
  
  /**
   * Section title
   */
  title: string;
  
  /**
   * Image format to use (default: webp)
   */
  imageFormat?: ImageFormat;
  
  /**
   * Optional custom background image to use instead of the default
   * If not provided, will use the standardized default for the section
   */
  customBackground?: string;
}

/**
 * Get the default background image name for a section
 * @param section The section name
 * @returns The default background image name
 */
function getDefaultBackgroundName(section: SectionName): string {
  return `${section}-default`;
}

/**
 * Example section component with a background image
 * This shows how to use the background image utilities with standardized defaults
 */
const ExampleSection: React.FC<ExampleSectionProps> = ({
  section,
  className,
  children,
  title,
  imageFormat = 'webp',
  customBackground,
}) => {
  // Use the background image hook with standardized default or custom background
  const backgroundName = customBackground || getDefaultBackgroundName(section);
  
  const { image, isLoading } = useBackgroundImage(section, backgroundName, {
    format: imageFormat,
  });
  
  // Determine if this image should be prioritized for loading
  const isPriority = shouldPrioritizeImage(section);
  
  // Get appropriate responsive sizing based on the section
  const sizes = getResponsiveSizes(section);
  
  return (
    <section className={`relative min-h-screen ${className || ''}`}>
      <BackgroundImage
        src={image || placeholderImage}
        alt={`${title} background`}
        isLoading={isLoading}
        loadingPlaceholder={<BackgroundSkeleton />}
        priority={isPriority}
        sizes={sizes}
        overlay="rgba(0,0,0,0.6)"
        overlayOpacity={0.7}
      >
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-10 text-center">
            {title}
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none">
            {children}
          </div>
        </div>
      </BackgroundImage>
    </section>
  );
};

export default ExampleSection; 