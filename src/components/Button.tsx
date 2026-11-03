import { MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'solid' | 'outline' | 'text';

type Props = {
  children: ReactNode;
  /** Internal route ("/fashion"), in-page anchor ("#worlds"), or external/tel/mailto URL. */
  to: string;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
  external?: boolean;
};

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 10" width="24" height="10" aria-hidden="true">
      <path d="M0 5h22M18 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Scroll smoothly to an in-page anchor without changing route. */
export function scrollToAnchor(hash: string) {
  const el = document.querySelector(hash);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

export function Button({ children, to, variant = 'solid', className, arrow = true, onClick, ariaLabel, external }: Props) {
  const cls = ['btn', `btn--${variant}`, className].filter(Boolean).join(' ');
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (to.startsWith('#')) {
    return (
      <a
        href={to}
        className={cls}
        aria-label={ariaLabel}
        onClick={(e) => {
          e.preventDefault();
          scrollToAnchor(to);
          onClick?.(e);
        }}
      >
        {inner}
      </a>
    );
  }

  if (external || /^(https?:|mailto:|tel:)/.test(to)) {
    const newTab = to.startsWith('http');
    return (
      <a
        href={to}
        className={cls}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link to={to} className={cls} aria-label={ariaLabel} onClick={onClick}>
      {inner}
    </Link>
  );
}

/** Plain in-page link that scrolls smoothly (respecting reduced motion) instead of jumping. */
export function AnchorLink({ href, className, children }: { href: `#${string}`; className?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToAnchor(href);
      }}
    >
      {children}
    </a>
  );
}
