import React from 'react';
import { Baby, Award } from "lucide-react";
import BackgroundImage, { BackgroundSkeleton } from '@/components/ui/background-image';
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';
import { shouldPrioritizeImage, getResponsiveSizes, SectionName } from '@/lib/image-utils';
import placeholderImage from '@/public/placeholder.svg';
import { Reveal, StaggerItem } from "@/components/animation-lib";
import { ResponsiveGrid } from "@/components/ui/responsive-container";

interface RegionSkaneSectionProps {
  /**
   * Optional className for the section
   */
  className?: string;
}

// Define feature item type
interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

/**
 * Region Skåne section component using the default background image
 * 
 * To change the background, simply replace the file at:
 * /public/images/backgrounds/sections/region-skane/region-skane-default.webp
 */
export const RegionSkaneSection: React.FC<RegionSkaneSectionProps> = ({
  className,
}) => {
  // Use the default background image for the region-skane section
  const { image, isLoading } = useDefaultBackgroundImage('region-skane');
  
  // Section should prioritize loading based on visibility
  const isPriority = shouldPrioritizeImage('region-skane');
  
  // Get the responsive sizes for the section
  const sizes = getResponsiveSizes('region-skane');
  
  // Feature items
  const featureItems: FeatureItem[] = [
    {
      title: "Kostnadsfri tandvård upp till 19 år",
      description: "Vi erbjuder kostnadsfri specialisttandvård för barn och unga vuxna i åldern 0–19 år, i enlighet med vårt avtal med Region Skåne.",
      icon: <Baby className="h-8 w-8 text-amber-500" />,
    },
    {
      title: "Specialisttandvård på remiss",
      description: "Vi tar emot remisser för protetik och parodontologi och erbjuder specialistvård för både barn och vuxna. Vi rehabiliterar våra patienter med samma höga omsorg, oavsett ålder, och lägger stor vikt vid materialval, avancerad teknik och ett professionellt bemötande. I samråd med din tandläkare kan du välja vår specialistklinik för en individuellt anpassad och högkvalitativ behandling.",
      icon: <Award className="h-8 w-8 text-amber-500" />,
    },
  ];
  
  return (
    <section id="region-skane" className={`relative ${className || ''}`}>
      <BackgroundImage
        src={image || placeholderImage}
        alt="Region Skåne background"
        isLoading={isLoading}
        loadingPlaceholder={<BackgroundSkeleton />}
        priority={isPriority}
        sizes={sizes}
        overlay="rgba(0,0,0,0.5)"
        overlayOpacity={0.7}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <Reveal className="w-full text-center mb-12">
            <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-white md:text-4xl">
              Specialisttandvård för barn och unga vuxna i samarbete med Region Skåne
            </h2>
            <p className="mx-auto max-w-4xl text-center text-base sm:text-lg text-white text-opacity-90">
              Kostnadsfri tandvård för barn och unga vuxna upp till 19 år
            </p>
          </Reveal>
          
          <ResponsiveGrid 
            columns={{ 
              xs: 1, 
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2
            }} 
            gap="gap-8 lg:gap-10" 
            className="mb-8 sm:mb-12 w-full"
          >
            {featureItems.map((feature, index) => (
              <StaggerItem key={feature.title}>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-amber-100 mb-6 mx-auto">
                    <div className="flex items-center justify-center w-8 h-8">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </ResponsiveGrid>
          
          <div className="flex justify-center mt-8">
            <a 
              href="https://www.1177.se/hitta-vard/kontaktkort/Baltzar-Tandvard-MB-Oral-Protetik-Malmo/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              1177.se
            </a>
          </div>
        </div>
      </BackgroundImage>
    </section>
  );
};

export default RegionSkaneSection; 