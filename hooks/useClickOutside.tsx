import { useEffect, RefObject } from 'react';

/**
 * Hook that alerts when you click outside of the passed ref
 * @param ref The reference to the element to detect clicks outside of
 * @param handler The callback to run when a click outside is detected
 * @param excludeRefs Optional array of refs to exclude from outside click detection
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  excludeRefs: RefObject<HTMLElement>[] = []
): void {
  useEffect(() => {
    // Function that checks if the click is outside the ref
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Check if the click was outside the main ref
      const isOutside = ref.current && !ref.current.contains(target);
      
      // Check if the click was inside any excluded element
      const isInsideExcluded = excludeRefs.some(
        (excludeRef) => excludeRef.current && excludeRef.current.contains(target)
      );
      
      // Only call the handler if the click is outside all references
      if (isOutside && !isInsideExcluded) {
        handler(event);
      }
    };

    // Add event listeners for mouse and touch events
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup the event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, handler, excludeRefs]);
} 