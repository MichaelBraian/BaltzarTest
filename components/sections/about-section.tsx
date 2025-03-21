"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { 
  Award, 
  HeartHandshake, 
  Microscope, 
  Users,
  Sparkles,
  ChevronRight,
  X
} from "lucide-react"
import { 
  MotionDiv, 
  Reveal, 
  MotionImg,
  StaggerChildren,
  StaggerItem,
  Parallax
} from "../animation-lib"
import { ResponsiveGrid } from "../ui/responsive-container"
import { TechCard } from "../ui/tech-card"
import BackgroundImage, { BackgroundSkeleton } from '@/components/ui/background-image';
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';
import { shouldPrioritizeImage, getResponsiveSizes } from '@/lib/image-utils';
import placeholderImage from '@/public/placeholder.svg';

interface AboutSectionProps {
  /**
   * Optional className for the section
   */
  className?: string;
}

// Define team member type
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

// Define value item type
interface ValueItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  expandedDescription?: string;
}

/**
 * About section component using the default background image
 * 
 * To change the background, simply replace the file at:
 * /public/images/backgrounds/sections/about/about-default.webp
 */
export const AboutSection: React.FC<AboutSectionProps> = ({
  className,
}) => {
  // Use the default background image for the about section
  const { image, isLoading } = useDefaultBackgroundImage('about');
  
  // About sections should prioritize loading based on visibility
  const isPriority = shouldPrioritizeImage('about');
  
  // Get the responsive sizes for the about section
  const sizes = getResponsiveSizes('about');
  
  // Team members array with updated information
  const teamMembers: TeamMember[] = [
    {
      name: "Michael Braian",
      role: "Specialist oral protetik, odontologisk doktor, tandtekniker, delägare",
      image: "/images/staff/doctor1.png",
      bio: "Michael är en mångfacetterad specialist i protetik som kombinerar djup teoretisk kunskap med praktisk skicklighet. Med en dubbelexamen som tandläkare och tandtekniker har han unika förutsättningar att hantera hela behandlingsprocessen, från design till färdigt arbete. Hans karriär inkluderar 12 år som lärare vid Tandvårdshögskolan i Malmö och han har även forskat om digitala metoder inom tandvården. År 2018 avslutade han sin forskning med en disputation. Michael är en pionjär i användningen av 3D-scanning av tänder och dess integration i patientbehandling, något han passionerat föreläser om i Skandinavien. Hans entusiasm för yrket och lättsamma natur gör honom till en omtyckt kollega och uppskattad vårdgivare.",
    },
    {
      name: "Arman Ameri",
      role: "Specialist oral protetik, delägare",
      image: "/images/staff/doctor2.png",
      bio: "Arman är en stolt medgrundare till Baltzar Tandvård samt specialisttandläkare inom oral protetik. Med en djupgående passion för estetisk tandvård och omfattande restaurativa procedurer, är hans mål att återskapa vackra leenden och främja tandhälsan genom innovativa och beprövade metoder. Hans expertis inom protetik spänner över allt från enkla ingrepp till komplexa rehabiliteringar, som kräver noggrann planering och precision. I sitt arbete kombinerar han hantverk och vetenskap för att skapa funktionella och estetiskt tilltalande tandlösningar som är skräddarsydda för varje patients unika behov. Arman är djupt engagerad i att skapa en välkomnande och stödjande miljö där patienterna känner sig trygga och väl omhändertagna. Han är dedikerad till att erbjuda högsta möjliga kvalitet på tandvård och en patientupplevelse som är både bekväm och resultatinriktad.",
    },
    {
      name: "Filip Rebelo Dessborn",
      role: "Legitimerad tandläkare",
      image: "/images/staff/doctor3.png",
      bio: "Filip har en gedigen erfarenhet som tandläkare med ett särskilt intresse för Oral Protetik, ett område han fördjupade sig i efter att ha startat sin karriär inom tandteknik. Han har mångårig erfarenhet som lärare vid Tandvårdshögskolan i Malmö och är nu verksamhetschef på kliniken. Filip är känd för sitt lugna och metodiska arbetssätt, vilket gör honom särskilt omtyckt bland patienter som kan känna oro inför tandvårdsbesök. Han erbjuder allt från allmäntandvård till mer avancerade behandlingar för bettrehabilitering på tänder och implantat."
    },
    {
      name: "Daniel Jönson",
      role: "Specialist parodontologi, Docent",
      image: "/images/staff/doctor4.png",
      bio: "Daniel är specialisttandläkare i parodontologi samt docent inom parodontologi och internmedicinsk forskning. Han har alltid jobbat kliniskt vid sidan av forskningen med stort patientfokus och särskilt intresse för sambandet mellan munhälsa och allmänhälsa. Daniel behandlar tandlossningssjukdomar, infektioner vid tandimplantat, tandköttsretraktioner och utför komplicerade implantatinstallationer."
    },
    {
      name: "Malin Andersson",
      role: "Tandhygienist",
      image: "/images/staff/hygienist1.png",
      bio: "Malin är en dynamisk tandhygienist som också assisterar tandläkarna. Med sitt stora intresse för tandvård har hon snabbt blivit en ovärderlig del av vårt team. Malins engagemang och noggrannhet i patientvården bidrar till att alla känner sig välkomna och trygga. Hon är alltid redo att lära sig nya tekniker och strävar efter att ge bästa möjliga vård till våra patienter."
    },
    {
      name: "Johanna Nielsen",
      role: "Tandhygienist",
      image: "/images/staff/hygienist2.png",
      bio: "Johanna är en ovärderlig medlem i vårt team och har en gedigen bakgrund inom tandvård samt erfarenhet från ortopedi och förlossningsvård. Hon tar hand om sina egna patienter och bistår även med assistans, vilket gör henne till ett centralt kugghjul i kliniken. Johanna är djupt engagerad i sitt arbete och har en passion för att hjälpa människor leva ett hälsosammare liv med ett strålande leende."
    },
    {
      name: "Samra Salama",
      role: "Tandsköterska",
      image: "/images/staff/assistant1.jpg",
      bio: "Samra Salama har lång erfarenhet inom digital tandvård och hjälper till med att säkerställa en bekväm och trygg patientupplevelse."
    }
  ];
  
  // State for UI interactions and animations
  const [isMounted, setIsMounted] = useState(false);
  const [activeValuePopover, setActiveValuePopover] = useState<number | null>(null);
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);
  
  // References for the popover contents
  const valuePopoverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const teamMemberPopoverRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Global click event handler to close value popovers when clicking outside
  useEffect(() => {
    if (activeValuePopover === null) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const activeRef = valuePopoverRefs.current[activeValuePopover];
      if (activeRef && !activeRef.contains(event.target as Node)) {
        setActiveValuePopover(null);
      }
    };
    
    // Add click listener to detect clicks outside the active popover
    document.addEventListener('mousedown', handleClickOutside);
    
    // Add escape key handler to close popover with keyboard
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveValuePopover(null);
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeValuePopover]);
  
  // Global click event handler to close team member popovers when clicking outside
  useEffect(() => {
    if (activeTeamMember === null) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const activeRef = teamMemberPopoverRefs.current[activeTeamMember];
      if (activeRef && !activeRef.contains(event.target as Node)) {
        setActiveTeamMember(null);
      }
    };
    
    // Add click listener to detect clicks outside the active popover
    document.addEventListener('mousedown', handleClickOutside);
    
    // Add escape key handler to close popover with keyboard
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTeamMember(null);
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeTeamMember]);
  
  // Reference assignment callbacks
  const setValuePopoverRef = useCallback((el: HTMLDivElement | null, index: number) => {
    valuePopoverRefs.current[index] = el;
  }, []);
  
  const setTeamMemberPopoverRef = useCallback((el: HTMLDivElement | null, index: number) => {
    teamMemberPopoverRefs.current[index] = el;
  }, []);
  
  // Ensure component is mounted on client-side
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Clinic values array
  const values: ValueItem[] = [
    {
      title: "Digital Precision",
      description: "Vi kombinerar den senaste digitala teknologin med klinisk expertis för att leverera behandlingar med mikrometerprecision.",
      icon: <Microscope className="h-8 w-8 text-amber-500" />,
      expandedDescription: `<p>Digital precision är kärnan i vår filosofi på Baltzar Tandvård. Vi använder avancerad 3D-scanning, CAD/CAM-teknologi och datorstödd behandlingsplanering för att uppnå resultat med mikrometerprecision.</p>
      <p>Fördelar med vår digitala precision:</p>
      <ul>
        <li>Minimalt invasiva ingrepp som bevarar mer av din naturliga tandstruktur</li>
        <li>Exakt passform för kronor, broar och proteser</li>
        <li>Precisionsimplantat med optimal placering</li>
        <li>Förbättrad diagnostik med högupplöst bildtagning</li>
        <li>Förutsägbara resultat genom digital planering</li>
      </ul>
      <p>Genom att kombinera digital teknologi med klinisk expertis kan vi erbjuda behandlingar som tidigare var omöjliga att genomföra med traditionella metoder.</p>`,
    },
    {
      title: "Patientkomfort",
      description: "Våra digitala verktyg och minimalt invasiva metoder gör tandvården bekvämare och mindre smärtsam för våra patienter.",
      icon: <HeartHandshake className="h-8 w-8 text-amber-500" />,
      expandedDescription: `<p>Patientkomfort är en central prioritet i allt vi gör på Baltzar Tandvård. Vi har designat hela vår kliniska process för att minimera obehag och maximera din bekvämlighet.</p>
      <p>Våra digitala verktyg bidrar till en bekvämare upplevelse genom:</p>
      <ul>
        <li>Digital avtryckstagning utan obehagliga avtrycksmaterial</li>
        <li>Kortare behandlingstider genom effektiva digitala arbetsflöden</li>
        <li>Mindre invasiva ingrepp med snabbare läkningstid</li>
        <li>Tydlig visuell kommunikation om din behandling</li>
        <li>Lugnande miljö med moderna bekvämligheter</li>
      </ul>
      <p>Vi förstår att många känner oro inför tandvårdsbesök, och vår digitala approach är utformad för att göra din upplevelse så bekväm och stressfri som möjligt.</p>`,
    },
    {
      title: "Banbrytande Innovation",
      description: "Vi ligger i framkant inom digital tandvård och integrerar kontinuerligt nya teknologier och metoder i vår praktik.",
      icon: <Sparkles className="h-8 w-8 text-amber-500" />,
      expandedDescription: `<p>Innovation är en grundpelare i vår verksamhet på Baltzar Tandvård. Vi ser det som vårt uppdrag att ständigt utforska, utvärdera och implementera nya teknologier och metoder som förbättrar tandvården.</p>
      <p>Vårt engagemang för innovation inkluderar:</p>
      <ul>
        <li>Kontinuerlig utbildning och fortbildning för hela vårt team</li>
        <li>Deltagande i forskningsprojekt och kliniska studier</li>
        <li>Samarbeten med ledande teknologiutvecklare</li>
        <li>Regelbunden uppdatering av vår digitala utrustning</li>
        <li>Utveckling av egna digitala protokoll och arbetsflöden</li>
      </ul>
      <p>Genom vårt fokus på innovation kan vi erbjuda dig behandlingar som kombinerar det bästa av beprövad klinisk praxis med de senaste teknologiska framstegen.</p>`,
    },
    {
      title: "Tvärvetenskaplig Expertis",
      description: "Vårt team av specialister samarbetar digitalt för att erbjuda heltäckande tandvård av högsta kvalitet.",
      icon: <Users className="h-8 w-8 text-amber-500" />,
      expandedDescription: `<p>På Baltzar Tandvård har vi samlat ett exceptionellt team av specialister inom olika områden av tandvården. Detta ger oss möjlighet att hantera även de mest komplexa fallen med högsta kompetens.</p>
      <p>Fördelar med vår tvärvetenskapliga approach:</p>
      <ul>
        <li>Samordnad behandlingsplanering med input från flera specialister</li>
        <li>Sömlös digital kommunikation mellan teammedlemmar</li>
        <li>Komplett vård under ett tak utan behov av externa remisser</li>
        <li>Kombinerad expertkunskap för optimala lösningar</li>
        <li>Holistiskt perspektiv på din munhälsa</li>
      </ul>
      <p>Genom att integrera olika specialistområden och dela information digitalt kan vi erbjuda en nivå av vård som överträffar vad som är möjligt på en traditionell tandvårdsklinik.</p>`,
    },
  ];

  // Toggle active team member
  const toggleTeamMember = (index: number) => {
    setActiveTeamMember(activeTeamMember === index ? null : index);
  };

  return (
    <section id="about" className={`relative ${className || ''}`}>
      <BackgroundImage
        src={image || placeholderImage}
        alt="About background"
        isLoading={isLoading}
        loadingPlaceholder={<BackgroundSkeleton />}
        priority={isPriority}
        sizes={sizes}
        overlay="rgba(255,255,255,0.9)"
        overlayOpacity={0.7}
      >
        <div className="container mx-auto flex flex-col items-center py-12 sm:py-16 lg:py-20">
          {/* About Us Header */}
          <Reveal>
            <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-neutral-900 md:text-4xl">
              Om Baltzar Tandvård
            </h2>
            <p className="mx-auto mb-16 max-w-5xl text-center text-base sm:text-lg text-neutral-700">
              Vi är ett team av passionerade specialister som kombinerar digital teknologi med personlig omsorg för att erbjuda tandvård i världsklass.
            </p>
          </Reveal>
        
          {/* Clinic Overview */}
          <div className="mb-20 grid items-center gap-8 md:gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-5 w-full max-w-7xl">
            <div className="relative lg:col-span-2">
              <Parallax speed={0.2}>
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src="/images/clinic/clinic-reception.jpg"
                    alt="Baltzar Tandvård Klinik"
                    width={600}
                    height={800}
                    className="h-auto w-full object-cover rounded-xl"
                  />
                </div>
              </Parallax>
            </div>
            
            <div className="flex flex-col lg:col-span-3">
              <h3 className="mb-4 text-xl sm:text-2xl font-bold text-neutral-900">
                Modern tandvård i centrala Malmö
              </h3>
              <p className="mb-6 text-neutral-700">
                Baltzar Tandvård grundades med visionen att kombinera det bästa av modern digital tandvårdsteknologi med personligt anpassad vård i en avslappnad och välkomnande miljö. Vår klinik i hjärtat av Malmö är utrustad med den senaste tekniken för att erbjuda precision, komfort och resultat av högsta kvalitet.
              </p>
              
              <div className="mt-4">
                <ResponsiveGrid 
                  columns={{ xs: 1, sm: 2 }} 
                  gap="gap-4"
                  className="w-full"
                >
                  {values.map((value, index) => (
                    <div 
                      key={value.title} 
                      className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start mb-1">
                        <div className="mr-3 flex-shrink-0">
                          {value.icon}
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-neutral-900">{value.title}</h4>
                          <p className="text-sm text-neutral-600">{value.description}</p>
                          
                          {value.expandedDescription && (
                            <div className="mt-2 relative">
                              <button
                                onClick={() => setActiveValuePopover(activeValuePopover === index ? null : index)}
                                className="inline-flex items-center text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors"
                                aria-expanded={activeValuePopover === index}
                                aria-controls={`value-content-${index}`}
                              >
                                Läs mer
                                <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${
                                  activeValuePopover === index ? "rotate-90" : ""
                                }`} />
                              </button>
                              
                              {activeValuePopover === index && (
                                <div 
                                  className="absolute z-50 top-full left-0 mt-2 w-[90vw] max-w-md bg-white rounded-lg shadow-lg border border-neutral-200 p-4"
                                  id={`value-content-${index}`}
                                  ref={(el) => setValuePopoverRef(el, index)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h5 className="text-lg font-bold text-neutral-900">{value.title}</h5>
                                    <button 
                                      onClick={() => setActiveValuePopover(null)}
                                      className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                      aria-label="Stäng"
                                    >
                                      <X className="h-5 w-5" />
                                    </button>
                                  </div>
                                  <div 
                                    className="prose prose-sm max-w-none" 
                                    dangerouslySetInnerHTML={{ __html: value.expandedDescription ?? '' }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </ResponsiveGrid>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="w-full">
            <Reveal>
              <h3 className="mb-8 text-center text-xl sm:text-2xl font-bold text-neutral-900">
                Möt vårt team
              </h3>
            </Reveal>
            
            <StaggerChildren>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {teamMembers.map((member, index) => (
                  <StaggerItem key={member.name}>
                    <div 
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-neutral-100 cursor-pointer"
                      onClick={() => toggleTeamMember(index)}
                    >
                      <div className="mx-auto mb-4 relative h-48 w-48 overflow-hidden rounded-full">
                        <Image 
                          src={member.image}
                          alt={member.name}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="text-center text-xl font-bold text-neutral-900">{member.name}</h4>
                      <p className="text-center text-sm text-neutral-500 mb-4">{member.role}</p>
                      
                      <div className="text-center">
                        <button
                          className="inline-flex items-center text-amber-600 text-sm font-medium hover:text-amber-700 transition-colors"
                          aria-expanded={activeTeamMember === index}
                          aria-controls={`team-member-${index}`}
                        >
                          Läs mer
                          <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${
                            activeTeamMember === index ? "rotate-90" : ""
                          }`} />
                        </button>
                        
                        {activeTeamMember === index && (
                          <div 
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                            onClick={(e) => {
                              if (e.target === e.currentTarget) setActiveTeamMember(null);
                            }}
                          >
                            <div 
                              className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                              id={`team-member-${index}`}
                              ref={(el) => setTeamMemberPopoverRef(el, index)}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center">
                                  <div className="mr-4 h-16 w-16 overflow-hidden rounded-full flex-shrink-0">
                                    <Image 
                                      src={member.image}
                                      alt={member.name}
                                      width={64}
                                      height={64}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-bold text-neutral-900">{member.name}</h4>
                                    <p className="text-sm text-neutral-500">{member.role}</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => setActiveTeamMember(null)}
                                  className="text-neutral-400 hover:text-neutral-600 transition-colors"
                                  aria-label="Stäng"
                                >
                                  <X className="h-6 w-6" />
                                </button>
                              </div>
                              <p className="text-neutral-700">{member.bio}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerChildren>
          </div>
        </div>
      </BackgroundImage>
    </section>
  );
};

export default AboutSection; 