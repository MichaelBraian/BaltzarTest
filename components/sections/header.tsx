"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Phone, Menu, X } from "lucide-react"
import { Button } from "../ui/button"
import { MotionDiv } from "../animation-lib"

interface HeaderProps {
  isScrolled: boolean;
  isHeaderVisible: boolean;
  headerRef: React.RefObject<HTMLElement>;
}

export const Header: React.FC<HeaderProps> = ({ 
  isScrolled, 
  isHeaderVisible, 
  headerRef 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <header
        ref={headerRef}
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled ? 'border-b border-amber-100 py-2 shadow-sm' : 'py-4'
        } ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="block">
            <Image
              src="/images/Baltzar_Tandvard.png"
              alt="Baltzar Tandvård"
              width={160}
              height={70}
              className="h-auto w-auto"
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            <Link href="#services" className="text-sm font-medium text-neutral-800 transition-colors hover:text-amber-600">
              Tjänster
            </Link>
            <Link href="#technology" className="text-sm font-medium text-neutral-800 transition-colors hover:text-amber-600">
              Teknologi
            </Link>
            <Link href="#about" className="text-sm font-medium text-neutral-800 transition-colors hover:text-amber-600">
              Om oss
            </Link>
            <Link href="/staff" className="text-sm font-medium text-neutral-800 transition-colors hover:text-amber-600">
              Personal
            </Link>
            <Link href="#contact" className="text-sm font-medium text-neutral-800 transition-colors hover:text-amber-600">
              Kontakt
            </Link>
            <Button 
              size="sm" 
              className="ml-4 bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            >
              Boka tid
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-amber-50 md:hidden"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Öppna meny"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
      
      {/* Mobile menu overlay */}
      <MotionDiv
        className={`fixed inset-0 z-50 flex flex-col bg-white ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="flex items-center justify-between border-b border-amber-100 p-4">
          <Link href="/" className="block">
            <Image
              src="/images/Baltzar_Tandvard.png"
              alt="Baltzar Tandvård"
              width={160}
              height={70}
              className="h-auto w-auto"
            />
          </Link>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-800 transition-colors hover:bg-amber-50"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Stäng meny"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-4">
            <li>
              <Link
                href="#services"
                className="block rounded-lg p-3 text-lg font-medium text-neutral-800 transition-colors hover:bg-amber-50 hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Tjänster
              </Link>
            </li>
            <li>
              <Link
                href="#technology"
                className="block rounded-lg p-3 text-lg font-medium text-neutral-800 transition-colors hover:bg-amber-50 hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Teknologi
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="block rounded-lg p-3 text-lg font-medium text-neutral-800 transition-colors hover:bg-amber-50 hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Om oss
              </Link>
            </li>
            <li>
              <Link
                href="/staff"
                className="block rounded-lg p-3 text-lg font-medium text-neutral-800 transition-colors hover:bg-amber-50 hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Personal
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block rounded-lg p-3 text-lg font-medium text-neutral-800 transition-colors hover:bg-amber-50 hover:text-amber-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border-t border-amber-100 p-4">
          <Button 
            className="w-full bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Boka tid
          </Button>
          <div className="mt-4 space-y-2 text-sm text-neutral-600">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-amber-500" />
              <span>Baltzarsgatan 31, 211 36 Malmö</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-amber-500" />
              <span>040-123 45 67</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-amber-500" />
              <span>Mån-Fre: 08:00-17:00</span>
            </div>
          </div>
        </div>
      </MotionDiv>
    </>
  );
} 