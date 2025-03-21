import { useState, useEffect } from 'react';
import { StaticImageData } from 'next/image';
import { 
  SectionName, 
  loadSectionBackground, 
  loadDefaultSectionBackground,
  getDefaultBackgroundName,
  ImageFormat 
} from '@/lib/image-utils';

interface UseBackgroundImageOptions {
  /**
   * Whether to fetch the image immediately (default: true)
   */
  immediate?: boolean;
  
  /**
   * Fallback image to use while loading or on error
   */
  fallback?: StaticImageData;
  
  /**
   * Callback when image loading succeeds
   */
  onSuccess?: (image: StaticImageData) => void;
  
  /**
   * Callback when image loading fails
   */
  onError?: (error: Error) => void;
  
  /**
   * Image format to use (default: 'webp')
   */
  format?: ImageFormat;
  
  /**
   * Whether to use the default background image for the section (default: false)
   * If true, imageName parameter will be ignored
   */
  useDefault?: boolean;
}

interface UseBackgroundImageResult {
  /**
   * The loaded background image
   */
  image: StaticImageData | undefined;
  
  /**
   * Whether the image is currently loading
   */
  isLoading: boolean;
  
  /**
   * Any error that occurred during loading
   */
  error: Error | null;
  
  /**
   * Function to manually load the image
   */
  loadImage: () => Promise<void>;
}

/**
 * Hook for loading and managing background images
 * 
 * @param section The section to load a background for
 * @param imageName The image filename (without extension, will add .webp by default)
 *                  If useDefault is true, this parameter is ignored
 * @param options Loading options
 * @returns Background image loading state and controls
 * 
 * @example
 * // Using a custom background
 * const { image } = useBackgroundImage('hero', 'my-custom-background');
 * 
 * // Using the default background for a section
 * const { image } = useBackgroundImage('hero', '', { useDefault: true });
 * 
 * // Shorter version for default backgrounds
 * const { image } = useDefaultBackgroundImage('hero');
 */
export function useBackgroundImage(
  section: SectionName,
  imageName: string,
  options: UseBackgroundImageOptions = {},
): UseBackgroundImageResult {
  const {
    immediate = true,
    fallback,
    onSuccess,
    onError,
    format = 'webp',
    useDefault = false
  } = options;
  
  const [image, setImage] = useState<StaticImageData | undefined>(fallback);
  const [isLoading, setIsLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<Error | null>(null);
  
  const loadImage = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      let loadedImage: StaticImageData;
      
      if (useDefault) {
        // Load the default background for this section
        loadedImage = await loadDefaultSectionBackground(section, format);
      } else {
        // Load the specified background
        loadedImage = await loadSectionBackground(section, imageName, format);
      }
      
      setImage(loadedImage);
      onSuccess?.(loadedImage);
    } catch (err) {
      const loadError = err instanceof Error ? err : new Error(String(err));
      setError(loadError);
      onError?.(loadError);
      
      // Fallback to the provided fallback image
      if (fallback) {
        setImage(fallback);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (immediate) {
      loadImage();
    }
    // We only want this to run once on mount or when dependencies change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, imageName, format, useDefault]);
  
  return {
    image,
    isLoading,
    error,
    loadImage,
  };
}

/**
 * Convenience hook for loading the default background for a section
 * 
 * @param section The section to load the default background for
 * @param options Loading options
 * @returns Background image loading state and controls
 * 
 * @example
 * const { image } = useDefaultBackgroundImage('hero');
 */
export function useDefaultBackgroundImage(
  section: SectionName,
  options: Omit<UseBackgroundImageOptions, 'useDefault'> = {},
): UseBackgroundImageResult {
  return useBackgroundImage(section, getDefaultBackgroundName(section), {
    ...options,
    useDefault: true
  });
}

export default useBackgroundImage; 