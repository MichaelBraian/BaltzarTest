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

export const About: React.FC = () => {
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
    <section id="about" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto flex flex-col items-center">
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
              <MotionImg
                src="/placeholder.jpg"
                alt="Baltzar Tandvård klinik"
                width={800}
                height={600}
                className="rounded-lg shadow-lg w-full h-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </Parallax>
            <MotionDiv
              className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full border-4 border-white bg-amber-400 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex h-full w-full items-center justify-center">
                <Award className="h-12 w-12 text-white" />
              </div>
            </MotionDiv>
          </div>
          
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-2xl font-bold text-neutral-900">Vår Digitala Filosofi</h3>
            <p className="mb-4 text-neutral-700">
              Baltzar Tandvård grundades 2016 med visionen att kombinera det bästa av modern digital teknologi med personlig tandvård av högsta kvalitet. På vår klinik i centrala Malmö har vi skapat en miljö där avancerad teknologi möter klinisk expertis.
            </p>
            <p className="mb-6 text-neutral-700">
              Vi tror på kraften i digital precision - från 3D-scanners och AI-assisterad diagnostik till digitalt designade proteser och minimalt invasiva behandlingar. Varje aspekt av vår verksamhet genomsyras av ett digitalt tänkande som förbättrar både resultat och patientupplevelse.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center rounded-full bg-amber-100 px-4 py-2">
                <span className="text-sm font-medium text-amber-800">Digital Excellens</span>
              </div>
              <div className="flex items-center rounded-full bg-amber-100 px-4 py-2">
                <span className="text-sm font-medium text-amber-800">Specialistkompetens</span>
              </div>
              <div className="flex items-center rounded-full bg-amber-100 px-4 py-2">
                <span className="text-sm font-medium text-amber-800">Personlig Omsorg</span>
              </div>
              <div className="flex items-center rounded-full bg-amber-100 px-4 py-2">
                <span className="text-sm font-medium text-amber-800">Kontinuerlig Innovation</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Våra Värderingar Section */}
        <Reveal>
          <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-neutral-900 md:text-4xl">
            Våra Värderingar
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 lg:mb-16 max-w-5xl text-center text-base sm:text-lg text-neutral-700">
            Det här är principerna som vägleder vårt arbete och formar vår patientcentrerade approach till modern tandvård.
          </p>
        </Reveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 mb-20 w-full">
          {values.map((value, index) => (
            <div key={value.title} className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="mb-5 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-amber-100 mb-4 mx-auto">
                  <div className="w-8 h-8">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 mb-4">{value.description}</p>
              </div>
              
              <div className="mt-auto text-center">
                {value.expandedDescription && (
                  <div className="relative">
                    <button
                      onClick={() => setActiveValuePopover(activeValuePopover === index ? null : index)}
                      className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                      aria-expanded={activeValuePopover === index}
                      aria-controls={`value-content-${index}`}
                    >
                      Läs mer
                      <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${
                        activeValuePopover === index ? "rotate-90" : ""
                      }`} />
                    </button>
                    
                    {/* Popover content - positioned below instead of above */}
                    {activeValuePopover === index && (
                      <div 
                        className="absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-lg sm:w-[500px] md:w-[550px] p-5 bg-white rounded-lg shadow-lg border border-amber-100 text-left"
                        id={`value-content-${index}`}
                        ref={(el) => setValuePopoverRef(el, index)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold text-neutral-900">{value.title}</h4>
                          <button 
                            onClick={() => setActiveValuePopover(null)}
                            className="text-neutral-400 hover:text-neutral-600 transition-colors"
                            aria-label="Stäng"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div 
                          className="prose prose-sm sm:prose prose-amber max-w-none overflow-y-auto max-h-[60vh]"
                          dangerouslySetInnerHTML={{ __html: value.expandedDescription || "" }}
                        />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45 w-3 h-3 bg-white border-t border-l border-amber-100"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Team Section */}
        <Reveal>
          <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-neutral-900 md:text-4xl">
            Vårt Team av Specialister
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 lg:mb-16 max-w-5xl text-center text-base sm:text-lg text-neutral-700">
            Möt experterna bakom Baltzar Tandvård – en unik kombination av digitala pionjärer och erfarna kliniker.
          </p>
        </Reveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 mb-8 sm:mb-12 w-full">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col overflow-hidden">
              <div className="h-64 relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-sm font-medium text-amber-600 mb-3">{member.role}</p>
                
                <div className="mt-auto relative">
                  <button
                    onClick={() => toggleTeamMember(index)}
                    className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                    aria-expanded={activeTeamMember === index}
                    aria-controls={`team-content-${index}`}
                  >
                    Läs mer
                    <ChevronRight 
                      className={`ml-1 h-4 w-4 transition-transform ${
                        activeTeamMember === index ? "rotate-90" : ""
                      }`} 
                    />
                  </button>
                  
                  {/* Popover content - positioned below instead of above */}
                  {activeTeamMember === index && (
                    <div 
                      className="absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-lg sm:w-[500px] md:w-[550px] p-5 bg-white rounded-lg shadow-lg border border-amber-100 text-left"
                      id={`team-content-${index}`}
                      ref={(el) => setTeamMemberPopoverRef(el, index)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-neutral-900">{member.name}</h4>
                        <button 
                          onClick={() => setActiveTeamMember(null)}
                          className="text-neutral-400 hover:text-neutral-600 transition-colors"
                          aria-label="Stäng"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="prose prose-sm sm:prose prose-amber max-w-none overflow-y-auto max-h-[60vh]">
                        <p>{member.bio}</p>
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45 w-3 h-3 bg-white border-t border-l border-amber-100"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 