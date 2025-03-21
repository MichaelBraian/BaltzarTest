/**
 * Utility functions for working with images
 */

import { StaticImageData } from 'next/image';

/**
 * A map of section names to their default background images
 * This can be extended with more sections as needed
 */
export type SectionName = 
  | 'hero' 
  | 'about' 
  | 'services' 
  | 'technology' 
  | 'contact' 
  | 'footer'
  | 'region-skane';

/**
 * Type representing different image categories
 */
export type ImageCategory = 
  | 'backgrounds' 
  | 'icons' 
  | 'illustrations' 
  | 'logos' 
  | 'ui'
  | 'staff';

/**
 * Type representing different background subcategories
 */
export type BackgroundType = 
  | 'sections' 
  | 'patterns' 
  | 'textures';

/**
 * Type representing image formats
 */
export type ImageFormat = 
  | 'webp'
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'svg';

/**
 * Get the standard default background image name for a section
 * 
 * These standardized names allow you to simply replace the file
 * rather than updating code when changing backgrounds
 * 
 * @param section The section name
 * @returns The default background image name (without extension)
 */
export function getDefaultBackgroundName(section: SectionName): string {
  return `${section}-default`;
}

/**
 * Get the appropriate image format based on category and requirements
 * @param category The image category
 * @returns The preferred image format for that category
 */
export function getPreferredFormat(category: ImageCategory): ImageFormat {
  // Staff photos use JPG/JPEG by default
  if (category === 'staff') {
    return 'jpg';
  }
  
  // SVG is preferred for icons and logos if possible
  if (category === 'icons' || category === 'logos') {
    return 'svg';
  }
  
  // WebP is preferred for all other images
  return 'webp';
}

/**
 * Get the relative path to an image
 * @param category The image category (backgrounds, icons, etc.)
 * @param name The image filename (with or without extension)
 * @param subCategory Optional subcategory for backgrounds
 * @param section Optional section name for section backgrounds
 * @param format Optional image format (will use preferred format if not specified)
 * @returns The image path
 */
export function getImagePath(
  category: ImageCategory,
  name: string,
  subCategory?: BackgroundType,
  section?: SectionName,
  format?: ImageFormat,
): string {
  // Determine the image format
  const imageFormat = format || getPreferredFormat(category);
  
  // Check if name already has an extension
  const hasExtension = /\.(webp|jpg|jpeg|png|svg)$/i.test(name);
  const fileName = hasExtension ? name : `${name}.${imageFormat}`;
  
  if (category === 'backgrounds' && subCategory) {
    if (subCategory === 'sections' && section) {
      return `/images/${category}/${subCategory}/${section}/${fileName}`;
    }
    return `/images/${category}/${subCategory}/${fileName}`;
  }
  
  return `/images/${category}/${fileName}`;
}

/**
 * Get a background image path for a specific section
 * @param section The section name (hero, about, etc.)
 * @param imageName The image filename
 * @param format Optional image format (defaults to webp)
 * @returns The image path
 */
export function getSectionBackgroundPath(
  section: SectionName,
  imageName: string,
  format: ImageFormat = 'webp',
): string {
  return getImagePath('backgrounds', imageName, 'sections', section, format);
}

/**
 * Get the default background image path for a section
 * 
 * This is a convenience method that uses the standardized naming convention
 * so you can simply replace the image files without changing code
 * 
 * @param section The section name (hero, about, etc.)
 * @param format Optional image format (defaults to webp)
 * @returns The path to the default background for that section
 */
export function getDefaultSectionBackgroundPath(
  section: SectionName,
  format: ImageFormat = 'webp',
): string {
  return getSectionBackgroundPath(section, getDefaultBackgroundName(section), format);
}

/**
 * Determine if an image should use priority loading
 * @param section The section name
 * @returns boolean indicating if priority loading should be used
 */
export function shouldPrioritizeImage(section: SectionName): boolean {
  // Priority loading for above-the-fold content
  return ['hero', 'header'].includes(section);
}

/**
 * Generate a responsive image size string based on the section
 * @param section The section name
 * @returns The sizes attribute string for Next.js Image
 */
export function getResponsiveSizes(section: SectionName): string {
  switch (section) {
    case 'hero':
      return '100vw';
    case 'about':
    case 'services':
    case 'technology':
    case 'contact':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw';
    case 'footer':
      return '100vw';
    default:
      return '100vw';
  }
}

/**
 * Helper to dynamically import background images for sections
 * This helps with code splitting and only loading images when needed
 * 
 * Usage:
 * const backgroundImage = await loadSectionBackground('hero', 'main-bg');
 * 
 * @param section The section name
 * @param imageName The image filename (without extension)
 * @param format Optional image format (defaults to webp)
 * @returns Promise that resolves to the image data
 */
export async function loadSectionBackground(
  section: SectionName,
  imageName: string,
  format: ImageFormat = 'webp',
): Promise<StaticImageData> {
  // Check if imageName already has an extension
  const hasExtension = /\.(webp|jpg|jpeg|png|svg)$/i.test(imageName);
  const fileName = hasExtension ? imageName : `${imageName}.${format}`;
  
  try {
    // Dynamic import for code splitting
    const image = await import(`@/public/images/backgrounds/sections/${section}/${fileName}`);
    return image.default;
  } catch (error) {
    console.error(`Failed to load background image for ${section}:`, error);
    // Fall back to a placeholder image or throw an error
    throw new Error(`Background image not found: ${section}/${fileName}`);
  }
}

/**
 * Helper to dynamically import default background images for sections
 * 
 * This uses the standardized naming convention so you can simply
 * replace image files without changing code
 * 
 * @param section The section name
 * @param format Optional image format (defaults to webp)
 * @returns Promise that resolves to the image data
 */
export async function loadDefaultSectionBackground(
  section: SectionName,
  format: ImageFormat = 'webp',
): Promise<StaticImageData> {
  return loadSectionBackground(section, getDefaultBackgroundName(section), format);
} 