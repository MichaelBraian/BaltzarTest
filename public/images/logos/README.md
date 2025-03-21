# Logos

This directory contains logo images for the brand and partners.

## Guidelines

1. Always use the highest quality logo images
2. Provide versions with different backgrounds (light/dark) if needed
3. Include variations for different contexts (header, footer, social media, etc.)
4. Prefer SVG format for scalability

## Organization

- Brand logos should be in the root of this directory
- Partner/client logos should be in a 'partners' subdirectory
- Different variations should use descriptive suffixes:
  - `-dark.svg` for dark backgrounds
  - `-light.svg` for light backgrounds
  - `-full.svg` for full logo with text
  - `-icon.svg` for icon-only versions

## Best Practices

1. Ensure logos meet brand guidelines for spacing and sizing
2. Optimize SVGs for web use without losing quality
3. Include a transparent background when appropriate
4. Consider providing different sizes for responsive design

## Usage Examples

```tsx
import Image from 'next/image';
import logo from '@/public/images/logos/baltzar-tandvard.svg';
import logoIcon from '@/public/images/logos/baltzar-tandvard-icon.svg';

// Usage in a component
<header>
  <Image 
    src={logo} 
    alt="Baltzar Tandvård" 
    height={40} 
    width={160} 
    className="hidden md:block" 
  />
  <Image 
    src={logoIcon} 
    alt="Baltzar Tandvård" 
    height={40} 
    width={40} 
    className="md:hidden" 
  />
</header>
``` 