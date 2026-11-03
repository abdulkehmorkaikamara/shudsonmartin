import { ReactNode } from 'react';
import { RevealText } from './RevealText';

type Props = {
  index?: string;
  eyebrow: string;
  title: string;
  id?: string;
  children?: ReactNode;
  align?: 'split' | 'stack' | 'center';
  emphasis?: string[];
  className?: string;
};

/** Consistent section opening: number + eyebrow, large display title, optional supporting copy. */
export function SectionIntro({ index, eyebrow, title, id, children, align = 'split', emphasis, className }: Props) {
  return (
    <header className={['section-intro', `section-intro--${align}`, className].filter(Boolean).join(' ')}>
      <div className="section-intro__head">
        <p className="eyebrow" data-reveal="up">
          {index && <span className="eyebrow__index">{index}</span>}
          {eyebrow}
        </p>
        <RevealText as="h2" id={id} className="section-intro__title" text={title} emphasis={emphasis} />
      </div>
      {children && (
        <div className="section-intro__body" data-reveal="up" data-delay={0.15}>
          {children}
        </div>
      )}
    </header>
  );
}
