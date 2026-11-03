import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.76, 0, 0.24, 1] as const;
const SHOWN = 'inset(0% 0% 0% 0%)';
const HIDDEN_TOP = 'inset(0% 0% 100% 0%)';
const HIDDEN_BOTTOM = 'inset(100% 0% 0% 0%)';

/**
 * Wraps each route. On exit an ink curtain rises over the page;
 * on enter it lifts away to reveal the new page beneath, labelled with its name.
 */
export function PageTransition({ children, label }: { children: ReactNode; label: string }) {
  const reduce = useReducedMotion();
  const d = (s: number) => (reduce ? 0 : s);

  return (
    <motion.div className="page" initial="initial" animate="enter" exit="exit">
      {children}

      {/* Covers the outgoing page */}
      <motion.div
        className="curtain"
        aria-hidden="true"
        variants={{
          initial: { clipPath: HIDDEN_BOTTOM },
          enter: { clipPath: HIDDEN_BOTTOM },
          exit: { clipPath: SHOWN, transition: { duration: d(0.75), ease } },
        }}
      >
        <span className="curtain__accent" />
      </motion.div>

      {/* Reveals the incoming page */}
      <motion.div
        className="curtain"
        aria-hidden="true"
        variants={{
          initial: { clipPath: SHOWN },
          enter: { clipPath: HIDDEN_TOP, transition: { duration: d(1), ease, delay: d(0.35) } },
          exit: { clipPath: HIDDEN_TOP },
        }}
      >
        <motion.span
          className="curtain__label"
          variants={{
            initial: { opacity: 0, y: 24 },
            enter: {
              opacity: reduce ? 0 : [0, 1, 1, 0],
              y: reduce ? 0 : [24, 0, 0, -24],
              transition: { duration: d(1.1), times: [0, 0.35, 0.6, 1], ease: 'easeOut' },
            },
          }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
