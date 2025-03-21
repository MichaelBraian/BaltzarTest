# Staff Images

This directory contains photographs of staff members. Unlike other images in the project, staff photos should use the JPEG/JPG format instead of WebP.

## Why JPEG Format for Staff Photos?

While WebP is the preferred format for most images on the site, staff photos are kept in JPEG format for:

1. Better skin tone reproduction
2. Higher compatibility with photo editing workflows
3. Consistent quality for professional headshots

## Guidelines

1. Use high-quality professional photographs
2. Maintain consistent dimensions for all staff photos (recommended: 800x1000px)
3. Use consistent background and lighting across photos
4. Use JPEG format with 85-95% quality
5. Name files using the staff member's name in kebab-case (e.g., `john-smith.jpg`)

## Optimization

Even though these photos use JPEG format, they should still be optimized:

1. Remove unnecessary EXIF data
2. Apply appropriate compression (target file size: 100-200KB)
3. Consider using a service like ImageOptim or JPEGmini for optimization

## Directory Structure

- Root: Individual staff member photos
- `/teams/`: Photos organized by department or team
- `/groups/`: Group photos

## Usage Examples

```tsx
import Image from 'next/image';
import { getImagePath } from '@/lib/image-utils';

function StaffProfile() {
  // Note: For staff photos, file extension needs to be included
  const imagePath = getImagePath('staff', 'jane-doe.jpg');
  
  return (
    <div className="staff-profile">
      <div className="avatar">
        <Image
          src={imagePath}
          alt="Jane Doe"
          width={300}
          height={375}
          className="rounded-lg"
        />
      </div>
      <h3>Jane Doe</h3>
      <p>Dental Surgeon</p>
    </div>
  );
}
``` 