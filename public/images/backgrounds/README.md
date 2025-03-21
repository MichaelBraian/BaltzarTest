# Background Images

This directory contains all background images used throughout the website.

## WebP Format Requirement

All background images should use the WebP format (.webp) for better performance and quality. This applies to all types of backgrounds including section backgrounds, patterns, and textures.

## Standardized Default Background Images

For simplicity, each section has a default background image that is already referenced in the code. To change a section's background, simply replace the appropriate file with your new image (keeping the same filename):

| Section        | Default Background Filename        | Location                                            |
|----------------|-----------------------------------|-----------------------------------------------------|
| Hero           | `hero-default.webp`               | `/images/backgrounds/sections/hero/`                |
| About          | `about-default.webp`              | `/images/backgrounds/sections/about/`               |
| Services       | `services-default.webp`           | `/images/backgrounds/sections/services/`            |
| Technology     | `technology-default.webp`         | `/images/backgrounds/sections/technology/`          |
| Contact        | `contact-default.webp`            | `/images/backgrounds/sections/contact/`             |
| Footer         | `footer-default.webp`             | `/images/backgrounds/sections/footer/`              |

This approach lets you change backgrounds without modifying any code.

## Subdirectories

- `sections/`: Background images specific to website sections
  - `hero/`: Hero section backgrounds
  - `about/`: About section backgrounds
  - `services/`: Services section backgrounds
  - `technology/`: Technology section backgrounds
  - `contact/`: Contact section backgrounds
  - `footer/`: Footer section backgrounds
- `patterns/`: Repeating pattern backgrounds
- `textures/`: Texture backgrounds

## Guidelines

1. Use high-quality images optimized for web in WebP format
2. Make sure background images have sufficient contrast with text that will be displayed on top
3. Consider both mobile and desktop views when creating backgrounds
4. For better performance, use the appropriate size and resolution for each context
5. Add multiple sizes for responsive images (e.g., `-sm`, `-md`, `-lg` suffixes)
6. When naming files, you can omit the .webp extension in code as our utilities will add it automatically

## Converting Images to WebP

WebP format offers better compression than PNG or JPEG while maintaining quality. To convert your images to WebP:

1. Use online tools like [Squoosh](https://squoosh.app/) or [CloudConvert](https://cloudconvert.com/)
2. Use command line tools like cwebp: `cwebp image.png -o image.webp`
3. Use image editing software like Photoshop (with WebP plugin) or GIMP

When converting, use quality settings between 75-90% for a good balance between file size and image quality.

## Usage Examples

### Simple Approach (Using Default Backgrounds)

To use the default background for a section, use the `useDefaultBackgroundImage` hook:

```tsx
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';
import BackgroundImage from '@/components/ui/background-image';

function HeroSection() {
  // Will automatically use hero-default.webp
  const { image, isLoading } = useDefaultBackgroundImage('hero');
  
  return (
    <BackgroundImage
      src={image}
      alt="Hero background"
      isLoading={isLoading}
    >
      <h1>Welcome to our site</h1>
    </BackgroundImage>
  );
}
```

### Custom Background Approach

If you want to use a custom background instead of the default:

```tsx
import { useBackgroundImage } from '@/lib/hooks/use-background-image';
import BackgroundImage from '@/components/ui/background-image';

function HeroSection() {
  // Will use custom-background.webp
  const { image, isLoading } = useBackgroundImage('hero', 'custom-background');
  
  return (
    <BackgroundImage
      src={image}
      alt="Hero background"
      isLoading={isLoading}
    >
      <h1>Welcome to our site</h1>
    </BackgroundImage>
  );
}
```

When updating background images, ensure you optimize the WebP files for web to maintain fast loading times. 