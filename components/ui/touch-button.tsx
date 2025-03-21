"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"
import { useIsTouchDevice } from "../../hooks/use-mobile"

const touchButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-amber-200 bg-white hover:bg-amber-50 text-amber-800",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-amber-600",
      },
      size: {
        default: "h-10 py-2 px-4 md:h-auto md:py-2 md:px-4",
        sm: "h-9 px-3 rounded-md md:h-auto md:py-1.5 md:px-3",
        lg: "h-12 px-8 rounded-md md:h-auto md:py-3 md:px-8",
        icon: "h-12 w-12 md:h-10 md:w-10",
        touch: "h-14 px-6 rounded-md", // Larger for touch devices
      },
      fullWidth: {
        true: "w-full",
      },
      withRipple: {
        true: "relative overflow-hidden",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
      withRipple: true,
    },
  }
)

export interface TouchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof touchButtonVariants> {
  asChild?: boolean
}

const TouchButton = React.forwardRef<HTMLButtonElement, TouchButtonProps>(
  ({ className, variant, size, fullWidth, withRipple, asChild = false, children, ...props }, ref) => {
    const isTouch = useIsTouchDevice();
    const [ripples, setRipples] = React.useState<{
      id: number;
      x: number;
      y: number;
      size: number;
    }[]>([]);
    
    // Automatically use the "touch" size on touch devices if not specified
    const responsiveSize = size || (isTouch ? "touch" : "default");
    
    // Handle ripple effect on touch devices
    const addRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!withRipple || !isTouch) return;
      
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;
      
      const id = Date.now();
      
      setRipples([...ripples, { id, x, y, size }]);
      
      // Clean up ripple after animation
      setTimeout(() => {
        setRipples(current => current.filter(ripple => ripple.id !== id));
      }, 600);
    };
    
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(
          touchButtonVariants({ 
            variant, 
            size: responsiveSize, 
            fullWidth, 
            withRipple,
            className 
          }),
        )}
        ref={ref}
        onClick={(e) => {
          addRipple(e);
          props.onClick?.(e);
        }}
        {...props}
      >
        {withRipple && isTouch && ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute bg-white/20 rounded-full animate-ripple"
            style={{
              top: ripple.y - ripple.size / 2,
              left: ripple.x - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
        {children}
      </Comp>
    )
  }
)
TouchButton.displayName = "TouchButton"

export { TouchButton, touchButtonVariants } 