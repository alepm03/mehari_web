import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { CTA_PRESUPUESTO, HERO } from '../data/contenido';
import { irA } from '../hooks/scroll';
import { useSitio } from '../i18n/contexto';
import { BotonPrincipal } from './ui';

const EASE = [0.22, 1, 0.36, 1] as const;
const DURACION = 6500;

export function Hero({ listo }: { listo: boolean }) {
  const { t } = useSitio();
  const ref = useRef<HTMLElement>(null);
  const [actual, setActual] = useState(0);
  const total = HERO.diapositivas.length;

  useEffect(() => {
    if (!listo) return;
    const id = setInterval(() => setActual((a) => (a + 1) % total), DURACION);
    return () => clearInterval(id);
  }, [listo, total]);

  // Al bajar, la foto se recoge en una tarjeta y el texto sube más rápido que la imagen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const recorte = useTransform(scrollYProgress, [0, 1], ['inset(0% 0% 0% 0% round 0px)', 'inset(6% 4% 10% 4% round 28px)']);
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const subeTexto = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  const apagaTexto = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const d = HERO.diapositivas[actual];

  return (
    <section id="inicio" ref={ref} className="relative h-[100svh] min-h-[640px] bg-cal">
      <motion.div className="absolute inset-0 overflow-hidden bg-tinta" style={{ clipPath: recorte }}>
        <motion.div className="absolute inset-0" style={{ scale: escala }}>
          <AnimatePresence initial={false}>
            <motion.img
              key={d.src}
              src={d.src}
              alt={t(d.pie)}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: d.foco }}
              initial={{ opacity: 0, scale: 1.18 }}
              animate={{ opacity: 1, scale: 1.04, transition: { opacity: { duration: 1.6, ease: 'easeOut' }, scale: { duration: DURACION / 1000 + 1.6, ease: 'linear' } } }}
              exit={{ opacity: 0, transition: { duration: 1.6, ease: 'easeIn' } }}
              fetchPriority={actual === 0 ? 'high' : 'auto'}
            />
          </AnimatePresence>
        </motion.div>
        {/* Viñeteado para que el texto se lea */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(43,33,26,.45)_0%,rgba(43,33,26,0)_28%,rgba(43,33,26,0)_45%,rgba(43,33,26,.78)_100%)]" />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 text-azahar md:px-10 md:pb-14"
        style={{ y: subeTexto, opacity: apagaTexto }}
      >
        <motion.p
          className="etiqueta mb-6 opacity-90"
          initial={{ opacity: 0, y: 12 }}
          animate={listo ? { opacity: 0.9, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          {t(HERO.supra)}
        </motion.p>

        <h1 className="titular text-[clamp(3.4rem,9.6vw,10.5rem)]">
          <span className="sr-only">{HERO.lineas.map(t).join(' ')}</span>
          {HERO.lineas.map((l, i) => (
            <span key={i} aria-hidden className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <motion.span
                className={`block ${i === 1 ? 'pl-[6vw] italic' : ''} ${i === 2 ? 'pl-[15vw]' : ''}`}
                initial={{ y: '105%' }}
                animate={listo ? { y: '0%' } : undefined}
                transition={{ duration: 1.3, ease: EASE, delay: 0.15 + i * 0.12 }}
              >
                {t(l)}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={listo ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
          >
            <p className="text-[1.05rem] leading-relaxed text-azahar/90">{t(HERO.sub)}</p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <BotonPrincipal onClick={() => irA('contacto')}>{t(CTA_PRESUPUESTO)}</BotonPrincipal>
              <button onClick={() => irA('coche')} className="enlace pb-0.5 text-[0.95rem]">
                {t(HERO.verCoche)}
              </button>
            </div>
          </motion.div>

          {/* Contador de diapositivas con barra de progreso */}
          <motion.div
            className="flex items-end gap-5"
            initial={{ opacity: 0 }}
            animate={listo ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="text-right">
              <AnimatePresence mode="wait">
                <motion.p
                  key={actual}
                  className="font-acento text-xl italic"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5 }}
                >
                  {t(d.pie)}
                </motion.p>
              </AnimatePresence>
              <div className="mt-3 flex gap-1.5">
                {HERO.diapositivas.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActual(i)}
                    className="relative h-[3px] w-10 overflow-hidden rounded-full bg-azahar/30"
                    aria-label={`Foto ${i + 1}`}
                  >
                    {i === actual && listo && (
                      <motion.span
                        className="absolute inset-0 origin-left bg-azahar"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: DURACION / 1000, ease: 'linear' }}
                      />
                    )}
                    {i < actual && <span className="absolute inset-0 bg-azahar/80" />}
                  </button>
                ))}
              </div>
            </div>
            <p className="etiqueta tabular-nums opacity-80">
              {String(actual + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
