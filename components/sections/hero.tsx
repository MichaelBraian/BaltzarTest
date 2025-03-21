"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { 
  MotionDiv, 
  MotionH1, 
  MotionP, 
  fadeIn,
  slideUp,
  Parallax
} from "../animation-lib"
import { useAppContext } from "../../contexts/AppContext"
import { useIsMobile } from "../../hooks/use-mobile"

// Define props interface for Hero
interface HeroProps {
  heroRef: React.RefObject<HTMLDivElement>;
}

export const Hero: React.FC<HeroProps> = ({ heroRef }) => {
  // Get modal functions from context
  const { openModal } = useAppContext();
  const isMobile = useIsMobile();
  
  // Parallax scroll effect for hero content and decorative elements
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  // Transform values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <MotionDiv
      ref={heroRef}
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-white pt-16 sm:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating decorative elements - hidden on small mobile devices */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden xs:block">
        <div className="absolute left-[-5%] top-[10%] h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-amber-200 opacity-30 blur-3xl" />
        <div className="absolute right-[-10%] top-[30%] h-64 w-64 sm:h-96 sm:w-96 rounded-full bg-amber-300 opacity-20 blur-3xl" />
        <div className="absolute bottom-[5%] left-[20%] h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-amber-100 opacity-40 blur-3xl" />
      </div>

      {/* Hero content container */}
      <div className="container mx-auto flex flex-col items-center px-4 py-6 sm:py-12 text-center">
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

        {/* Text content with animation */}
        <MotionH1
          className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900"
          variants={slideUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Digital Precision,
          <br /> Personlig Omsorg
        </MotionH1>

        <MotionP
          className="mb-6 sm:mb-8 max-w-xl text-base sm:text-lg md:text-xl text-neutral-700"
          variants={slideUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Välkommen till framtidens tandvård – där teknisk innovation möter omtänksam behandling för bästa resultat.
        </MotionP>

        {/* CTA Buttons */}
        <div className="mb-8 sm:mb-16 flex flex-col space-y-3 w-full sm:w-auto sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button 
            size={isMobile ? "default" : "lg"} 
            onClick={(e) => openModal(
              "Digital Tandvård på Baltzar", 
              `<p>På Baltzar Tandvård kombinerar vi den senaste digitala tekniken med högklassig personlig service för att ge dig bästa möjliga tandvård.</p>
              <p>Vårt team av specialister använder avancerad 3D-scanning, AI-diagnostik och digital planering för precisionsbehandlingar med optimala resultat.</p>
              <p>Vi erbjuder allt från invisalign ortodonti och tandimplantat till estetisk tandvård, allt utformat med digitala verktyg för maximal komfort och minimala ingrepp.</p>
              <p>Boka en tid idag för att uppleva skillnaden med digital tandvård på Baltzar.</p>`,
              e
            )}
            className="group relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 text-white transition-all hover:from-amber-600 hover:to-amber-700 w-full sm:w-auto"
          >
            Boka konsultation
            <span className="absolute inset-0 -z-10 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            size={isMobile ? "default" : "lg"} 
            variant="outline" 
            onClick={(e) => openModal(
              "Om vår klinik", 
              `<p>Baltzar Tandvård representerar en ny generation av tandvårdskliniker där digital teknologi står i centrum för alla behandlingar.</p>
              <p>Vår klinik i centrala Malmö är utrustad med den senaste teknologin för 3D-scanning, digital behandlingsplanering och minimalt invasiva ingrepp.</p>
              <p>Vi har specialister inom:</p>
              <ul>
                <li>Digital implantatbehandling</li>
                <li>Estetisk tandvård</li>
                <li>Ortodonti med Invisalign</li>
                <li>Digital protetik med eget laboratorium</li>
              </ul>
              <p>Välkommen att upptäcka en ny standard inom modern tandvård!</p>`,
              e
            )}
            className="border-amber-200 bg-white text-amber-800 hover:bg-amber-50 w-full sm:w-auto"
          >
            Läs mer om oss
          </Button>
        </div>

        {/* Decorative arrow - parallax effect */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex animate-bounce flex-col items-center">
            <div className="h-6 sm:h-7 w-0.5 bg-amber-300" />
            <div className="mt-1 h-3 w-3 sm:h-4 sm:w-4 rotate-45 border-b-2 border-r-2 border-amber-300" />
          </div>
        </div>
      </div>

      {/* Floating decorative elements with parallax - hidden on small screens */}
      <MotionDiv
        className="pointer-events-none absolute -right-32 top-32 h-64 w-64 rounded-full border border-amber-200 opacity-60 hidden md:block"
        style={{ y }}
      ></MotionDiv>
      <MotionDiv
        className="pointer-events-none absolute -left-16 top-64 h-32 w-32 rounded-full border border-amber-200 opacity-60 hidden md:block"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
      ></MotionDiv>
      <MotionDiv
        className="pointer-events-none absolute bottom-32 left-24 h-48 w-48 animate-pulse rounded-full border border-amber-300 opacity-40 hidden md:block"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{
          opacity: {
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }
        }}
      ></MotionDiv>
    </MotionDiv>
  );
} 