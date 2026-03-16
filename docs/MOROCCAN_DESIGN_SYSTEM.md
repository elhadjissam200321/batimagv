# BATIMAG Moroccan Design System

## Color Palette

### Primary Colors
- **Moroccan Primary (Orange)**: `#FF9000` - Main brand color, vibrant and energetic
- **Moroccan Secondary (Brown)**: `#603C2D` - Warm, earthy secondary accent
- **Moroccan Dark**: `#2D1F15` - Deep brown for text and subtle accents
- **Moroccan Light**: `#FFF8F0` - Warm off-white background

### Supporting Colors
- **White**: `#FFFFFF` - Clean primary background
- **Accent Text**: `#E8A05C` - Golden accent for highlights
- **Muted**: `#8B7355` - Muted brown for secondary text
- **Border**: `#E6D4C3` - Warm borders and dividers

## Typography

### Font Families
- **Headings**: Crimson Text (serif) - Cultural elegance with modern readability
- **Body & UI**: Inter (sans-serif) - Clean, professional, excellent cross-browser compatibility
- **Display**: Playfair Display (serif) - Luxury and prestige for special headings

### Font Sizes & Usage
- **Hero Headline (h1)**: 3.5rem - 4.5rem, Crimson Text 700
- **Section Titles (h2)**: 2rem - 2.5rem, Crimson Text 600
- **Subsections (h3)**: 1.5rem - 1.75rem, Crimson Text 600
- **Body Text**: 1rem, Inter 400, line-height 1.6
- **Small Text**: 0.875rem, Inter 500
- **Captions**: 0.75rem, Inter 400

## Design Elements

### Zellige Patterns (Islamic Tessellations)
Moroccan zellige is a traditional ceramic tiling art featuring intricate geometric patterns. In the digital design:

- **Large Pattern**: Full background texture with 12-15 degrees rotation variation
- **Medium Pattern**: Section dividers and decorative borders
- **Small Pattern**: Corner accents and icon backgrounds
- **Opacity Range**: 3-10% on most backgrounds, 15-20% for borders
- **Colors Used**: Gold/orange on navy, brown on white, white on orange

### Border Treatment
- **Decorative Borders**: 4-6px with moroccan-accent color at 30-50% opacity
- **Zellige Accents**: Small corner details in sections
- **Gradient Borders**: Top-to-bottom fade from full opacity to transparent

### Spacing & Rhythm
- **Section Padding**: 4rem (64px) top/bottom, 2rem (32px) sides
- **Component Gap**: 1.5rem (24px) - 2.5rem (40px)
- **Border Radius**: 0.5rem (8px) - 0.75rem (12px) for modern softness

## Component Styling

### Buttons
```
Primary: bg-moroccan-accent text-white, hover:brightness-110
Secondary: border-2 border-moroccan-accent text-moroccan-accent
Tertiary: bg-moroccan-primary text-white border border-moroccan-accent
```

### Cards
- Border left: 4px solid moroccan-accent at 50% opacity
- Background: white or moroccan-light
- Shadow: soft shadow with warm tint
- Hover: subtle scale and shadow increase

### Headers
- Background: gradient from moroccan-primary to moroccan-primary/95
- Text: white for contrast
- Decorative: zellige patterns at 8-12% opacity

### Navigation
- Primary Nav: moroccan-primary background
- Active State: moroccan-accent color with underline
- Hover: brightness increase with smooth transition

## Implementation

### CSS Custom Properties (in globals.css)
```css
--color-moroccan-primary: #FF9000;
--color-moroccan-secondary: #603C2D;
--color-moroccan-accent: #E8A05C;
--color-moroccan-dark: #2D1F15;
--color-moroccan-light: #FFF8F0;

--font-serif: 'Crimson Text', 'Playfair Display', serif;
--font-sans: 'Inter', sans-serif;
```

### Tailwind Configuration
- Extend colors: `moroccan-primary`, `moroccan-secondary`, `moroccan-accent`
- Custom theme tokens for consistent application across components

## Browser Compatibility

- **Fonts**: Google Fonts (universal support)
- **Patterns**: SVG-based zellige (all modern browsers)
- **CSS Features**: Fallbacks for older browsers
- **Testing**: Chrome, Firefox, Safari, Edge (latest 2 versions)

## Accessibility

- **Color Contrast**: All text meets WCAG AA standards (4.5:1 minimum)
- **Pattern Opacity**: Patterns are decorative and don't interfere with readability
- **Focus States**: Clear focus indicators using moroccan-accent
- **Text Sizing**: Responsive and scalable for readability

## File Structure

```
components/
├── moroccan-patterns.tsx      # Zellige pattern component
├── navbar.tsx                 # Moroccan-styled navigation
├── footer.tsx                 # Moroccan footer with zellige
└── home/
    ├── hero-section.tsx      # Hero with patterns & logo
    ├── platform-sections.tsx # Section cards with accents
    └── section-header.tsx    # Reusable section header

app/
├── globals.css               # Design tokens & patterns
└── layout.tsx                # Font imports

docs/
└── MOROCCAN_DESIGN_SYSTEM.md # This file
```

## Usage Examples

### Using Moroccan Accent Color
```tsx
<button className="bg-moroccan-accent text-white hover:brightness-110">
  Call to Action
</button>
```

### Adding Zellige Pattern
```tsx
import { ZelligeBorder } from "@/components/moroccan-patterns"

<div className="relative">
  <div className="absolute inset-0 opacity-5">
    <ZelligeBorder size="large" className="w-full h-full" />
  </div>
</div>
```

### Section with Moroccan Styling
```tsx
<section className="bg-gradient-to-b from-moroccan-primary to-moroccan-primary/95 relative overflow-hidden">
  {/* Content */}
</section>
```

## Design Principles

1. **Cultural Authenticity**: Zellige patterns honor Moroccan heritage
2. **Modern Functionality**: Clean typography and layouts for usability
3. **Warm Elegance**: Orange and brown create welcoming, premium feel
4. **Accessibility First**: Strong contrast and readable fonts
5. **Consistency**: Repeated patterns and colors create visual cohesion
6. **Balance**: Decorative elements complement, not overwhelm, content
