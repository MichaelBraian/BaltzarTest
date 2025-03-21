import React, { useState, useRef, useCallback } from 'react';
import { 
  Cpu, 
  Database, 
  Scan, 
  Monitor, 
  Printer, 
  Layers,
  BarChart,
  ChevronRight,
  X
} from "lucide-react"
import BackgroundImage, { BackgroundSkeleton } from '@/components/ui/background-image';
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';
import { shouldPrioritizeImage, getResponsiveSizes } from '@/lib/image-utils';
import placeholderImage from '@/public/placeholder.svg';
import { ResponsiveGrid } from "@/components/ui/responsive-container";
import { Reveal, StaggerItem } from "@/components/animation-lib";

interface TechnologySectionProps {
  /**
   * Optional className for the section
   */
  className?: string;
}

// Define tech item type
interface TechItem {
  title: string;
  description: string;
  expandedDescription?: string;
  icon: React.ReactNode;
  gradient: string;
}

/**
 * Technology section component using the default background image
 * 
 * To change the background, simply replace the file at:
 * /public/images/backgrounds/sections/technology/technology-default.webp
 */
export const TechnologySection: React.FC<TechnologySectionProps> = ({
  className,
}) => {
  // Use the default background image for the technology section
  const { image, isLoading } = useDefaultBackgroundImage('technology');
  
  // Technology sections should prioritize loading based on visibility
  const isPriority = shouldPrioritizeImage('technology');
  
  // Get the responsive sizes for the technology section
  const sizes = getResponsiveSizes('technology');
  
  const [activePopover, setActivePopover] = useState<number | null>(null);
  
  // References for the popover contents
  const popoverRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Reference assignment callback
  const setPopoverRef = useCallback((el: HTMLDivElement | null, index: number) => {
    popoverRefs.current[index] = el;
  }, []);
  
  // Tech items array
  const techItems: TechItem[] = [
    {
      title: "3D CBCT Scanning",
      description: "Digital 3D röntgen med låg strålning för exakt diagnostik.",
      expandedDescription: `<p>CBCT (Cone Beam Computed Tomography) ger oss möjligheten att skapa detaljerade 3D-bilder av din käke, tänder och omkringliggande vävnad med minimal strålning.</p>
      <p>Denna avancerade teknologi är grundläggande för vår digitala arbetsprocess och möjliggör:</p>
      <ul>
        <li>Exakt planering av tandimplantat</li>
        <li>Detaljerad diagnostik av rotkanaler</li>
        <li>Tidig upptäckt av patologiska förändringar</li>
        <li>Precis analys av käkled och bihålor</li>
        <li>3D-visualisering för patientutbildning</li>
      </ul>
      <p>Till skillnad från traditionell röntgen ger CBCT en komplett tredimensionell bild som kan roteras och studeras från alla vinklar. Detta ger oss en diagnostisk precision som tidigare var omöjlig att uppnå.</p>`,
      icon: <Scan className="h-6 w-6 text-amber-500" />,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "Intraoral 3D-scanning",
      description: "Digital avtryckstagning utan obehag för perfekt passform.",
      expandedDescription: `<p>Våra avancerade intraorala 3D-skannrar ersätter konventionella avtryck med en snabb och bekväm digital process.</p>
      <p>Genom att använda en liten handhållen kamera kan vi skapa en exakt digital modell av dina tänder och tandkött på bara några minuter, helt utan det obehag som traditionella avtrycksmaterial kan orsaka.</p>
      <p>Fördelar med digital avtryckstagning:</p>
      <ul>
        <li>Bekväm och snabb process utan kvälningskänsla</li>
        <li>Extrem precision för bättre passform på kronor och proteser</li>
        <li>Omedelbar visualisering av digitala modeller</li>
        <li>Enkel lagring och åtkomst till digitala avtryck</li>
        <li>Miljövänlig metod som eliminerar materialavfall</li>
      </ul>
      <p>De digitala modellerna kan användas för allt från planering av Invisalign-behandlingar till design av kronor, broar och övriga protetiska arbeten.</p>`,
      icon: <Monitor className="h-6 w-6 text-amber-500" />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "CAD/CAM Teknologi",
      description: "Datorstödd design och tillverkning för precisionskomponenter.",
      expandedDescription: `<p>CAD/CAM (Computer-Aided Design/Computer-Aided Manufacturing) är grundläggande för vår digitala tandvårdsprocess och möjliggör designen och tillverkningen av tandproteser med oöverträffad precision.</p>
      <p>Efter 3D-scanning av munnen använder vi avancerad CAD-programvara för att:</p>
      <ul>
        <li>Designa kronor, broar och implantatkomponenter med mikrometer-precision</li>
        <li>Virtuellt simulera funktion och estetik innan tillverkning</li>
        <li>Optimera material och geometri för maximal hållbarhet</li>
        <li>Kommunicera digitalt med patienten om designalternativ</li>
      </ul>
      <p>När designen är färdig skickas den till våra CAM-system (fräsmaskiner och 3D-skrivare) som tillverkar den slutliga produkten med exakt samma specifikationer som i den digitala designen.</p>
      <p>Detta ger oss möjlighet att tillverka tandproteser med en passform, funktion och estetik som är överlägsen traditionellt hantverksmässigt framställda alternativ.</p>`,
      icon: <Layers className="h-6 w-6 text-amber-500" />,
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "AI-assisterad Analys",
      description: "Artificiell intelligens för förbättrad diagnostik och behandlingsplanering.",
      expandedDescription: `<p>Vi använder avancerade AI-system som kompletterar våra tandläkares expertis och förbättrar diagnostisk precision och behandlingsresultat.</p>
      <p>Våra AI-algoritmer är tränade på miljontals tandvårdsdata och hjälper till att:</p>
      <ul>
        <li>Identifiera karies, sprickor och periapikala lesioner som kan vara svåra att upptäcka</li>
        <li>Analysera bettutveckling och föreslå optimal ortodontisk behandling</li>
        <li>Förutsäga långsiktiga utfall av olika behandlingsalternativ</li>
        <li>Upptäcka tidiga tecken på tandköttsproblem och andra riskfaktorer</li>
        <li>Optimera design av tandproteser baserat på biomekaniska principer</li>
      </ul>
      <p>AI-teknologin fungerar som ett beslutsstöd för våra kliniker, och varje AI-förslag granskas noggrant av våra specialister. Detta ger en kombination av teknologisk precision och mänsklig expertis för bästa möjliga vård.</p>`,
      icon: <Cpu className="h-6 w-6 text-amber-500" />,
      gradient: "from-amber-400 to-amber-600",
    },
    {
      title: "Digital Behandlingsplanering",
      description: "Interaktiv planering och visualisering av behandlingsresultat.",
      expandedDescription: `<p>Vår digitala behandlingsplanering gör det möjligt att simulera, visualisera och optimera din behandling innan den påbörjas.</p>
      <p>Med avancerad mjukvara kan vi:</p>
      <ul>
        <li>Skapa en digital tvilling av din munhåla för virtuell behandlingssimulering</li>
        <li>Visualisera slutresultatet av estetiska behandlingar</li>
        <li>Simulera tandförflyttning vid ortodontisk behandling</li>
        <li>Optimera implantatpositioner för bästa funktion och estetik</li>
        <li>Planera komplexa rekonstruktioner steg för steg</li>
      </ul>
      <p>Denna teknologi ger inte bara bättre behandlingsresultat utan gör dig också till en aktiv deltagare i planeringen. Du kan se olika behandlingsalternativ, förstå processen bättre och ha realistiska förväntningar på slutresultatet.</p>
      <p>Digital behandlingsplanering minskar även risken för oväntade komplikationer under behandlingen, då många potentiella problem kan identifieras och lösas i den virtuella planeringsfasen.</p>`,
      icon: <BarChart className="h-6 w-6 text-amber-500" />,
      gradient: "from-red-400 to-red-600",
    },
    {
      title: "3D-printade Guider & Modeller",
      description: "Skräddarsydda kirurgiska guider och arbetsmodeller för precision.",
      expandedDescription: `<p>Vi använder avancerad 3D-printteknologi för att tillverka precisionskomponenter som är avgörande för moderna tandvårdsbehandlingar.</p>
      <p>Baserat på digitala 3D-scanningar och behandlingsplaneringar kan vi printa:</p>
      <ul>
        <li>Kirurgiska guider för exakt implantatplacering</li>
        <li>Arbetsmodeller för protetisk tillverkning</li>
        <li>Temporära proteser och behandlingsskydd</li>
        <li>Ortodontiska skenor för tandreglering</li>
        <li>Demonstrationsmodeller för patientutbildning</li>
      </ul>
      <p>Våra 3D-printrar använder biokompatibla material med medicinsk certifiering och kan producera komponenter med mikrometerprecision.</p>
      <p>3D-printade kirurgiska guider är särskilt värdefulla vid implantatbehandlingar, då de säkerställer att implantaten placeras exakt enligt den digitala planen, vilket minimerar risker och optimerar behandlingsresultatet.</p>`,
      icon: <Printer className="h-6 w-6 text-amber-500" />,
      gradient: "from-indigo-400 to-indigo-600",
    },
  ];
  
  return (
    <section id="technology" className={`relative min-h-screen ${className || ''}`}>
      <BackgroundImage
        src={image || placeholderImage}
        alt="Technology background"
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
              Digital Tandvårdsteknologi
            </h2>
            <p className="mx-auto mb-8 sm:mb-12 lg:mb-16 max-w-5xl text-center text-base sm:text-lg text-white text-opacity-90">
              På Baltzar Tandvård investerar vi i den senaste digitala teknologin för att ge dig säkrare, bekvämare och mer precisa behandlingar.
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
            {techItems.map((tech, index) => (
              <StaggerItem key={tech.title}>
                <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="mb-5 text-center">
                    <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-amber-100 mb-4 mx-auto">
                      <div className="flex items-center justify-center w-8 h-8">
                        {tech.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{tech.title}</h3>
                    <p className="text-gray-600 mb-4">{tech.description}</p>
                  </div>
                  
                  <div className="mt-auto text-center">
                    {tech.expandedDescription && (
                      <div className="relative">
                        <button
                          onClick={() => setActivePopover(activePopover === index ? null : index)}
                          className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                          aria-expanded={activePopover === index}
                          aria-controls={`tech-content-${index}`}
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
                            id={`tech-content-${index}`}
                            ref={(el) => setPopoverRef(el, index)}
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg font-bold text-neutral-900">{tech.title}</h4>
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
                              dangerouslySetInnerHTML={{ __html: tech.expandedDescription ?? '' }}
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

export default TechnologySection; 