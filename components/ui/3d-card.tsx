"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { MotionDiv } from "./motion"
import { cn } from "../../lib/utils"

interface ThreeDCardProps {
  children: ReactNode
  className?: string
  glareOpacity?: number
  rotationIntensity?: number
}

export function ThreeDCard({ children, className, glareOpacity = 0.2, rotationIntensity = 10 }: ThreeDCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation based on mouse position
    const rotateXValue = (mouseY / (rect.height / 2)) * -rotationIntensity
    const rotateYValue = (mouseX / (rect.width / 2)) * rotationIntensity

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)

    // Calculate glare position
    const glareX = (mouseX / rect.width) * 100
    const glareY = (mouseY / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <MotionDiv
      ref={cardRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}), transparent 50%)`,
        }}
      />
    </MotionDiv>
  )
}

