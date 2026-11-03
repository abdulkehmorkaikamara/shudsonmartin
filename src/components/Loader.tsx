import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { brand } from '../data/brand';
import { imageUrl, images } from '../data/images';

const MIN_DURATION = 1700;
const MAX_DURATION = 4500;

/** First-visit loading sequence: waits for fonts and the hero photograph, then lifts away. */
export function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();
    let assetsReady = false;

    const heroImg = new Image();
    heroImg.src = imageUrl(images.home.hero, 1920);
    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((res) => {
        heroImg.onload = res;
        heroImg.onerror = res;
      }),
    ]).then(() => {
      assetsReady = true;
    });

    let frame = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const min = reduce ? 300 : MIN_DURATION;
      const timeShare = Math.min(elapsed / min, 1);
      const target = assetsReady || elapsed > MAX_DURATION ? timeShare : Math.min(timeShare, 0.86);
      setProgress((p) => p + (target - p) * 0.12);

      if (target >= 1 && !doneRef.current) {
        doneRef.current = true;
        setProgress(1);
        window.setTimeout(onDone, reduce ? 0 : 350);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  const pct = Math.round(progress * 100);

  return (
    <motion.div
      className="loader"
      role="status"
      aria-live="polite"
      aria-label="Loading ShudsonMartin"
      exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="loader__inner">
        <motion.p
          className="loader__eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.9 } }}
        >
          Interior · Fashion · Lifestyle
        </motion.p>
        <p className="loader__mark" aria-hidden="true">
          {brand.wordmark.split('').map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%' }}
              animate={{ y: '0%', transition: { delay: 0.1 + i * 0.04, duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
            >
              {ch}
            </motion.span>
          ))}
        </p>
        <div className="loader__bar" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <p className="loader__meta">
          <span>Est. {brand.established}</span>
          <span className="loader__count">{String(pct).padStart(3, '0')}</span>
        </p>
      </div>
    </motion.div>
  );
}
