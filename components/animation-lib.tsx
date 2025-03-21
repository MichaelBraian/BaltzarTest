"use client"

// Re-export animation components
export { Parallax } from './animations/parallax'
export { Reveal } from './animations/reveal'
export { ScrollProgress } from './animations/scroll-progress'
export { StaggerChildren, StaggerItem } from './animations/stagger-children'

// Re-export motion components
export {
  MotionDiv,
  MotionSpan,
  MotionHeader,
  MotionSection,
  MotionMain,
  MotionNav,
  MotionFooter,
  MotionA,
  MotionButton,
  MotionUl,
  MotionLi,
  MotionImg,
  MotionH1,
  MotionH2,
  MotionH3,
  MotionH4,
  MotionH5,
  MotionH6,
  MotionP,
  // Animation presets
  fadeIn,
  slideUp,
  slideRight,
  staggerChildren,
  // Helper
  withAnimation
} from './ui/motion' 