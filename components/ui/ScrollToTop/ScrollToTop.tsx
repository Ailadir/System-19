'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    window.addEventListener('scroll', preventScroll, { passive: false, capture: true });
    document.addEventListener('scroll', preventScroll, { passive: false, capture: true });

    scrollToTop();

    const timeouts: NodeJS.Timeout[] = [];
    [0, 10, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 750, 1000].forEach((delay) => {
      timeouts.push(setTimeout(scrollToTop, delay));
    });

    const cleanupTimeout = setTimeout(() => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventScroll, true);
      document.removeEventListener('scroll', preventScroll, true);
    }, 1050);

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      clearTimeout(cleanupTimeout);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('scroll', preventScroll, true);
      document.removeEventListener('scroll', preventScroll, true);
    };
  }, [pathname]);

  return null;
}
