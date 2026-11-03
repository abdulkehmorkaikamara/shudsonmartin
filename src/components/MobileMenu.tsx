import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { brand, emailHref, emailLabel, navItems, mapsHref } from '../data/brand';
import { images } from '../data/images';
import { SmartImage } from './SmartImage';

const ease = [0.76, 0, 0.24, 1] as const;

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('is-locked');
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Keep keyboard focus inside the open menu (the header toggle stays reachable).
      if (e.key === 'Tab' && panelRef.current) {
        const toggle = document.querySelector<HTMLElement>('.menu-toggle');
        const focusables = [
          ...(toggle ? [toggle] : []),
          ...panelRef.current.querySelectorAll<HTMLElement>('a, button'),
        ];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      id="mobile-menu"
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      ref={panelRef}
      initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      animate={{ clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9, ease } }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.7, ease, delay: 0.15 } }}
    >
      <div className="mobile-menu__media" aria-hidden="true">
        <SmartImage image={images.home.worldInterior} sizes="40vw" alt="" />
      </div>

      <div className="mobile-menu__body">
        <nav aria-label="Mobile">
          <ul role="list" className="mobile-menu__list">
            {navItems.map((item, idx) => (
              <li key={item.to} className="mobile-menu__item">
                <motion.span
                  className="mobile-menu__mask"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 + idx * 0.06 } }}
                  exit={{ y: '-110%', transition: { duration: 0.45, ease, delay: idx * 0.02 } }}
                >
                  <NavLink to={item.to} end={item.to === '/'} className="mobile-menu__link" onClick={onClose}>
                    <span className="mobile-menu__index">0{idx + 1}</span>
                    {item.label}
                  </NavLink>
                </motion.span>
              </li>
            ))}
          </ul>
        </nav>

        <motion.div
          className="mobile-menu__meta"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <div>
            <p className="label">Visit</p>
            <p>
              <a href={mapsHref} target="_blank" rel="noopener noreferrer">
                {brand.address.line1}
              </a>
            </p>
          </div>
          <div>
            <p className="label">Call</p>
            {brand.phones.map((p) => (
              <a key={p.href} href={p.href} className="link-underline">
                {p.display}
              </a>
            ))}
          </div>
          <div>
            <p className="label">Write</p>
            <a href={emailHref()} className="link-underline">
              {emailLabel()}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
