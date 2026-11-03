import { createElement, Fragment } from 'react';

type Props = {
  /** Use "\n" to force line breaks. */
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'blockquote';
  className?: string;
  id?: string;
  /** Animate on scroll (default), as part of a hero intro, or scrub brightness with scroll. */
  mode?: 'scroll' | 'hero' | 'scrub' | 'none';
  delay?: number;
  /** Words to render in italics (matched case-insensitively, punctuation ignored). */
  emphasis?: string[];
};

const clean = (w: string) => w.replace(/[^\p{L}\p{N}']/gu, '').toLowerCase();

/** Splits text into masked words for elegant line-by-line reveals, while staying readable to screen readers. */
export function RevealText({ text, as = 'h2', className, id, mode = 'scroll', delay, emphasis = [] }: Props) {
  const em = emphasis.map(clean);
  const lines = text.split('\n');

  const attrs: Record<string, unknown> = { className: ['rt', className].filter(Boolean).join(' '), id };
  if (mode === 'scroll') attrs['data-reveal'] = 'text';
  if (mode === 'scrub') attrs['data-reveal'] = 'scrub';
  if (mode === 'hero') attrs['data-hero'] = 'text';
  if (delay) attrs['data-delay'] = delay;

  return createElement(
    as,
    attrs,
    <>
      <span className="visually-hidden">{text.replace(/\n/g, ' ')}</span>
      <span aria-hidden="true">
        {lines.map((line, li) => (
          <span className="rt-line" key={li}>
            {line.split(' ').map((word, wi, arr) => (
              <Fragment key={wi}>
                <span className="rt-mask">
                  <span className={`rt-word${em.includes(clean(word)) ? ' rt-word--em' : ''}`}>{word}</span>
                </span>
                {wi < arr.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </>,
  );
}
