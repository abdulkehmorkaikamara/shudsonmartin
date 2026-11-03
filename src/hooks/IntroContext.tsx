import { createContext, useContext } from 'react';

export type IntroState = {
  /** True once the first-visit loader has finished. */
  ready: boolean;
  /** Seconds a hero should wait so its entrance lands just as the loader or page curtain clears. */
  heroDelay: number;
};

export const IntroContext = createContext<IntroState>({ ready: true, heroDelay: 0.8 });

export const useIntro = () => useContext(IntroContext);
