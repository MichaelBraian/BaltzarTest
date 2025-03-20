"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"

interface TechButtonProps extends ButtonProps {
  glowColor?: string
}

export function TechButton({ children, className, glowColor = "rgba(217, 119, 6, 0.5)", ...props }: TechButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative">
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ backgroundColor: glowColor }}
        />
      )}
      <Button
        className={cn(
          "relative z-10 overflow-hidden border border-amber-200 bg-gradient-to-r from-amber-600 to-amber-500 text-white transition-all duration-300",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </div>
  )
}

