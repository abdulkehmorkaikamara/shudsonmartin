import { SiteImage } from '../data/images';
import { SmartImage } from './SmartImage';

type Props = {
  image: SiteImage;
  /** Aspect ratio such as "4 / 5". Omit to fill the parent. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Clip-path wipe on scroll. */
  reveal?: boolean;
  /** Parallax drift strength (0.1 – 0.3 reads best). */
  parallax?: number;
  /** Zoom the image when an ancestor `.hover-zoom` is hovered. */
  zoom?: boolean;
  className?: string;
  delay?: number;
  alt?: string;
};

/** Art-directed image frame: handles aspect ratio, reveal, parallax and hover zoom. */
export function Media({ image, ratio, sizes, priority, reveal = true, parallax, zoom = true, className, delay, alt }: Props) {
  return (
    <div
      className={['media', zoom && 'media--zoom', !ratio && 'media--fill', className].filter(Boolean).join(' ')}
      style={ratio ? { aspectRatio: ratio } : undefined}
      data-reveal={reveal ? 'image' : undefined}
      data-delay={delay}
    >
      <div className={parallax ? 'media__parallax' : 'media__inner'} data-parallax={parallax || undefined}>
        <SmartImage image={image} sizes={sizes} priority={priority} alt={alt} />
      </div>
    </div>
  );
}
