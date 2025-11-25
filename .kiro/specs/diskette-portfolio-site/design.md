# Design Document

## Overview

The diskette portfolio site is a single-page responsive website that showcases a freelance UI design studio with a playful, minimal aesthetic. The design centers around an animated floppy disk mascot (Pippin) whose googly eyes track the user's cursor, creating an engaging and memorable experience. The site uses a clean layout with the NaN Rage Soft font family, supports both light and dark modes, and incorporates subtle microinteractions throughout.

The architecture follows a progressive enhancement approach: core content is accessible immediately, with JavaScript-powered interactions layered on top. The design prioritizes performance through optimized assets, hardware-accelerated animations, and efficient DOM manipulation.

## Architecture

### High-Level Structure

```
┌─────────────────────────────────────┐
│         HTML Document               │
│  (Semantic structure + content)     │
└─────────────────────────────────────┘
              │
              ├──────────────────────────┐
              │                          │
┌─────────────▼──────────┐  ┌───────────▼──────────┐
│     CSS Layer          │  │    JavaScript Layer   │
│  - Theme system        │  │  - Eye tracking       │
│  - Typography          │  │  - Microinteractions  │
│  - Responsive layout   │  │  - Theme detection    │
│  - Animations          │  │  - Performance opts   │
└────────────────────────┘  └──────────────────────┘
```

### Technology Stack

- **HTML5**: Semantic markup for accessibility and SEO
- **CSS3**: Custom properties for theming, Grid/Flexbox for layout, transforms for animations
- **Vanilla JavaScript**: No framework dependencies for minimal bundle size
- **SVG**: Vector graphics for the mascot (Pippin) ensuring crisp rendering at all sizes

### File Organization

```
/
├── index.html                    # Main HTML document
├── assets/
│   ├── css/
│   │   └── styles.css           # All styles including theme system
│   ├── js/
│   │   └── primary.js           # Eye tracking and interactions
│   ├── fonts/
│   │   ├── rage soft thin.woff2
│   │   ├── rage soft regular.woff2
│   │   └── rage soft extrabold.woff2
│   ├── pippin/
│   │   └── pippin.svg           # Mascot graphic
│   └── favicon/
│       ├── favicon.svg
│       ├── favicon.ico
│       ├── favicon-96x96.png
│       └── apple-touch-icon.png
```

## Components and Interfaces

### 1. Theme System

**Purpose**: Manages light/dark mode based on user's system preferences

**Implementation**:
- CSS custom properties define color tokens
- `prefers-color-scheme` media query switches themes
- JavaScript listener detects runtime theme changes

**CSS Custom Properties**:
```css
:root {
  --color-bg: #FFFFFF;
  --color-text: #000000;
  --color-accent: #85BBFF;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #000000;
    --color-text: #FFFFFF;
    --color-accent: #85BBFF;
  }
}
```

### 2. Eye Tracking System

**Purpose**: Animates mascot pupils to follow cursor position

**Core Algorithm**:
1. Listen for `mousemove` events on document
2. Calculate cursor position relative to each eye center
3. Compute angle from eye center to cursor
4. Constrain pupil movement within eye boundary (circular constraint)
5. Apply transform to pupil elements

**JavaScript Interface**:
```javascript
class EyeTracker {
  constructor(leftEye, rightEye)
  init()
  handleMouseMove(event)
  calculatePupilPosition(eyeCenter, cursorPos, maxDistance)
  updatePupils(leftPos, rightPos)
  destroy()
}
```

**Performance Considerations**:
- Use `requestAnimationFrame` to throttle updates to display refresh rate
- Cache eye center positions (recalculate only on resize)
- Use CSS `transform` and `will-change` for GPU acceleration
- Detect touch devices and skip initialization

### 3. Typography System

**Purpose**: Implements font hierarchy with NaN Rage Soft family

**Font Loading Strategy**:
- Use `font-display: swap` to prevent FOIT (Flash of Invisible Text)
- Preload critical font files in HTML head
- Define fallback font stack: `system-ui, -apple-system, sans-serif`

**Type Scale**:
- Headings: ExtraBold weight, fluid sizing (clamp)
- Display text: Thin weight, large sizes
- Body: Regular weight, optimized line-height (1.6)
- All text: `text-transform: lowercase`

### 4. Responsive Layout System

**Purpose**: Adapts content presentation across device sizes

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Layout Strategy**:
- Mobile-first approach with min-width media queries
- CSS Grid for main layout structure
- Flexbox for component-level layouts
- Fluid typography using `clamp()`
- Container queries for component-level responsiveness (if supported)

### 5. Microinteraction System

**Purpose**: Adds delightful feedback and animations

**Interaction Types**:
- **Hover states**: Scale, color shift, or glow effects on interactive elements
- **Entrance animations**: Fade-in with slight upward motion on scroll into view
- **Click feedback**: Brief scale pulse on buttons/links
- **Randomization**: Vary animation delays or directions on page load

**Implementation Pattern**:
```javascript
// Intersection Observer for entrance animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.1 });
```

## Data Models

### Eye Position Data

```javascript
{
  eyeCenter: {
    x: Number,  // Absolute X coordinate of eye center
    y: Number   // Absolute Y coordinate of eye center
  },
  pupilPosition: {
    x: Number,  // Relative X offset from eye center (-maxDistance to +maxDistance)
    y: Number   // Relative Y offset from eye center (-maxDistance to +maxDistance)
  },
  maxDistance: Number  // Maximum pupil travel distance in pixels
}
```

### Theme State

```javascript
{
  currentTheme: 'light' | 'dark',
  systemPreference: 'light' | 'dark',
  colors: {
    bg: String,      // Hex color
    text: String,    // Hex color
    accent: String   // Hex color
  }
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Pupil direction accuracy

*For any* cursor position within the viewport, the calculated pupil positions should point toward that cursor position using correct vector mathematics (angle from eye center to cursor).

**Validates: Requirements 1.1**

### Property 2: Pupil position persistence

*For any* pupil position state, when no new cursor events occur, the pupil positions should remain unchanged over time.

**Validates: Requirements 1.4**

### Property 3: Theme reactivity

*For any* system theme change event (light to dark or dark to light), the CSS custom properties should update immediately to reflect the new theme colors.

**Validates: Requirements 2.3**

### Property 4: Accent color consistency

*For any* theme state (light or dark), the accent color CSS variable should always equal #85BBFF.

**Validates: Requirements 2.4**

### Property 5: Mascot contrast adequacy

*For any* theme state, the contrast ratio between the mascot elements and the background should meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 2.5**

### Property 6: Lowercase text enforcement

*For any* text element on the page, the rendered text should be in lowercase either through content or CSS text-transform property.

**Validates: Requirements 3.4**

### Property 7: Touch target minimum size

*For any* interactive element (links, buttons) on mobile viewports, the element dimensions should meet or exceed 44x44 pixels for accessibility.

**Validates: Requirements 4.4**

### Property 8: Interactive element feedback

*For any* clickable element, there should be defined hover or focus styles that provide visual feedback.

**Validates: Requirements 5.1**

### Property 9: Viewport intersection animation

*For any* element marked for entrance animation, when it intersects the viewport, an animation class should be applied.

**Validates: Requirements 5.2**

### Property 10: Animation duration constraint

*For any* microinteraction animation, the total duration should be less than or equal to 300 milliseconds.

**Validates: Requirements 5.4**

### Property 11: Hardware-accelerated animations

*For any* CSS animation or transition, the properties being animated should be limited to transform, opacity, or filter to ensure GPU acceleration.

**Validates: Requirements 7.5**

## Error Handling

### Eye Tracking Errors

**Scenario**: Eye elements not found in DOM
- **Handling**: Gracefully skip eye tracking initialization, log warning to console
- **User Impact**: Site functions normally without eye tracking feature

**Scenario**: Invalid cursor coordinates (NaN, undefined)
- **Handling**: Use last valid position or default centered position
- **User Impact**: No visual glitch, pupils remain in valid position

**Scenario**: Resize during tracking
- **Handling**: Recalculate eye center positions on window resize with debouncing
- **User Impact**: Eye tracking continues to work accurately after resize

### Theme System Errors

**Scenario**: matchMedia not supported (legacy browsers)
- **Handling**: Default to light theme, provide manual theme toggle as fallback
- **User Impact**: Site displays in light theme, still fully functional

**Scenario**: CSS custom properties not supported
- **Handling**: Provide fallback values in CSS using cascade
- **User Impact**: Site displays with fallback colors, may not match theme preference

### Font Loading Errors

**Scenario**: Custom fonts fail to load
- **Handling**: Fallback to system font stack (system-ui, sans-serif)
- **User Impact**: Typography hierarchy maintained, different visual appearance

**Scenario**: FOUT (Flash of Unstyled Text)
- **Handling**: Use font-display: swap and size-adjust to minimize layout shift
- **User Impact**: Brief moment of fallback font, then swap to custom font

### Performance Degradation

**Scenario**: Low frame rate detected during eye tracking
- **Handling**: Reduce update frequency or disable eye tracking on low-end devices
- **User Impact**: Reduced animation smoothness or static pupils, but site remains responsive

**Scenario**: Slow network connection
- **Handling**: Progressive loading with critical CSS inline, defer non-critical assets
- **User Impact**: Core content visible quickly, enhancements load progressively

## Testing Strategy

### Unit Testing Approach

The diskette portfolio site will use **Vitest** as the testing framework for unit tests. Vitest provides fast execution, native ESM support, and a Jest-compatible API.

Unit tests will cover:
- **Utility functions**: Vector math for pupil positioning, angle calculations, distance constraints
- **Theme detection logic**: Parsing matchMedia results, setting CSS variables
- **DOM manipulation helpers**: Element queries, class toggling, attribute setting
- **Specific examples**: Touch device detection returns default position, favicon links exist in head
- **Edge cases**: Invalid inputs to calculation functions, missing DOM elements

### Property-Based Testing Approach

The site will use **fast-check** as the property-based testing library for JavaScript. Fast-check generates random test cases to verify properties hold across a wide input space.

**Configuration**:
- Each property-based test will run a minimum of 100 iterations
- Tests will use appropriate generators (fc.integer, fc.float, fc.record, etc.)
- Shrinking will be enabled to find minimal failing cases

**Property Test Requirements**:
- Each property-based test MUST be tagged with a comment referencing the correctness property
- Tag format: `// Feature: diskette-portfolio-site, Property {number}: {property_text}`
- Each correctness property MUST be implemented by a SINGLE property-based test
- Tests should focus on mathematical correctness, invariants, and universal rules

**Property Tests to Implement**:
1. Pupil direction accuracy (Property 1)
2. Pupil position persistence (Property 2)
3. Theme reactivity (Property 3)
4. Accent color consistency (Property 4)
5. Mascot contrast adequacy (Property 5)
6. Lowercase text enforcement (Property 6)
7. Touch target minimum size (Property 7)
8. Interactive element feedback (Property 8)
9. Viewport intersection animation (Property 9)
10. Animation duration constraint (Property 10)
11. Hardware-accelerated animations (Property 11)

### Integration Testing

Integration tests will verify:
- Eye tracking system integrates correctly with DOM and event listeners
- Theme system responds to actual matchMedia changes
- Microinteractions trigger correctly on user interactions
- Font loading doesn't cause layout shifts

### Visual Regression Testing

While not automated in the initial implementation, visual regression testing should be considered for:
- Theme switching appearance
- Responsive layout at various breakpoints
- Animation smoothness and timing

### Performance Testing

Performance will be validated through:
- Lighthouse audits (target: 90+ performance score)
- Frame rate monitoring during eye tracking (target: 60fps)
- Bundle size analysis (target: < 100KB gzipped)
- Core Web Vitals measurement (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Accessibility Testing

Accessibility will be verified through:
- Automated tools (axe-core, Lighthouse accessibility audit)
- Keyboard navigation testing
- Screen reader testing (VoiceOver, NVDA)
- Color contrast verification (WCAG AA compliance)

## Implementation Notes

### Browser Support

Target browsers:
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Mobile: Android 10+

### Progressive Enhancement Strategy

1. **Core experience** (works without JavaScript):
   - Semantic HTML structure
   - Readable typography
   - Basic layout and spacing
   - Static mascot image

2. **Enhanced experience** (with JavaScript):
   - Eye tracking animation
   - Microinteractions
   - Entrance animations
   - Theme change detection

3. **Optimal experience** (modern browsers):
   - Hardware-accelerated animations
   - CSS custom properties
   - Intersection Observer
   - matchMedia API

### Optimization Techniques

**Images**:
- Use SVG for mascot (scalable, small file size)
- Optimize PNG favicons with tools like pngquant
- Consider WebP format for any raster images

**Fonts**:
- Use WOFF2 format (best compression)
- Subset fonts to include only needed characters
- Preload critical font files
- Use font-display: swap

**CSS**:
- Minify in production
- Remove unused styles
- Use CSS containment for isolated components
- Leverage CSS custom properties for theming

**JavaScript**:
- Minify and bundle in production
- Use code splitting if bundle grows
- Defer non-critical scripts
- Use passive event listeners where appropriate

### Deployment Considerations

- Enable gzip/brotli compression on server
- Set appropriate cache headers for static assets
- Use CDN for global distribution
- Implement CSP (Content Security Policy) headers
- Add meta tags for social sharing (Open Graph, Twitter Cards)
