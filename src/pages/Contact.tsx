import { FormEvent, useRef, useState } from 'react';
import { brand, emailHref, emailLabel, mapsHref, mapsEmbedSrc } from '../data/brand';
import { images } from '../data/images';
import { Arrow } from '../components/Button';
import { Media } from '../components/Media';
import { RevealText } from '../components/RevealText';
import { useHeroIntro } from '../hooks/useHeroIntro';
import { usePageMeta } from '../hooks/usePageMeta';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

const topics = ['Interior Design', 'Fashion', 'Lifestyle', 'Collaboration', 'Something else'];

export default function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);

  usePageMeta(
    'Contact',
    `Contact ShudsonMartin — ${brand.address.line1}. Call ${brand.phones.map((p) => p.display).join(' or ')}.`,
  );
  useHeroIntro(heroRef);
  useScrollAnimations(pageRef);

  // No server is connected yet, so the form composes an email in the visitor's mail app.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const contact = String(data.get('reply') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = encodeURIComponent(`${topic} enquiry — ${name || 'ShudsonMartin'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${contact}`);
    window.location.href = `mailto:${brand.email.address ?? ''}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div ref={pageRef} className="contact-page">
      <section ref={heroRef} className="page-hero page-hero--contact" aria-labelledby="contact-title">
        <div className="container page-hero__inner">
          <p className="eyebrow" data-hero="fade">
            <span className="eyebrow__index">Contact</span>
            {brand.name}
          </p>
          <RevealText as="h1" id="contact-title" mode="hero" className="page-hero__title" text={"LET'S CREATE\nSOMETHING\nEXTRAORDINARY."} emphasis={['extraordinary.']} />
          <span className="hero__rule" data-hero="rule" aria-hidden="true" />
        </div>
      </section>

      <section className="contact-main" aria-label="Contact details and enquiry form">
        <div className="container contact-main__grid">
          <div className="contact-details" data-reveal="stagger">
            <div className="contact-details__row">
              <p className="label">Studio</p>
              <address className="contact-details__value">
                {brand.name}
                <br />
                {brand.address.line1}
                <br />
                <span className="contact-details__city">{brand.address.city}</span>
              </address>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="contact-details__directions link-underline">
                Get directions →
              </a>
            </div>
            <div className="contact-details__row">
              <p className="label">Telephone</p>
              {brand.phones.map((p) => (
                <a key={p.href} href={p.href} className="contact-details__value link-underline">
                  {p.display}
                </a>
              ))}
            </div>
            <div className="contact-details__row">
              <p className="label">Email</p>
              <a href={emailHref()} className="contact-details__value contact-details__email link-underline">
                {emailLabel()}
              </a>
            </div>
            <div className="contact-details__row">
              <p className="label">Follow</p>
              <ul role="list" className="contact-details__socials">
                {brand.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <Media image={images.home.storyDetail} ratio="16 / 10" className="contact-details__img" sizes="(max-width: 900px) 100vw, 40vw" />
          </div>

          <form className="enquiry" onSubmit={onSubmit} data-reveal="up">
            <h2 className="enquiry__title">Start a conversation</h2>
            <fieldset className="enquiry__topics">
              <legend className="label">I'm interested in</legend>
              {topics.map((t) => (
                <label key={t} className={`chip${topic === t ? ' is-active' : ''}`}>
                  <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} />
                  {t}
                </label>
              ))}
            </fieldset>
            <div className="field">
              <input id="f-name" name="name" type="text" autoComplete="name" placeholder=" " required />
              <label htmlFor="f-name">Your name</label>
            </div>
            <div className="field">
              <input id="f-reply" name="reply" type="text" autoComplete="email" placeholder=" " required />
              <label htmlFor="f-reply">Email or telephone</label>
            </div>
            <div className="field">
              <textarea id="f-message" name="message" rows={5} placeholder=" " required />
              <label htmlFor="f-message">Tell us about your project</label>
            </div>
            <button type="submit" className="btn btn--solid">
              <span className="btn__label">Compose email</span>
              <Arrow />
            </button>
            <p className="enquiry__note" role="status">
              {sent
                ? 'Your email app should now be open with your message ready to send.'
                : 'Submitting opens your email app with this message prepared.'}
              {!brand.email.address && ' (Studio email address to be added.)'}
            </p>
          </form>
        </div>
      </section>

      <section className="studio-map" aria-labelledby="studio-map-title">
        <div className="container">
          <div className="studio-map__head">
            <p className="eyebrow" data-reveal="up">
              <span className="eyebrow__index">Visit</span>Find the studio
            </p>
            <h2 id="studio-map-title" className="studio-map__title" data-reveal="up">
              {brand.address.line1}, <em>{brand.address.city.split(',')[0]}</em>
            </h2>
          </div>
          <div className="studio-map__frame" data-reveal="up">
            <iframe
              title={`Map showing ${brand.name} at ${brand.address.line1}, ${brand.address.city}`}
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn btn--outline studio-map__cta" data-reveal="up">
            <span className="btn__label">Open in Google Maps</span>
            <Arrow />
          </a>
        </div>
      </section>
    </div>
  );
}
