import { RefObject, useLayoutEffect } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { useIntro } from './IntroContext';

/**
 * Choreographed entrance for page heroes. Inside the scope:
 *   data-hero="media"  background image settles from a slow zoom
 *   data-hero="text"   words rise line by line (use <RevealText />)
 *   data-hero="fade"   fades and lifts, in DOM order
 *   data-hero="rule"   hairline draws across
 */
const parts = (root: HTMLElement) => ({
  text: root.querySelectorAll('[data-hero="text"] .rt-word'),
  fade: root.querySelectorAll('[data-hero="fade"]'),
  rule: root.querySelectorAll('[data-hero="rule"]'),
  media: root.querySelectorAll('[data-hero="media"]'),
});

export function useHeroIntro(scope: RefObject<HTMLElement>) {
  const { ready, heroDelay } = useIntro();

  // Hide immediately to prevent a flash before the intro plays.
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const q = parts(root);
      q.text.length && gsap.set(q.text, { yPercent: 115 });
      q.fade.length && gsap.set(q.fade, { autoAlpha: 0, y: 28 });
      q.rule.length && gsap.set(q.rule, { scaleX: 0, transformOrigin: 'left center' });
      q.media.length && gsap.set(q.media, { scale: 1.18 });
    }, root);
    return () => ctx.revert();
  }, [scope]);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || !ready || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const q = parts(root);
      const tl = gsap.timeline({ delay: heroDelay });
      q.media.length && tl.to(q.media, { scale: 1, duration: 2.8, ease: 'expo.out' }, 0);
      q.text.length && tl.to(q.text, { yPercent: 0, duration: 1.5, stagger: 0.08, ease: 'expo.out' }, 0.15);
      q.rule.length && tl.to(q.rule, { scaleX: 1, duration: 1.6, ease: 'expo.inOut' }, 0.5);
      q.fade.length && tl.to(q.fade, { autoAlpha: 1, y: 0, duration: 1.3, stagger: 0.1, ease: 'expo.out' }, 0.7);
    }, root);

    // Do not revert on cleanup — elements must stay in their final state while the page exits.
    return () => ctx.kill();
    // Only the first `ready` matters; later delay changes must not replay the intro.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope, ready]);
}
