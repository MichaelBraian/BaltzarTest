"use client"

import * as React from "react"
import { m, type MotionProps } from "framer-motion"

// Export individual components from 'm' namespace for ease of use
export const MotionDiv = m.div
export const MotionSpan = m.span
export const MotionHeader = m.header
export const MotionSection = m.section
export const MotionMain = m.main
export const MotionNav = m.nav
export const MotionFooter = m.footer
export const MotionA = m.a
export const MotionButton = m.button
export const MotionUl = m.ul
export const MotionLi = m.li
export const MotionImg = m.img

// Add heading and paragraph elements
export const MotionH1 = m.h1
export const MotionH2 = m.h2
export const MotionH3 = m.h3
export const MotionH4 = m.h4
export const MotionH5 = m.h5
export const MotionH6 = m.h6
export const MotionP = m.p

// Common animation presets
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration: 0.3 }
}

export const slideRight = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
  transition: { duration: 0.3 }
}

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Helper hook to create consistent animations
export function withAnimation<T extends MotionProps>(Component: React.ComponentType<T>) {
  return React.forwardRef<HTMLElement, T & { animation?: "fadeIn" | "slideUp" | "slideRight" | "none" }>(
    ({ animation = "none", ...props }, ref) => {
      const animationProps = animation === "none" 
        ? {} 
        : animation === "fadeIn" 
          ? fadeIn 
          : animation === "slideUp" 
            ? slideUp 
            : slideRight;
      
      // Force type casting to avoid TypeScript error
      return <Component ref={ref} {...animationProps} {...(props as unknown as T)} />;
    }
  );
} 