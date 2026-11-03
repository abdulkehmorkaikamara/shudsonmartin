import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { Arrow, Button } from '../components/Button';
import { Media } from '../components/Media';
import { RevealText } from '../components/RevealText';
import { SectionIntro } from '../components/SectionIntro';
import { useHeroIntro } from '../hooks/useHeroIntro';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const values = [
  { name: 'Creativity', text: 'Ideas come first — and every discipline is an opportunity to see things differently.' },
  { name: 'Sophistication', text: 'Restraint, proportion and a refined eye in everything we put our name to.' },
  { name: 'Quality', text: 'Materials, making and finish that are built to last and meant to be felt.' },
  { name: 'Originality', text: 'A point of view of our own, never borrowed from the trend of the moment.' },
  { name: 'Confidence', text: 'Clear decisions, expressed with calm conviction rather than noise.' },
];

const pillars = [
  { no: '01', name: 'Interior Design', line: 'Spaces that tell a story.', to: '/interior', image: images.home.worldInterior },
  { no: '02', name: 'Fashion', line: 'Style without boundaries.', to: '/fashion', image: images.home.worldFashion },
  { no: '03', name: 'Lifestyle', line: 'The art of living.', to: '/lifestyle', image: images.home.worldLifestyle },
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  usePageMeta(
    'About',
    `Founded in ${brand.established} by ${brand.founder}, ShudsonMartin explores creativity across interior design, fashion and lifestyle.`,
  );
  useHeroIntro(heroRef);
  useScrollAnimations(pageRef);

  return (
    <div ref={pageRef} className="about">
      <section ref={heroRef} className="page-hero" aria-labelledby="about-title">
        <div className="container page-hero__inner">
          <p className="eyebrow" data-hero="fade">
            <span className="eyebrow__index">Since {brand.established}</span>About the House
          </p>
          <RevealText as="h1" id="about-title" mode="hero" className="page-hero__title" text={'A way of seeing\nand experiencing\nthe world.'} emphasis={['seeing', 'world.']} />
          <span className="hero__rule" data-hero="rule" aria-hidden="true" />
          <p className="page-hero__text" data-hero="fade">
            ShudsonMartin is a creative brand working across interior design, fashion and lifestyle — united by
            aesthetics, originality and a passion for thoughtful design.
          </p>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="container about-story__grid">
          <Media image={images.home.storyMain} ratio="4 / 5" parallax={0.1} sizes="(max-width: 900px) 100vw, 45vw" className="about-story__img" />
          <div className="about-story__text">
            <p className="eyebrow" data-reveal="up">
              <span className="eyebrow__index">The Story</span>
            </p>
            <RevealText as="h2" id="about-story-title" className="about-story__title" text={'CREATIVITY\nWITH A PURPOSE.'} emphasis={['purpose.']} />
            <div className="about-story__copy" data-reveal="stagger">
              <p>
                Founded in 2016 by Hudson Martin, ShudsonMartin was established from a vision to explore creativity
                across different expressions of modern living.
              </p>
              <p>
                From interior spaces to fashion and lifestyle, the brand brings together aesthetics, originality and a
                passion for thoughtful design.
              </p>
              <p className="story__pull">
                ShudsonMartin represents more than a style. It represents a way of seeing and experiencing the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="founder" aria-labelledby="founder-title">
        <div className="container founder__inner">
          <p className="label" data-reveal="up">Founder</p>
          <h2 id="founder-title" className="founder__name" data-reveal="up">
            {brand.founder}
          </h2>
          <span className="rule rule--center" data-reveal="line" aria-hidden="true" />
          <p className="founder__text" data-reveal="up">
            Hudson Martin founded ShudsonMartin in {brand.established} with a single conviction: that creativity should
            not be confined to one discipline. The house he built moves freely between the spaces we inhabit, the
            clothes we wear and the way we choose to live.
          </p>
        </div>
      </section>

      <section className="values" aria-labelledby="values-title">
        <div className="container">
          <SectionIntro index="Values" eyebrow="What we stand for" id="values-title" title={'Five quiet\nprinciples.'} emphasis={['principles.']} />
          <ol role="list" className="values__list" data-reveal="stagger">
            {values.map((v, i) => (
              <li key={v.name} className="value">
                <span className="value__no">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="value__name">{v.name}</h3>
                <p className="value__text">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pillars" aria-labelledby="pillars-title">
        <div className="container">
          <SectionIntro index="01 — 03" eyebrow="The Worlds" id="pillars-title" title={'Where our\ncreativity lives.'} emphasis={['lives.']} />
          <ul role="list" className="pillars__grid">
            {pillars.map((p, i) => (
              <li key={p.to}>
                <Link to={p.to} className="pillar hover-zoom">
                  <Media image={p.image} ratio="3 / 4" sizes="(max-width: 760px) 100vw, 33vw" delay={i * 0.1} />
                  <span className="pillar__meta">
                    <span className="label">{p.no}</span>
                    <span className="pillar__name">{p.name}</span>
                    <span className="pillar__line">{p.line}</span>
                    <span className="btn btn--text">
                      <span className="btn__label">Explore</span>
                      <Arrow />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="section-cta" data-reveal="up">
            <Button to="/contact">Contact the studio</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
