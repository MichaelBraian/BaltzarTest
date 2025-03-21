# Icon Images

This directory contains icon images used throughout the website.

## Guidelines

1. Prefer SVG format for best quality and scalability
2. Use a consistent style across icons
3. Name icons descriptively (e.g., `arrow-right.svg`, `menu-hamburger.svg`)
4. Consider accessibility - icons should have proper alt text when used

## Best Practices

1. Optimize SVGs using tools like SVGO
2. Consider creating icon sets with consistent dimensions
3. For complex icons, use a sprite sheet or icon font for better performance
4. Ensure icons have good contrast against their background

## Usage Examples

Icons can be used with the Next.js Image component:

```tsx
import Image from 'next/image';
import arrowIcon from '@/public/images/icons/arrow-right.svg';

// Usage in a component
<Image src={arrowIcon} alt="Arrow right" width={24} height={24} />
```

For SVG icons that need color changes via CSS, consider importing them as React components or using an icon library. 