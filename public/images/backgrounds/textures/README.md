# Background Textures

This directory is for texture background images.

## Usage

Place texture images here that can be used as backgrounds to add depth and visual interest. These should be in WebP format for better performance.

## Best Practices

1. Use high-quality textures that don't make text hard to read
2. Keep file sizes reasonable (ideally under 200KB)
3. Use descriptive names (e.g., `paper-texture.webp`, `concrete-texture.webp`)
4. Consider providing both light and dark versions of textures

## Example Usage

```tsx
import Image from 'next/image';
import { getImagePath } from '@/lib/image-utils';

// Using a texture as a background
const texturePath = getImagePath('backgrounds', 'paper-texture', 'textures');

// In your component
<div 
  style={{ 
    backgroundImage: `url(${texturePath})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  {/* Content */}
</div>
``` 