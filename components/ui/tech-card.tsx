"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TechCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
}

export function TechCard({ children, className, hoverEffect = true }: TechCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6",
        hoverEffect && "group",
        className,
      )}
      whileHover={
        hoverEffect
          ? {
              y: -5,
              transition: { duration: 0.2 },
            }
          : {}
      }
    >
      {children}
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-amber-100/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  )
}

