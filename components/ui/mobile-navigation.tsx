"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { Menu, X, Phone, ChevronRight, Clock, MapPin } from "lucide-react"
import { Button } from "./button"
import { useIsMobile, useIsTouchDevice } from "../../hooks/use-mobile"
import { MotionDiv, MotionLi } from "./motion"

interface MobileNavigationProps {
  links: Array<{
    label: string;
    href: string;
  }>;
  logo: {
    src: string;
    alt: string;
  };
  contact?: {
    phone?: string;
    hours?: string;
    address?: string;
  };
}

export function MobileNavigation({ 
  links, 
  logo, 
  contact = {} 
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const isTouch = useIsTouchDevice();
  
  // Prevent body scrolling when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Close menu when user presses Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  
  // Only render for mobile screens
  if (!isMobile) return null;
  
  return (
    <>
      {/* Mobile menu toggle button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className="relative md:hidden touch-target z-30"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </Button>
      
      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
      
      {/* Menu panel */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-md bg-white shadow-xl z-50 flex flex-col md:hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-amber-100">
              <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={40}
                  style={{ height: '36px', width: 'auto' }}
                  priority
                />
              </Link>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={closeMenu}
                className="border-amber-200 text-amber-600 shadow-sm h-10 w-10 touch-target"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Swipe indicator */}
            <div className="w-16 h-1 bg-amber-200/60 rounded-full mx-auto my-4"></div>
            
            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-4 pb-20">
              <ul className="flex flex-col gap-2">
                {links.map((link, index) => (
                  <MotionLi
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-4 text-lg font-medium text-neutral-800 hover:text-amber-600 transition-colors border-b border-neutral-100"
                      onClick={closeMenu}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-5 w-5 text-amber-500" />
                    </Link>
                  </MotionLi>
                ))}
              </ul>
              
              {/* Contact info */}
              {(contact.phone || contact.hours || contact.address) && (
                <div className="mt-8 space-y-4 border-t border-neutral-100 pt-6">
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                    Kontaktuppgifter
                  </h3>
                  
                  {contact.phone && (
                    <div className="flex items-center gap-3 text-neutral-700">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                        <Phone className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Telefon</p>
                        <a 
                          href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                          className="text-base font-medium hover:text-amber-600"
                        >
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {contact.hours && (
                    <div className="flex items-center gap-3 text-neutral-700">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Öppettider</p>
                        <p className="text-base font-medium">{contact.hours}</p>
                      </div>
                    </div>
                  )}
                  
                  {contact.address && (
                    <div className="flex items-center gap-3 text-neutral-700">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                        <MapPin className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-500">Adress</p>
                        <p className="text-base font-medium">{contact.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </nav>
            
            {/* Action buttons */}
            <div className="sticky bottom-0 left-0 right-0 border-t border-amber-100 bg-white py-4 px-4 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
              {contact.phone && (
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-6" asChild>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Ring oss
                  </a>
                </Button>
              )}
              <Button className="flex-1 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6" asChild>
                <Link href="#boka" onClick={closeMenu}>
                  Boka tid
                </Link>
              </Button>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
} 