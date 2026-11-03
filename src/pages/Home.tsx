import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../data/brand';
import { images } from '../data/images';
import { Arrow, Button, scrollToAnchor } from '../components/Button';
import { ContactSection } from '../components/ContactSection';
import { Marquee } from '../components/Marquee';
import { Media } from '../components/Media';
import { RevealText } from '../components/RevealText';
import { SectionIntro } from '../components/SectionIntro';
import { SmartImage } from '../components/SmartImage';
import { useHeroIntro } from '../hooks/useHeroIntro';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const worlds = [
  {
    index: '01',
    name: 'Interior Design',
    short: 'Interior',
    headline: 'Spaces that tell a story.',
    text: 'We transform spaces into meaningful expressions of beauty, comfort and individuality.',
    cta: 'Explore Interior',
    to: '/interior',
    image: images.home.worldInterior,
  },
  {
    index: '02',
    name: 'Fashion',
    short: 'Fashion',
    headline: 'Style without boundaries.',
    text: 'Discover fashion as an expression of identity, creativity and confidence.',
    cta: 'Explore Fashion',
    to: '/fashion',
    image: images.home.worldFashion,
  },
  {
    index: '03',
    name: 'Lifestyle',
    short: 'Lifestyle',
    headline: 'The art of living.',
    text: 'An exploration of experiences, aesthetics, culture and the finer details of everyday life.',
    cta: 'Explore Lifestyle',
    to: '/lifestyle',
    image: images.home.worldLifestyle,
  },
];

const categoryRoute: Record<string, string> = {
  Interior: '/interior',
  Fashion: '/fashion',
  Lifestyle: '/lifestyle',
};

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  usePageMeta(
    '',
    'ShudsonMartin is a creative brand founded in 2016 by Hudson Martin — a creative expression of spaces, fashion and the art of living.',
  );
  useHeroIntro(heroRef);
  useScrollAnimations(pageRef);

  return (
    <div ref={pageRef} className="home">
      {/* ------------------------------------------------------------ Hero */}
      <section ref={heroRef} className="hero" aria-labelledby="hero-title">
        <div className="hero__media" aria-hidden="true">
          <div className="hero__media-inner" data-hero="media">
            <div className="hero__parallax" data-parallax="0.25">
              <SmartImage image={images.home.hero} priority sizes="100vw" alt="" />
            </div>
          </div>
          <div className="hero__overlay" />
        </div>

        <div className="hero__content container">
          <p className="eyebrow hero__eyebrow" data-hero="fade">
            <span className="eyebrow__index">Est. {brand.established}</span>
            Interior · Fashion · Lifestyle
          </p>

          <RevealText
            as="h1"
            id="hero-title"
            mode="hero"
            className="hero__title"
            text={'BEYOND DESIGN.\nBEYOND STYLE.\nBEYOND ORDINARY.'}
            emphasis={['ordinary.']}
          />

          <span className="hero__rule" data-hero="rule" aria-hidden="true" />

          <div className="hero__foot">
            <p className="hero__lede" data-hero="fade">
              A creative expression of spaces, fashion and the art of living.
            </p>
            <div className="hero__actions" data-hero="fade">
              <Button to="#worlds">Explore our world</Button>
              <Button to="/about" variant="outline">
                Discover ShudsonMartin
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="scroll-cue"
          data-hero="fade"
          onClick={() => scrollToAnchor('#intro')}
          aria-label="Scroll to content"
        >
          <span className="scroll-cue__text">Scroll</span>
          <span className="scroll-cue__line" aria-hidden="true" />
        </button>

        <ul role="list" className="hero__index" data-hero="fade" aria-label="Our worlds">
          {worlds.map((w) => (
            <li key={w.to}>
              <Link to={w.to} className="link-underline">
                <span>{w.index}</span> {w.short}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------- Intro strip */}
      <section id="intro" className="home-intro" aria-label="Introduction">
        <div className="container home-intro__inner">
          <p className="label" data-reveal="up">The House of ShudsonMartin</p>
          <RevealText
            as="p"
            mode="scrub"
            className="home-intro__statement"
            text="Three creative worlds, one point of view. Interiors that hold a story, fashion that speaks with confidence, and a way of living shaped by the finer details."
          />
        </div>
        <Marquee items={['Interior Design', 'Fashion', 'Lifestyle', `Established ${brand.established}`, 'Beyond Ordinary']} />
      </section>

      {/* ------------------------------------------------- Three worlds */}
      <section id="worlds" className="worlds-section" aria-labelledby="worlds-title">
        <div className="container">
          <SectionIntro index="01 — 03" eyebrow="The Creative Worlds" id="worlds-title" title={'Three worlds.\nOne signature.'} emphasis={['signature.']}>
            <p>
              Each world is distinct in character, yet shaped by the same sensibility — an eye for proportion, material
              and the quiet confidence of things made well.
            </p>
          </SectionIntro>
        </div>

        <ul role="list" className="worlds" data-reveal="stagger">
          {worlds.map((w) => (
            <li key={w.to} className="world">
              <Link to={w.to} className="world__link" aria-label={`${w.name} — ${w.headline} ${w.cta}`}>
                <span className="world__media" aria-hidden="true">
                  <SmartImage image={w.image} sizes="(max-width: 900px) 100vw, 60vw" alt="" />
                </span>
                <span className="world__shade" aria-hidden="true" />
                <span className="world__top">
                  <span className="world__index">{w.index}</span>
                  <span className="world__name">{w.name}</span>
                </span>
                <span className="world__vertical" aria-hidden="true">
                  {w.short}
                </span>
                <span className="world__body">
                  <span className="world__headline">{w.headline}</span>
                  <span className="world__text">{w.text}</span>
                  <span className="btn btn--text world__cta">
                    <span className="btn__label">{w.cta}</span>
                    <Arrow />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* -------------------------------------------------- Brand story */}
      <section className="story" aria-labelledby="story-title">
        <div className="container story__grid">
          <div className="story__visual">
            <Media image={images.home.storyMain} ratio="4 / 5" parallax={0.12} sizes="(max-width: 900px) 100vw, 45vw" className="story__main" />
            <Media image={images.home.storyDetail} ratio="3 / 4" sizes="(max-width: 900px) 50vw, 20vw" className="story__detail" delay={0.25} />
            <p className="story__caption" data-reveal="up">
              <span className="label">Since</span>
              <span className="story__year">{brand.established}</span>
            </p>
          </div>

          <div className="story__text">
            <p className="eyebrow" data-reveal="up">
              <span className="eyebrow__index">Our Story</span>Founded by {brand.founder}
            </p>
            <RevealText as="h2" id="story-title" className="story__title" text={'CREATIVITY\nWITH A PURPOSE.'} emphasis={['purpose.']} />
            <span className="rule" data-reveal="line" aria-hidden="true" />
            <div className="story__copy" data-reveal="stagger">
              <p>
                Founded in 2016 by Hudson Martin, ShudsonMartin was established from a vision to explore creativity across
                different expressions of modern living.
              </p>
              <p>
                From interior spaces to fashion and lifestyle, the brand brings together aesthetics, originality and a
                passion for thoughtful design.
              </p>
              <p className="story__pull">
                ShudsonMartin represents more than a style. It represents a way of seeing and experiencing the world.
              </p>
            </div>
            <dl className="story__facts" data-reveal="stagger">
              <div>
                <dt>Established</dt>
                <dd>{brand.established}</dd>
              </div>
              <div>
                <dt>Creative worlds</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Founder</dt>
                <dd className="story__founder">{brand.founder}</dd>
              </div>
            </dl>
            <div data-reveal="up">
              <Button to="/about" variant="outline">
                Read our story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Featured showcase */}
      <section className="showcase" aria-labelledby="showcase-title">
        <div className="container">
          <SectionIntro index="Selected" eyebrow="Featured Showcase" id="showcase-title" title={'A curated edit\nof our worlds.'} emphasis={['curated']}>
            <p>Interior spaces, fashion editorials and lifestyle moments — a glimpse into the visual language of the house.</p>
          </SectionIntro>

          <ul role="list" className="showcase__grid">
            {images.showcase.map((item, idx) => (
              <li key={item.title} className={`showcase__item showcase__item--${idx + 1}`}>
                <Link to={categoryRoute[item.category]} className="showcase__link hover-zoom">
                  <Media image={item.img} sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 40vw" delay={(idx % 3) * 0.1} />
                  <span className="showcase__meta">
                    <span className="label">
                      {String(idx + 1).padStart(2, '0')} — {item.category}
                    </span>
                    <span className="showcase__title">{item.title}</span>
                    {'text' in item && item.text && <span className="showcase__text">{item.text}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Brand statement */}
      <section className="statement" aria-label="Brand statement">
        <div className="statement__bg" aria-hidden="true">
          <Media image={images.home.statement} parallax={0.3} reveal={false} zoom={false} sizes="100vw" alt="" />
        </div>
        <div className="statement__glow" aria-hidden="true" />
        <div className="container statement__inner">
          <p className="eyebrow" data-reveal="up">
            <span className="eyebrow__index">Manifesto</span>
            {brand.name}
          </p>
          <RevealText
            as="blockquote"
            className="statement__text"
            text={"WE DON'T JUST\nFOLLOW AESTHETICS.\nWE CREATE\nEXPERIENCES."}
            emphasis={['experiences.']}
          />
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
