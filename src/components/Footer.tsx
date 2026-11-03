import { Link } from 'react-router-dom';
import { brand, emailHref, emailLabel, mapsHref } from '../data/brand';

export function Footer() {
  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <p className="site-footer__tagline">
            Beyond design. Beyond style. <em>Beyond ordinary.</em>
          </p>
          <button type="button" className="back-to-top" onClick={toTop}>
            <span>Back to top</span>
            <svg viewBox="0 0 10 24" width="10" height="24" aria-hidden="true">
              <path d="M5 24V2M1 6l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <p className="label">Worlds</p>
            <ul role="list">
              <li><Link className="link-underline" to="/interior">Interior Design</Link></li>
              <li><Link className="link-underline" to="/fashion">Fashion</Link></li>
              <li><Link className="link-underline" to="/lifestyle">Lifestyle</Link></li>
            </ul>
          </div>
          <div className="site-footer__col">
            <p className="label">House</p>
            <ul role="list">
              <li><Link className="link-underline" to="/">Home</Link></li>
              <li><Link className="link-underline" to="/about">About</Link></li>
              <li><Link className="link-underline" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="site-footer__col">
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
            <ul role="list">
              {brand.phones.map((p) => (
                <li key={p.href}>
                  <a className="link-underline" href={p.href}>{p.display}</a>
                </li>
              ))}
              <li>
                <a className="link-underline" href={emailHref()}>{emailLabel()}</a>
              </li>
            </ul>
          </div>
          <div className="site-footer__col">
            <p className="label">Follow</p>
            <ul role="list">
              {brand.socials.map((s) => (
                <li key={s.label}>
                  <a className="link-underline" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="site-footer__wordmark" aria-hidden="true">
          {brand.wordmark}
        </p>

        <div className="site-footer__bottom">
          <p>© {brand.copyrightYear} {brand.name}. All Rights Reserved.</p>
          <p>Established {brand.established}</p>
          <p>Founded by {brand.founder}</p>
        </div>
      </div>
    </footer>
  );
}
