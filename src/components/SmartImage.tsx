import { CSSProperties, useState } from 'react';
import { fallbackImage, imageSrcSet, imageUrl, SiteImage } from '../data/images';

type Props = {
  image: SiteImage;
  /** Responsive sizes hint, e.g. "(max-width: 760px) 100vw, 50vw". */
  sizes?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  className?: string;
  /** Override alt — pass "" for purely decorative usage. */
  alt?: string;
};

/** Responsive image with srcset, lazy loading and a two-step fallback (backup photo → tonal block). */
export function SmartImage({ image, sizes = '100vw', priority = false, className, alt }: Props) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [loaded, setLoaded] = useState(false);
  const current = stage === 0 ? image : fallbackImage;

  const style: CSSProperties | undefined = image.focus ? { objectPosition: image.focus } : undefined;
  const classes = ['smart-img', loaded && 'is-loaded', className].filter(Boolean).join(' ');

  if (stage === 2) {
    return <span className={`smart-img smart-img--fallback ${className ?? ''}`} role="img" aria-label={alt ?? image.alt} />;
  }

  return (
    <img
      className={classes}
      src={imageUrl(current, 1600)}
      srcSet={imageSrcSet(current)}
      sizes={sizes}
      alt={alt ?? image.alt}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // React warns on camelCase fetchPriority in 18.3; lowercase passes through to the DOM.
      {...{ fetchpriority: priority ? 'high' : 'auto' }}
      onLoad={() => setLoaded(true)}
      onError={() => setStage((s) => (s === 0 && image.src !== fallbackImage.src ? 1 : 2))}
    />
  );
}
