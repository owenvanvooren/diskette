function calculatePupilPosition(eyeCenter, cursorPos, maxDistance, minDistance = 0) {
  if (!eyeCenter || !cursorPos || typeof maxDistance !== 'number') {
    console.warn('Invalid inputs to calculatePupilPosition');
    return { x: 0, y: 0 };
  }

  if (
    isNaN(eyeCenter.x) || isNaN(eyeCenter.y) ||
    isNaN(cursorPos.x) || isNaN(cursorPos.y) ||
    isNaN(maxDistance)
  ) {
    console.warn('NaN values detected in calculatePupilPosition');
    return { x: 0, y: 0 };
  }

  const deltaX = cursorPos.x - eyeCenter.x;
  const deltaY = cursorPos.y - eyeCenter.y;

  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  if (distance === 0) {
    return { x: 0, y: 0 };
  }

  const angle = Math.atan2(deltaY, deltaX);

  let constrainedDistance;
  if (distance < minDistance) {
    constrainedDistance = minDistance;
  } else {
    constrainedDistance = Math.min(distance, maxDistance);
  }

  const pupilX = Math.cos(angle) * constrainedDistance;
  const pupilY = Math.sin(angle) * constrainedDistance;

  return { x: pupilX, y: pupilY };
}

class EyeTracker {
  constructor(leftEye, rightEye) {
    if (!leftEye || !rightEye) {
      console.warn('Eye elements not provided to EyeTracker constructor');
      this.isValid = false;
      return;
    }

    this.leftEye = leftEye;
    this.rightEye = rightEye;
    this.isValid = true;

    this.leftEyeCenter = null;
    this.rightEyeCenter = null;

    this.maxDistance = 12;
    
    this.minDistance = 3;

    this.originalLeftPupilPos = null;
    this.originalRightPupilPos = null;

    this.lastLeftPosition = { x: 0, y: 0 };
    this.lastRightPosition = { x: 0, y: 0 };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.resetPupils = this.resetPupils.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  init() {
    if (!this.isValid) {
      console.warn('EyeTracker is not valid, skipping initialization');
      return;
    }

    this.storeOriginalPupilPositions();

    this.calculateEyeCenters();
  }

  storeOriginalPupilPositions() {
    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');
    const leftWhite = document.getElementById('left-white');
    const rightWhite = document.getElementById('right-white');

    if (leftPupil && leftWhite) {
      const leftPupilCx = parseFloat(leftPupil.getAttribute('cx'));
      const leftPupilCy = parseFloat(leftPupil.getAttribute('cy'));
      const leftWhiteCx = parseFloat(leftWhite.getAttribute('cx'));
      const leftWhiteCy = parseFloat(leftWhite.getAttribute('cy'));
      
      this.originalLeftPupilPos = {
        x: leftPupilCx - leftWhiteCx,
        y: leftPupilCy - leftWhiteCy
      };

      leftPupil.setAttribute('cx', leftWhiteCx);
      leftPupil.setAttribute('cy', leftWhiteCy);
      
      leftPupil.style.transition = 'transform 0.15s ease-out';
      
      leftPupil.style.transform = `translate(${this.originalLeftPupilPos.x}px, ${this.originalLeftPupilPos.y}px)`;
    }

    if (rightPupil && rightWhite) {
      const rightPupilCx = parseFloat(rightPupil.getAttribute('cx'));
      const rightPupilCy = parseFloat(rightPupil.getAttribute('cy'));
      const rightWhiteCx = parseFloat(rightWhite.getAttribute('cx'));
      const rightWhiteCy = parseFloat(rightWhite.getAttribute('cy'));
      
      this.originalRightPupilPos = {
        x: rightPupilCx - rightWhiteCx,
        y: rightPupilCy - rightWhiteCy
      };

      rightPupil.setAttribute('cx', rightWhiteCx);
      rightPupil.setAttribute('cy', rightWhiteCy);
      
      rightPupil.style.transition = 'transform 0.15s ease-out';
      
      rightPupil.style.transform = `translate(${this.originalRightPupilPos.x}px, ${this.originalRightPupilPos.y}px)`;
    }
  }

  calculateEyeCenters() {
    if (!this.isValid) return;

    const leftRect = this.leftEye.getBoundingClientRect();
    const rightRect = this.rightEye.getBoundingClientRect();

    this.leftEyeCenter = {
      x: leftRect.left + leftRect.width / 2,
      y: leftRect.top + leftRect.height / 2
    };

    this.rightEyeCenter = {
      x: rightRect.left + rightRect.width / 2,
      y: rightRect.top + rightRect.height / 2
    };
  }

  handleResize() {
    if (!this.isValid) return;
    this.calculateEyeCenters();
  }

  handleScroll() {
    if (!this.isValid) return;
    this.calculateEyeCenters();
  }

  handleMouseMove(event) {
    if (!this.isValid || !this.leftEyeCenter || !this.rightEyeCenter) {
      return;
    }

    const clientX = event.clientX ?? event.touches?.[0]?.clientX;
    const clientY = event.clientY ?? event.touches?.[0]?.clientY;

    if (isNaN(clientX) || isNaN(clientY)) {
      console.warn('Invalid cursor coordinates detected');
      return;
    }

    const cursorPos = {
      x: clientX,
      y: clientY
    };

    const leftPupilPos = calculatePupilPosition(
      this.leftEyeCenter,
      cursorPos,
      this.maxDistance,
      this.minDistance
    );

    const rightPupilPos = calculatePupilPosition(
      this.rightEyeCenter,
      cursorPos,
      this.maxDistance,
      this.minDistance
    );

    this.lastLeftPosition = leftPupilPos;
    this.lastRightPosition = rightPupilPos;

    this.updatePupils(leftPupilPos, rightPupilPos);
  }

  updatePupils(leftPos, rightPos) {
    if (!this.isValid) return;

    if (!leftPos || !rightPos || isNaN(leftPos.x) || isNaN(leftPos.y) || isNaN(rightPos.x) || isNaN(rightPos.y)) {
      console.warn('Invalid pupil positions, using last valid positions');
      leftPos = this.lastLeftPosition;
      rightPos = this.lastRightPosition;
    }

    const leftPupil = document.getElementById('left-pupil');
    const rightPupil = document.getElementById('right-pupil');

    if (leftPupil) {
      leftPupil.style.transform = `translate(${leftPos.x}px, ${leftPos.y}px)`;
    }

    if (rightPupil) {
      rightPupil.style.transform = `translate(${rightPos.x}px, ${rightPos.y}px)`;
    }
  }

  handleMouseLeave() {
    this.resetPupils();
  }

  resetPupils() {
    if (!this.isValid) return;

    const leftPos = this.originalLeftPupilPos || { x: 0, y: 0 };
    const rightPos = this.originalRightPupilPos || { x: 0, y: 0 };
    
    this.lastLeftPosition = leftPos;
    this.lastRightPosition = rightPos;
    this.updatePupils(leftPos, rightPos);
  }

  destroy() {
    if (!this.isValid) return;

    this.isValid = false;
  }
}

class ThemeDetector {
  constructor() {
    this.currentTheme = 'light';
    this.mediaQuery = null;
    this.listener = null;
  }

  init() {
    if (typeof window.matchMedia === 'undefined') {
      console.warn('matchMedia not supported, using fallback theme detection');
      this.useFallback();
      return;
    }

    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.currentTheme = this.mediaQuery.matches ? 'dark' : 'light';

    this.listener = (e) => {
      this.handleThemeChange(e);
    };

    if (this.mediaQuery.addEventListener) {
      this.mediaQuery.addEventListener('change', this.listener);
    } else if (this.mediaQuery.addListener) {
      this.mediaQuery.addListener(this.listener);
    }
  }

  handleThemeChange(event) {
    this.currentTheme = event.matches ? 'dark' : 'light';
    
    const themeChangeEvent = new CustomEvent('themechange', {
      detail: { theme: this.currentTheme }
    });
    document.dispatchEvent(themeChangeEvent);
  }

  useFallback() {
    this.currentTheme = 'light';
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  destroy() {
    if (this.mediaQuery && this.listener) {
      if (this.mediaQuery.removeEventListener) {
        this.mediaQuery.removeEventListener('change', this.listener);
      } else if (this.mediaQuery.removeListener) {
        this.mediaQuery.removeListener(this.listener);
      }
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EyeTracker, calculatePupilPosition, ThemeDetector };
}

document.addEventListener('DOMContentLoaded', () => {
  const leftEye = document.getElementById('left-eye');
  const rightEye = document.getElementById('right-eye');

  if (leftEye && rightEye) {
    const eyeTracker = new EyeTracker(leftEye, rightEye);
    eyeTracker.init();

    document.addEventListener('mousemove', eyeTracker.handleMouseMove);
    document.addEventListener('touchmove', eyeTracker.handleMouseMove);
    document.addEventListener('touchstart', eyeTracker.handleMouseMove);
    
    document.addEventListener('mouseleave', eyeTracker.handleMouseLeave);
    document.addEventListener('touchend', eyeTracker.handleMouseLeave);
    
    window.addEventListener('resize', eyeTracker.handleResize);
    
    window.addEventListener('scroll', eyeTracker.handleScroll);
  } else {
    console.warn('Eye elements not found in DOM');
  }

  const themeDetector = new ThemeDetector();
  themeDetector.init();

  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      if (!isActive) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
