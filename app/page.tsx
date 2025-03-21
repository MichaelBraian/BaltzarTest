"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Menu,
  X,
  ArrowRight,
  Zap,
  Shield,
  Cpu,
  Layers,
  BarChart,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "../components/ui/button"
import { TechButton } from "../components/ui/tech-button"
import { TechCard } from "../components/ui/tech-card"
import { ThreeDCard } from "../components/ui/3d-card"
import { 
  MotionDiv, 
  MotionH1, 
  MotionP, 
  MotionLi, 
  fadeIn, 
  slideUp, 
  Parallax,
  Reveal,
  ScrollProgress,
  StaggerChildren,
  StaggerItem
} from "../components/animation-lib"
import { ResponsiveGrid } from "../components/ui/responsive-container"

// Define props interface for ClientHeroContent
interface ClientHeroContentProps {
  heroRef: React.RefObject<HTMLElement>;
}

// Define service type
interface ServiceItem {
  title: string;
  description: string;
  expandedDescription?: string;
  icon: React.ReactNode;
  gradient: string;
}

interface TechItem {
  title: string;
  description: string;
  expandedDescription?: string;
}

// Define types
interface ModalContent {
  isOpen: boolean;
  title: string;
  content: string;
}

// Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  
  // References for positioning
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // State for modal positioning
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Set scroll position when modal opens to position it properly
  useEffect(() => {
    if (isOpen) {
      // Get current scroll position
      setScrollPosition(window.scrollY);
      
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle touch events to close modal on swipe down (mobile UX improvement)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeDistance, setSwipeDistance] = useState<number>(0);

  // Define min swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const currentY = e.targetTouches[0].clientY;
    setTouchEnd(currentY);
    
    // Only allow swiping down
    if (touchStart && currentY > touchStart) {
      const distance = currentY - touchStart;
      setSwipeDistance(distance);
      
      // Apply transform during swipe for visual feedback
      if (contentRef.current && distance > 0) {
        contentRef.current.style.transform = `translateY(${distance}px)`;
        contentRef.current.style.opacity = `${1 - (distance / 300)}`;
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchEnd - touchStart;
    const isSwipeDown = distance > minSwipeDistance;
    
    // Reset transform
    if (contentRef.current) {
      contentRef.current.style.transform = '';
      contentRef.current.style.opacity = '';
    }
    
    if (isSwipeDown) {
      onClose();
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
    setSwipeDistance(0);
  };

  return (
    <MotionDiv
      ref={modalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 touch-none overflow-y-auto modal-container"
      onClick={onClose}
      style={{ 
        alignItems: 'flex-start', 
        paddingTop: 'calc(50vh - 150px)', // Default position in middle of screen for desktop 
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
      ></div>
      
      <MotionDiv 
        ref={contentRef}
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300,
          duration: 0.3 
        }}
        className="relative z-10 mx-auto w-[92%] max-w-lg overflow-hidden rounded-xl border border-amber-100 bg-gradient-to-b from-white to-amber-50/80 p-4 md:p-6 shadow-xl backdrop-blur-sm max-h-[80vh] md:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{
          // On mobile, position the modal based on user's viewport position
          marginTop: typeof window !== 'undefined' && window.innerWidth < 768 ? '20px' : 'auto',
        }}
      >
        {/* Swipe indicator for mobile */}
        <div className="w-16 h-1.5 bg-amber-200/60 rounded-full mx-auto mb-4 md:hidden"></div>
        
        {/* Close button - positioned for both mobile and desktop */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 h-8 w-8 md:h-10 md:w-10 rounded-full border border-amber-200 bg-white/80 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
          aria-label="Stäng"
        >
          <X className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        
        <div className="pt-2 md:pt-0">
          <h3 id="modal-title" className="text-xl md:text-2xl font-semibold text-amber-800 mb-2 md:mb-4 pr-8">
            {title}
          </h3>
          
          <div className="prose prose-amber prose-sm md:prose-base max-w-none">
            {content}
          </div>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};

// Split out the client-side animation component
const ClientHeroContent: React.FC<ClientHeroContentProps> = ({ heroRef }) => {
  // Safely use framer-motion hooks in a client component
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  return (
    <MotionDiv
      className="container relative z-10 flex min-h-screen items-center pt-20"
      style={{
        opacity: heroOpacity,
        scale: heroScale,
        y: heroY,
      }}
    >
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600"
          >
            <Zap className="mr-2 h-3.5 w-3.5" />
            Framtidens tandvård är här
          </MotionDiv>

          <MotionH1
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Avancerad tandvård med{" "}
            <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
              digital precision
            </span>
          </MotionH1>

          <MotionP
            className="mb-8 max-w-lg text-lg text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Baltzar Tandvård kombinerar banbrytande teknologi med specialistkompetens för att leverera tandvård i
            absolut framkant.
          </MotionP>

          <MotionDiv
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <TechButton>Boka konsultation</TechButton>
            <Button
              variant="outline"
              className="border-amber-200 bg-white/80 text-amber-800 backdrop-blur-sm hover:bg-amber-50"
            >
              Utforska teknologin
            </Button>
          </MotionDiv>
        </div>

        <div className="relative hidden md:block">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.6,
              type: "spring",
              stiffness: 100,
            }}
            className="relative z-10"
          >
            <ThreeDCard className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Digital tandvårdsteknologi"
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-2 text-sm font-medium text-amber-600">DIGITAL PRECISION</div>
                <div className="text-xl font-bold text-neutral-800">3D-scanning med mikrometernoggrannhet</div>
              </div>
            </ThreeDCard>
          </MotionDiv>

          {/* Decorative elements */}
          <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-amber-600/10 blur-[100px]"></div>
          <MotionDiv
            className="absolute -top-10 -left-10 h-40 w-40 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-100 to-transparent backdrop-blur-sm"
            animate={{
              y: [0, 15, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          ></MotionDiv>
          <MotionDiv
            className="absolute -bottom-5 right-20 h-24 w-24 rounded-lg border border-amber-200 bg-gradient-to-br from-amber-100 to-transparent backdrop-blur-sm"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          ></MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [modalContent, setModalContent] = useState<ModalContent>({
    isOpen: false,
    title: '',
    content: ''
  })
  const heroRef = useRef(null)
  
  const openModal = (title: string, content: string): void => {
    // Save current scroll position
    const currentScrollY = window.scrollY;
    
    // Set modal content
    setModalContent({
      isOpen: true,
      title,
      content
    });
    
    // On mobile, ensure the modal is visible in the viewport
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      // Use a short timeout to allow the modal to render before adjusting
      setTimeout(() => {
        // Find the modal element
        const modalElement = document.querySelector('.modal-container');
        if (modalElement) {
          // Ensure the modal is in view
          modalElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const closeModal = (): void => {
    setModalContent(prevState => ({
      ...prevState,
      isOpen: false
    }));
  };
  
  // Only run client-side code after mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-800">
      <ScrollProgress />
      
      {/* Modal */}
      <Modal
        isOpen={modalContent.isOpen}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
      />

      {/* Mobile Menu */}
      <MotionDiv
        className={`fixed inset-0 z-[150] bg-white overflow-y-auto ${isMenuOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, x: "100%" }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          x: isMenuOpen ? 0 : "100%" 
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="container flex h-16 items-center justify-between sticky top-0 bg-white z-10 border-b border-amber-100">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Baltzar-Tandva%CC%8Ard-RGB-mod-286-8MdUcuR5huMlYQvylz1HsD40HkSIJe.png"
              alt="Baltzar Tandvård"
              width={180}
              height={60}
              style={{ height: '36px', width: 'auto' }}
              priority
            />
          </Link>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setIsMenuOpen(false)} 
            className="border-amber-200 text-amber-600 shadow-sm h-10 w-10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Mobile swipe indicator */}
        <div className="w-16 h-1 bg-amber-200/60 rounded-full mx-auto mt-4"></div>
        
        <div className="container mt-4 pb-20">
          <nav>
            <ul className="flex flex-col gap-4">
              {["Våra tjänster", "Om oss", "Teknologi", "Specialistvård", "Recensioner", "Vårt team", "Kontakt"].map((item, index) => (
                <MotionLi
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between border-b border-neutral-100 py-4 text-lg font-medium text-neutral-800 hover:text-amber-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item}</span>
                    <ChevronRight className="h-5 w-5 text-amber-500" />
                  </Link>
                </MotionLi>
              ))}
            </ul>
          </nav>
          
          {/* Contact info in mobile menu */}
          <div className="mt-8 space-y-4 border-t border-neutral-100 pt-6">
            <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">Kontaktuppgifter</h3>
            
            <div className="flex items-center gap-3 text-neutral-700">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <Phone className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Telefon</p>
                <a href="tel:+4635556677" className="text-base font-medium hover:text-amber-600">
                  035-55 66 77
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-neutral-700">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Öppettider</p>
                <p className="text-base font-medium">Mån-Fre: 08-17</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-neutral-700">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <MapPin className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Adress</p>
                <p className="text-base font-medium">Tandvårdsgatan 12, Halmstad</p>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="fixed bottom-0 left-0 right-0 border-t border-amber-100 bg-white py-4 px-4 flex gap-3">
            <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-6">
              <Phone className="h-5 w-5 mr-2" />
              Ring oss
            </Button>
            <Button className="flex-1 bg-amber-100 hover:bg-amber-200 text-amber-800 py-6">
              Boka tid
            </Button>
          </div>
        </div>
      </MotionDiv>

      <header className="fixed top-0 z-40 w-full bg-white/90 backdrop-blur-md transition-all duration-300 shadow-sm border-b border-neutral-100">
        <div className="container flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Baltzar-Tandva%CC%8Ard-RGB-mod-286-8MdUcuR5huMlYQvylz1HsD40HkSIJe.png"
              alt="Baltzar Tandvård"
              width={180}
              height={60}
              style={{ height: '36px', width: 'auto' }}
              priority
            />
          </Link>
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="#tjänster"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Våra tjänster
                </Link>
              </li>
              <li>
                <Link
                  href="#om-oss"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Om oss
                </Link>
              </li>
              <li>
                <Link
                  href="#teknologi"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Teknologi
                </Link>
              </li>
              <li>
                <Link
                  href="#specialistvård"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Specialistvård
                </Link>
              </li>
              <li>
                <Link
                  href="#recensioner"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Recensioner
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Vårt team
                </Link>
              </li>
              <li>
                <Link
                  href="#kontakt"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <TechButton className="hidden md:flex">Boka tid</TechButton>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className="border-amber-200 text-amber-600 shadow-sm h-10 w-10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 to-white"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[150px]"></div>
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-amber-600/5 blur-[100px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          {isMounted ? (
            <ClientHeroContent heroRef={heroRef} />
          ) : (
            <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
          )}

          <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="mb-2 text-sm text-neutral-500">Utforska mer</span>
              <MotionDiv
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronRight className="h-6 w-6 rotate-90 text-amber-600" />
              </MotionDiv>
            </MotionDiv>
          </div>
        </section>

        {/* Services Section */}
        <section className="relative py-24 md:py-32" id="tjänster">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <Reveal>
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Specialisttjänster
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                  Avancerade lösningar för{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    moderna behov
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  Vi erbjuder ett brett utbud av specialiserade tandvårdstjänster med den senaste tekniken för bästa
                  resultat.
                </p>
              </div>
            </Reveal>

            <StaggerChildren className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Digital 3D-Scanning",
                  description:
                    "Exakta digitala avtryck utan obehaglig avtrycksmassa, vilket ger högprecisionsmodeller för bättre behandlingsplanering.",
                  expandedDescription:
                    "Fördelar med digital 3D-scanning:\n• Ökad komfort: Genom att eliminera behovet av traditionella avtryck med avtrycksmassa slipper patienter obehag och kväljningsreflexer.\n• Snabbare process: Den digitala scanningen är tidsbesparande jämfört med konventionella metoder, vilket minskar behandlingstiden för patienten.\n• Förbättrad kommunikation: De digitala modellerna möjliggör enkel och tydlig kommunikation med både patienter och tandtekniker, vilket underlättar förståelsen för behandlingsplanen.\n• Miljövänligt alternativ: Genom att minska användningen av fysiska material bidrar digital scanning till en mer hållbar tandvård.\n\nGenom att integrera digital 3D-scanning i vår klinik kan vi erbjuda en modern och effektiv tandvårdsupplevelse som är både bekvämare för patienten och ger oss de bästa förutsättningarna för framgångsrika behandlingsresultat.",
                  icon: <Layers className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                } as ServiceItem,
                {
                  title: "Implantatbehandling",
                  description:
                    "Avancerad digital planering och implementation av tandimplantat med hjälp av datamodellering för optimal placering och funktion.",
                  expandedDescription:
                    "Fördelar med vår digitalt planerade implantatbehandling:\n• Individuell anpassning: Genom att skapa en detaljerad 3D-modell av din munhåla kan vi skräddarsy behandlingen efter dina unika anatomiska förutsättningar, vilket resulterar i en naturlig känsla och utseende.\n• Förbättrad kommunikation: De digitala modellerna underlättar tydlig kommunikation mellan dig och vårt tandvårdsteam, vilket hjälper dig att förstå behandlingsprocessen och förväntade resultat.\n• Minskad behandlingstid: Den precisa planeringen möjliggör effektivare kirurgiska ingrepp, vilket ofta leder till kortare behandlingstid och snabbare återhämtning.\n• Ökad förutsägbarhet: Den digitala tekniken ger oss möjlighet att förutse och planera för eventuella utmaningar innan ingreppet, vilket minimerar risken för komplikationer.\n\nVårt engagemang för att använda den senaste tekniken inom implantatbehandling säkerställer att du får en trygg, effektiv och personligt anpassad vård med bästa möjliga resultat.",
                  icon: <Cpu className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                } as ServiceItem,
                {
                  title: "Digital Röntgen",
                  description:
                    "Lågstrålande digital röntgenteknik med omedelbar bildhantering och datorstyrd analys för ökad diagnostisk precision.",
                  expandedDescription:
                    "Fördelar med digital röntgenteknik:\n• Minskad strålningsexponering: Digital röntgen minskar stråldosen till patienten avsevärt jämfört med traditionell filmröntgen, vilket ökar säkerheten vid diagnostiska undersökningar.  ￼\n• Omedelbar bildvisning: Bilderna är tillgängliga direkt efter exponering, vilket möjliggör snabbare diagnoser och effektivare behandlingsplanering.\n• Miljövänligt alternativ: Genom att eliminera behovet av film och framkallningsvätskor minskar digital röntgen miljöpåverkan, vilket bidrar till en mer hållbar tandvård.  ￼\n• Förbättrad kommunikation: De digitala bilderna kan enkelt delas med patienter och andra vårdgivare, vilket underlättar samarbete och ökar patientens förståelse för sin behandling.\n\nGenom att integrera digital röntgenteknik i vår klinik kan vi erbjuda en modern och säker tandvårdsupplevelse som gynnar både patienten och miljön.",
                  icon: <BarChart className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                } as ServiceItem,
                {
                  title: "Invisible Orthodontics",
                  description:
                    "Diskreta och effektiva tandregleringsmetoder med digital spårning av framsteg och virtuell resultatvisualisering.",
                  icon: <Zap className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                } as ServiceItem,
                {
                  title: "Digital Protetik",
                  description:
                    "Högkvalitativa tandproteser designade och tillverkade med CAD/CAM-teknologi för perfekt passform och naturligt utseende.",
                  expandedDescription:
                    "Fördelar med CAD/CAM-teknologi inom protetik:\n• Snabbare behandling: Den effektiva processen minskar behandlingstiden, vilket innebär färre besök för patienten och snabbare leverans av den färdiga protesen.  ￼\n• Hållbara material: CAD/CAM-teknologi möjliggör användning av högkvalitativa och slitstarka material, vilket ger långvariga och pålitliga proteser.  ￼\n• Förbättrad estetik: Den digitala designprocessen möjliggör exakt färgmatchning och anpassning av protesens form, vilket resulterar i ett naturligt och estetiskt tilltalande utseende.\n\nGenom att integrera CAD/CAM-teknologi i vår protetiska behandling kan vi erbjuda våra patienter högkvalitativa, individuellt anpassade lösningar med överlägsen passform och estetik.",
                  icon: <Sparkles className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                } as ServiceItem,
                {
                  title: "Eget Tandtekniskt Laboratorium",
                  description:
                    "Fullständig kontroll för högsta kvalitet och skräddarsydda lösningar. På vår klinik har vi ett eget tandtekniskt laboratorium integrerat i våra lokaler.",
                  expandedDescription: 
                    "Eget Tandtekniskt Laboratorium\n\nFullständig kontroll för högsta kvalitet och skräddarsydda lösningar\n\nPå vår klinik har vi ett eget tandtekniskt laboratorium integrerat i våra lokaler. Detta gör att vi kan övervaka och styra hela produktionsprocessen från start till mål, vilket säkerställer högsta kvalitet och möjliggör individuellt anpassade lösningar för varje patient.\n\nFördelar med vårt in-house laboratorium:\n• Effektiv kommunikation: Direkt samarbete mellan tandläkare och tandtekniker leder till snabbare beslutsfattande och färre missförstånd.\n• Snabbare behandlingstider: Utan behov av externa leverantörer kan vi minska väntetiderna och erbjuda snabbare behandlingar.\n• Högre precision: Genom att använda avancerad teknik och ha full kontroll över arbetsflödet kan vi uppnå enastående passform och estetik i våra tandtekniska arbeten.\n\nVårt dedikerade team av erfarna tandtekniker arbetar nära våra tandläkare för att säkerställa att varje behandling uppfyller våra höga kvalitetsstandarder och överträffar patienternas förväntningar.",
                  icon: <Sparkles className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                } as ServiceItem,
              ].slice(0, 6).map((service, index) => (
                <StaggerItem key={index}>
                  <ThreeDCard className="group h-full border border-amber-100 bg-white p-6 shadow-md transition-all duration-300 hover:border-amber-200 hover:shadow-lg">
                    <div
                      className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 transition-transform duration-300 group-hover:scale-105`}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white">
                        <div className="text-amber-600">{service.icon}</div>
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-neutral-800">{service.title}</h3>
                    <p className="mb-4 text-neutral-600">{service.description}</p>
                    {service.expandedDescription && (
                      <div 
                        className="mt-auto flex items-center text-amber-600 cursor-pointer transition-all duration-300 hover:translate-x-1"
                        onClick={() => openModal(service.title, service.expandedDescription || '')}
                      >
                        <span className="text-sm font-medium">Läs mer</span>
                        <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    )}
                  </ThreeDCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Technology Section */}
        <section className="relative bg-gradient-to-b from-amber-50 to-white py-24 md:py-32" id="teknologi">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[150px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <div className="grid gap-16 md:grid-cols-2">
              <div>
                <Reveal>
                  <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                    <Cpu className="mr-2 h-3.5 w-3.5" />
                    Avancerad teknologi
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                    Framtidens verktyg{" "}
                    <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                      redan idag
                    </span>
                  </h2>
                  <p className="mb-8 text-lg text-neutral-600">
                    Vi investerar i den senaste tekniken för att ge dig den bästa möjliga vården med precision och
                    komfort som överträffar traditionell tandvård.
                  </p>
                </Reveal>

                <Parallax>
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-amber-100 shadow-md">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Avancerad tandvårdsteknologi"
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-2 text-sm font-medium text-amber-600">DIGITAL SCANNING</div>
                      <div className="text-xl font-bold text-neutral-800">Exakta digitala avtryck utan obehag</div>
                    </div>
                  </div>
                </Parallax>
              </div>

              <div>
                <StaggerChildren className="grid gap-6">
                  {[
                    {
                      title: "3D Scanning & Modellering",
                      description:
                        "Digital scanning för exakta avtryck utan obehagliga avtrycksmaterial, med realtidsvisualisering.",
                      expandedDescription:
                        "3D Scanning & Modellering\n\nModern teknik för komfort och precision\n\nDigital scanning för exakta avtryck utan obehagliga avtrycksmaterial, med realtidsvisualisering. Vår avancerade 3D-scanner skapar en exakt digital modell av dina tänder på bara några minuter, helt utan obehagliga avtrycksmaterial.\n\nFördelar med digital scanning:\n• Högre precision: Digitala avtryck är extremt exakta, vilket leder till bättre passform för tandersättningar.\n• Bekvämare upplevelse: Inget behov av konventionella avtrycksmaterial som många patienter upplever som obehagliga.\n• Omedelbar visualisering: Du kan se 3D-modellen av dina tänder direkt på skärmen.\n• Effektivare behandling: Digital information kan överföras omedelbart till vårt laboratorium, vilket sparar tid."
                    } as TechItem,
                    {
                      title: "AI-driven Bildanalys",
                      description:
                        "Artificiell intelligens som analyserar röntgenbilder för att upptäcka problem som kan vara svåra att se med blotta ögat.",
                      expandedDescription:
                        "AI-driven Bildanalys\n\nTidig upptäckt för bättre behandlingsresultat\n\nArtificiell intelligens som analyserar röntgenbilder för att upptäcka problem som kan vara svåra att se med blotta ögat. Våra AI-algoritmer är tränade på tusentals röntgenbilder och kan identifiera potentiella problem med en precision som kompletterar tandläkarens expertis.\n\nHur AI-driven bildanalys förbättrar din tandvård:\n• Tidig upptäckt: AI kan upptäcka små förändringar som kan vara tecken på framtida problem.\n• Objektivt beslutsstöd: AI-analysen fungerar som ett kompletterande diagnostiskt verktyg för våra tandläkare.\n• Konsekvent analys: Varje bild analyseras med samma noggrannhet och enligt samma kriterier.\n• Visuell presentation: Resultaten visualiseras på ett sätt som gör det lättare för dig att förstå din tandstatus."
                    },
                    {
                      title: "CAD/CAM Precisionstillverkning",
                      description:
                        "Datorstödd design och tillverkning för tandersättningar med mikrometernoggrannhet och perfekt passform.",
                      expandedDescription:
                        "CAD/CAM Precisionstillverkning\n\nDigital perfektion i varje detalj\n\nDatorstödd design och tillverkning för tandersättningar med mikrometernoggrannhet och perfekt passform. Efter att en digital scan har tagits, använder vi avancerad CAD (Computer-Aided Design) programvara för att designa tandersättningen digitalt, följt av CAM (Computer-Aided Manufacturing) för att tillverka den med extremt hög precision.\n\nFördelar med CAD/CAM-teknologi:\n• Enastående precision: Tillverkning med mikrometernoggrannhet för perfekt passform.\n• Tidseffektivt: Många tandersättningar kan tillverkas på en enda dag.\n• Hållbara material: Vi använder högkvalitativa material som är specifikt utvecklade för CAD/CAM-teknologi.\n• Förutsägbara resultat: Den digitala designprocessen möjliggör virtuell provning innan tillverkning."
                    },
                    {
                      title: "Guidad precision",
                      description:
                        "Guidad precision för trygg och skonsam implantatbehandling. Vi använder avancerad digital teknik för att planera varje implantat med högsta noggrannhet.",
                      expandedDescription:
                        "Guidad Precision\n\nMaximal säkerhet vid implantatbehandling\n\nGuidad precision för trygg och skonsam implantatbehandling. Vi använder avancerad digital teknik för att planera varje implantat med högsta noggrannhet. Genom kirurgiska guider säkerställs optimal placering med minimal påverkan på omkringliggande vävnad.\n\nSå fungerar guidad implantatkirurgi:\n• Digital planering: Baserat på 3D-röntgen och digitala avtryck skapar vi en exakt virtuell modell av din käke.\n• Optimal positionering: Implantaten planeras digitalt för bästa estetik, funktion och långsiktigt resultat.\n• Kirurgisk guide: En specialdesignad guide tillverkas för att styra exakt placering av implantaten.\n• Minimalt invasivt: Den exakta guidningen minimerar ingreppet och förkortar läkningstiden.\n\nDenna teknik ökar säkerheten och förutsägbarheten vid implantatbehandlingar avsevärt, samtidigt som den ofta möjliggör en snabbare och mer komfortabel procedur."
                    },
                    {
                      title: "Digital Behandlingsplanering",
                      description:
                        "Avancerad mjukvara som visualiserar behandlingsresultat innan behandlingen påbörjas för förutsägbara resultat.",
                      expandedDescription:
                        "Digital Behandlingsplanering\n\nSe resultatet innan behandlingen börjar\n\nAvancerad mjukvara som visualiserar behandlingsresultat innan behandlingen påbörjas för förutsägbara resultat. Vi använder sofistikerad simuleringsprogramvara som låter dig se hur det slutliga resultatet kommer att se ut, vilket ger dig möjlighet att delta aktivt i planeringen av din behandling.\n\nFördelar med digital behandlingsplanering:\n• Visuell förhandsvisning: Se hur ditt leende kommer att förändras genom behandlingen.\n• Informerade beslut: Bättre förståelse för de olika behandlingsalternativen och deras resultat.\n• Personlig anpassning: Möjlighet att justera behandlingsplanen baserat på dina önskemål och förväntningar.\n• Bättre kommunikation: Enklare att kommunicera dina önskemål till tandvårdsteamet.\n\nDigital behandlingsplanering används för många olika behandlingar, från tandreglering och fasader till omfattande rekonstruktioner, och hjälper till att säkerställa att slutresultatet motsvarar dina förväntningar."
                    },
                  ].map((tech, index) => (
                    <StaggerItem key={index}>
                      <TechCard className="group border-amber-100 bg-white shadow-md hover:border-amber-200 hover:shadow-lg">
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-neutral-800">{tech.title}</h3>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600 transition-transform duration-300 group-hover:scale-110">
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
                        </div>
                        <p className="text-neutral-600">{tech.description}</p>

                        {/* Progress bar to indicate technology advancement */}
                        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
                          <MotionDiv
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${85 + index * 3}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                        
                        {tech.expandedDescription && (
                          <div 
                            className="mt-4 flex items-center text-amber-600 cursor-pointer transition-all duration-300 hover:translate-x-1"
                            onClick={() => openModal(tech.title, tech.expandedDescription || '')}
                          >
                            <span className="text-sm font-medium">Läs mer</span>
                            <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </div>
                        )}
                      </TechCard>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </div>
          </div>
        </section>

        {/* Patient Reviews Section */}
        <section className="relative py-24 md:py-32" id="recensioner">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <Reveal>
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                  <Users className="mr-2 h-3.5 w-3.5" />
                  Vad våra patienter säger
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                  Hör från våra{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    nöjda patienter
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  Vi är stolta över att erbjuda högkvalitativ tandvård som våra patienter rekommenderar vidare.
                </p>
              </div>
            </Reveal>

            {/* Continuous review scroll animation */}
            <div className="relative overflow-hidden w-full py-10">
              {/* First scrolling row (left to right) */}
              <div className="relative w-full mb-8">
                <MotionDiv
                  className="flex gap-6"
                  animate={{ x: [0, -3000] }}
                  transition={{
                    duration: 60,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {[
                    {
                      name: "GA, bekräftad patient",
                      rating: 5,
                      review: "väldigt bra läkare. Jag rekomenderar Michael om man vill en bra och häsosam tand behandling.",
                      date: "9 juni 2024",
                    },
                    {
                      name: "LR, bekräftad patient",
                      rating: 5,
                      review: "Tandläkare team med mycket proffsigt bemötande och utmärkt resultat. Mycket nöjd med Filips arbete.",
                      date: "21 februari 2023",
                    },
                    {
                      name: "AR, bekräftad patient",
                      rating: 5,
                      review: "Kompetens och ärlighet!",
                      date: "28 mars 2023",
                    },
                    {
                      name: "MM, bekräftad patient",
                      rating: 5,
                      review: "Mycket proffsigt. Saklig och grundlig info i en behaglig miljö. Personalen uppvisade ett trevligt bemötande. Kan varmt rekomenderas.",
                      date: "15 juni 2022",
                    },
                    {
                      name: "AA, bekräftad patient",
                      rating: 5,
                      review: "Det finns ingen bättre Tandläkare och jag har träffat en hel del över alla min år tack Michael.",
                      date: "15 april 2024",
                    },
                    {
                      name: "MR, bekräftad patient",
                      rating: 5,
                      review: "Filip är den bästa tandläkaren jag någonsin haft. Proffsig, snabb, personlig och intresserad. Det gör aldrig ont, och han kommunicerar bra medan han arbetar, förbereder patienten på vad som ska hända. Personalen i övrigt är också supertrevlig och man känner sig väldigt välkommen.",
                      date: "13 december 2022",
                    },
                    {
                      name: "TB, bekräftad patient",
                      rating: 5,
                      review: "Har man tandläkarskräck är Arman det bästa tandläkare att avhjälpa det",
                      date: "12 april 2022",
                    },
                    {
                      name: "JB, bekräftad patient",
                      rating: 5,
                      review: "Utmärkt som vanligt.",
                      date: "31 januari 2024",
                    },
                    {
                      name: "SK, bekräftad patient",
                      rating: 5,
                      review: "Jag kan varmt rekommendera Arman och han team, där medmänsklighet och gedigen kunskap går hand i hand. Som patient kan man inte begära mer!!",
                      date: "13 december 2023",
                    },
                    {
                      name: "MS, bekräftad patient",
                      rating: 5,
                      review: "Jag är så nöjd med både kvaliteten, resultatet och det trevliga bemötandet. Känner alltid att det är relevanta rekommendationer på åtgärder och jag uppskattar att Filip inte lagar 'i onödan' utan sakligt berättar hur det ser ut och vilka alternativ som är möjliga.",
                      date: "10 oktober 2022",
                    },
                  ].map((review, index) => (
                    <ThreeDCard
                      key={index}
                      className="flex-shrink-0 w-[350px] border border-amber-100 bg-white p-6 shadow-md"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800">{review.name}</h3>
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <svg key={i} className="h-4 w-4 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-neutral-600 mb-4">{review.review}</p>
                    </ThreeDCard>
                  ))}
                  {/* Duplicate the first few cards to make the loop seamless */}
                  {[
                    {
                      name: "GA, bekräftad patient",
                      rating: 5,
                      review: "väldigt bra läkare. Jag rekomenderar Michael om man vill en bra och häsosam tand behandling.",
                      date: "9 juni 2024",
                    },
                    {
                      name: "LR, bekräftad patient",
                      rating: 5,
                      review: "Tandläkare team med mycket proffsigt bemötande och utmärkt resultat. Mycket nöjd med Filips arbete.",
                      date: "21 februari 2023",
                    },
                    {
                      name: "AR, bekräftad patient",
                      rating: 5,
                      review: "Kompetens och ärlighet!",
                      date: "28 mars 2023",
                    },
                  ].map((review, index) => (
                    <ThreeDCard
                      key={`repeat-${index}`}
                      className="flex-shrink-0 w-[350px] border border-amber-100 bg-white p-6 shadow-md"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800">{review.name}</h3>
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <svg key={i} className="h-4 w-4 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-neutral-600 mb-4">{review.review}</p>
                    </ThreeDCard>
                  ))}
                </MotionDiv>
              </div>

              {/* Second scrolling row (right to left) */}
              <div className="relative w-full">
                <MotionDiv
                  className="flex gap-6"
                  animate={{ x: [-3000, 0] }}
                  transition={{
                    duration: 60,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {[
                    {
                      name: "CB, bekräftad patient",
                      rating: 5,
                      review: "Bästa tandläkaren jag varit hos",
                      date: "11 januari 2024",
                    },
                    {
                      name: "AO, bekräftad patient",
                      rating: 5,
                      review: "Superb är det ord som beskriver den bäst.",
                      date: "21 november 2022",
                    },
                    {
                      name: "CG, bekräftad patient",
                      rating: 5,
                      review: "Professionell och förtroendeingivande, förklarar pedagogiskt vilka alternativ som finns. Resultatet blev utmärkt och som förväntat, rekommenderas varmt!",
                      date: "5 december 2023",
                    },
                    {
                      name: "AG, bekräftad patient",
                      rating: 5,
                      review: "En väldigt professionell upplevelse, noggrann och ingen stress. Trevlig och yrkesskicklig.",
                      date: "21 april 2022",
                    },
                    {
                      name: "BF, bekräftad patient",
                      rating: 5,
                      review: "Proffsigt!",
                      date: "15 november 2023",
                    },
                    {
                      name: "TM, bekräftad patient",
                      rating: 5,
                      review: "Bedste tandlæge i Malmø",
                      date: "19 januari 2023",
                    },
                    {
                      name: "CP, bekräftad patient",
                      rating: 5,
                      review: "Väldigt duktig! Högsta betyg.",
                      date: "7 september 2023",
                    },
                    {
                      name: "HM, bekräftad patient",
                      rating: 5,
                      review: "Gott och genuint bemötande, noggrann i sitt utförande. Fick utrymme att ställa frågor och kände att jag bemöttes i dessa med en hög professionalitet; Filip verkade svara utifrån vad som skulle ligga i mitt bästa intresse snarare än i den egna verksamhetens, vilket uppskattades.",
                      date: "27 oktober 2022",
                    },
                    {
                      name: "MC, bekräftad patient",
                      rating: 5,
                      review: "Jag rekommenderar starkt Dr. Michael. Han är bra och väldigt noggrann på sitt jobb..",
                      date: "31 maj 2023",
                    },
                    {
                      name: "RS, bekräftad patient",
                      rating: 5,
                      review: "Bra och trevlig bemötande av Professionell och kunnig personal. Kommer från besöket med en känsla av omhändertagande och god munhygien…",
                      date: "19 december 2022",
                    },
                  ].map((review, index) => (
                    <ThreeDCard
                      key={index}
                      className="flex-shrink-0 w-[350px] border border-amber-100 bg-white p-6 shadow-md"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800">{review.name}</h3>
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <svg key={i} className="h-4 w-4 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-neutral-600 mb-4">{review.review}</p>
                    </ThreeDCard>
                  ))}
                  {/* Duplicate the first few cards to make the loop seamless */}
                  {[
                    {
                      name: "CB, bekräftad patient",
                      rating: 5,
                      review: "Bästa tandläkaren jag varit hos",
                      date: "11 januari 2024",
                    },
                    {
                      name: "AO, bekräftad patient",
                      rating: 5,
                      review: "Superb är det ord som beskriver den bäst.",
                      date: "21 november 2022",
                    },
                    {
                      name: "CG, bekräftad patient",
                      rating: 5,
                      review: "Professionell och förtroendeingivande, förklarar pedagogiskt vilka alternativ som finns. Resultatet blev utmärkt och som förväntat, rekommenderas varmt!",
                      date: "5 december 2023",
                    },
                  ].map((review, index) => (
                    <ThreeDCard
                      key={`repeat-${index}`}
                      className="flex-shrink-0 w-[350px] border border-amber-100 bg-white p-6 shadow-md"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800">{review.name}</h3>
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <svg key={i} className="h-4 w-4 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-neutral-600 mb-4">{review.review}</p>
                    </ThreeDCard>
                  ))}
                </MotionDiv>
              </div>

              {/* Third scrolling row (left to right, slightly faster) */}
              <div className="relative w-full mt-8">
                <MotionDiv
                  className="flex gap-6"
                  animate={{ x: [0, -3000] }}
                  transition={{
                    duration: 50,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {[
                    {
                      name: "MK, bekräftad patient",
                      rating: 5,
                      review: "Alltid positiv och tillmötesgående.",
                      date: "6 maj 2024",
                    },
                    {
                      name: "BA, bekräftad patient",
                      rating: 5,
                      review: "Vänligt bemötande och information löpande. Inget nonsen-prat, men glada miner från alla på mottagningen.",
                      date: "18 oktober 2022",
                    },
                    {
                      name: "LA, bekräftad patient",
                      rating: 5,
                      review: "Mycket vänligt och bra bemötande och behandling. Bästa tandläkaren jag haft ur alla aspekter. Rekommenderas varmt!",
                      date: "13 februari 2023",
                    },
                    {
                      name: "MA, bekräftad patient",
                      rating: 5,
                      review: "Professionell tandläkare och sköterska. Alltid lika trevligt och vänligt bemötande och man blir väl omhändertagen.",
                      date: "12 april 2022",
                    },
                    {
                      name: "AC, bekräftad patient",
                      rating: 5,
                      review: "En professionell och trevlig tandläkare med härlig personal i hjärtat av Malmö. Här möts du av omtanke om dig som person och om dina tänder.",
                      date: "6 december 2023",
                    },
                    {
                      name: "LD, bekräftad patient",
                      rating: 5,
                      review: "Väl bemötande och grundlig vård.",
                      date: "9 oktober 2022",
                    },
                    {
                      name: "LH, bekräftad patient",
                      rating: 5,
                      review: "Proffesionellt och mycket postivt bemötande både från Filip och övrig personal. Kan verkligen rekommenderas",
                      date: "26 januari 2023",
                    },
                    {
                      name: "SF, bekräftad patient",
                      rating: 5,
                      review: "Trevligt och kvalitet behandling",
                      date: "20 december 2022",
                    },
                    {
                      name: "MS, bekräftad patient",
                      rating: 5,
                      review: "Mycket duktig o lätt på handen! Upplever nästan behandlingarna som smärtfria! PS. Jag har haft tandläkarskräck tidigare",
                      date: "22 april 2022",
                    },
                    {
                      name: "PO, bekräftad patient",
                      rating: 5,
                      review: "Noggrann, bra på att informera om behandlingen man ska genomgå. Berättar om för och nackdelar. Väldigt sympatisk, får en lugn och jag personligen känner enormt stort förtroende för Arman och även övrig personal på kliniken.",
                      date: "26 mars 2022",
                    },
                  ].map((review, index) => (
                    <ThreeDCard
                      key={index}
                      className="flex-shrink-0 w-[350px] border border-amber-100 bg-white p-6 shadow-md"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800">{review.name}</h3>
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <svg key={i} className="h-4 w-4 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-neutral-600 mb-4">{review.review}</p>
                    </ThreeDCard>
                  ))}
                  {/* Duplicate the first few cards to make the loop seamless */}
                  {[
                    {
                      name: "MK, bekräftad patient",
                      rating: 5,
                      review: "Alltid positiv och tillmötesgående.",
                      date: "6 maj 2024",
                    },
                    {
                      name: "BA, bekräftad patient",
                      rating: 5,
                      review: "Vänligt bemötande och information löpande. Inget nonsen-prat, men glada miner från alla på mottagningen.",
                      date: "18 oktober 2022",
                    },
                    {
                      name: "LA, bekräftad patient",
                      rating: 5,
                      review: "Mycket vänligt och bra bemötande och behandling. Bästa tandläkaren jag haft ur alla aspekter. Rekommenderas varmt!",
                      date: "13 februari 2023",
                    },
                  ].map((review, index) => (
                    <ThreeDCard
                      key={`repeat-${index}`}
                      className="flex-shrink-0 w-[350px] border border-amber-100 bg-white p-6 shadow-md"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800">{review.name}</h3>
                        <div className="flex items-center mb-3">
                          <div className="flex mr-2">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <svg key={i} className="h-4 w-4 text-amber-500 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-neutral-600 mb-4">{review.review}</p>
                    </ThreeDCard>
                  ))}
                </MotionDiv>
              </div>
            </div>

            <Reveal>
              <div className="mt-12 text-center">
                <p className="mb-6 text-sm text-neutral-600">
                  Detta är endast ett urval av våra patientrecensioner. Vi har hundratals fler omdömen från nöjda patienter. Klicka på knappen nedan för att se alla recensioner.
                </p>
                <Button 
                  variant="outline" 
                  className="inline-flex items-center border-amber-300 hover:bg-amber-50 text-amber-600"
                >
                  <span className="text-sm font-medium">Se alla recensioner</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-24 md:py-32" id="om-oss">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <div className="grid gap-16 md:grid-cols-2">
              <Parallax className="order-2 md:order-1">
                <ThreeDCard className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-md">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Baltzar Tandvård klinik"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2 text-sm font-medium text-amber-600">MODERN KLINIK</div>
                    <div className="text-xl font-bold text-neutral-800">Designad för komfort och precision</div>
                  </div>
                </ThreeDCard>
              </Parallax>

              <div className="order-1 flex flex-col justify-center md:order-2">
                <Reveal>
                  <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                    <Shield className="mr-2 h-3.5 w-3.5" />
                    Om Baltzar Tandvård
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                    Där innovation möter{" "}
                    <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                      expertis
                    </span>
                  </h2>
                  <p className="mb-6 text-lg text-neutral-600">
                    Baltzar Tandvård är en högteknologisk specialistklinik som kombinerar avancerad teknologi med
                    specialistkompetens. Vår filosofi är att erbjuda tandvård i absolut framkant i en miljö designad för
                    maximal komfort.
                  </p>
                  <p className="mb-8 text-neutral-600">
                    Med ett team av erfarna specialister och den senaste utrustningen kan vi erbjuda behandlingar med
                    högsta precision och förutsägbarhet. Vi ser varje patient som unik och skapar individuellt anpassade
                    behandlingsplaner baserade på digital analys och planering.
                  </p>
                </Reveal>

                <div className="grid grid-cols-2 gap-6">
                  <ThreeDCard className="rounded-xl border border-amber-100 bg-white p-6 shadow-md">
                    <div className="mb-2 bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-3xl font-bold text-transparent">
                      15+
                    </div>
                    <p className="text-neutral-600">Års erfarenhet inom specialisttandvård</p>
                  </ThreeDCard>
                  <ThreeDCard className="rounded-xl border border-amber-100 bg-white p-6 shadow-md">
                    <div className="mb-2 bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-3xl font-bold text-transparent">
                      5000+
                    </div>
                    <p className="text-neutral-600">Nöjda patienter genom åren</p>
                  </ThreeDCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialist Care Section */}
        <section className="relative py-24 md:py-32" id="specialistvård">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <Reveal>
                <div className="mb-4 inline-flex items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                  <Users className="mr-2 h-3.5 w-3.5" />
                  Ackrediterad specialisttandvård
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                  Specialisttandvård för{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    barn och unga vuxna
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  i samarbete med Region Skåne
                </p>
              </Reveal>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
              <Parallax>
                <ThreeDCard className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-md">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Specialisttandvård för barn"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2 text-sm font-medium text-amber-600">KOSTNADSFRI TANDVÅRD</div>
                    <div className="text-xl font-bold text-neutral-800">För barn och unga vuxna upp till 19 år</div>
                  </div>
                </ThreeDCard>
              </Parallax>

              <div className="flex flex-col justify-center">
                <Reveal>
                  <h3 className="mb-4 text-2xl font-bold text-neutral-900">
                    Kostnadsfri tandvård för barn och unga vuxna
                  </h3>
                  <p className="mb-6 text-neutral-600">
                    Vi erbjuder specialisttandvård för barn och unga vuxna i åldern 0–19 år, i enlighet med vårt avtal med Region Skåne. 
                    Denna vård är kostnadsfri och omfattar både allmän och specialisttandvård.
                  </p>
                  
                  <h3 className="mb-4 text-2xl font-bold text-neutral-900">
                    Välj oss som er tandvårdsenhet
                  </h3>
                  <p className="mb-6 text-neutral-600">
                    Som vårdnadshavare kan du välja vår klinik som tandvårdsenhet för ditt barn fram tills barnet fyller 13 år. 
                    Efter 13 års ålder kan ni göra valet tillsammans, och från 18 års ålder väljer den unga vuxna själv. 
                    Valet kan göras digitalt genom att logga in på 1177.se eller genom att fylla i en valblankett.
                  </p>
                  
                  <h3 className="mb-4 text-2xl font-bold text-neutral-900">
                    Specialisttandvård på remiss
                  </h3>
                  <p className="mb-8 text-neutral-600">
                    Om ditt barn behöver specialisttandvård, exempelvis inom ortodonti (tandreglering), käkkirurgi eller pedodonti (barntandvård), 
                    kan ni i samråd med er tandläkare välja vår specialisttandvårdsenhet. Vi tar emot remisser och erbjuder högkvalitativ vård 
                    anpassad efter varje individs behov.
                  </p>

                  <TechButton className="w-fit">Kontakta oss</TechButton>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 bg-neutral-50">
          <div className="container">
            <Reveal>
              <h2 className="mb-4 text-center text-3xl font-bold text-neutral-800 md:text-4xl">
                Vårt professionella team
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-neutral-600">
                Vårt dedikerade team av tandläkare och specialister erbjuder högkvalitativ tandvård med fokus på din komfort och hälsa.
              </p>
            </Reveal>
            
            {/* Staff members */}
            <ResponsiveGrid
              columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
              className="mt-12 gap-6 md:gap-8"
            >
              {/* Doctor 1 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                {/* Image container */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src="/images/staff/doctor1.png"
                    alt="Michael Braian"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-800">Michael Braian</h3>
                  <p className="text-sm text-amber-600">Tandläkare, Specialist Oral Protetik</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Specialiserad inom protetik med bakgrund som tandtekniker och odontologie doktor.
                  </p>
                </div>
              </MotionDiv>

              {/* Doctor 2 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src="/images/staff/doctor2.png"
                    alt="Arman Ameri"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-800">Arman Ameri</h3>
                  <p className="text-sm text-amber-600">Tandläkare, Specialist Oral Protetik</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Medgrundare av Baltzar Tandvård med passion för estetisk tandvård.
                  </p>
                </div>
              </MotionDiv>

              {/* Doctor 3 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src="/images/staff/doctor3.png"
                    alt="Filip Rebelo Dessborn"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-800">Filip Rebelo Dessborn</h3>
                  <p className="text-sm text-amber-600">Tandläkare, Verksamhetschef</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Erfaren tandläkare med särskilt intresse för Oral Protetik.
                  </p>
                </div>
              </MotionDiv>

              {/* Doctor 4 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src="/images/staff/doctor4.png"
                    alt="Daniel Jönsson"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-800">Daniel Jönsson</h3>
                  <p className="text-sm text-amber-600">Tandläkare, Specialist Parodontologi</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Docent i Internmedicinsk Forskning och Parodontologi.
                  </p>
                </div>
              </MotionDiv>

              {/* Hygienist 1 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src="/images/staff/hygienist1.png"
                    alt="Malin Andersson"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-800">Malin Andersson</h3>
                  <p className="text-sm text-amber-600">Tandhygienist</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Erfaren tandhygienist med passion för patientvård.
                  </p>
                </div>
              </MotionDiv>

              {/* Hygienist 2 */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src="/images/staff/hygienist2.png"
                    alt="Johanna Nielsen"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-800">Johanna Nielsen</h3>
                  <p className="text-sm text-amber-600">Tandhygienist</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Erfaren hygienist med bakgrund inom ortopedi och förlossningsvård.
                  </p>
                </div>
              </MotionDiv>

              {/* Assistant */}
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src="/images/staff/assistant1.png"
                    alt="Samra Salama"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-neutral-800">Samra Salama</h3>
                  <p className="text-sm text-amber-600">Tandsköterska</p>
                  <p className="mt-2 text-sm text-neutral-600">
                    Skapar en trygg och positiv upplevelse för alla patienter.
                  </p>
                </div>
              </MotionDiv>

            </ResponsiveGrid>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-24 md:py-32" id="kontakt">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-600/10 blur-[150px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <Reveal>
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                  <Phone className="mr-2 h-3.5 w-3.5" />
                  Kontakta oss
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                  Boka din{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    digitala konsultation
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  Vi finns här för att svara på dina frågor och hjälpa dig ta första steget mot en modern
                  tandvårdsupplevelse.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <StaggerChildren className="grid gap-6">
                  <StaggerItem>
                    <TechCard className="border-amber-100 bg-white shadow-md">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-neutral-800">Ring oss</h3>
                      <p className="mb-2 text-neutral-600">Vi svarar på dina frågor och hjälper dig boka tid.</p>
                      <a href="tel:+46123456789" className="text-lg font-medium text-amber-600 hover:underline">
                        040-123 45 67
                      </a>
                    </TechCard>
                  </StaggerItem>

                  <StaggerItem>
                    <TechCard className="border-amber-100 bg-white shadow-md">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-neutral-800">Besök oss</h3>
                      <p className="mb-2 text-neutral-600">Vår högteknologiska klinik ligger centralt i Malmö.</p>
                      <address className="not-italic text-neutral-800">
                        Baltzarsgatan 12
                        <br />
                        211 36 Malmö
                      </address>
                    </TechCard>
                  </StaggerItem>

                  <StaggerItem>
                    <TechCard className="border-amber-100 bg-white shadow-md">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <Clock className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-neutral-800">Öppettider</h3>
                      <p className="mb-2 text-neutral-600">Vi har flexibla tider för att passa ditt schema.</p>
                      <ul className="space-y-1 text-neutral-800">
                        <li>Måndag - Torsdag: 08:00 - 17:00</li>
                        <li>Fredag: 08:00 - 15:00</li>
                        <li>Lördag - Söndag: Stängt</li>
                      </ul>
                    </TechCard>
                  </StaggerItem>
                </StaggerChildren>
              </div>

              <Reveal>
                <ThreeDCard className="overflow-hidden rounded-xl border border-amber-100 bg-white p-8 shadow-md">
                  <h3 className="mb-6 text-center text-2xl font-semibold text-neutral-800">
                    Boka digital konsultation
                  </h3>
                  <form className="grid gap-6">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-neutral-600">
                        Namn
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Ditt namn"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-neutral-600">
                        E-post
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Din e-postadress"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium text-neutral-600">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Ditt telefonnummer"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="service" className="text-sm font-medium text-neutral-600">
                        Tjänst
                      </label>
                      <select
                        id="service"
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      >
                        <option value="">Välj tjänst</option>
                        <option value="implants">Implantatbehandling</option>
                        <option value="orthodontics">Invisible Orthodontics</option>
                        <option value="prosthetics">Digital Protetik</option>
                        <option value="lab">Eget Tandtekniskt Laboratorium</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium text-neutral-600">
                        Meddelande
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Beskriv ditt ärende"
                      ></textarea>
                    </div>
                    <TechButton className="w-full">Skicka förfrågan</TechButton>
                  </form>
                </ThreeDCard>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-amber-100 bg-white py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Baltzar-Tandva%CC%8Ard-RGB-mod-286-8MdUcuR5huMlYQvylz1HsD40HkSIJe.png"
                  alt="Baltzar Tandvård"
                  width={150}
                  height={50}
                  className="h-auto w-auto"
                  priority
                />
              </Link>
              <p className="text-neutral-600">
                Avancerad specialisttandvård med digital precision och personlig omsorg.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Tjänster</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Digital Implantatbehandling
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Estetisk Digital Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    AI-assisterad Diagnostik
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Invisible Orthodontics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Digital Protetik
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Information</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Om oss
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Vårt team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Teknologi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Vanliga frågor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Integritetspolicy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Kontakt</h3>
              <address className="not-italic text-neutral-600">
                <p className="mb-2">
                  Baltzarsgatan 12
                  <br />
                  211 36 Malmö
                </p>
                <p className="mb-2">
                  <a href="tel:+46401234567" className="transition-colors hover:text-amber-600">
                    040-123 45 67
                  </a>
                </p>
                <p>
                  <a href="mailto:info@baltzartandvard.se" className="transition-colors hover:text-amber-600">
                    info@baltzartandvard.se
                  </a>
                </p>
              </address>
            </div>
          </div>
          <div className="mt-12 border-t border-amber-100 pt-6 text-center text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} Baltzar Tandvård. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

