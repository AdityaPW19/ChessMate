// Types for Framer Motion when loaded from CDN
interface MotionObject {
  div: any;
  g: any;
  // Add more element types as needed
}

declare global {
  interface Window {
    motion: MotionObject;
  }
}

export {};
