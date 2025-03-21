"use client"

import * as React from "react"
import { MotionConfig, domAnimation, LazyMotion, m } from "framer-motion"

// Re-export the 'm' namespace for use in components
export { m }

interface FramerMotionProviderProps {
  children: React.ReactNode
}

export function FramerMotionProvider({ children }: FramerMotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{
          // Smooth transitions optimized for mobile
          ease: "easeInOut",
          duration: 0.3
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  )
} 