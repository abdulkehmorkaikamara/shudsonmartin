import { RefObject, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

/**
 * Declarative scroll animations. Inside the given scope, elements opt in with data attributes:
 *
 *   data-reveal="up"       fade + rise on enter
 *   data-reveal="stagger"  children fade + rise in sequence
 *   data-reveal="image"    clip-path wipe with inner image settle
 *   data-reveal="text"     word-by-word rise (use <RevealText />)
 *   data-reveal="line"     hairline draws across
 *   data-reveal="scrub"    words brighten as you scroll (use <RevealText scrub />)
 *   data-parallax="0.15"   vertical drift relative to scroll (positive = slower)
 */
export function useScrollAnimations(scope: RefObject<HTMLElement>, deps: unknown[] = []) {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (ctx) => {
        const { reduced } = ctx.conditions as { reduced: boolean };
        const q = gsap.utils.selector(root);

        if (reduced) {
          // Make sure everything is visible and static.
          gsap.set(q('[data-reveal], [data-reveal] *, .rt-word'), { clearProps: 'all' });
          return;
        }

        q('[data-reveal="up"]').forEach((el: HTMLElement) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 48,
            duration: 1.4,
            delay: Number(el.dataset.delay ?? 0),
            clearProps: 'transform',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        q('[data-reveal="stagger"]').forEach((el: HTMLElement) => {
          gsap.from(el.children, {
            autoAlpha: 0,
            y: 40,
            duration: 1.3,
            stagger: 0.12,
            clearProps: 'transform',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });

        q('[data-reveal="image"]').forEach((el: HTMLElement) => {
          // Scale the wrapper, not the <img>, so CSS hover-zoom on the image keeps working.
          const inner = el.firstElementChild;
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
          tl.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', delay: Number(el.dataset.delay ?? 0) },
          );
          if (inner) tl.from(inner, { scale: 1.3, duration: 2, ease: 'expo.out' }, '<0.2');
        });

        q('[data-reveal="text"]').forEach((el: HTMLElement) => {
          gsap.from(el.querySelectorAll('.rt-word'), {
            yPercent: 115,
            rotate: 2,
            duration: 1.3,
            stagger: 0.045,
            delay: Number(el.dataset.delay ?? 0),
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        q('[data-reveal="scrub"]').forEach((el: HTMLElement) => {
          gsap.fromTo(
            el.querySelectorAll('.rt-word'),
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
            },
          );
        });

        q('[data-reveal="line"]').forEach((el: HTMLElement) => {
          gsap.from(el, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 1.8,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });

        q('[data-parallax]').forEach((el: HTMLElement) => {
          const speed = Number(el.dataset.parallax || 0.15);
          gsap.fromTo(
            el,
            { yPercent: -speed * 50 },
            {
              yPercent: speed * 50,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });
      },
    );

    // Recalculate positions once late images/fonts settle.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 600);
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener('load', refresh);
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
