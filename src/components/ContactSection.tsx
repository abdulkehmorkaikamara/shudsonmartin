import { brand, emailHref, emailLabel, mapsHref } from '../data/brand';
import { images } from '../data/images';
import { Button } from './Button';
import { Media } from './Media';
import { RevealText } from './RevealText';

/** Shared "Let's create" block used on the homepage and category pages. */
export function ContactSection({ id = 'contact' }: { id?: string }) {
  return (
    <section className="contact-block" id={id} aria-labelledby={`${id}-title`}>
      <div className="contact-block__bg" aria-hidden="true">
        <Media image={images.home.contact} parallax={0.2} reveal={false} zoom={false} sizes="100vw" alt="" />
      </div>
      <div className="container contact-block__inner">
        <p className="eyebrow" data-reveal="up">Get in touch</p>
        <RevealText as="h2" id={`${id}-title`} className="contact-block__title" text={"LET'S CREATE\nSOMETHING\nEXTRAORDINARY."} emphasis={['extraordinary']} />

        <div className="contact-block__grid" data-reveal="stagger">
          <div>
            <p className="label">Studio</p>
            <address>
              {brand.name}
              <br />
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="link-underline">
                {brand.address.line1}
              </a>
              <br />
              {brand.address.city}
            </address>
          </div>
          <div>
            <p className="label">Telephone</p>
            {brand.phones.map((p) => (
              <a key={p.href} href={p.href} className="link-underline contact-block__big">
                {p.display}
              </a>
            ))}
          </div>
          <div>
            <p className="label">Email</p>
            <a href={emailHref()} className="link-underline contact-block__big contact-block__email">
              {emailLabel()}
            </a>
          </div>
          <div>
            <p className="label">Social</p>
            <ul role="list" className="social-list">
              {brand.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`}>
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="contact-block__actions" data-reveal="up">
          <Button to="/contact">Contact the studio</Button>
          <Button to={brand.phones[0].href} variant="outline">Call {brand.phones[0].display}</Button>
        </div>
      </div>
    </section>
  );
}
