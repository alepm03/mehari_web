import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { PRENSA } from '../data/contenido';
import { useSitio } from '../i18n/contexto';
import { Aparece, Etiqueta, FotoCortina } from './ui';

/** Prueba social con elegancia: un recorte de prensa y una foto, sin estridencias. */
export function Prensa() {
  const { t } = useSitio();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yFoto = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-beige/40 px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Etiqueta className="text-naranja-oscuro">{t(PRENSA.etiqueta)}</Etiqueta>
          <Aparece retardo={0.1}>
            <blockquote className="titular mt-8 text-[clamp(2.2rem,4.4vw,4.4rem)] !leading-[1.02]">
              <span className="font-acento text-[1.4em] leading-none text-naranja">“</span>
              {t(PRENSA.cita)}
            </blockquote>
          </Aparece>
          <Aparece retardo={0.25}>
            <p className="etiqueta mt-10 text-tinta/70">{t(PRENSA.fuente)}</p>
            <p className="mt-2 max-w-md text-[0.98rem] text-tinta/65">{t(PRENSA.boda)}</p>
          </Aparece>
        </div>

        <div className="relative h-[520px] md:h-[640px] lg:col-span-6">
          <FotoCortina src="/img/prensa-boda.webp" alt={t(PRENSA.boda)} className="absolute left-0 top-0 h-[62%] w-[82%] rounded-[20px]" foco="40% 50%" />
          <motion.figure className="absolute bottom-0 right-0 w-[52%]" style={{ y: yFoto }}>
            <FotoCortina src="/img/herrera.webp" alt={t(PRENSA.herrera)} className="aspect-[4/5] rounded-[20px] shadow-[0_30px_70px_-25px_rgba(43,33,26,.5)]" foco="62% 40%" retardo={0.2} />
            <figcaption className="mt-3 font-acento text-[1.1rem] italic text-tinta/75">{t(PRENSA.herrera)}</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
