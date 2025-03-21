"use client"

import * as React from "react"
import { useScroll, useSpring } from "framer-motion"
import { MotionDiv } from "../ui/motion"

export interface ScrollProgressProps {
  children?: (progress: number) => React.ReactNode;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ children }) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // If children is provided, render them with the progress value
  if (children) {
    return children(scrollYProgress as unknown as number)
  }

  // Default implementation - a progress bar at the top of the page
  return (
    <MotionDiv
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 z-50 origin-left scroll-fixed"
      style={{ scaleX }}
    />
  )
}

