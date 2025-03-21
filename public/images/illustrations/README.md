# Illustrations

This directory contains illustration images used throughout the website.

## Guidelines

1. Use consistent style for all illustrations
2. Optimize illustrations for web use (file size and dimensions)
3. Use SVG format for vector illustrations when possible
4. For complex illustrations, use PNG or WebP with transparency

## Best Practices

1. Create responsive versions for different screen sizes
2. Consider animated illustrations (SVG animations or short videos)
3. Ensure illustrations match the brand's style and color palette
4. Add descriptive names that reflect the illustration content

## Examples

Illustrations can be used in various contexts:
- As decorative elements for sections
- To explain complex concepts
- As part of interactive elements
- For storytelling across the website

## Usage Examples

```tsx
import Image from 'next/image';
import dentalCareIllustration from '@/public/images/illustrations/dental-care.svg';

// Usage in a component
<Image 
  src={dentalCareIllustration} 
  alt="Dental care illustration" 
  width={400} 
  height={300} 
  className="mx-auto"
/>
``` 