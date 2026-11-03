import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'expo.out', duration: 1.2 });

export const EASE = {
  out: 'expo.out',
  inOut: 'power4.inOut',
  soft: 'power3.out',
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
