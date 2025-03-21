"use client"

import * as React from "react"
import { useIsTouchDevice } from "../../hooks/use-mobile"
import { cn } from "../../lib/utils"
import { MotionDiv } from "./motion"

interface TechCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  onClick?: () => void
}

export function TechCard({ 
  children, 
  className, 
  hoverEffect = true,
  onClick 
}: TechCardProps) {
  const isTouch = useIsTouchDevice();
  const [isPressed, setIsPressed] = React.useState(false);
  
  // Determine if the card is interactive
  const isInteractive = onClick || hoverEffect;

  return (
    <MotionDiv
      className={cn(
        "relative overflow-hidden rounded-xl border border-amber-100 bg-white p-4 md:p-6",
        isInteractive && "group",
        isInteractive && "cursor-pointer",
        isPressed && "bg-amber-50",
        className,
      )}
      whileHover={
        hoverEffect && !isTouch
          ? {
              y: -5,
              transition: { duration: 0.2 },
            }
          : {}
      }
      whileTap={
        isInteractive && isTouch
          ? {
              scale: 0.98,
              transition: { duration: 0.1 },
            }
          : {}
      }
      onTapStart={() => setIsPressed(true)}
      onTapCancel={() => setIsPressed(false)}
      onTap={() => {
        setIsPressed(false);
        onClick?.();
      }}
      onClick={onClick}
    >
      {children}
      {hoverEffect && (
        <MotionDiv
          className="absolute inset-0 bg-gradient-to-t from-amber-100/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </MotionDiv>
  )
}

