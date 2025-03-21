"use client"

import * as React from "react"
import { useRef, useEffect } from "react"
import { useInView, useAnimation } from "framer-motion"
import { MotionDiv } from "../ui/motion"

interface RevealProps {
  children: React.ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  duration?: number
  from?: "bottom" | "left" | "right" | "top"
  className?: string
}

// Define a type for our animation variants
interface AnimationVariant {
  opacity: number;
  x?: number;
  y?: number;
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0.25,
  duration = 0.5,
  from = "bottom",
  className = "",
}: RevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()

  const getVariants = () => {
    const variants = {
      hidden: { opacity: 0 } as AnimationVariant,
      visible: { opacity: 1 } as AnimationVariant,
    }

    switch (from) {
      case "bottom":
        variants.hidden = { ...variants.hidden, y: 75 }
        variants.visible = { ...variants.visible, y: 0 }
        break
      case "top":
        variants.hidden = { ...variants.hidden, y: -75 }
        variants.visible = { ...variants.visible, y: 0 }
        break
      case "left":
        variants.hidden = { ...variants.hidden, x: -75 }
        variants.visible = { ...variants.visible, x: 0 }
        break
      case "right":
        variants.hidden = { ...variants.hidden, x: 75 }
        variants.visible = { ...variants.visible, x: 0 }
        break
    }

    return variants
  }

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <div ref={ref} style={{ width }} className={className}>
      <MotionDiv
        variants={getVariants()}
        initial="hidden"
        animate={controls}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.25, 0.25, 0.75],
        }}
      >
        {children}
      </MotionDiv>
    </div>
  )
}

