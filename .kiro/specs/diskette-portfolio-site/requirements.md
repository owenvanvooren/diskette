# Requirements Document

## Introduction

The diskette portfolio site is a single-page website for a freelance UI design studio. The site balances minimal design with informative content, incorporating playful microinteractions to create a memorable user experience. The centerpiece is an animated floppy disk mascot with cursor-tracking googly eyes, embodying the brand's quirky yet professional personality.

## Glossary

- **Site**: The diskette portfolio website
- **Mascot**: The animated floppy disk character with googly eyes (Pippin)
- **User**: A visitor to the website
- **Device Appearance**: The user's system-level dark mode or light mode preference
- **Viewport**: The visible area of the web page on the user's device
- **Microinteraction**: A small, contained animation or interactive element that provides feedback or delight

## Requirements

### Requirement 1

**User Story:** As a user, I want the mascot's eyes to track my cursor position, so that the site feels interactive and playful.

#### Acceptance Criteria

1. WHEN a user moves their cursor within the viewport, THE Site SHALL update the mascot's pupil positions to point toward the cursor coordinates
2. WHEN the cursor moves to different screen quadrants, THE Site SHALL smoothly animate the pupil transitions without jarring movements
3. WHEN a user is on a touch device without cursor support, THE Site SHALL display the mascot with pupils in a neutral default position
4. WHILE the cursor remains stationary, THE Site SHALL maintain the pupil positions pointing at the last known cursor location
5. WHEN the page loads, THE Site SHALL initialize the pupils in a centered neutral position before cursor tracking begins

### Requirement 2

**User Story:** As a user, I want the site to adapt to my device's appearance settings, so that the experience is comfortable in both light and dark modes.

#### Acceptance Criteria

1. WHEN a user has light mode enabled on their device, THE Site SHALL display white backgrounds with black text and accent color highlights
2. WHEN a user has dark mode enabled on their device, THE Site SHALL display black backgrounds with white text and accent color highlights
3. WHEN the device appearance changes while the site is open, THE Site SHALL update the color scheme immediately without requiring a page refresh
4. THE Site SHALL use the accent color (#85BBFF) consistently across both light and dark themes for brand elements
5. WHEN displaying the mascot, THE Site SHALL ensure adequate contrast between the character and background in both themes

### Requirement 3

**User Story:** As a user, I want the typography to be visually interesting and readable, so that I can easily consume content while enjoying the design aesthetic.

#### Acceptance Criteria

1. THE Site SHALL use NaN Rage Soft Regular weight for body text content
2. THE Site SHALL use NaN Rage Soft Thin weight for large display text elements
3. THE Site SHALL use NaN Rage Soft ExtraBold weight for heading elements
4. THE Site SHALL render all text content in lowercase for stylistic consistency
5. WHEN displaying text on mobile devices, THE Site SHALL maintain legibility with appropriate font sizes and line heights

### Requirement 4

**User Story:** As a user, I want the site to be fully responsive, so that I have an optimal experience whether I'm on desktop or mobile.

#### Acceptance Criteria

1. WHEN a user views the site on desktop, THE Site SHALL utilize the available space without appearing empty or overly sparse
2. WHEN a user views the site on mobile, THE Site SHALL present all content in a readable and usable format
3. WHEN the viewport width changes, THE Site SHALL adjust layout and spacing fluidly using responsive design techniques
4. WHEN interactive elements are displayed on mobile, THE Site SHALL ensure touch targets meet minimum size requirements for usability
5. WHEN the mascot is displayed on mobile, THE Site SHALL scale appropriately while maintaining visual quality

### Requirement 5

**User Story:** As a user, I want to encounter delightful microinteractions throughout the site, so that each visit feels unique and enjoyable.

#### Acceptance Criteria

1. WHEN a user interacts with clickable elements, THE Site SHALL provide visual feedback through hover states or animations
2. WHEN page elements first appear in the viewport, THE Site SHALL animate them in with subtle entrance effects
3. WHEN a user performs actions on the site, THE Site SHALL respond with smooth transitions that enhance rather than distract from usability
4. THE Site SHALL implement microinteractions that complete within 300 milliseconds to maintain perceived performance
5. WHEN a user returns to the site, THE Site SHALL present varied or randomized microinteraction details to create uniqueness

### Requirement 6

**User Story:** As a user, I want to learn about diskette's services and contact information, so that I can understand what is offered and how to get in touch.

#### Acceptance Criteria

1. THE Site SHALL display information about diskette's UI design services in a clear and concise manner
2. THE Site SHALL provide contact information or a method for users to reach out for inquiries
3. WHEN a user views the about section, THE Site SHALL communicate the brand personality through informal and friendly copy
4. THE Site SHALL include copyright information with the text "© 2025 owen van vooren. all rights reserved."
5. WHEN a user clicks the copyright name link, THE Site SHALL navigate to https://owen.uno

### Requirement 7

**User Story:** As a user, I want the site to load quickly and perform smoothly, so that I don't experience lag or delays during interactions.

#### Acceptance Criteria

1. WHEN the page loads, THE Site SHALL display meaningful content within 2 seconds on standard broadband connections
2. WHEN cursor tracking is active, THE Site SHALL update pupil positions at a minimum of 30 frames per second
3. WHEN fonts are loading, THE Site SHALL prevent layout shifts by reserving appropriate space
4. THE Site SHALL optimize asset sizes to minimize total page weight below 2MB
5. WHEN animations are running, THE Site SHALL use hardware-accelerated CSS properties to maintain smooth performance

### Requirement 8

**User Story:** As a user, I want proper favicon support across devices, so that I can easily identify the diskette tab in my browser.

#### Acceptance Criteria

1. THE Site SHALL include a 96x96 PNG favicon for standard browser support
2. THE Site SHALL include an SVG favicon for modern browsers with vector support
3. THE Site SHALL include an ICO favicon for legacy browser compatibility
4. WHEN a user bookmarks the site on iOS, THE Site SHALL display the apple-touch-icon
5. THE Site SHALL reference all favicon files using the correct link tags in the HTML head
