import { useRef } from 'react';
import { Button } from '../components/Button';
import { RevealText } from '../components/RevealText';
import { useHeroIntro } from '../hooks/useHeroIntro';
import { usePageMeta } from '../hooks/usePageMeta';

export default function NotFound() {
  const heroRef = useRef<HTMLElement>(null);
  usePageMeta('Page not found', 'The page you were looking for could not be found.');
  useHeroIntro(heroRef);

  return (
    <section ref={heroRef} className="page-hero page-hero--404" aria-labelledby="nf-title">
      <div className="container page-hero__inner">
        <p className="eyebrow" data-hero="fade">
          <span className="eyebrow__index">404</span>Page not found
        </p>
        <RevealText as="h1" id="nf-title" mode="hero" className="page-hero__title" text={'This space is\nstill being designed.'} emphasis={['designed.']} />
        <span className="hero__rule" data-hero="rule" aria-hidden="true" />
        <div className="hero__actions" data-hero="fade">
          <Button to="/">Return home</Button>
          <Button to="/interior" variant="outline">Explore Interior</Button>
        </div>
      </div>
    </section>
  );
}
