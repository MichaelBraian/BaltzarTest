"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Phone, Mail, FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import BackgroundImage, { BackgroundSkeleton } from '@/components/ui/background-image';
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';
import { shouldPrioritizeImage, getResponsiveSizes } from '@/lib/image-utils';
import placeholderImage from '@/public/placeholder.svg';
import { Button } from '@/components/ui/button';

interface FooterSectionProps {
  /**
   * Optional className for the section
   */
  className?: string;
}

/**
 * Footer section component using the default background image
 * 
 * To change the background, simply replace the file at:
 * /public/images/backgrounds/sections/footer/footer-default.webp
 */
export const FooterSection: React.FC<FooterSectionProps> = ({
  className,
}) => {
  // Use the default background image for the footer section
  const { image, isLoading } = useDefaultBackgroundImage('footer');
  
  // Footer sections should prioritize loading based on visibility
  const isPriority = shouldPrioritizeImage('footer');
  
  // Get the responsive sizes for the footer section
  const sizes = getResponsiveSizes('footer');
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`relative border-t border-amber-100 ${className || ''}`}>
      <BackgroundImage
        src={image || placeholderImage}
        alt="Footer background"
        isLoading={isLoading}
        loadingPlaceholder={<BackgroundSkeleton />}
        priority={isPriority}
        sizes={sizes}
        overlay="#ffffff"
        overlayOpacity={0.98}
      >
        <div className="container mx-auto py-12">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Column 1: Logo and Brief */}
            <div>
              <Link href="/" className="mb-4 inline-block">
                <Image
                  src="/images/Baltzar_Tandvard.png"
                  alt="Baltzar Tandvård"
                  width={160}
                  height={70}
                  className="h-auto w-auto"
                  priority
                />
              </Link>
              <p className="text-neutral-600">
                Avancerad specialisttandvård med digital precision och personlig omsorg.
              </p>
              
              {/* Social Media Links */}
              <div className="mt-6 flex space-x-4">
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon className="h-5 w-5 text-amber-500 hover:text-amber-600 transition-colors" />
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <InstagramIcon className="h-5 w-5 text-amber-500 hover:text-amber-600 transition-colors" />
                </Link>
                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedinIcon className="h-5 w-5 text-amber-500 hover:text-amber-600 transition-colors" />
                </Link>
              </div>
            </div>
            
            {/* Column 2: Services */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Tjänster</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <Link href="#services" className="transition-colors hover:text-amber-600">
                    Digital Implantatbehandling
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="transition-colors hover:text-amber-600">
                    Estetisk Tandvård
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="transition-colors hover:text-amber-600">
                    Invisalign Ortodonti
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="transition-colors hover:text-amber-600">
                    Barntandvård
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="transition-colors hover:text-amber-600">
                    Digital Protetik
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 3: Information */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Information</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <Link href="#about" className="transition-colors hover:text-amber-600">
                    Om oss
                  </Link>
                </li>
                <li>
                  <Link href="#technology" className="transition-colors hover:text-amber-600">
                    Vår teknologi
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="transition-colors hover:text-amber-600">
                    Vårt team
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-amber-600">
                    Integritetspolicy
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="transition-colors hover:text-amber-600">
                    Vanliga frågor
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 4: Contact Information */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Kontakt</h3>
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start">
                  <MapPin className="mr-2 mt-1 h-4 w-4 shrink-0 text-amber-500" />
                  <span>Baltzarsgatan 31<br />211 36 Malmö</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 shrink-0 text-amber-500" />
                  <a href="tel:+4640123456" className="hover:text-amber-600">040-123 45 67</a>
                </li>
                <li className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 shrink-0 text-amber-500" />
                  <a href="mailto:info@baltzartandvard.se" className="hover:text-amber-600">info@baltzartandvard.se</a>
                </li>
                <li className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 shrink-0 text-amber-500" />
                  <span>Mån-Fre: 08:00-17:00</span>
                </li>
              </ul>
              
              {/* Book Button */}
              <div className="mt-6">
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                  onClick={() => {
                    // Open booking modal or navigate to booking page
                    const { openModal } = require("@/contexts/AppContext").useAppContext();
                    openModal(
                      "Boka tid",
                      `<p>För att boka en tid hos oss, vänligen ring oss på <a href="tel:+4640123456" class="text-amber-500 hover:underline">040-123 45 67</a> eller fyll i <a href="#contact" class="text-amber-500 hover:underline">kontaktformuläret</a> så återkommer vi till dig så snart som möjligt.</p>`
                    );
                  }}
                >
                  Boka tid
                </Button>
              </div>
            </div>
          </div>
          
          {/* Copyright and Legal Links */}
          <div className="mt-8 border-t border-amber-100 pt-8 text-center text-sm text-neutral-500">
            <p>© {currentYear} Baltzar Tandvård. Alla rättigheter förbehållna.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <Link href="/terms" className="hover:text-amber-600 transition-colors">
                Användarvillkor
              </Link>
              <Link href="/privacy" className="hover:text-amber-600 transition-colors">
                Integritetspolicy
              </Link>
              <Link href="/cookies" className="hover:text-amber-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </BackgroundImage>
    </footer>
  );
};

export default FooterSection; 