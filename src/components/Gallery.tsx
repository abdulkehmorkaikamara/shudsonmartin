import { useState } from 'react';
import { SiteImage } from '../data/images';
import { Lightbox } from './Lightbox';
import { Media } from './Media';

export type GalleryItem = { img: SiteImage; title: string; category: string };

type Props = {
  items: GalleryItem[];
  /** "masonry" flows in columns; "mosaic" uses an art-directed rhythm of wide and tall tiles. */
  layout?: 'masonry' | 'mosaic';
  className?: string;
};

const MASONRY_RATIOS = ['4 / 5', '1 / 1', '3 / 4', '4 / 3', '2 / 3', '5 / 4'];

/** Image gallery that opens each photograph in a lightbox. */
export function Gallery({ items, layout = 'masonry', className }: Props) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ul role="list" className={['gallery', `gallery--${layout}`, className].filter(Boolean).join(' ')}>
        {items.map((item, idx) => (
          <li key={`${item.img.src}-${idx}`} className="gallery__item">
            <button
              type="button"
              className="gallery__button hover-zoom"
              onClick={() => setActive(idx)}
              aria-label={`View ${item.title} — ${item.category}`}
            >
              <Media
                image={item.img}
                ratio={layout === 'masonry' ? MASONRY_RATIOS[idx % MASONRY_RATIOS.length] : undefined}
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              <span className="gallery__caption">
                <span className="label">{item.category}</span>
                <span className="gallery__title">{item.title}</span>
              </span>
              <span className="gallery__plus" aria-hidden="true">+</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={active} onChange={setActive} />
    </>
  );
}
