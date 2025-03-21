"use client"

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight, X } from "lucide-react";

// Define staff member type
interface StaffMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export default function StaffPage() {
  // State to track which staff member's details are expanded
  const [activeStaffMember, setActiveStaffMember] = useState<number | null>(null);
  
  // References for the popover contents
  const staffPopoverRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Global click event handler to close popovers when clicking outside
  useEffect(() => {
    if (activeStaffMember === null) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const activeRef = staffPopoverRefs.current[activeStaffMember];
      if (activeRef && !activeRef.contains(event.target as Node)) {
        setActiveStaffMember(null);
      }
    };
    
    // Add click listener to detect clicks outside the active popover
    document.addEventListener('mousedown', handleClickOutside);
    
    // Add escape key handler to close popover with keyboard
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStaffMember(null);
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [activeStaffMember]);
  
  // Reference assignment callback
  const setStaffPopoverRef = useCallback((el: HTMLDivElement | null, index: number) => {
    staffPopoverRefs.current[index] = el;
  }, []);

  // Staff members array with updated information from user request
  const staffMembers: StaffMember[] = [
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

  // Toggle active staff member
  const toggleStaffMember = (index: number) => {
    setActiveStaffMember(activeStaffMember === index ? null : index);
  };

  return (
    <main className="bg-amber-50/30 min-h-[100dvh] py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Tillbaka till startsidan</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">Vårt Team</h1>
          <p className="text-neutral-700 max-w-2xl text-base sm:text-lg mb-8">
            Här är vårt team av specialister som arbetar på Baltzar Tandvård. Vi kombinerar lång erfarenhet med 
            specialistkunskap och ett genuint intresse för modern digital tandvård.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {staffMembers.map((member, index) => (
            <div 
              key={member.name} 
              className="bg-white border border-amber-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  priority={member.name === "Michael Braian"}
                />
              </div>
              <div className="p-5 sm:p-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">{member.name}</h2>
                <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                
                <div className="relative">
                  <button
                    onClick={() => toggleStaffMember(index)}
                    className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                    aria-expanded={activeStaffMember === index}
                    aria-controls={`staff-content-${index}`}
                  >
                    Läs mer
                    <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${
                      activeStaffMember === index ? "rotate-90" : ""
                    }`} />
                  </button>
                  
                  {/* Popover content - positioned below instead of above */}
                  {activeStaffMember === index && (
                    <div 
                      className="absolute z-[100] top-full left-1/2 -translate-x-1/2 mt-2 w-[90vw] max-w-lg sm:w-[500px] md:w-[550px] p-5 bg-white rounded-lg shadow-lg border border-amber-100 text-left"
                      id={`staff-content-${index}`}
                      ref={(el) => setStaffPopoverRef(el, index)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-bold text-neutral-900">{member.name}</h4>
                        <button 
                          onClick={() => setActiveStaffMember(null)}
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
    </main>
  );
} 