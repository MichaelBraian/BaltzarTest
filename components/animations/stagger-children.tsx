"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface StaggerChildrenProps {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
  className?: string
}

export const StaggerChildren = ({
  children,
  delay = 0.25,
  staggerDelay = 0.1,
  className = "",
}: StaggerChildrenProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.25, 0.25, 0.75],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

