"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  fluid?: boolean;
  noPadding?: boolean;
  centered?: boolean;
  fullHeight?: boolean;
  className?: string;
  children: React.ReactNode;
  safePadding?: boolean; // For iOS safe areas
}

export function ResponsiveContainer({
  as: Component = "div",
  fluid = false,
  noPadding = false,
  centered = false,
  fullHeight = false,
  safePadding = false,
  className,
  children,
  ...props
}: ResponsiveContainerProps) {
  return (
    <Component
      className={cn(
        // Base container styles
        "w-full mx-auto",
        
        // Width constraints based on fluid option
        fluid ? "max-w-none" : "max-w-7xl",
        
        // Padding options - mobile-first approach
        noPadding 
          ? "" 
          : safePadding 
            ? "px-4 sm:px-6 md:px-8 lg:px-10 px-safe py-safe" 
            : "px-4 sm:px-6 md:px-8 lg:px-10",
        
        // Centered content
        centered && "flex flex-col items-center justify-center text-center",
        
        // Full height option - uses the mobile viewport height fix
        fullHeight && "h-full min-h-screen-real",
        
        // Custom classes
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    xs?: number; // Added xs breakpoint for smaller screens
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  children: React.ReactNode;
  className?: string;
  autoFit?: boolean; // Auto-fit columns on small screens
  minColumnWidth?: string; // Min column width for auto-fit
}

export function ResponsiveGrid({
  columns = {
    xs: 1,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  },
  gap = "gap-4 md:gap-6",
  autoFit = false,
  minColumnWidth = "16rem",
  children,
  className,
  ...props
}: ResponsiveGridProps) {
  // Convert columns to appropriate grid template columns
  const getGridCols = () => {
    if (autoFit) {
      return `grid-cols-1 auto-cols-fr xs:grid-cols-[repeat(auto-fit,minmax(${minColumnWidth},1fr))]`;
    }
    
    return [
      columns.xs && `grid-cols-${columns.xs}`,
      columns.sm && `sm:grid-cols-${columns.sm}`,
      columns.md && `md:grid-cols-${columns.md}`,
      columns.lg && `lg:grid-cols-${columns.lg}`,
      columns.xl && `xl:grid-cols-${columns.xl}`
    ].filter(Boolean).join(" ");
  };
  
  return (
    <div
      className={cn(
        "grid w-full",
        getGridCols(),
        gap,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 