import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { GALERIA, GALERIA_TEXTO } from '../data/contenido';
import { bloquearScroll } from '../hooks/scroll';
import { useSitio } from '../i18n/contexto';
import { Etiqueta, TitularMascara } from './ui';

type Item = { f: (typeof GALERIA)[number]; i: number };

function Columna({ items, y, alAbrir }: { items: Item[]; y: MotionValue<string>; alAbrir: (i: number) => void }) {
  const { t } = useSitio();
  return (
    <motion.div className="flex flex-col gap-4 md:gap-6" style={{ y }}>
      {items.map(({ f, i }) => (
        <button
          key={f.src}
          onClick={() => alAbrir(i)}
          className={`group relative block overflow-hidden rounded-[18px] ${f.formato === 'v' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
        >
          <img src={f.src} alt={t(f.alt)} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]" />
          <span className="absolute inset-0 bg-tinta/0 transition-colors duration-700 group-hover:bg-tinta/15" />
        </button>
      ))}
    </motion.div>
  );
}

export function Galeria() {
  const { t } = useSitio();
  const ref = useRef<HTMLElement>(null);
  const [abierta, setAbierta] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['6%', '-10%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['16%', '-16%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['2%', '-6%']);

  // Reparto en tres columnas; el orden de GALERIA se respeta para el visor.
  const cols = [0, 1, 2].map((c) => GALERIA.map((f, i) => ({ f, i })).filter((x) => x.i % 3 === c));

  const visorAbierto = abierta !== null;
  useEffect(() => {
    if (!visorAbierto) return;
    bloquearScroll(true);
    return () => bloquearScroll(false);
  }, [visorAbierto]);

  useEffect(() => {
    if (abierta === null) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierta(null);
      if (e.key === 'ArrowRight') setAbierta((a) => (a === null ? a : (a + 1) % GALERIA.length));
      if (e.key === 'ArrowLeft') setAbierta((a) => (a === null ? a : (a - 1 + GALERIA.length) % GALERIA.length));
    };
    window.addEventListener('keydown', tecla);
    return () => window.removeEventListener('keydown', tecla);
  }, [abierta]);

  return (
    <section id="galeria" ref={ref} className="relative overflow-hidden px-5 pb-32 pt-28 md:px-10 md:pt-40">
      <div className="mx-auto mb-16 flex max-w-[1400px] flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
        <div>
          <Etiqueta className="text-naranja-oscuro">{t(GALERIA_TEXTO.etiqueta)}</Etiqueta>
          <TitularMascara texto={t(GALERIA_TEXTO.titulo)} className="mt-5 text-[clamp(3rem,7vw,7.5rem)]" />
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {cols.map((col, c) => (
          <div key={c} className={c === 2 ? 'hidden md:block' : ''}>
            <Columna items={col} y={[y1, y2, y3][c]} alAbrir={setAbierta} />
          </div>
        ))}
      </div>
      {/* En móvil la tercera columna se reparte en las otras dos */}
      <div className="mt-4 grid grid-cols-2 gap-4 md:hidden">
        {cols[2].map(({ f, i }) => (
          <button key={f.src} onClick={() => setAbierta(i)} className="overflow-hidden rounded-[18px]">
            <img src={f.src} alt={t(f.alt)} loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {abierta !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-tinta/95 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAbierta(null)}
            role="dialog"
            aria-modal="true"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={abierta}
                src={GALERIA[abierta].src}
                alt={t(GALERIA[abierta].alt)}
                className="max-h-full max-w-full rounded-xl object-contain"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => {
                  e.stopPropagation();
                  setAbierta((abierta + 1) % GALERIA.length);
                }}
              />
            </AnimatePresence>
            <p className="etiqueta absolute bottom-6 left-1/2 -translate-x-1/2 text-azahar/70">
              {abierta + 1} / {GALERIA.length} · {t(GALERIA[abierta].alt)}
            </p>
            <button className="etiqueta absolute right-6 top-6 text-azahar" onClick={() => setAbierta(null)} aria-label="Cerrar">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
