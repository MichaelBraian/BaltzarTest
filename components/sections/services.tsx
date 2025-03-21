"use client"

import React, { useRef, useState, useCallback, useEffect } from "react"
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
import { 
  MotionDiv, 
  Reveal, 
  StaggerChildren, 
  StaggerItem 
} from "../animation-lib"
import { TechCard } from "../ui/tech-card"
import { ResponsiveGrid } from "../ui/responsive-container"
import { useAppContext } from "../../contexts/AppContext"
import { useClickOutside } from "../../hooks/useClickOutside"

// Define service type
interface ServiceItem {
  title: string;
  description: string;
  expandedDescription?: string;
  icon: React.ReactNode;
  gradient: string;
}

// Component props - make all optional
interface ServicesProps {
  expandedServices?: number[];
  toggleServiceExpansion?: (index: number) => void;
  registerServiceRef?: (index: number, ref: HTMLDivElement | null) => void;
}

export const Services: React.FC<ServicesProps> = (props) => {
  // Use provided props or get from context
  const context = useAppContext();
  
  const expandedServices = props.expandedServices ?? context.expandedServices;
  const toggleServiceExpansion = props.toggleServiceExpansion ?? context.toggleServiceExpansion;
  const registerServiceRef = props.registerServiceRef ?? context.registerServiceRef;
  const [activePopover, setActivePopover] = useState<number | null>(null);
  
  // References for the popover contents
  const popoverRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Global click event handler to close popovers when clicking outside
  useEffect(() => {
    if (activePopover === null) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const activeRef = popoverRefs.current[activePopover];
      if (activeRef && !activeRef.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };
    
    // Add click listener to detect clicks outside the active popover
    document.addEventListener('mousedown', handleClickOutside);
    
    // Add escape key handler to close popover with keyboard
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePopover(null);
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activePopover]);
  
  // Reference assignment callback - fixes the TypeScript error
  const setPopoverRef = useCallback((el: HTMLDivElement | null, index: number) => {
    popoverRefs.current[index] = el;
  }, []);
  
  // Service items array
  const serviceItems: ServiceItem[] = [
    {
      title: "Digital Implantatbehandling",
      description: "3D-planerade implantat med hög precision och minimal invasivitet.",
      expandedDescription: `<p>Digital tandimplantatbehandling representerar det senaste inom modern tandvård.</p>
      <p>Genom 3D-scanning och avancerad digital planering kan vi med extrem precision placera tandimplantat på ett sätt som maximerar framgången och minimerar obehaget.</p>
      <p>Fördelar med vår digitala metod:</p>
      <ul>
        <li>Högre precision vid implantatplacering</li>
        <li>Kortare behandlingstid</li>
        <li>Minimalt invasiva ingrepp</li>
        <li>Individuellt anpassade implantat och kronor</li>
        <li>Förutsägbara och estetiskt överlägsna resultat</li>
      </ul>
      <p>Vårt team använder det senaste inom CBCT-scanning och 3D-diagnostik för att planera varje steg i din behandling, vilket ger optimal funktionalitet och estetik.</p>`,
      icon: <Stethoscope className="h-6 w-6 text-amber-500" />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Estetisk Digital Design",
      description: "Digitalt designade leenden med exakt visualisering före behandling.",
      expandedDescription: `<p>Med vår avancerade digitala design kan vi visualisera ditt nya leende innan behandlingen ens börjar.</p>
      <p>Genom att skapa en digital modell av dina tänder kan vi simulera olika behandlingsalternativ och visa dig exakt hur resultatet kommer att se ut.</p>
      <p>Vår process:</p>
      <ul>
        <li>3D-scanning av ditt nuvarande leende</li>
        <li>Digital design av olika behandlingsalternativ</li>
        <li>Fotorealistisk visualisering av slutresultatet</li>
        <li>Möjlighet att göra justeringar baserat på dina önskemål</li>
        <li>Precisionsbehandling baserad på den godkända digitala designen</li>
      </ul>
      <p>Detta ger dig full kontroll över behandlingen och säkerställer att resultatet matchar dina förväntningar.</p>`,
      icon: <Sparkles className="h-6 w-6 text-amber-500" />,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "AI-assisterad Diagnostik",
      description: "Förbättrad diagnostik med artificiell intelligens för tidigt upptäckt av problem.",
      expandedDescription: `<p>Vi använder den senaste AI-teknologin för att förbättra vår diagnostiska förmåga och upptäcka potentiella problem i ett tidigt skede.</p>
      <p>Vår AI-assisterade diagnostik kompletterar tandläkarens expertis genom att identifiera subtila mönster och förändringar som kan vara svåra att upptäcka med blotta ögat.</p>
      <p>Fördelar:</p>
      <ul>
        <li>Tidig upptäckt av karies, sprickor och andra problem</li>
        <li>Högre diagnostisk precision</li>
        <li>Förebyggande behandlingsplanering</li>
        <li>Minskad risk för mer omfattande behandlingar senare</li>
        <li>Kontinuerlig uppföljning av tandhälsans utveckling över tid</li>
      </ul>
      <p>Genom att kombinera tandläkarens kliniska bedömning med AI-assisterad analys kan vi erbjuda en mer omfattande och precis diagnostik.</p>`,
      icon: <Cpu className="h-6 w-6 text-amber-500" />,
      gradient: "from-amber-400 to-amber-600",
    },
    {
      title: "Invisible Orthodontics",
      description: "Diskret tandreglering med osynliga skenor och digital behandlingsplan.",
      expandedDescription: `<p>Vår moderna tandreglering med genomskinliga, nästan osynliga skenor erbjuder en diskret metod för att räta till dina tänder.</p>
      <p>Behandlingen är helt digitaliserad från start till slut:</p>
      <ul>
        <li>3D-scanning istället för obehagliga avtryck</li>
        <li>Digital planering av hela tandförflyttningen</li>
        <li>Visualisering av slutresultatet innan behandlingen startar</li>
        <li>Skräddarsydda, 3D-printade aligners som gradvis flyttar tänderna</li>
        <li>Regelbunden digital uppföljning för optimal progression</li>
      </ul>
      <p>Fördelarna jämfört med traditionell tandställning är många: skenorna är nästan osynliga, bekvämare, kan tas ut vid måltider och tandborstning, och kräver färre besök på kliniken.</p>
      <p>Behandlingstiden varierar beroende på komplexiteten i ditt fall, men många patienter ser resultat redan efter några månader.</p>`,
      icon: <Smile className="h-6 w-6 text-amber-500" />,
      gradient: "from-emerald-400 to-emerald-600",
    },
    {
      title: "Digital Protetik",
      description: "CAD/CAM-designade kronor, broar och proteser med perfekt passform.",
      expandedDescription: `<p>Vår digitala protetik representerar en revolution inom tandvården. Genom att använda avancerad CAD/CAM-teknologi (datorstödd design och tillverkning) kan vi skapa tandproteser med exceptionell precision och estetik.</p>
      <p>Processen:</p>
      <ul>
        <li>Digital intraoral scanning ersätter traditionella avtryck</li>
        <li>Datorbaserad design där varje detalj kan finjusteras</li>
        <li>Högprecisions fräsning eller 3D-printning av proteser</li>
        <li>Material av högsta kvalitet för hållbarhet och naturligt utseende</li>
        <li>Digital verifiering av passform före slutlig produktion</li>
      </ul>
      <p>Fördelarna inkluderar perfekt passform, minimalt invasiva ingrepp, kortare behandlingstid och proteser som både ser ut och fungerar som naturliga tänder.</p>
      <p>Vi erbjuder hela spektrat av protetiska lösningar: kronor, broar, fasader, inlägg/onlays och helproteser.</p>`,
      icon: <Layers className="h-6 w-6 text-amber-500" />,
      gradient: "from-pink-400 to-pink-600",
    },
    {
      title: "Eget Tandtekniskt Laboratorium",
      description: "Integrerat digitalt laboratorium för snabb och anpassad tillverkning.",
      expandedDescription: `<p>På Baltzar Tandvård har vi vårt eget integrerade tandtekniska laboratorium, utrustat med den senaste digitala teknologin för protetisk tillverkning.</p>
      <p>Detta ger oss unika fördelar:</p>
      <ul>
        <li>Sömlöst digitalt arbetsflöde från tandläkare till tekniker</li>
        <li>Direkt kommunikation för optimal anpassning av varje detalj</li>
        <li>Snabbare tillverkningstid och kortare väntan för patienter</li>
        <li>Möjlighet till justeringar i realtid under designprocessen</li>
        <li>Högre kvalitetskontroll i varje steg av produktionen</li>
        <li>Kostnadseffektivitet som kommer våra patienter till godo</li>
      </ul>
      <p>Våra tandtekniker arbetar med avancerad CAD/CAM-utrustning, 3D-printrar och material av högsta kvalitet för att skapa tandproteser som överträffar förväntningarna.</p>
      <p>Detta integrerade arbetssätt representerar framtiden inom tandvården, där digital precision möter hantverksmässig expertis.</p>`,
      icon: <FlaskConical className="h-6 w-6 text-amber-500" />,
      gradient: "from-red-400 to-red-600",
    },
    {
      title: "Tvärvetenskaplig Specialistvård",
      description: "Sammankopplad expertis inom flera specialområden för komplexa fall.",
      expandedDescription: `<p>För komplexa tandvårdsfall krävs ofta expertis från flera specialistområden. På Baltzar Tandvård har vi samlat specialister inom olika områden som samarbetar digitalt för att ge dig heltäckande vård.</p>
      <p>Detta tvärvetenskapliga arbetssätt möjliggör:</p>
      <ul>
        <li>Komplett behandling under ett tak</li>
        <li>Koordinerade behandlingsplaner där olika specialister samverkar</li>
        <li>Digital delning av diagnostisk information i realtid</li>
        <li>Optimerade behandlingsresultat genom kombinerad specialistkompetens</li>
        <li>Effektivare behandlingsförlopp med färre besök</li>
      </ul>
      <p>Vi har specialister inom implantatkirurgi, protetik, endodonti, parodontologi, ortodonti och käkledsbehandling som tillsammans skapar individuella vårdplaner för även de mest utmanande fallen.</p>
      <p>Genom vår digitala plattform kan alla involverade specialister samarbeta sömlöst, vilket ger dig som patient trygghet och resultat av högsta kvalitet.</p>`,
      icon: <Users className="h-6 w-6 text-amber-500" />,
      gradient: "from-indigo-400 to-indigo-600",
    },
  ];

  return (
    <section id="services" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto flex flex-col items-center w-full">
        <Reveal className="w-full text-center">
          <h2 className="mb-4 text-center text-2xl sm:text-3xl font-bold text-neutral-900 md:text-4xl w-full mx-auto">
            Digital Specialisttandvård
          </h2>
          <p className="mx-auto mb-8 sm:mb-12 lg:mb-16 max-w-5xl text-center text-base sm:text-lg text-neutral-700">
            Vi kombinerar digitala verktyg med klinisk expertis för att ge dig en högteknologisk och skonsam tandvårdsupplevelse med förstklassiga resultat.
          </p>
        </Reveal>

        <ResponsiveGrid 
          columns={{ 
            xs: 1, 
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4
          }} 
          gap="gap-8 lg:gap-10" 
          className="mb-8 sm:mb-12 w-full"
        >
          {serviceItems.map((service, index) => (
            <StaggerItem key={service.title}>
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
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
                      
                      {/* Popover content - positioned below instead of above */}
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
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div 
                            className="prose prose-sm sm:prose prose-amber max-w-none overflow-y-auto max-h-[60vh]"
                            dangerouslySetInnerHTML={{ __html: service.expandedDescription || "" }}
                          />
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45 w-3 h-3 bg-white border-t border-l border-amber-100"></div>
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
    </section>
  );
} 