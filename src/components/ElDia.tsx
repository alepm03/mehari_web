import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { EL_DIA } from '../data/contenido';
import { useSitio } from '../i18n/contexto';
import { Etiqueta, FotoCortina, TitularMascara } from './ui';

function useEsEscritorio() {
  const [es, setEs] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const f = () => setEs(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return es;
}

type Capitulo = (typeof EL_DIA.capitulos)[number];

function PanelCapitulo({ c, i, progreso, n }: { c: Capitulo; i: number; progreso: MotionValue<number>; n: number }) {
  const { t } = useSitio();
  const centro = (i + 1) / (n + 1);
  // Paralaje: la foto grande se desliza dentro de su marco; la pequeña flota en vertical.
  const xGrande = useTransform(progreso, [centro - 0.35, centro + 0.35], ['7%', '-7%']);
  const yPeque = useTransform(progreso, [centro - 0.35, centro + 0.35], ['30%', '-30%']);
  const par = i % 2 === 1;

  return (
    <article className="relative flex h-full w-[82vw] shrink-0 items-center pl-[4vw]">
      <div className={`relative h-[68vh] w-[44vw] ${par ? 'mt-[8vh]' : '-mt-[8vh]'}`}>
        <div className="absolute inset-0 overflow-hidden rounded-[22px]">
          <motion.img src={c.foto} alt={t(c.titulo)} loading="lazy" className="absolute inset-y-0 -left-[8%] h-full w-[116%] max-w-none object-cover" style={{ x: xGrande }} />
        </div>
        <motion.div
          className={`absolute -right-[5vw] z-10 h-[30vh] w-[15vw] overflow-hidden rounded-[18px] border-[6px] border-cal shadow-[0_30px_60px_-20px_rgba(43,33,26,.45)] ${par ? '-top-[4vh]' : '-bottom-[4vh]'}`}
          style={{ y: yPeque }}
        >
          <img src={c.foto2} alt="" loading="lazy" className="h-full w-full object-cover" />
        </motion.div>
      </div>
      <div className={`relative z-20 ml-[9vw] w-[21vw] ${par ? '-mt-[14vh]' : 'mt-[14vh]'}`}>
        <p className="titular text-[6.5vw] leading-none text-naranja">{c.num}</p>
        <h3 className="titular mt-4 text-[3vw]">{t(c.titulo)}</h3>
        <p className="mt-5 text-[1.05rem] leading-relaxed text-tinta/75">{t(c.texto)}</p>
      </div>
    </article>
  );
}

function Horizontal() {
  const { t } = useSitio();
  const seccion = useRef<HTMLElement>(null);
  const pista = useRef<HTMLDivElement>(null);
  const [distancia, setDistancia] = useState(0);

  useLayoutEffect(() => {
    const medir = () => pista.current && setDistancia(pista.current.scrollWidth - window.innerWidth);
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, []);

  const { scrollYProgress } = useScroll({ target: seccion, offset: ['start start', 'end end'] });
  const suave = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(suave, [0, 1], [0, -distancia]);
  const barra = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const n = EL_DIA.capitulos.length;

  return (
    <section id="bodas" ref={seccion} className="relative" style={{ height: `calc(100vh + ${distancia}px)` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div ref={pista} className="flex h-full items-center will-change-transform" style={{ x }}>
          <div className="flex h-full w-[42vw] shrink-0 flex-col justify-center pl-10 pr-[4vw]">
            <Etiqueta className="text-naranja-oscuro">{t(EL_DIA.etiqueta)}</Etiqueta>
            <TitularMascara texto={t(EL_DIA.titulo)} className="mt-6 text-[clamp(3.5rem,6.4vw,7.5rem)]" />
            <p className="mt-10 flex items-center gap-3 text-sm text-tinta/60">
              <span className="inline-block h-px w-14 bg-tinta/40" />
              {t({ es: 'Sigue bajando', en: 'Keep scrolling' })}
            </p>
          </div>
          {EL_DIA.capitulos.map((c, i) => (
            <PanelCapitulo key={c.num} c={c} i={i} progreso={scrollYProgress} n={n} />
          ))}
          <div className="w-[10vw] shrink-0" />
        </motion.div>

        {/* Progreso por capítulos */}
        <div className="absolute inset-x-10 bottom-8 flex items-center gap-6">
          <div className="relative h-px flex-1 bg-tinta/15">
            <motion.div className="absolute inset-0 origin-left bg-naranja" style={{ scaleX: barra }} />
          </div>
          <p className="etiqueta text-tinta/60">{t(EL_DIA.etiqueta)}</p>
        </div>
      </div>
    </section>
  );
}

function Vertical() {
  const { t } = useSitio();
  return (
    <section id="bodas" className="px-5 py-20">
      <Etiqueta className="text-naranja-oscuro">{t(EL_DIA.etiqueta)}</Etiqueta>
      <TitularMascara texto={t(EL_DIA.titulo)} className="mt-5 text-[clamp(3rem,13vw,5rem)]" />
      <div className="mt-14 space-y-20">
        {EL_DIA.capitulos.map((c) => (
          <article key={c.num}>
            <FotoCortina src={c.foto} alt={t(c.titulo)} className="aspect-[4/5] rounded-[18px]" />
            <div className="mt-6 flex items-baseline gap-4">
              <span className="titular text-5xl text-naranja">{c.num}</span>
              <h3 className="titular text-4xl">{t(c.titulo)}</h3>
            </div>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-tinta/75">{t(c.texto)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ElDia() {
  const escritorio = useEsEscritorio();
  return escritorio ? <Horizontal /> : <Vertical />;
}
