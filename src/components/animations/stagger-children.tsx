import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerChildren: React.FC<StaggerChildrenProps> = ({ 
  children, 
  className = '',
  staggerDelay = 0.1
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: { 
          transition: { 
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          } 
        },
        hidden: {}
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 30 }
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}; 