import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';
import { useFocusManagement } from '../hooks/useFocusManagement';

// Modal Content Type
export interface ModalContent {
  isOpen: boolean;
  title: string;
  content: string;
  clickPosition?: { x: number; y: number };
}

// Main App Context Interface
interface AppContextType {
  // Modal state
  modalContent: ModalContent;
  openModal: (title: string, content: string, event?: React.MouseEvent) => void;
  closeModal: () => void;
  
  // Expanded services state
  expandedServices: number[];
  toggleServiceExpansion: (index: number) => void;
  
  // Expanded technology state
  expandedTech: number[];
  toggleTechExpansion: (index: number) => void;

  // Focus management
  setActiveSection: (section: string) => void;
  activeSection: string;
  focusSection: (section: string) => void;
  
  // Service/Tech content refs for accessibility focus management
  registerServiceRef: (index: number, ref: HTMLDivElement | null) => void;
  registerTechRef: (index: number, ref: HTMLDivElement | null) => void;
}

// Create context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider props interface
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Modal state
  const [modalContent, setModalContent] = useState<ModalContent>({
    isOpen: false,
    title: '',
    content: '',
    clickPosition: undefined
  });

  // Expanded services and tech states
  const [expandedServices, setExpandedServices] = useState<number[]>([]);
  const [expandedTech, setExpandedTech] = useState<number[]>([]);
  
  // Section focusing
  const [activeSection, setActiveSection] = useState<string>('hero');
  // Reference collections for services and technology expandable content
  const serviceContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const techContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Focus management
  const { setFocus } = useFocusManagement({ 
    restoreFocus: true,
    focusDelay: 300
  });
  
  // Register refs for expandable content
  const registerServiceRef = useCallback((index: number, ref: HTMLDivElement | null) => {
    serviceContentRefs.current[index] = ref;
  }, []);
  
  const registerTechRef = useCallback((index: number, ref: HTMLDivElement | null) => {
    techContentRefs.current[index] = ref;
  }, []);

  // Modal management functions
  const openModal = useCallback((title: string, content: string, event?: React.MouseEvent): void => {
    // Get click position for optimal modal placement
    const clickPosition = event ? {
      x: event.clientX,
      y: event.clientY
    } : undefined;
    
    setModalContent({
      isOpen: true,
      title,
      content,
      clickPosition
    });
    
    // Lock scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);
  
  const closeModal = useCallback((): void => {
    setModalContent(prev => ({
      ...prev,
      isOpen: false
    }));
    
    // Unlock scroll when modal is closed
    document.body.style.overflow = '';
  }, []);

  // Item expansion toggle functions with focus management
  const toggleServiceExpansion = useCallback((index: number): void => {
    setExpandedServices(prev => {
      const newExpanded = prev.includes(index) ? [] : [index];
      
      // If we're expanding, set a timeout to focus on content after animation
      if (newExpanded.length > 0) {
        setTimeout(() => {
          if (serviceContentRefs.current[index]) {
            setFocus(serviceContentRefs.current[index]);
          }
        }, 350); // Slightly longer than animation duration
      }
      
      return newExpanded;
    });
  }, [setFocus]);
  
  const toggleTechExpansion = useCallback((index: number): void => {
    setExpandedTech(prev => {
      const newExpanded = prev.includes(index) ? [] : [index];
      
      // If we're expanding, set a timeout to focus on content after animation
      if (newExpanded.length > 0) {
        setTimeout(() => {
          if (techContentRefs.current[index]) {
            setFocus(techContentRefs.current[index]);
          }
        }, 350); // Slightly longer than animation duration
      }
      
      return newExpanded;
    });
  }, [setFocus]);
  
  // Function to focus on a section by ID
  const focusSection = useCallback((section: string): void => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
      
      // Focus the section's heading (better for accessibility)
      const heading = sectionElement.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading instanceof HTMLElement) {
        setTimeout(() => {
          heading.focus();
          // Also set an outline on the heading for keyboard users
          heading.style.outline = '2px solid rgba(0, 0, 0, 0.2)';
          
          // Remove the outline after a few seconds
          setTimeout(() => {
            heading.style.outline = '';
          }, 3000);
        }, 600);
      }
    }
  }, []);

  // Context value
  const value = {
    modalContent,
    openModal,
    closeModal,
    expandedServices,
    toggleServiceExpansion,
    expandedTech,
    toggleTechExpansion,
    activeSection,
    setActiveSection,
    focusSection,
    registerServiceRef,
    registerTechRef
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  
  return context;
}; 