# Image Organization Structure

This directory contains all the images used throughout the website, organized into specific categories for easier management.

## WebP Format Requirement

**Important:** All images except staff profile photos should use the WebP format (.webp) for better performance and quality. Staff profile images should use JPEG/JPG format.

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

## Directory Structure

- `backgrounds/` - Background images for different sections and design elements
  - `sections/` - Section-specific background images
    - `hero/` - Background images for the hero section
    - `about/` - Background images for the about section
    - `services/` - Background images for the services section
    - `technology/` - Background images for the technology section
    - `contact/` - Background images for the contact section
    - `footer/` - Background images for the footer section
  - `patterns/` - Repeating pattern background images
  - `textures/` - Texture background images
- `icons/` - Icon images used throughout the site (SVG preferred, WebP for complex icons)
- `illustrations/` - Larger illustrative images (WebP format)
- `logos/` - Logo variations and partner logos (SVG preferred, WebP as fallback)
- `ui/` - UI-specific images (buttons, decorative elements, etc.) (WebP format)
- `staff/` - Staff member photos (JPEG/JPG format)

## Usage Guidelines

1. **File Naming Convention:** Use kebab-case for all filenames (e.g., `hero-background.webp`)
2. **Image Optimization:** Optimize all images before adding them to reduce file size
3. **Responsive Images:** Provide multiple sizes when needed using suffixes like `-sm`, `-md`, `-lg`
4. **File Formats:**
   - Use SVG for icons and logos when possible
   - Use WebP for all other images except staff photos
   - Use JPEG for staff photographs
   - File extensions can be omitted in code as the system will add the appropriate extension automatically

## Converting to WebP

You can convert images to WebP format using:
- Online tools like [Squoosh](https://squoosh.app/) or [CloudConvert](https://cloudconvert.com/)
- Command line tools like cwebp: `cwebp image.png -o image.webp`
- Image editing software like Photoshop (with WebP plugin) or GIMP

## How To Use

### Simplest Approach: Using Default Backgrounds

To use the default background image for a section, use the `useDefaultBackgroundImage` hook:

```tsx
import BackgroundImage from '@/components/ui/background-image';
import { useDefaultBackgroundImage } from '@/lib/hooks/use-background-image';

function HeroSection() {
  // Automatically uses hero-default.webp from the hero section folder
  const { image, isLoading } = useDefaultBackgroundImage('hero');
  
  return (
    <BackgroundImage
      src={image}
      alt="Hero background"
      isLoading={isLoading}
    >
      {/* Your content here */}
    </BackgroundImage>
  );
}
```

To change the background without touching code, simply replace the default image for that section.

### Using Custom Background Images

If you want to use a different background image:

```tsx
import BackgroundImage from '@/components/ui/background-image';
import { useBackgroundImage } from '@/lib/hooks/use-background-image';

function HeroSection() {
  // Uses your custom image from hero section folder
  const { image, isLoading } = useBackgroundImage('hero', 'my-custom-background');
  
  return (
    <BackgroundImage
      src={image}
      alt="Hero background"
      isLoading={isLoading}
    >
      {/* Your content here */}
    </BackgroundImage>
  );
}
```

### CSS Background Example

For CSS background images:

```css
.hero-section {
  background-image: url('/images/backgrounds/sections/hero/hero-default.webp');
  background-size: cover;
  background-position: center;
}
``` 