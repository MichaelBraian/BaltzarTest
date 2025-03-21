'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  
  // Only show the UI after first client-side render to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Use forcedTheme during SSR and initial render to avoid hydration mismatch
  // Only the client-side rendering will use the actual theme
  return (
    <NextThemesProvider 
      {...props} 
      forcedTheme={mounted ? undefined : "light"}
      disableTransitionOnChange 
      storageKey="baltzar-theme"
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
      enableColorScheme={false}  // Prevent color-scheme style attribute
    >
      {children}
    </NextThemesProvider>
  )
}
