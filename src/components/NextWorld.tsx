import { Link } from 'react-router-dom';
import { SiteImage } from '../data/images';
import { Arrow } from './Button';
import { SmartImage } from './SmartImage';

/** Oversized "continue to the next world" link that closes each category page. */
export function NextWorld({ to, title, kicker, image }: { to: string; title: string; kicker: string; image: SiteImage }) {
  return (
    <section className="next-world" aria-label={`Continue to ${title}`}>
      <Link to={to} className="next-world__link hover-zoom">
        <span className="next-world__media" aria-hidden="true">
          <SmartImage image={image} sizes="100vw" alt="" />
        </span>
        <span className="next-world__content container">
          <span className="eyebrow">Next world — {kicker}</span>
          <span className="next-world__title">
            {title}
            <Arrow />
          </span>
        </span>
      </Link>
    </section>
  );
}
