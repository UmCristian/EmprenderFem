import '@testing-library/jest-dom'

// Mock IntersectionObserver para Framer Motion
// Este mock es necesario porque JSDOM no incluye IntersectionObserver
// y Framer Motion lo requiere para animaciones viewport
global.IntersectionObserver = class IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds = [];
  
  disconnect() {
    // Mock disconnect - no operation needed for tests
  }
  
  observe() {
    // Mock observe - no operation needed for tests
  }
  
  takeRecords() {
    return [];
  }
  
  unobserve() {
    // Mock unobserve - no operation needed for tests
  }
} as any;
