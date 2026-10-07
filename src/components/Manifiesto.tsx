import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { MANIFIESTO } from '../data/contenido';
import { useSitio } from '../i18n/contexto';
import { Aparece } from './ui';

function Palabra({ palabra, progreso, desde, hasta }: { palabra: string; progreso: MotionValue<number>; desde: number; hasta: number }) {
  const opacidad = useTransform(progreso, [desde, hasta], [0.14, 1]);
  const y = useTransform(progreso, [desde, hasta], [6, 0]);
  return (
    <motion.span className="inline-block" style={{ opacity: opacidad, y }}>
      {palabra}&nbsp;
    </motion.span>
  );
}

/** Frase grande que se «enciende» palabra a palabra con el scroll. */
export function Manifiesto() {
  const { t } = useSitio();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const palabras = t(MANIFIESTO.texto).split(' ');

  return (
    <section className="relative px-5 pb-24 pt-28 md:px-10 md:pb-36 md:pt-44">
      <p ref={ref} className="titular mx-auto max-w-[17ch] text-center text-[clamp(2.2rem,5.6vw,5.6rem)] !leading-[1.04]">
        {palabras.map((p, i) => (
          <Palabra key={`${p}-${i}`} palabra={p} progreso={scrollYProgress} desde={i / palabras.length} hasta={(i + 1.5) / palabras.length} />
        ))}
      </p>

      <div className="mx-auto mt-24 grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 md:mt-32 md:grid-cols-4">
        {MANIFIESTO.datos.map((d, i) => (
          <Aparece key={i} retardo={i * 0.1} className="border-t border-tinta/15 pt-5">
            <p className="titular text-[clamp(2.6rem,4.5vw,4.2rem)] text-naranja-oscuro">{d.cifra}</p>
            <p className="mt-3 max-w-[22ch] text-[0.95rem] leading-snug text-tinta/75">{t(d.texto)}</p>
          </Aparece>
        ))}
      </div>
    </section>
  );
}
