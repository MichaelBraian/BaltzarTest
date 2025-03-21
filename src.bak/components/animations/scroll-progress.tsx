import React from 'react';
import { motion, useScroll } from 'framer-motion';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = '#F59E0B', // amber-500
  height = 3,
  position = 'top'
}) => {
  const { scrollYProgress } = useScroll();

  const positionStyles = {
    top: { top: 0 },
    bottom: { bottom: 0 }
  };

  return (
    <motion.div
      className="fixed left-0 z-50 w-full origin-left"
      style={{
        ...positionStyles[position],
        height,
        backgroundColor: color,
        scaleX: scrollYProgress,
      }}
    />
  );
}; 