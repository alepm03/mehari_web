import Lenis from 'lenis';
import { useEffect } from 'react';

let lenis: Lenis | null = null;
let pausado = false;

/** Al cargar o recargar, la página empieza siempre arriba (sin restaurar la posición anterior). */
export function empezarArriba() {
  if (typeof window === 'undefined') return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  // Firefox y Safari pueden devolver la página desde la caché con la posición antigua
  window.addEventListener('pageshow', (e) => e.persisted && window.scrollTo(0, 0));
}

const bloquearEvento = (e: Event) => {
  e.preventDefault();
  e.stopImmediatePropagation();
};
const OPCIONES = { passive: false, capture: true } as const;
const TECLAS = new Set([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End']);
const bloquearTecla = (e: KeyboardEvent) => TECLAS.has(e.key) && e.preventDefault();

/**
 * Congela el scroll por completo (rueda, táctil y teclado) mientras dura la intro,
 * para que nada se acumule y la web se descubra siempre desde el hero.
 */
export function pausarScroll() {
  pausado = true;
  lenis?.stop();
  document.documentElement.style.overflow = 'hidden';
  window.addEventListener('wheel', bloquearEvento, OPCIONES);
  window.addEventListener('touchmove', bloquearEvento, OPCIONES);
  window.addEventListener('keydown', bloquearTecla, true);
}

export function reanudarScroll() {
  pausado = false;
  window.removeEventListener('wheel', bloquearEvento, OPCIONES);
  window.removeEventListener('touchmove', bloquearEvento, OPCIONES);
  window.removeEventListener('keydown', bloquearTecla, true);
  document.documentElement.style.overflow = '';
  document.documentElement.classList.remove('cargando');
  window.scrollTo(0, 0);
  lenis?.scrollTo(0, { immediate: true, force: true });
  lenis?.start();
}

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
    // La intro se monta antes que este efecto: si ya pidió pausa, se respeta.
    if (pausado) lenis.stop();
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

/** Para menús y visores. Mientras la intro tenga el scroll en pausa, no lo toca. */
export function bloquearScroll(bloquear: boolean) {
  if (pausado) return;
  if (lenis) (bloquear ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = bloquear ? 'hidden' : '';
}
