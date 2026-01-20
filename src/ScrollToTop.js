import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LenisContext } from './LenisContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useContext(LenisContext);

  useEffect(() => {
    // Wait for next paint to avoid conflicts with transitions or overlays
    const timeout = setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 100); // tweak delay based on preload/transition timing

    return () => clearTimeout(timeout);
  }, [pathname, lenis]);

  return null;
};

export default ScrollToTop;
