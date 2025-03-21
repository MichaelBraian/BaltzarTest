import React, { useState, useRef, useCallback } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  Cpu, 
  Smile, 
  Layers, 
  FlaskConical, 
  Users, 
  ChevronRight,
  X
} from "lucide-react"
import BackgroundImage, { BackgroundSkeleton } from '@/components/ui/background-image';
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';
import { shouldPrioritizeImage, getResponsiveSizes } from '@/lib/image-utils';
import placeholderImage from '@/public/placeholder.svg';
import { ResponsiveGrid } from "@/components/ui/responsive-container";
import { Reveal, StaggerItem } from "@/components/animation-lib";

interface ServicesSectionProps {
  /**
   * Optional className for the section
   */
  className?: string;
}

// Define service type
interface ServiceItem {
  title: string;
  description: string;
  expandedDescription?: string;
  icon: React.ReactNode;
  gradient: string;
}

/**
 * Services section component using the default background image
 * 
 * To change the background, simply replace the file at:
 * /public/images/backgrounds/sections/services/services-default.webp
 */
export const ServicesSection: React.FC<ServicesSectionProps> = ({
  className,
}) => {
  // Use the default background image for the services section
  const { image, isLoading } = useDefaultBackgroundImage('services');
  
  // Services sections should prioritize loading based on visibility
  const isPriority = shouldPrioritizeImage('services');
  
  // Get the responsive sizes for the services section
  const sizes = getResponsiveSizes('services');
  
  const [activePopover, setActivePopover] = useState<number | null>(null);
  
  // References for the popover contents
  const popoverRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Reference assignment callback
  const setPopoverRef = useCallback((el: HTMLDivElement | null, index: number) => {
    popoverRefs.current[index] = el;
  }, []);
  
  // Service items array
  const serviceItems: ServiceItem[] = [
    {
      title: "Digital Implantatbehandling",
      description: "Planerad och utförd med 3D-teknik för bästa resultat och minimala ingrepp.",
      expandedDescription: `<p>Våra digitala implantatbehandlingar representerar det absolut senaste inom modern tandvård. Genom att kombinera 3D röntgen, digital scanning och datorassisterad kirurgi kan vi:</p>
      <ul>
        <li>Planera exakt placering av tandimplantat virtuellt innan behandlingen börjar</li>
        <li>Tillverka precisionsguider för kirurgisk placering</li>
        <li>Minimera kirurgiska ingrepp och minska återhämtningstiden</li>
        <li>Uppnå bättre estetiska och funktionella resultat</li>
        <li>Skapa en förutsägbar och säker behandlingsprocess</li>
      </ul>
      <p>Denna teknik gör att vi kan genomföra implantatbehandlingar med högre precision, mindre obehag och bättre slutresultat än med traditionella metoder.</p>`,
      icon: <Cpu className="h-6 w-6 text-amber-500" />,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "Estetisk Tandvård",
      description: "Förbättra ditt leende med fasader, kronor och blekning designade för ett naturligt resultat.",
      expandedDescription: `<p>Vår estetiska tandvård kombinerar vetenskap och konst för att skapa vackra leenden som ser naturliga ut och håller länge.</p>
      <p>Vi erbjuder en rad estetiska behandlingar, inklusive:</p>
      <ul>
        <li>Porslinsfasader - tunna skal som fästs på framsidan av tänderna för att korrigera missfärgningar, ojämnheter eller mellanrum</li>
        <li>Keramiska kronor - fullständiga "kåpor" som återställer skadade tänder med både funktion och utseende</li>
        <li>Tandblekning - professionella system för effektiv och skonsam uppljusning av tänderna</li>
        <li>Estetiska kompositfyllningar - tandfärgade fyllningar som är både funktionella och estetiska</li>
        <li>Tandsmycken och andra estetiska detaljer</li>
      </ul>
      <p>Med hjälp av digital fotografering och virtuell planering kan du se ditt nya leende innan behandlingen ens påbörjas.</p>`,
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      gradient: "from-pink-400 to-pink-600",
    },
    {
      title: "Allmän Tandvård",
      description: "Regelbunden vård med fokus på prevention och långsiktig tandhälsa.",
      expandedDescription: `<p>Vi erbjuder alla typer av allmän tandvård med fokus på förebyggande behandling och långsiktig munhälsa.</p>
      <p>Våra allmänna tandvårdstjänster inkluderar:</p>
      <ul>
        <li>Omfattande undersökningar med digital röntgen för tidig diagnostik</li>
        <li>Professionell tandrengöring och munhygienråd</li>
        <li>Estetiska tandfyllningar med moderna material</li>
        <li>Rotbehandlingar med avancerad teknik för bättre resultat</li>
        <li>Behandling av tandköttsproblem och förebyggande av tandlossning</li>
        <li>Stöd och råd för hemmarutiner som främjar god munhälsa</li>
      </ul>
      <p>Vi lägger stor vikt vid tidig diagnos och förebyggande behandling för att undvika mer omfattande och kostsamma behandlingar i framtiden.</p>`,
      icon: <Stethoscope className="h-6 w-6 text-amber-500" />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Barntandvård",
      description: "Trygg och positiv tandvårdsupplevelse för de yngsta patienterna.",
      expandedDescription: `<p>På Baltzar Tandvård har vi specialiserat oss på att göra tandvårdsbesök till en positiv upplevelse även för våra yngsta patienter.</p>
      <p>Vår barntandvård omfattar:</p>
      <ul>
        <li>Åldersanpassade undersökningar och behandlingar</li>
        <li>Förebyggande tandvård med fluorbehandlingar och fissurförseglingar</li>
        <li>Lekfull introduktion till tandborstning och munhygien</li>
        <li>Skonsamma behandlingar med extra fokus på smärtfrihet</li>
        <li>Digital röntgen med minimal strålning</li>
        <li>Rådgivning till föräldrar om kost, vanor och tandvårdsrutiner</li>
      </ul>
      <p>Vi bygger trygga relationer med barnen från tidig ålder för att främja en livslång positiv inställning till tandvård och förebygga tandvårdsrädsla.</p>`,
      icon: <Smile className="h-6 w-6 text-amber-500" />,
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Invisalign Ortodonti",
      description: "Osynlig tandreglering för både vuxna och ungdomar.",
      expandedDescription: `<p>Invisalign är ett modernt alternativ till traditionell tandställning, där genomskinliga, avtagbara aligners används för att gradvis flytta tänderna till rätt position.</p>
      <p>Fördelarna med Invisalign inkluderar:</p>
      <ul>
        <li>Nästan osynliga skenor som få andra lägger märke till</li>
        <li>Avtagbara aligners som gör det möjligt att äta, borsta och använda tandtråd som vanligt</li>
        <li>Digital planering där du kan se slutresultatet innan behandlingen börjar</li>
        <li>Färre besök på kliniken jämfört med konventionell tandreglering</li>
        <li>Ofta kortare behandlingstid än med traditionell ortodonti</li>
        <li>Ökad komfort utan metallbågar och trådar</li>
      </ul>
      <p>Som certifierade Invisalign-behandlare erbjuder vi detta alternativ för både vuxna och ungdomar som vill rätta till sneda tänder diskret och bekvämt.</p>`,
      icon: <Layers className="h-6 w-6 text-amber-500" />,
      gradient: "from-amber-400 to-amber-600",
    },
    {
      title: "Digital Protetik",
      description: "Skräddarsydda proteser designade och tillverkade med digital precision.",
      expandedDescription: `<p>Vår digitala protetik representerar nästa generation av tandersättningar med överlägsna resultat på både funktion och estetik.</p>
      <p>Vi erbjuder digitalt designade och tillverkade:</p>
      <ul>
        <li>Kronor och broar med perfekt passform och funktion</li>
        <li>Implantatstödda konstruktioner för enstaka tänder eller hela bettet</li>
        <li>Partiella och helproteser med optimal komfort</li>
        <li>Bettskydd och snarkskynor</li>
        <li>Temporära proteser tillverkade på plats med 3D-skrivare</li>
      </ul>
      <p>Genom att använda digital scanning istället för konventionella avtryck får vi exakta digitala modeller av dina tänder, vilket resulterar i proteser med bättre passform, utseende och funktion.</p>
      <p>Vårt eget digitala laboratorium möjliggör snabbare leverans och högre precision än med traditionella protetiska lösningar.</p>`,
      icon: <FlaskConical className="h-6 w-6 text-amber-500" />,
      gradient: "from-red-400 to-red-600",
    },
  ];
  
  return (
    <section id="services" className={`relative min-h-screen ${className || ''}`}>
      <BackgroundImage
        src={image || placeholderImage}
        alt="Services background"
        isLoading={isLoading}
        loadingPlaceholder={<BackgroundSkeleton />}
        priority={isPriority}
        sizes={sizes}
        overlay="rgba(0,0,0,0.5)"
        overlayOpacity={0.7}
      >
        <div className="container mx-auto py-12 sm:py-16 lg:py-20 flex flex-col items-center w-full">
          <Reveal className="w-full text-center">
            <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-white md:text-4xl w-full mx-auto">
              Våra Behandlingar
            </h2>
            <p className="mx-auto mb-8 sm:mb-12 lg:mb-16 max-w-5xl text-center text-base sm:text-lg text-white text-opacity-90">
              På Baltzar Tandvård erbjuder vi allt från allmän tandvård till specialiserade behandlingar med digital precision.
            </p>
          </Reveal>

          <ResponsiveGrid 
            columns={{ 
              xs: 1, 
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3
            }} 
            gap="gap-8 lg:gap-10" 
            className="mb-8 sm:mb-12 w-full"
          >
            {serviceItems.map((service, index) => (
              <StaggerItem key={service.title}>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="mb-5 text-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-amber-100 mb-4 mx-auto">
                      <div className="flex items-center justify-center w-8 h-8">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                  </div>
                  
                  <div className="mt-auto text-center">
                    {service.expandedDescription && (
                      <div className="relative">
                        <button
                          onClick={() => setActivePopover(activePopover === index ? null : index)}
                          className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                          aria-expanded={activePopover === index}
                          aria-controls={`service-content-${index}`}
                        >
                          Läs mer
                          <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${
                            activePopover === index ? "rotate-90" : ""
                          }`} />
                        </button>
                        
                        {/* Popover content */}
                        {activePopover === index && (
                          <div 
                            className="absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-lg sm:w-[500px] md:w-[550px] p-5 bg-white rounded-lg shadow-lg border border-amber-100 text-left"
                            id={`service-content-${index}`}
                            ref={(el) => setPopoverRef(el, index)}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-bold text-neutral-900">{service.title}</h4>
                              <button 
                                onClick={() => setActivePopover(null)}
                                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                aria-label="Stäng"
                              >
                                <X className="h-5 w-5" />
                              </button>
                            </div>
                            <div 
                              className="prose prose-sm max-w-none text-neutral-700" 
                              dangerouslySetInnerHTML={{ __html: service.expandedDescription ?? '' }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </ResponsiveGrid>
        </div>
      </BackgroundImage>
    </section>
  );
};

export default ServicesSection; 