"use client"

import * as React from "react"
import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"
import { MotionDiv } from "../ui/motion"

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down"
}

export const Parallax = ({ children, speed = 0.5, className = "", direction = "up" }: ParallaxProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const factor = direction === "up" ? -speed * 100 : speed * 100
  const y = useTransform(scrollYProgress, [0, 1], [0, factor])

  return (
    <div ref={ref} className={`relative overflow-hidden scroll-fixed ${className}`}>
      <MotionDiv style={{ y }}>{children}</MotionDiv>
    </div>
  )
}

