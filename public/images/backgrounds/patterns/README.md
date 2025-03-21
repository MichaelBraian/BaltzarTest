# Background Patterns

This directory is for repeating pattern background images.

## Usage

Place pattern images here that can be tiled or repeated across a background. These should be in WebP format for better performance.

## Best Practices

1. Create seamless patterns that can tile without visible seams
2. Keep file sizes small (ideally under 100KB)
3. Use descriptive names (e.g., `dots-pattern.webp`, `stripes-dark.webp`)
4. Consider providing both light and dark versions of patterns

## Example Usage

```tsx
import Image from 'next/image';
import { getImagePath } from '@/lib/image-utils';

// Using a pattern as a background
const patternPath = getImagePath('backgrounds', 'dots-pattern', 'patterns');

// In your component
<div style={{ backgroundImage: `url(${patternPath})`, backgroundRepeat: 'repeat' }}>
  {/* Content */}
</div>
``` 