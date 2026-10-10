import { animate, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { pausarScroll, reanudarCuandoQuieto, reanudarScroll, reduceMovimiento } from '../hooks/scroll';
import { useSitio } from '../i18n/contexto';
import { Logo } from './Logo';

const FRANJAS = 9;
const CENTRO = (FRANJAS - 1) / 2;
/** Retardo de cada franja respecto al progreso: las del centro se abren primero. */
const DESFASE = 0.045;
const DESFASE_MAX = CENTRO * DESFASE;
/** Cuánto hay que desplazar (en alturas de pantalla) para abrir el telón entero. */
const RECORRIDO = 0.85;
/** Si el gesto se para con el telón abierto más de esto, termina de abrirse solo. */
const UMBRAL = 0.22;
const EASE = [0.76, 0, 0.24, 1] as const;

function Franja({ i, progreso }: { i: number; progreso: MotionValue<number> }) {
  const d = Math.abs(i - CENTRO) * DESFASE;
  const x = useTransform(progreso, [d, 1 - DESFASE_MAX + d], ['0%', i % 2 ? '101%' : '-101%'], { clamp: true });
  return (
    <motion.div
      aria-hidden
      className="relative flex-1"
      style={{ x, background: i % 2 ? 'var(--color-naranja-oscuro)' : 'var(--color-naranja)' }}
    />
  );
}

/**
 * Telón de entrada guiado por el scroll: al cargar, la marca espera sobre las costillas del Méhari.
 * La rueda, el dedo o el teclado abren las franjas al ritmo del gesto y la marca se difumina.
 * Mientras tanto la página no se mueve; al abrirse del todo, empieza en el hero.
 */
export function Intro({ alTerminar }: { alTerminar: () => void }) {
  const { t } = useSitio();
  const [visible, setVisible] = useState(() => !reduceMovimiento());
  const objetivo = useMotionValue(0);
  const progreso = useSpring(objetivo, { stiffness: 140, damping: 26, mass: 0.6 });
  const avisado = useRef(false);
  const terminado = useRef(false);

  // La marca se difumina y se aleja; la invitación a bajar desaparece en cuanto se empieza
  const opacidadMarca = useTransform(progreso, [0, 0.45], [1, 0]);
  const escalaMarca = useTransform(progreso, [0, 0.5], [1, 1.12]);
  const desenfoque = useTransform(progreso, [0, 0.45], ['blur(0px)', 'blur(14px)']);
  const opacidadAviso = useTransform(progreso, [0, 0.08], [1, 0]);

  useMotionValueEvent(progreso, 'change', (p) => {
    // El hero empieza a animarse cuando el telón ya deja verlo
    if (!avisado.current && p > 0.55) {
      avisado.current = true;
      alTerminar();
    }
    if (!terminado.current && p > 0.995) {
      terminado.current = true;
      setVisible(false);
      // el scroll se suelta cuando el gesto que ha abierto el telón termina del todo
      reanudarCuandoQuieto();
    }
  });

  useEffect(() => {
    if (!visible) {
      if (!terminado.current) {
        // movimiento reducido: no hay telón
        reanudarScroll();
        alTerminar();
      }
      return;
    }

    let reposo = 0;
    const abrirDelTodo = () => animate(objetivo, 1, { duration: 1.1, ease: EASE });
    const empujar = (delta: number) => {
      if (terminado.current) return;
      objetivo.stop();
      objetivo.set(Math.min(1, Math.max(0, objetivo.get() + delta / (window.innerHeight * RECORRIDO))));
      // al soltar: si ya se ha abierto algo, se completa; si apenas, vuelve a cerrarse
      clearTimeout(reposo);
      reposo = window.setTimeout(() => {
        if (objetivo.get() >= UMBRAL) abrirDelTodo();
        else animate(objetivo, 0, { duration: 0.6, ease: EASE });
      }, 160);
    };

    const rueda = (e: WheelEvent) => {
      const px = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      empujar(px);
    };
    let yTactil = 0;
    const tocar = (e: TouchEvent) => {
      yTactil = e.touches[0].clientY;
    };
    const deslizar = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      empujar((yTactil - y) * 1.6);
      yTactil = y;
    };
    const tecla = (e: KeyboardEvent) => {
      if ([' ', 'Enter', 'PageDown', 'ArrowDown', 'End'].includes(e.key)) abrirDelTodo();
    };

    // Se registran antes del bloqueo para recibir los gestos que el bloqueo frena
    const op = { passive: true, capture: true } as const;
    window.addEventListener('wheel', rueda, op);
    window.addEventListener('touchstart', tocar, op);
    window.addEventListener('touchmove', deslizar, op);
    window.addEventListener('keydown', tecla, true);
    pausarScroll();

    return () => {
      clearTimeout(reposo);
      window.removeEventListener('wheel', rueda, op);
      window.removeEventListener('touchstart', tocar, op);
      window.removeEventListener('touchmove', deslizar, op);
      window.removeEventListener('keydown', tecla, true);
    };
  }, [visible, alTerminar, objetivo]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col" data-intro>
      {Array.from({ length: FRANJAS }).map((_, i) => (
        <Franja key={i} i={i} progreso={progreso} />
      ))}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-azahar"
        style={{ opacity: opacidadMarca, scale: escalaMarca, filter: desenfoque }}
      >
        <motion.div
          className="flex flex-col items-center gap-4 [&_.text-naranja]:text-azahar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <Logo grande />
          <span className="etiqueta opacity-80">Citroën Méhari · Sevilla</span>
        </motion.div>
      </motion.div>

      {/* Invitación a bajar: también se puede pulsar */}
      <motion.button
        type="button"
        onClick={() => animate(objetivo, 1, { duration: 1.1, ease: EASE })}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-azahar"
        style={{ opacity: opacidadAviso }}
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        aria-label={t({ es: 'Entrar', en: 'Enter' })}
      >
        <span className="etiqueta">{t({ es: 'Desliza para entrar', en: 'Scroll to enter' })}</span>
        <span className="relative h-12 w-px overflow-hidden bg-azahar/30">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-azahar"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
          />
        </span>
      </motion.button>
    </div>
  );
}
