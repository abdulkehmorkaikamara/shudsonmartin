import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { brand, navItems } from '../data/brand';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        // Tuck the header away while reading downward, bring it back on any upward scroll.
        setHidden(y > window.innerHeight * 0.9 && y > last + 4);
        if (y < last - 4 || y < 80) setHidden(false);
        last = y;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={['site-header', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-menu-open']
          .filter(Boolean)
          .join(' ')}
      >
        <div className="site-header__inner">
          <Link to="/" className="wordmark" aria-label={`${brand.name} — home`}>
            <span className="wordmark__text">{brand.wordmark}</span>
            <span className="wordmark__est">Est. {brand.established}</span>
          </Link>

          <nav className="primary-nav" aria-label="Primary">
            <ul role="list">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === '/'} className="nav-link">
                    <span className="nav-link__roll">
                      <span className="nav-link__text">{item.label}</span>
                      <span className="nav-link__text nav-link__text--hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={`menu-toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="menu-toggle__label">{open ? 'Close' : 'Menu'}</span>
            <span className="menu-toggle__lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={close} />}</AnimatePresence>
    </>
  );
}
