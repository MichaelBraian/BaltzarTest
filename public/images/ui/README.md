# UI Images

This directory contains UI-specific images used throughout the website interface.

## Types of UI Images

- Button backgrounds and states
- Form element graphics
- UI decorations and dividers
- Card backgrounds and frames
- Callout and highlight graphics
- Navigation elements

## Guidelines

1. Keep UI images as lightweight as possible
2. Use SVG format when appropriate for scalability
3. Ensure consistent style with the overall UI design
4. Consider dark/light mode variations

## Best Practices

1. Use minimal, modern design that scales well
2. Ensure accessibility is not compromised by decorative elements
3. Group related UI elements in subdirectories if needed
4. Provide multiple size/resolution options for responsive design

## Usage Examples

```tsx
import Image from 'next/image';
import buttonBg from '@/public/images/ui/button-bg.svg';

// Usage in a button component
<button className="relative px-6 py-3">
  <Image 
    src={buttonBg} 
    alt="" 
    fill 
    className="absolute inset-0 object-cover -z-10" 
    aria-hidden="true"
  />
  <span className="relative z-10">Click Me</span>
</button>
```

For decorative UI elements that don't convey meaning, remember to use `aria-hidden="true"` and empty alt text. 