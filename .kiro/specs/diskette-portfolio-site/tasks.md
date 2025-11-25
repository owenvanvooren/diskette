# Implementation Plan

- [x] 1. Set up HTML structure and metadata
  - Create semantic HTML5 structure with proper document outline
  - Add favicon link tags in head section
  - Include font preload links for critical fonts
  - Add meta tags for viewport, description, and social sharing
  - Embed Pippin SVG inline for manipulation
  - Add IDs to pupil elements for JavaScript targeting
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 7.3_

- [x] 2. Implement theme system with CSS custom properties
  - Define CSS custom properties for colors (bg, text, accent)
  - Create light theme as default in :root
  - Add dark theme using prefers-color-scheme media query
  - Ensure accent color (#85BBFF) is consistent across themes
  - Apply color variables to all elements
  - _Requirements: 2.1, 2.2, 2.4_

- [ ]* 2.1 Write property test for theme reactivity
  - **Property 3: Theme reactivity**
  - **Validates: Requirements 2.3**

- [ ]* 2.2 Write property test for accent color consistency
  - **Property 4: Accent color consistency**
  - **Validates: Requirements 2.4**

- [ ]* 2.3 Write property test for mascot contrast adequacy
  - **Property 5: Mascot contrast adequacy**
  - **Validates: Requirements 2.5**

- [x] 3. Build typography system with NaN Rage Soft fonts
  - Define @font-face rules for all three weights (Thin, Regular, ExtraBold)
  - Set font-display: swap for all fonts
  - Create font-family variables for each weight
  - Apply Regular weight to body text
  - Apply Thin weight to large display text
  - Apply ExtraBold weight to headings
  - Add text-transform: lowercase to all text elements
  - Implement fluid typography using clamp() for responsive sizing
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 3.1 Write property test for lowercase text enforcement
  - **Property 6: Lowercase text enforcement**
  - **Validates: Requirements 3.4**

- [x] 4. Create responsive layout system
  - Implement mobile-first CSS with base styles
  - Add CSS Grid for main page layout
  - Use Flexbox for component-level layouts
  - Define breakpoints (768px, 1024px) with media queries
  - Ensure proper spacing and content density at all viewport sizes
  - Make mascot scale appropriately on mobile
  - _Requirements: 4.1, 4.2, 4.3, 4.5_

- [ ]* 4.1 Write property test for touch target minimum size
  - **Property 7: Touch target minimum size**
  - **Validates: Requirements 4.4**

- [x] 5. Add content sections with portfolio copy
  - Write hero section with diskette branding
  - Create about section with informal, friendly copy about UI design services
  - Add contact section with email or contact method
  - Include footer with copyright "© 2025 owen van vooren. all rights reserved."
  - Link copyright name to https://owen.uno
  - Ensure all copy is in lowercase
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 6. Implement eye tracking system core logic
  - Create EyeTracker class with constructor accepting eye elements
  - Implement calculatePupilPosition utility function using vector math
  - Calculate angle from eye center to cursor position
  - Constrain pupil movement within circular boundary
  - Return x/y offsets for pupil positioning
  - Add error handling for invalid inputs (NaN, undefined)
  - _Requirements: 1.1_

- [ ]* 6.1 Write property test for pupil direction accuracy
  - **Property 1: Pupil direction accuracy**
  - **Validates: Requirements 1.1**

- [ ] 7. Wire up eye tracking to DOM and events
  - Query pupil elements from DOM on initialization
  - Cache eye center positions on init and resize
  - Add mousemove event listener to document
  - Use requestAnimationFrame to throttle updates
  - Apply CSS transforms to pupil elements
  - Add will-change hints for GPU acceleration
  - Initialize pupils in centered neutral position
  - Detect touch devices and skip initialization
  - _Requirements: 1.1, 1.3, 1.4, 1.5, 7.2, 7.5_

- [ ]* 7.1 Write property test for pupil position persistence
  - **Property 2: Pupil position persistence**
  - **Validates: Requirements 1.4**

- [ ] 8. Add resize handling for eye tracking
  - Listen for window resize events
  - Debounce resize handler to avoid excessive recalculations
  - Recalculate eye center positions on resize
  - Maintain current pupil direction after resize
  - _Requirements: 1.1_

- [x] 9. Implement JavaScript theme change detection
  - Create matchMedia listener for prefers-color-scheme
  - Update theme state when system preference changes
  - Ensure CSS variables update immediately on change
  - Add fallback for browsers without matchMedia support
  - _Requirements: 2.3_

- [ ] 10. Build microinteraction system for hover states
  - Add hover styles to all interactive elements (links, buttons)
  - Use CSS transitions for smooth state changes
  - Implement scale, color shift, or glow effects
  - Ensure all transitions complete within 300ms
  - Use transform and opacity for GPU acceleration
  - _Requirements: 5.1, 5.3, 5.4, 7.5_

- [ ]* 10.1 Write property test for interactive element feedback
  - **Property 8: Interactive element feedback**
  - **Validates: Requirements 5.1**

- [ ]* 10.2 Write property test for animation duration constraint
  - **Property 10: Animation duration constraint**
  - **Validates: Requirements 5.4**

- [ ]* 10.3 Write property test for hardware-accelerated animations
  - **Property 11: Hardware-accelerated animations**
  - **Validates: Requirements 7.5**

- [x] 11. Create entrance animations with Intersection Observer
  - Define CSS keyframes for fade-in with upward motion
  - Add .animate-in class with animation styles
  - Create IntersectionObserver in JavaScript
  - Observe all elements marked for animation
  - Apply .animate-in class when elements intersect viewport
  - Set threshold to 0.1 for early triggering
  - _Requirements: 5.2_

- [ ]* 11.1 Write property test for viewport intersection animation
  - **Property 9: Viewport intersection animation**
  - **Validates: Requirements 5.2**

- [ ] 12. Add randomization to microinteractions
  - Generate random animation delays on page load
  - Vary entrance animation directions or easing
  - Apply randomization to non-critical decorative elements
  - Ensure randomization doesn't affect usability
  - _Requirements: 5.5_

- [ ] 13. Optimize performance and assets
  - Minify CSS and JavaScript for production
  - Ensure total page weight is under 2MB
  - Verify all animations use transform/opacity
  - Add passive event listeners where appropriate
  - Test font loading doesn't cause layout shifts
  - _Requirements: 7.3, 7.4, 7.5_

- [ ] 14. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
