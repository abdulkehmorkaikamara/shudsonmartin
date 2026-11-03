import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { imageSrcSet, imageUrl } from '../data/images';
import type { GalleryItem } from './Gallery';

type Props = {
  items: GalleryItem[];
  index: number | null;
  onChange: (i: number | null) => void;
};

/** Accessible full-screen viewer for gallery images (Esc to close, ← → to browse). */
export function Lightbox({ items, index, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const item = open ? items[index] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.classList.add('is-locked');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, go, onChange]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.target === e.currentTarget && onChange(null)}
        >
          <button ref={closeRef} type="button" className="lightbox__close" onClick={() => onChange(null)}>
            Close <span aria-hidden="true">✕</span>
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              className="lightbox__figure"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={imageUrl(item.img, 1600, 80)} srcSet={imageSrcSet(item.img)} sizes="90vw" alt={item.img.alt} />
              <figcaption>
                <span className="label">{item.category}</span>
                <span className="lightbox__title">{item.title}</span>
                <span className="lightbox__count">
                  {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
            ←
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next image">
            →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
