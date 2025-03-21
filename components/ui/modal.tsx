"use client"

import React, { useRef, useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "./button"

// Define types
export interface ModalContent {
  isOpen: boolean;
  title: string;
  content: string;
  clickPosition?: { x: number; y: number };
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  clickPosition?: { x: number; y: number };
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content, clickPosition }) => {
  if (!isOpen) return null;
  
  // References for positioning
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Handle touch events to close modal on swipe down (mobile UX improvement)
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [swipeDistance, setSwipeDistance] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Set body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Disable body scroll when modal is open
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Re-enable body scroll when modal closes
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Calculate modal position based on click location or center for mobile
  const getModalStyle = () => {
    if (isMobile || !clickPosition || typeof window === 'undefined') {
      return {}; // Center position for mobile
    }

    const viewportHeight = window.innerHeight;
    const modalHeight = 400; // Estimated modal height
    
    // Calculate optimal Y position - position modal near click point
    let topPosition = clickPosition.y - window.scrollY - 100; // Position slightly above click point
    
    // Ensure modal stays within viewport bounds
    if (topPosition + modalHeight > viewportHeight) {
      topPosition = viewportHeight - modalHeight - 20; // 20px padding from bottom
    }
    if (topPosition < 20) {
      topPosition = 20; // 20px padding from top
    }
    
    return {
      top: `${topPosition}px`,
      left: '50%',
      transform: 'translateX(-50%)',
    };
  };

  // Touch event handlers for swipe-to-close
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setTouchEnd(null);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
    
    // Only calculate swipe if starting from top of modal (header area)
    if (touchStart && e.target instanceof HTMLElement &&
        (e.target.closest('.modal-header') || swipeDistance > 0)) {
      const distance = e.targetTouches[0].clientY - touchStart;
      
      // Only track downward swipes
      if (distance > 0) {
        setSwipeDistance(distance);
        
        // Apply transform to modal content for visual feedback
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${Math.min(distance, 200)}px)`;
          
          // Decrease opacity as user swipes down
          const opacity = Math.max(1 - distance / 300, 0.5);
          contentRef.current.style.opacity = opacity.toString();
        }
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    // If user swiped down more than 100px, close the modal
    const distance = touchEnd - touchStart;
    if (distance > 100) {
      onClose();
    } else {
      // Reset position and opacity
      if (contentRef.current) {
        contentRef.current.style.transform = '';
        contentRef.current.style.opacity = '1';
      }
      setSwipeDistance(0);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Prevent event bubbling
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-70 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Modal container */}
        <div
          ref={modalRef}
          className="fixed z-50 max-h-[90vh] w-[90%] max-w-md rounded-xl bg-white shadow-2xl"
          style={{
            ...(isMobile
              ? {
                  bottom: '5vh',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }
              : getModalStyle()),
          }}
          onClick={handleContentClick}
        >
          {/* Modal content */}
          <div
            ref={contentRef}
            className="transition-transform duration-200"
            style={{
              // Only apply transition when not actively swiping
              transitionProperty: swipeDistance > 0 ? 'none' : 'transform, opacity',
            }}
          >
            {/* Modal header with drag indicator for mobile */}
            <div className="modal-header flex items-center justify-between border-b border-amber-100 p-4">
              {isMobile && (
                <div className="absolute left-1/2 top-2 h-1 w-12 -translate-x-1/2 rounded-full bg-neutral-200" />
              )}
              <h3 className="mt-2 text-lg font-semibold text-neutral-800">{title}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full"
                aria-label="Stäng"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Modal body */}
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="prose prose-amber max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; 