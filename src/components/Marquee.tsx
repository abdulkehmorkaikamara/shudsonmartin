/** Slow, continuous typographic ticker. Pauses under reduced-motion. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const run = (hidden: boolean) => (
    <div className="marquee__run" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <span className="marquee__dot" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={['marquee', className].filter(Boolean).join(' ')}>
      <div className="marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
