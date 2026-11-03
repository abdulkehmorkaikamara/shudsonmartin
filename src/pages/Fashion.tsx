import { MouseEvent, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { images } from '../data/images';
import { AnchorLink, Button } from '../components/Button';
import { ContactSection } from '../components/ContactSection';
import { Gallery, GalleryItem } from '../components/Gallery';
import { Lightbox } from '../components/Lightbox';
import { Media } from '../components/Media';
import { NextWorld } from '../components/NextWorld';
import { RevealText } from '../components/RevealText';
import { SectionIntro } from '../components/SectionIntro';
import { SmartImage } from '../components/SmartImage';
import { useHeroIntro } from '../hooks/useHeroIntro';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { gsap } from '../lib/gsap';

const img = images.fashion;

const menswear = [
  { title: 'Summer Eyelet', note: 'Broderie, black & leather', image: img.men[0] },
  { title: 'Eyelet, Up Close', note: 'Texture in daylight', image: img.men[1] },
  { title: 'Blush & Crimson', note: 'Dressed for the evening', image: img.men[2] },
];

const collections: (GalleryItem & { no: string; season: string; text: string })[] = [
  { no: 'I', title: 'Gilded Evening', season: 'Evening', category: 'Collection', text: 'Sequins, gold appliqué and a sweeping train.', img: img.collections[0] },
  { no: 'II', title: 'Saffron Hours', season: 'Occasion', category: 'Collection', text: 'Warm wool, wide sleeves and gold embroidery.', img: img.collections[1] },
  { no: 'III', title: 'Print in Motion', season: 'Signature Print', category: 'Collection', text: 'Bold print, cut with volume and drama.', img: img.collections[2] },
  { no: 'IV', title: 'Blush Architecture', season: 'Day to Evening', category: 'Collection', text: 'Asymmetric hems and soft structure.', img: img.collections[3] },
];

const gallery: GalleryItem[] = [
  { img: img.women[3], title: 'Jewel Stripe', category: 'Womenswear' },
  { img: img.women[1], title: 'Fuchsia & Flame', category: 'Evening' },
  { img: img.contemporary[0], title: 'Print, Sculpted', category: 'Contemporary' },
  { img: img.contemporary[2], title: 'Blush in Bloom', category: 'Contemporary' },
  { img: img.women[2], title: 'Magenta Cape', category: 'Womenswear' },
  { img: img.collections[3], title: 'Blush Architecture', category: 'Day to Evening' },
  { img: img.men[2], title: 'Blush & Crimson', category: 'Menswear' },
  { img: img.collections[1], title: 'Saffron Hours', category: 'Occasion' },
  // Last tile spans the full row, so it takes the landscape portrait.
  { img: img.men[1], title: 'Eyelet, Up Close', category: 'Menswear' },
];

export default function Fashion() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const hScrollRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  usePageMeta(
    'Fashion',
    "ShudsonMartin Fashion — an editorial world of men's and women's fashion, contemporary style, collections and inspiration.",
  );
  useHeroIntro(heroRef);
  useScrollAnimations(pageRef);

  // Menswear: pinned horizontal travel on larger screens, native swipe on touch/small screens.
  useLayoutEffect(() => {
    const section = hScrollRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={pageRef} className="fashion theme-fashion">
      {/* ------------------------------------------------------- Cover */}
      <section ref={heroRef} className="fa-cover" aria-labelledby="fa-title">
        <div className="fa-cover__meta container" data-hero="fade">
          <span>N° 02</span>
          <span>The Fashion Issue</span>
          <span>ShudsonMartin</span>
        </div>

        <div className="fa-cover__image" aria-hidden="true">
          <div className="fa-cover__scale" data-hero="media">
            <SmartImage image={img.hero} priority sizes="(max-width: 900px) 100vw, 50vw" alt="" />
          </div>
        </div>

        <div className="fa-cover__content container">
          <RevealText as="h1" id="fa-title" mode="hero" className="fa-cover__title" text="Fashion" />
          <div className="fa-cover__lines">
            <RevealText as="p" mode="hero" className="fa-cover__headline" text={'Style without\nboundaries.'} emphasis={['boundaries.']} />
            <span className="hero__rule" data-hero="rule" aria-hidden="true" />
            <p className="fa-cover__text" data-hero="fade">
              Discover fashion as an expression of identity, creativity and confidence.
            </p>
            <ul role="list" className="fa-cover__contents" data-hero="fade">
              <li><AnchorLink href="#menswear"><span>p.04</span> Menswear</AnchorLink></li>
              <li><AnchorLink href="#womenswear"><span>p.12</span> Womenswear</AnchorLink></li>
              <li><AnchorLink href="#contemporary"><span>p.20</span> Contemporary</AnchorLink></li>
              <li><AnchorLink href="#collections"><span>p.28</span> Collections</AnchorLink></li>
            </ul>
          </div>
        </div>
        <p className="fa-cover__vertical" aria-hidden="true" data-hero="fade">
          Identity · Creativity · Confidence
        </p>
      </section>

      {/* ------------------------------------------------- Editor's letter */}
      <section className="fa-letter" aria-labelledby="letter-title">
        <div className="container fa-letter__grid">
          <p className="eyebrow" data-reveal="up">
            <span className="eyebrow__index">Editor's Letter</span>
          </p>
          <div>
            <RevealText as="h2" id="letter-title" className="fa-letter__title" text={'Clothing is the first\nthing we say.'} emphasis={['first']} />
            <div className="fa-letter__body" data-reveal="stagger">
              <p className="dropcap">
                Before a word is spoken, what we wear has already begun the conversation. At ShudsonMartin we see fashion
                as authorship — a way of writing identity in fabric, line and colour.
              </p>
              <p>
                Our fashion world moves between sharp tailoring and soft volume, between the codes of the city and the
                ease of the everyday. It is less about trends and more about conviction: wearing what feels true, and
                wearing it well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- Menswear (horizontal) */}
      <section id="menswear" ref={hScrollRef} className="fa-men" aria-labelledby="men-title">
        <div ref={trackRef} className="fa-men__track">
          <div className="fa-men__intro">
            <p className="eyebrow">
              <span className="eyebrow__index">p.04</span>Men's Fashion
            </p>
            <h2 id="men-title" className="fa-men__title">
              The modern <em>gentleman</em>
            </h2>
            <p className="fa-men__text">
              Broderie, colour and statement details — worn with the ease that only comes from confidence.
            </p>
            <p className="fa-men__hint" aria-hidden="true">
              Browse the looks →
            </p>
          </div>
          {menswear.map((m, i) => (
            <figure key={m.title} className="fa-men__card hover-zoom">
              <Media image={m.image} ratio="3 / 4" reveal={false} sizes="(max-width: 900px) 78vw, 30vw" />
              <figcaption>
                <span className="fa-men__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="fa-men__name">{m.title}</span>
                <span className="label">{m.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------- Womenswear spread */}
      <section id="womenswear" className="fa-women" aria-labelledby="women-title">
        <div className="container">
          <SectionIntro index="p.12" eyebrow="Women's Fashion" id="women-title" title={'Grace, with\na little edge.'} emphasis={['edge.']}>
            <p>Romance and rigour in equal measure — fluid silhouettes, rich embroidery and colour used with intent.</p>
          </SectionIntro>
          <div className="fa-spread">
            <Media image={img.women[0]} ratio="3 / 4" parallax={0.1} sizes="(max-width: 900px) 100vw, 50vw" className="fa-spread__main" />
            <div className="fa-spread__side">
              <blockquote className="fa-quote" data-reveal="up">
                “Elegance is not about being noticed. It is about being <em>remembered</em>.”
              </blockquote>
              <div className="fa-spread__pair">
                <Media image={img.women[1]} ratio="2 / 3" sizes="(max-width: 900px) 50vw, 22vw" delay={0.1} />
                <Media image={img.women[2]} ratio="2 / 3" sizes="(max-width: 900px) 50vw, 22vw" delay={0.2} />
              </div>
              <p className="fa-spread__caption" data-reveal="up">
                <span className="label">Featured</span> Fuchsia satin over flame orange, and a magenta cape-dress — two moods, one wardrobe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Contemporary (light) */}
      <section id="contemporary" className="fa-contemporary" aria-labelledby="contemporary-title">
        <div className="container">
          <div className="fa-contemporary__head">
            <p className="eyebrow" data-reveal="up">
              <span className="eyebrow__index">p.20</span>Contemporary Style
            </p>
            <RevealText as="h2" id="contemporary-title" className="fa-contemporary__title" text={'Now, worn\nwell.'} emphasis={['well.']} />
            <p data-reveal="up">
              Heritage print meets considered design: sculpted volume, soft pastels and pieces that move between
              occasions without effort.
            </p>
          </div>
          <div className="fa-contemporary__grid">
            {img.contemporary.map((im, i) => (
              <figure key={im.src} className={`fa-contemporary__item fa-contemporary__item--${i + 1} hover-zoom`}>
                <Media image={im} ratio="3 / 4" sizes="(max-width: 760px) 100vw, 33vw" delay={i * 0.12} />
                <figcaption>
                  <span>{['Print, Sculpted', 'The Timber Throne', 'Blush in Bloom'][i]}</span>
                  <span className="label">Look 0{i + 1}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Collections */}
      <Collections />

      {/* ------------------------------------------------- Inspiration */}
      <section className="fa-inspire" aria-labelledby="inspire-title">
        <div className="fa-inspire__media" aria-hidden="true">
          <Media image={img.editorial} parallax={0.25} reveal={false} zoom={false} sizes="100vw" alt="" />
        </div>
        <div className="container fa-inspire__inner">
          <p className="eyebrow" data-reveal="up">
            <span className="eyebrow__index">p.36</span>Fashion Inspiration
          </p>
          <RevealText as="h2" id="inspire-title" className="fa-inspire__title" text={'Inspired by cities,\ncinema, craft\nand character.'} emphasis={['character.']} />
          <p className="fa-inspire__text" data-reveal="up">
            We look to architecture for structure, to film for mood and to the people around us for the way clothes are
            truly lived in.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- Gallery */}
      <section className="fa-gallery" aria-labelledby="fa-gallery-title">
        <div className="container">
          <SectionIntro index="p.40" eyebrow="Fashion Gallery" id="fa-gallery-title" title={'The editorial\narchive.'} emphasis={['archive.']}>
            <p>Select any look to view it in full.</p>
          </SectionIntro>
          <Gallery items={gallery} layout="mosaic" />
          <div className="section-cta" data-reveal="up">
            <Button to="/contact">Collaborate with us</Button>
          </div>
        </div>
      </section>

      <NextWorld to="/lifestyle" title="Lifestyle" kicker="03" image={images.lifestyle.living[1]} />
      <ContactSection id="fashion-contact" />
    </div>
  );
}

/** Index of collections — a floating preview follows the cursor on desktop; thumbnails show inline on touch. */
function Collections() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 24, mass: 0.6 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section id="collections" className="fa-collections" aria-labelledby="collections-title">
      <div className="container">
        <SectionIntro index="p.28" eyebrow="Editorial Collections" id="collections-title" title={'Four stories,\ntold in cloth.'} emphasis={['cloth.']} />
        <div className="fa-collections__list" onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
          <ul role="list" data-reveal="stagger">
            {collections.map((c, i) => (
              <li key={c.title}>
                <button
                  type="button"
                  className={`fa-collection${hovered !== null && hovered !== i ? ' is-dim' : ''}`}
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setActive(i)}
                  aria-label={`View collection ${c.no}: ${c.title}`}
                >
                  <span className="fa-collection__no">{c.no}</span>
                  <span className="fa-collection__thumb" aria-hidden="true">
                    <SmartImage image={c.img} sizes="120px" alt="" />
                  </span>
                  <span className="fa-collection__title">{c.title}</span>
                  <span className="fa-collection__text">{c.text}</span>
                  <span className="fa-collection__season label">{c.season}</span>
                </button>
              </li>
            ))}
          </ul>

          <motion.div className="fa-collections__preview" style={{ x: sx, y: sy }} aria-hidden="true">
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  className="fa-collections__preview-inner"
                  initial={{ opacity: 0, scale: 0.85, clipPath: 'inset(15% 15% 15% 15%)' }}
                  animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SmartImage image={collections[hovered].img} sizes="320px" alt="" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <Lightbox items={collections} index={active} onChange={setActive} />
    </section>
  );
}
