import { useRef } from 'react';
import { images } from '../data/images';
import { Button } from '../components/Button';
import { ContactSection } from '../components/ContactSection';
import { Gallery, GalleryItem } from '../components/Gallery';
import { Media } from '../components/Media';
import { NextWorld } from '../components/NextWorld';
import { RevealText } from '../components/RevealText';
import { SectionIntro } from '../components/SectionIntro';
import { SmartImage } from '../components/SmartImage';
import { useHeroIntro } from '../hooks/useHeroIntro';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const img = images.lifestyle;

const destinations = [
  { name: 'Aegean Light', kind: 'Coastal escape', image: img.travel[0] },
  { name: 'Desert Skyline', kind: 'City break', image: img.travel[1] },
  { name: 'Above the Clouds', kind: 'Mountain retreat', image: img.travel[2] },
  { name: 'The Long Way Home', kind: 'Slow travel', image: img.travel[3] },
];

const rituals = [
  { title: 'The Morning Pause', text: 'Coffee taken slowly, shared or alone — the first considered moment of the day.', image: img.aesthetics[0] },
  { title: 'Care as Craft', text: 'Wellbeing treated as an art: warmth, scent, stillness and time well spent.', image: img.aesthetics[1] },
  { title: 'The Curious Eye', text: 'Notebooks, maps and a camera — a way of collecting the world as you move through it.', image: img.aesthetics[2] },
];

const experiences = [
  { no: '01', title: 'The Long Table', text: 'Seasonal menus, candlelight and conversation that runs late. Dining as theatre, intimacy and craft.', image: img.experiences[0] },
  { no: '02', title: 'After Hours', text: 'Low light, a well-made drink and a room with a sense of occasion. The evening, perfected.', image: img.experiences[1] },
  { no: '03', title: 'Winter Quiet', text: 'Timber, snow and the stillness of a lake at dusk — retreats that restore the senses.', image: img.experiences[2] },
  { no: '04', title: 'The Wide View', text: 'Valleys, ridgelines and early light. Some experiences ask only that you arrive and look.', image: img.experiences[3] },
];

const gallery: GalleryItem[] = [
  { img: img.living[0], title: 'Golden Deck', category: 'Luxury Living' },
  { img: img.travel[0], title: 'Aegean Steps', category: 'Travel' },
  { img: img.culture[2], title: 'Candlelit Company', category: 'Culture' },
  { img: img.experiences[2], title: 'Lakeside Cabin', category: 'Experiences' },
  { img: img.living[3], title: 'Blue Hour Pool', category: 'Luxury Living' },
  { img: img.culture[1], title: 'Colour Study', category: 'Art' },
  { img: images.showcase[2].img, title: 'Evening, Paris', category: 'Destinations' },
  { img: img.aesthetics[0], title: 'Two Flat Whites', category: 'Rituals' },
  { img: img.travel[2], title: 'Cloud Line', category: 'Travel' },
];

export default function Lifestyle() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  usePageMeta(
    'Lifestyle',
    'ShudsonMartin Lifestyle — travel and destinations, luxury living, culture and creativity, personal aesthetics and memorable experiences.',
  );
  useHeroIntro(heroRef);
  useScrollAnimations(pageRef);

  return (
    <div ref={pageRef} className="lifestyle theme-lifestyle">
      {/* ------------------------------------------------------------ Hero */}
      <section ref={heroRef} className="ls-hero" aria-labelledby="ls-title">
        <div className="ls-hero__media" aria-hidden="true">
          <div className="ls-hero__scale" data-hero="media">
            <div className="hero__parallax" data-parallax="0.25">
              <SmartImage image={img.hero} priority sizes="100vw" alt="" />
            </div>
          </div>
        </div>
        <div className="container ls-hero__content">
          <p className="eyebrow" data-hero="fade">
            <span className="eyebrow__index">03</span>World of Lifestyle
          </p>
          <RevealText as="h1" id="ls-title" mode="hero" className="ls-hero__title" text={'The art\nof living.'} emphasis={['living.']} />
          <p className="ls-hero__text" data-hero="fade">
            An exploration of experiences, aesthetics, culture and the finer details of everyday life.
          </p>
        </div>
        <div className="ls-hero__journal" data-hero="fade" aria-hidden="true">
          <span>Journal</span>
          <span>Vol. III</span>
        </div>
      </section>

      {/* ---------------------------------------------------------- Intro */}
      <section className="ls-intro" aria-label="Introduction">
        <div className="container ls-intro__inner">
          <span className="ls-ornament" aria-hidden="true">✦</span>
          <RevealText
            as="p"
            mode="scrub"
            className="ls-intro__text"
            text="Living well is a practice of attention — to place, to people, to the textures of an ordinary day. This is our journal of the places, rituals and moments worth slowing down for."
          />
        </div>
      </section>

      {/* ------------------------------------------- Travel & destinations */}
      <section id="travel" className="ls-travel" aria-labelledby="travel-title">
        <div className="container">
          <SectionIntro index="I" eyebrow="Travel & Destinations" id="travel-title" title={'Elsewhere,\nbeautifully.'} emphasis={['beautifully.']}>
            <p>Coastlines, skylines and summits — destinations chosen for their light, their stillness and their stories.</p>
          </SectionIntro>
        </div>
        <ul role="list" className="ls-travel__row" tabIndex={0} aria-label="Destinations — scroll horizontally">
          {destinations.map((d, i) => (
            <li key={d.name} className="ls-postcard hover-zoom" data-reveal="up" data-delay={i * 0.1}>
              <Media image={d.image} ratio="3 / 4" reveal={false} sizes="(max-width: 760px) 80vw, 30vw" />
              <div className="ls-postcard__caption">
                <span className="ls-postcard__no">No. {String(i + 1).padStart(2, '0')}</span>
                <span className="ls-postcard__name">{d.name}</span>
                <span className="label">{d.kind}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------- Luxury living */}
      <section id="luxury-living" className="ls-living" aria-labelledby="living-title">
        <div className="container ls-living__grid">
          <div className="ls-living__text">
            <p className="eyebrow" data-reveal="up">
              <span className="eyebrow__index">II</span>Luxury Living
            </p>
            <RevealText as="h2" id="living-title" className="ls-living__title" text={'Rest is the\nnew luxury.'} emphasis={['luxury.']} />
            <p data-reveal="up">
              The finest hotels and residences understand that true luxury is quiet: water at the edge of the view,
              warm light at dusk and space to simply be. We collect these places, and the feeling they leave behind.
            </p>
          </div>
          <div className="ls-living__arch">
            <Media image={img.living[1]} ratio="3 / 4" parallax={0.1} sizes="(max-width: 900px) 90vw, 40vw" />
          </div>
          <div className="ls-living__wide">
            <Media image={img.living[2]} ratio="16 / 9" parallax={0.08} sizes="(max-width: 900px) 100vw, 60vw" />
            <p className="ls-living__caption" data-reveal="up">
              <span className="label">Shoreline</span> An infinity deck where the horizon becomes the architecture.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------- Culture & creativity */}
      <section id="culture" className="ls-culture" aria-labelledby="culture-title">
        <div className="container">
          <SectionIntro index="III" eyebrow="Culture & Creativity" id="culture-title" title={'Art, ideas and\ngood company.'} emphasis={['company.']}>
            <p>Galleries, studios and long dinners with interesting people — the cultural life that inspires everything we make.</p>
          </SectionIntro>
          <div className="ls-culture__grid">
            {img.culture.map((im, i) => (
              <figure key={im.src} className={`ls-culture__item ls-culture__item--${i + 1} hover-zoom`}>
                <Media image={im} sizes="(max-width: 760px) 100vw, 40vw" delay={i * 0.12} />
                <figcaption>
                  <span className="label">{['Galleries', 'The Canvas', 'The Gathering'][i]}</span>
                  {['White walls, open minds.', 'Colour as conversation.', 'Ideas over candlelight.'][i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Personal aesthetics */}
      <section id="aesthetics" className="ls-rituals" aria-labelledby="rituals-title">
        <div className="container">
          <SectionIntro align="center" index="IV" eyebrow="Personal Aesthetics" id="rituals-title" title={'Small rituals,\nbeautifully kept.'} emphasis={['rituals,']}>
            <p>The way you begin a morning, care for yourself and notice the world — this is where style truly lives.</p>
          </SectionIntro>
          <ul role="list" className="ls-rituals__list">
            {rituals.map((r, i) => (
              <li key={r.title} className="ls-ritual hover-zoom">
                <Media image={r.image} ratio="3 / 4" className="ls-ritual__arch" sizes="(max-width: 760px) 80vw, 30vw" delay={i * 0.12} />
                <h3 className="ls-ritual__title" data-reveal="up">{r.title}</h3>
                <p className="ls-ritual__text" data-reveal="up">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------- Experiences & storytelling */}
      <section id="experiences" className="ls-experiences" aria-labelledby="experiences-title">
        <div className="container">
          <SectionIntro index="V" eyebrow="Experiences & Visual Stories" id="experiences-title" title={'Moments worth\nremembering.'} emphasis={['remembering.']} />
        </div>
        <ol role="list" className="ls-stories">
          {experiences.map((e, i) => (
            <li key={e.title} className={`ls-story ls-story--${i % 2 ? 'right' : 'left'}`}>
              <div className="ls-story__media">
                <Media image={e.image} parallax={0.15} sizes="(max-width: 900px) 100vw, 70vw" />
              </div>
              <div className="ls-story__card" data-reveal="up">
                <span className="ls-story__no">{e.no}</span>
                <h3 className="ls-story__title">{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------ Inspiration */}
      <section id="inspiration" className="ls-gallery" aria-labelledby="ls-gallery-title">
        <div className="container">
          <SectionIntro index="VI" eyebrow="Lifestyle Inspiration" id="ls-gallery-title" title={'Postcards from\na life well lived.'} emphasis={['well']}>
            <p>Select any image to view it in full.</p>
          </SectionIntro>
          <Gallery items={gallery} layout="masonry" />
          <div className="section-cta" data-reveal="up">
            <Button to="/contact">Start a conversation</Button>
          </div>
        </div>
      </section>

      <NextWorld to="/interior" title="Interior" kicker="01" image={images.interior.hero} />
      <ContactSection id="lifestyle-contact" />
    </div>
  );
}
