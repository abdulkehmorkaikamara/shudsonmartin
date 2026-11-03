import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { PageTransition } from './components/PageTransition';
import { IntroContext } from './hooks/IntroContext';
import { ScrollTrigger } from './lib/gsap';
import Home from './pages/Home';
import Interior from './pages/Interior';
import Fashion from './pages/Fashion';
import Lifestyle from './pages/Lifestyle';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const LOADER_KEY = 'sm-intro-seen';

const routes = [
  { path: '/', label: 'ShudsonMartin', element: <Home /> },
  { path: '/interior', label: 'Interior', element: <Interior /> },
  { path: '/fashion', label: 'Fashion', element: <Fashion /> },
  { path: '/lifestyle', label: 'Lifestyle', element: <Lifestyle /> },
  { path: '/about', label: 'About', element: <About /> },
  { path: '/contact', label: 'Contact', element: <Contact /> },
];

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(LOADER_KEY) === '1';
  } catch {
    return false;
  }
}

export default function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(() => !hasSeenIntro());
  const [ready, setReady] = useState(() => hasSeenIntro());
  // With the loader, heroes start as it lifts; otherwise they wait for the page curtain.
  const loaderShownAtStart = useRef(showLoader);
  const firstKey = useRef(location.key);
  const heroDelay = loaderShownAtStart.current && location.key === firstKey.current ? 0.35 : 0.85;

  // Browser should not restore scroll on its own — transitions handle it.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(LOADER_KEY, '1');
    } catch {
      /* storage unavailable — loader simply shows again next visit */
    }
    setShowLoader(false);
    setReady(true);
  }, []);

  const intro = useMemo(() => ({ ready, heroDelay }), [ready, heroDelay]);
  const match = routes.find((r) => r.path === location.pathname);

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext.Provider value={intro}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AnimatePresence>{showLoader && <Loader onDone={finishIntro} />}</AnimatePresence>

        <Header />

        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            window.scrollTo(0, 0);
            requestAnimationFrame(() => ScrollTrigger.refresh());
          }}
        >
          <PageTransition key={location.pathname} label={match?.label ?? 'Not found'}>
            <main id="main" tabIndex={-1}>
              <Routes location={location}>
                {routes.map((r) => (
                  <Route key={r.path} path={r.path} element={r.element} />
                ))}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </PageTransition>
        </AnimatePresence>

        <div className="grain" aria-hidden="true" />
      </IntroContext.Provider>
    </MotionConfig>
  );
}
