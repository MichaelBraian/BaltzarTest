import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single className string
 * Uses clsx for conditional classes and tailwind-merge to properly merge Tailwind CSS classes
 * 
 * @example cn("text-red-500", isActive && "font-bold", "p-4")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a string to a URL-friendly slug
 * 
 * @example formatSlug("Hello World") // "hello-world"
 */
export function formatSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
}

/**
 * Validates an email address with basic checks
 * 
 * @example isValidEmail("user@example.com") // true
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Safely truncates a string to a maximum length with ellipsis
 * 
 * @example truncateString("This is a very long text", 10) // "This is a..."
 */
export function truncateString(str: string, maxLength: number = 50): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength - 3)}...`
}

/**
 * Debounces a function by delaying its execution until after a specified wait time
 * 
 * @example const debouncedFn = debounce(() => console.log('Resized'), 300)
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  ms: number = 300
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), ms)
  }
}

/**
 * Generates a random alphanumeric string of specified length
 * 
 * @example generateId(8) // "a1b2c3d4"
 */
export function generateId(length: number = 8): string {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * 36).toString(36)
  ).join('')
}

/**
 * Formats a number as currency
 * 
 * @example formatCurrency(1234.5) // "1,234.50 kr"
 */
export function formatCurrency(amount: number, locale: string = 'sv-SE', currency: string = 'SEK'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Gets a nested value from an object using a path string
 * 
 * @example getNestedValue({ user: { profile: { name: 'John' } } }, 'user.profile.name') // 'John'
 */
export function getNestedValue<T, K extends Record<string, unknown>>(
  obj: K, 
  path: string, 
  defaultValue?: T
): T | undefined {
  const keys = path.split('.')
  let result: unknown = obj
  
  for (const key of keys) {
    if (result === undefined || result === null) return defaultValue
    result = (result as Record<string, unknown>)[key]
  }
  
  return (result as T) ?? defaultValue
}

// Safe clipboard function
export const safeClipboard = {
  copyToClipboard: async (text: string): Promise<boolean> => {
    if (typeof window === 'undefined' || !navigator.clipboard) {
      console.warn('Clipboard API not available');
      return false;
    }
    
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy text: ', error);
      return false;
    }
  }
};
