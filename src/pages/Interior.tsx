import { useRef } from 'react';
import { images } from '../data/images';
import { AnchorLink, Button } from '../components/Button';
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

const img = images.interior;

const chapters = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'living', label: 'Living Rooms' },
  { id: 'bedrooms', label: 'Bedrooms' },
  { id: 'kitchens', label: 'Kitchens' },
  { id: 'details', label: 'Architectural Details' },
  { id: 'furniture', label: 'Furniture & Decoration' },
  { id: 'inspiration', label: 'Inspiration' },
];

const rooms = [
  {
    id: 'living',
    index: 'III',
    title: 'Living Rooms',
    lede: 'The heart of the home, composed for conversation and calm.',
    text: 'Velvet upholstery, layered cushions and a measured palette of pearl, ivory and smoke. Each living space is arranged around light — how it arrives, where it rests and how it changes through the day.',
    notes: ['Layered neutral palettes', 'Statement lighting', 'Channel-tufted velvet'],
    images: img.living,
  },
  {
    id: 'bedrooms',
    index: 'IV',
    title: 'Bedrooms',
    lede: 'Private sanctuaries, quiet by design.',
    text: 'Deep tones, soft acoustics and tactile finishes create rooms that slow the pace. We design bedrooms as retreats — restful, enveloping and deeply personal.',
    notes: ['Tonal, enveloping walls', 'Natural fibres & linens', 'Soft, indirect light'],
    images: img.bedrooms,
  },
  {
    id: 'kitchens',
    index: 'V',
    title: 'Kitchens',
    lede: 'Where craft meets the everyday ritual.',
    text: 'Considered joinery, honest materials and an easy flow between preparing, gathering and sharing. Kitchens that work beautifully and look effortless doing it.',
    notes: ['Bespoke joinery', 'Stone & brushed metal', 'Gathering islands'],
    images: img.kitchens,
  },
];

const furniture = [
  { name: 'The Leopard Table', type: 'Statement pieces', image: img.furniture[0] },
  { name: 'Pearl Sectional', type: 'Upholstery', image: img.furniture[1] },
  { name: 'The Sculpted Hand', type: 'Styling', image: img.furniture[2] },
  { name: 'Cube Shelving Study', type: 'Collected pieces', image: img.furniture[3] },
];

const gallery: GalleryItem[] = [
  { img: img.living[1], title: 'The Pearl Lounge', category: 'Living' },
  { img: img.details[1], title: 'Floating Stair', category: 'Architecture' },
  { img: img.bedrooms[2], title: 'Botanical Bedroom', category: 'Bedroom' },
  { img: img.kitchens[1], title: 'The White Island', category: 'Kitchen' },
  { img: img.furniture[2], title: 'Still Life', category: 'Styling' },
  { img: img.commercial[2], title: 'Brick & Brass Lounge', category: 'Hospitality' },
  { img: img.living[2], title: 'Ivory Corner', category: 'Living' },
  { img: img.details[0], title: 'Folded Facade', category: 'Architecture' },
  { img: img.furniture[0], title: 'The Leopard Table', category: 'Furniture' },
];

export default function Interior() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  usePageMeta(
    'Interior Design',
    'ShudsonMartin Interior Design — residential and commercial interiors, living rooms, bedrooms, kitchens, architectural details and curated furniture.',
  );
  useHeroIntro(heroRef);
  useScrollAnimations(pageRef);

  return (
    <div ref={pageRef} className="interior theme-interior">
      {/* ------------------------------------------------------------ Hero */}
      <section ref={heroRef} className="int-hero" aria-labelledby="int-title">
        <div className="int-hero__media" aria-hidden="true">
          <div className="int-hero__scale" data-hero="media">
            <div className="hero__parallax" data-parallax="0.2">
              <SmartImage image={img.hero} priority sizes="100vw" alt="" />
            </div>
          </div>
        </div>
        <div className="int-hero__grid" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className="container int-hero__content">
          <p className="eyebrow" data-hero="fade">
            <span className="eyebrow__index">01</span>World of Interior Design
          </p>
          <RevealText as="h1" id="int-title" mode="hero" className="int-hero__title" text="Interior" />
          <span className="hero__rule" data-hero="rule" aria-hidden="true" />
          <div className="int-hero__foot">
            <RevealText as="p" mode="hero" className="int-hero__tagline" text="Spaces that tell a story." emphasis={['story.']} />
            <p className="int-hero__text" data-hero="fade">
              We transform spaces into meaningful expressions of beauty, comfort and individuality.
            </p>
          </div>
        </div>

        <nav className="chapter-nav" aria-label="Interior chapters" data-hero="fade">
          <p className="label">Chapters</p>
          <ol role="list">
            {chapters.map((c, i) => (
              <li key={c.id}>
                <AnchorLink href={`#${c.id}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {c.label}
                </AnchorLink>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {/* ------------------------------------------------------ Philosophy */}
      <section className="int-philosophy" aria-label="Our approach to interiors">
        <div className="container int-philosophy__inner">
          <p className="label" data-reveal="up">Philosophy</p>
          <RevealText
            as="p"
            mode="scrub"
            className="int-philosophy__text"
            text="Architecture gives a space its bones. Interiors give it a soul. We work between the two — shaping proportion, light and material into rooms that feel inevitable."
          />
        </div>
      </section>

      {/* ------------------------------------ Residential & Commercial */}
      <section id="residential" className="int-sector" aria-labelledby="residential-title">
        <div className="container">
          <SectionIntro index="I" eyebrow="Residential Interiors" id="residential-title" title={'Homes with\na point of view.'} emphasis={['point']}>
            <p>
              From family residences to city apartments, we shape homes around the people who live in them — their
              rituals, collections and the light they wake to.
            </p>
          </SectionIntro>
          <div className="int-sector__grid">
            <Media image={img.residential[0]} ratio="16 / 10" parallax={0.1} sizes="(max-width: 900px) 100vw, 62vw" className="int-sector__a" />
            <Media image={img.residential[1]} ratio="4 / 5" sizes="(max-width: 900px) 50vw, 30vw" className="int-sector__b" delay={0.2} />
            <p className="int-sector__caption" data-reveal="up">
              <span className="label">Exteriors & entries</span>
              Timber, render and glass in quiet dialogue — the first impression of every home we design.
            </p>
          </div>
        </div>
      </section>

      <section id="commercial" className="int-sector int-sector--reverse" aria-labelledby="commercial-title">
        <div className="container">
          <SectionIntro index="II" eyebrow="Commercial Interiors" id="commercial-title" title={'Spaces that\nwork beautifully.'} emphasis={['beautifully.']}>
            <p>
              Workplaces, hospitality and retail environments designed to express a brand and elevate the people
              within it — practical in every detail, memorable in every room.
            </p>
          </SectionIntro>
          <div className="int-commercial">
            {img.commercial.map((im, i) => (
              <figure key={im.src} className="int-commercial__item hover-zoom">
                <Media image={im} ratio={i === 0 ? '4 / 5' : '3 / 4'} sizes="(max-width: 760px) 100vw, 33vw" delay={i * 0.12} />
                <figcaption>
                  <span className="label">0{i + 1}</span>
                  {['Studio & Workplace', 'Corporate Interiors', 'Hospitality Lounges'][i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Room chapters */}
      {rooms.map((room, ri) => (
        <section key={room.id} id={room.id} className={`room room--${ri % 2 ? 'right' : 'left'}`} aria-labelledby={`${room.id}-title`}>
          <div className="container room__grid">
            <div className="room__text">
              <div className="room__sticky">
                <p className="room__index" data-reveal="up" aria-hidden="true">
                  {room.index}
                </p>
                <p className="eyebrow" data-reveal="up">
                  Chapter {room.index}
                </p>
                <RevealText as="h2" id={`${room.id}-title`} className="room__title" text={room.title} />
                <p className="room__lede" data-reveal="up">
                  {room.lede}
                </p>
                <p className="room__body" data-reveal="up">
                  {room.text}
                </p>
                <ul role="list" className="room__notes" data-reveal="stagger">
                  {room.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="room__images">
              <Media image={room.images[0]} ratio="4 / 5" parallax={0.08} sizes="(max-width: 900px) 100vw, 55vw" className="room__img room__img--main" />
              <Media image={room.images[1]} ratio="1 / 1" sizes="(max-width: 900px) 60vw, 28vw" className="room__img room__img--b" delay={0.1} />
              <Media image={room.images[2]} ratio="3 / 4" sizes="(max-width: 900px) 60vw, 24vw" className="room__img room__img--c" delay={0.2} />
            </div>
          </div>
        </section>
      ))}

      {/* -------------------------------------------- Architectural details */}
      <section id="details" className="int-details" aria-labelledby="details-title">
        <div className="container">
          <SectionIntro index="VI" eyebrow="Architectural Details" id="details-title" title={'The beauty is\nin the junction.'} emphasis={['junction.']}>
            <p>
              The meeting of two materials. The shadow line beneath a stair. The angle of a facade against the sky. We
              obsess over the details most people only feel.
            </p>
          </SectionIntro>
        </div>
        <div className="int-details__strip">
          {img.details.map((im, i) => (
            <figure key={im.src} className="int-details__item hover-zoom">
              <Media image={im} sizes="(max-width: 760px) 85vw, 34vw" delay={i * 0.12} />
              <figcaption>
                <span className="label">Detail 0{i + 1}</span>
                {['Folded planes', 'Suspended stair', 'Vertical rhythm'][i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ----------------------------------------- Furniture & decoration */}
      <section id="furniture" className="int-furniture" aria-labelledby="furniture-title">
        <div className="container">
          <SectionIntro index="VII" eyebrow="Furniture & Decoration" id="furniture-title" title={'Objects chosen\nto be lived with.'} emphasis={['lived']}>
            <p>
              Collected, commissioned and carefully placed — pieces with presence that bring warmth, character and
              craft to every room.
            </p>
          </SectionIntro>
          <ul role="list" className="int-furniture__grid">
            {furniture.map((f, i) => (
              <li key={f.name} className="int-furniture__item hover-zoom">
                <Media image={f.image} ratio="3 / 4" sizes="(max-width: 760px) 50vw, 25vw" delay={i * 0.08} />
                <p className="int-furniture__meta">
                  <span className="int-furniture__no">N° {String(i + 1).padStart(2, '0')}</span>
                  <span className="int-furniture__name">{f.name}</span>
                  <span className="label">{f.type}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------- Inspiration */}
      <section id="inspiration" className="int-gallery" aria-labelledby="inspiration-title">
        <div className="container">
          <SectionIntro index="VIII" eyebrow="Interior Inspiration" id="inspiration-title" title={'An archive\nof atmospheres.'} emphasis={['atmospheres.']}>
            <p>Select any image to view it in full.</p>
          </SectionIntro>
          <Gallery items={gallery} layout="masonry" />
          <div className="section-cta" data-reveal="up">
            <Button to="/contact">Begin an interior project</Button>
          </div>
        </div>
      </section>

      <NextWorld to="/fashion" title="Fashion" kicker="02" image={images.fashion.editorial} />
      <ContactSection id="interior-contact" />
    </div>
  );
}
