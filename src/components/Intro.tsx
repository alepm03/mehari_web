import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { pausarScroll, reanudarScroll, reduceMovimiento } from '../hooks/scroll';
import { Logo } from './Logo';

const FRANJAS = 9;
const EASE = [0.76, 0, 0.24, 1] as const;

/** Telón de entrada: las costillas del Méhari se abren y descubren la página. */
export function Intro({ alTerminar }: { alTerminar: () => void }) {
  const [visible, setVisible] = useState(() => !reduceMovimiento());
  const conTelon = useRef(visible).current;

  useEffect(() => {
    if (!visible) {
      // sin telón (movimiento reducido) se libera ya; con telón, al terminar de abrirse
      if (!conTelon) reanudarScroll();
      alTerminar();
      return;
    }
    pausarScroll();
    const t = setTimeout(() => setVisible(false), 1700);
    return () => clearTimeout(t);
  }, [visible, alTerminar]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        reanudarScroll();
        alTerminar();
      }}
    >
      {visible && (
        <motion.div key="intro" className="fixed inset-0 z-[100] flex flex-col" aria-hidden exit={{ pointerEvents: 'none' }}>
          {Array.from({ length: FRANJAS }).map((_, i) => (
            <motion.div
              key={i}
              className="relative flex-1"
              style={{ background: i % 2 ? 'var(--color-naranja-oscuro)' : 'var(--color-naranja)' }}
              initial={{ scaleX: 1 }}
              exit={{ x: i % 2 ? '100%' : '-100%' }}
              transition={{ duration: 1, ease: EASE, delay: Math.abs(i - (FRANJAS - 1) / 2) * 0.05 }}
            />
          ))}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-azahar"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.4 } }}
          >
            <div className="flex flex-col items-center gap-4 [&_.text-naranja]:text-azahar">
              <Logo grande />
              <span className="etiqueta opacity-80">Citroën Méhari · Sevilla</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
