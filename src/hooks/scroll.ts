import Lenis from 'lenis';
import { useEffect } from 'react';

let lenis: Lenis | null = null;

export const reduceMovimiento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll suave para toda la página. Se monta una vez en App. */
export function useScrollSuave() {
  useEffect(() => {
    if (reduceMovimiento()) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), touchMultiplier: 1.4 });
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

export function irA(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: reduceMovimiento() ? 'auto' : 'smooth' });
}

export function bloquearScroll(bloquear: boolean) {
  if (lenis) (bloquear ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = bloquear ? 'hidden' : '';
}
