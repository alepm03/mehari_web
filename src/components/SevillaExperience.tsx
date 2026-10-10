import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CASCO, PARQUE, RIO, RUTA, SEVILLA, type Coord, type Parada } from '../data/contenido';
import { irA } from '../hooks/scroll';
import { useSitio } from '../i18n/contexto';
import { BotonPrincipal, ConCursiva, Etiqueta } from './ui';

/* ---------- Proyección: coordenadas reales → unidades del mapa ---------- */
const LAT_MAX = 37.4085;
const LAT_MIN = 37.3655;
const LON_MIN = -6.0095;
const LON_MAX = -5.981;
const COS = Math.cos((37.387 * Math.PI) / 180);
const K = 1000 / ((LON_MAX - LON_MIN) * COS);
export const MAPA_W = 1000;
export const MAPA_H = (LAT_MAX - LAT_MIN) * K;

const proyecta = ([lat, lon]: Coord): [number, number] => [(lon - LON_MIN) * COS * K, (LAT_MAX - lat) * K];

/** Curva suave (Catmull-Rom → Bézier) que pasa por todos los puntos. */
function curva(puntos: [number, number][], cerrada = false) {
  const p = cerrada ? [puntos[puntos.length - 1], ...puntos, puntos[0], puntos[1]] : [puntos[0], ...puntos, puntos[puntos.length - 1]];
  let d = `M${p[1][0].toFixed(1)},${p[1][1].toFixed(1)}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [p0, p1, p2, p3] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return cerrada ? d + 'Z' : d;
}

const esParada = (x: Parada | Coord): x is Parada => !Array.isArray(x);
const PARADAS = RUTA.filter(esParada);

/** Méhari visto desde arriba, mirando hacia +X. */
function CocheMini({ noche }: { noche: boolean }) {
  return (
    <g>
      {noche && <path d="M14,-5 L70,-26 L70,26 L14,5Z" fill="url(#luz)" />}
      <rect x="-16" y="-9.5" width="32" height="19" rx="3.5" fill="var(--color-tinta)" opacity=".25" transform="translate(1.5 2.5)" />
      <rect x="-16" y="-9" width="32" height="18" rx="3.5" fill="var(--color-naranja)" />
      {[-5, -1.5, 2, 5.5].map((y) => (
        <line key={y} x1="3" x2="15" y1={y} y2={y} stroke="var(--color-naranja-oscuro)" strokeWidth=".9" />
      ))}
      <rect x="-13" y="-7" width="13" height="14" rx="1.5" fill="var(--color-tinta)" opacity=".85" />
      <rect x="0" y="-7.5" width="2" height="15" rx="1" fill="var(--color-azahar)" opacity=".9" />
      <circle cx="15.5" cy="-6" r="1.6" fill="var(--color-azahar)" />
      <circle cx="15.5" cy="6" r="1.6" fill="var(--color-azahar)" />
      <rect x="-14.5" y="-5" width="4" height="10" rx="1" fill="var(--color-beige)" />
    </g>
  );
}

export function SevillaExperience() {
  const { t } = useSitio();
  const [noche, setNoche] = useState(false);
  const seccion = useRef<HTMLDivElement>(null);
  const marco = useRef<HTMLDivElement>(null);
  const camara = useRef<SVGGElement>(null);
  const coche = useRef<SVGGElement>(null);
  const trazo = useRef<SVGPathElement>(null);
  const recorrido = useRef<SVGPathElement>(null);
  const [activa, setActiva] = useState(0);
  const [largo, setLargo] = useState(1);
  const [hitos, setHitos] = useState<number[]>([]);

  const rutaD = useMemo(() => curva(RUTA.map((x) => proyecta(esParada(x) ? x.coord : x))), []);
  const rioD = useMemo(() => curva(RIO.map(proyecta)), []);
  const parqueD = useMemo(() => curva(PARQUE.map(proyecta), true), []);
  const cascoD = useMemo(() => curva(CASCO.map(proyecta), true), []);
  const puntos = useMemo(() => PARADAS.map((p) => proyecta(p.coord)), []);

  // Distancia a lo largo de la ruta de cada parada
  useLayoutEffect(() => {
    const path = trazo.current;
    if (!path) return;
    const total = path.getTotalLength();
    const muestras = 1600;
    const mapa: { l: number; x: number; y: number }[] = [];
    for (let i = 0; i <= muestras; i++) {
      const l = (i / muestras) * total;
      const pt = path.getPointAtLength(l);
      mapa.push({ l, x: pt.x, y: pt.y });
    }
    let desde = 0;
    const ls = puntos.map(([x, y]) => {
      let mejor = desde;
      let dMin = Infinity;
      for (let i = desde; i < mapa.length; i++) {
        const d = (mapa[i].x - x) ** 2 + (mapa[i].y - y) ** 2;
        if (d < dMin) {
          dMin = d;
          mejor = i;
        }
      }
      desde = mejor;
      return mapa[mejor].l;
    });
    setLargo(total);
    setHitos(ls);
  }, [puntos]);

  const { scrollYProgress } = useScroll({ target: seccion, offset: ['start start', 'end end'] });
  const progreso = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });

  const pintar = (p: number) => {
    const path = trazo.current;
    const g = camara.current;
    const mf = marco.current;
    if (!path || !g || !mf || !hitos.length) return;
    // el coche sale en la primera parada y llega a la última
    const viaje = Math.min(1, Math.max(0, (p - 0.04) / 0.9));
    const l = hitos[0] + viaje * (hitos[hitos.length - 1] - hitos[0]);
    const a = path.getPointAtLength(l);
    const b = path.getPointAtLength(Math.min(largo, l + 4));
    const ang = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    coche.current?.setAttribute('transform', `translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${ang.toFixed(1)})`);
    recorrido.current?.setAttribute('stroke-dashoffset', String(largo - l));

    // Cámara: plano general al principio y al final; de cerca, siguiendo al coche, durante el viaje
    const w = mf.clientWidth;
    const h = mf.clientHeight;
    const general = Math.min(w / MAPA_W, h / MAPA_H) * 0.92;
    const cerca = Math.max(general * (w < 700 ? 3.2 : 1.85), Math.min(w, h) / 620);
    const z = Math.min(1, p / 0.1, (1 - p) / 0.1);
    const k = Math.max(0, Math.min(1, z));
    const zoomSuave = k * k * (3 - 2 * k);
    const escala = general + (cerca - general) * zoomSuave;
    const cx = MAPA_W / 2 + (a.x - MAPA_W / 2) * zoomSuave;
    const cy = MAPA_H / 2 + (a.y - MAPA_H / 2) * zoomSuave;
    g.setAttribute('transform', `translate(${(w / 2 - cx * escala).toFixed(1)} ${(h / 2 - cy * escala).toFixed(1)}) scale(${escala.toFixed(4)})`);

    let idx = 0;
    for (let i = 0; i < hitos.length; i++) if (l >= hitos[i] - 6) idx = i;
    setActiva((prev) => (prev === idx ? prev : idx));
  };

  useMotionValueEvent(progreso, 'change', pintar);
  useEffect(() => {
    pintar(progreso.get());
    const f = () => pintar(progreso.get());
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitos, largo]);

  const parada = PARADAS[activa];
  const tinta = noche ? 'var(--color-azahar)' : 'var(--color-tinta)';

  return (
    <section id="sevilla" className={`relative transition-colors duration-1000 ${noche ? 'bg-tinta text-azahar' : 'bg-cal text-tinta'}`}>
      {/* Cabecera: lo que no cambia con el recorrido */}
      <header className="mx-auto grid max-w-[1400px] gap-12 px-5 pb-10 pt-28 md:px-10 md:pt-40 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Etiqueta className={noche ? 'text-naranja' : 'text-naranja-oscuro'}>{t(SEVILLA.etiqueta)}</Etiqueta>
          <h2 className="titular mt-5 text-[clamp(3rem,7vw,7.5rem)]">
            <ConCursiva texto={t(SEVILLA.titulo)} />
          </h2>
          <p className={`mt-6 max-w-lg text-[1.05rem] leading-relaxed ${noche ? 'text-azahar/70' : 'text-tinta/70'}`}>{t(SEVILLA.intro)}</p>
        </div>
        <div className="lg:col-span-5">
          <ul className={`divide-y border-y ${noche ? 'divide-azahar/15 border-azahar/15' : 'divide-tinta/12 border-tinta/12'}`}>
            {SEVILLA.datos.map((d, i) => (
              <li key={i} className="flex items-baseline gap-4 py-3.5 text-[0.98rem]">
                <span className="etiqueta w-6 shrink-0 text-naranja">{String(i + 1).padStart(2, '0')}</span>
                {t(d)}
              </li>
            ))}
          </ul>
          <p className={`mt-6 flex items-center gap-3 text-sm ${noche ? 'text-azahar/55' : 'text-tinta/55'}`}>
            <span className="inline-block h-px w-10 bg-current" />
            {t(SEVILLA.sigue)} ↓
          </p>
        </div>
      </header>

      <div ref={seccion} className="relative" style={{ height: '480vh' }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden lg:flex-row">
        {/* Panel que acompaña al mapa: solo lo que cambia */}
        <div className="relative z-10 flex shrink-0 flex-col justify-between gap-4 px-5 pb-4 pt-20 md:px-10 lg:w-[max(34%,410px)] lg:pb-12 lg:pt-28">
          <div>
            <p className="etiqueta opacity-55">{t(SEVILLA.rutaBase)}</p>
            {/* Tour de día o de noche */}
            <div className={`mt-4 inline-grid grid-cols-2 rounded-full p-1 text-[0.85rem] ${noche ? 'bg-azahar/10' : 'bg-tinta/[0.07]'}`} role="group">
              {(['monumental', 'romantico'] as const).map((k) => {
                const on = (k === 'romantico') === noche;
                return (
                  <button key={k} onClick={() => setNoche(k === 'romantico')} aria-pressed={on} className="relative whitespace-nowrap rounded-full px-4 py-2">
                    {on && <motion.span layoutId="tour" className={`absolute inset-0 rounded-full ${noche ? 'bg-naranja' : 'bg-tinta'}`} transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                    <span className={`relative flex items-center gap-2 ${on ? 'text-azahar' : ''}`}>
                      <span aria-hidden>{k === 'romantico' ? '☾' : '☀'}</span>
                      {t(SEVILLA.tours[k])}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Parada actual */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="etiqueta tabular-nums opacity-60">
                {t(SEVILLA.parada)} {String(activa + 1).padStart(2, '0')} / {PARADAS.length}
              </p>
              <AnimatePresence>
                {parada.fotoParada && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="etiqueta rounded-full bg-naranja px-3 py-1 !text-[0.62rem] text-azahar"
                  >
                    ◉ {t(SEVILLA.paradaFoto)}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {/* Progreso por paradas */}
            <div className="mt-3 flex gap-[3px]" aria-hidden>
              {PARADAS.map((p, i) => (
                <span key={p.id} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${i <= activa ? 'bg-naranja' : noche ? 'bg-azahar/15' : 'bg-tinta/12'}`} />
              ))}
            </div>
            <div className="mt-4 grid">
              <AnimatePresence initial={false}>
                <motion.div
                  key={parada.id}
                  className="[grid-area:1/1]"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }}
                  exit={{ y: -24, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }}
                >
                  <h3 className="titular text-[clamp(1.7rem,2.7vw,2.8rem)] !leading-[1.02] [@media(max-height:700px)]:text-[1.7rem]">{t(parada.nombre)}</h3>
                  <p className={`mt-2 text-[0.95rem] leading-snug ${noche ? 'text-azahar/65' : 'text-tinta/65'}`}>{t(parada.nota)}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-7 hidden md:block [@media(max-height:620px)]:hidden">
              <BotonPrincipal onClick={() => irA('contacto')}>{t(SEVILLA.reservar)}</BotonPrincipal>
            </div>
          </div>
        </div>

        {/* Mapa */}
        <div ref={marco} className="relative min-h-0 flex-1" aria-label={t(SEVILLA.rutaBase)} role="img">
          <svg className="absolute inset-0 h-full w-full">
            <defs>
              <radialGradient id="luz" cx="0" cy="0.5" r="1">
                <stop offset="0" stopColor="var(--color-azahar)" stopOpacity=".55" />
                <stop offset="1" stopColor="var(--color-azahar)" stopOpacity="0" />
              </radialGradient>
              <pattern id="trama" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
                <line x1="0" y1="0" x2="0" y2="10" stroke={tinta} strokeOpacity=".07" strokeWidth="3" />
              </pattern>
              <filter id="brillo" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g ref={camara}>
              {/* Casco antiguo */}
              <path d={cascoD} fill="url(#trama)" stroke={tinta} strokeOpacity=".22" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
              <text x={proyecta([37.3995, -5.9935])[0]} y={proyecta([37.3995, -5.9935])[1]} className="etiqueta" fontSize="15" fill={tinta} opacity=".38" textAnchor="middle">
                {t(SEVILLA.casco)}
              </text>
              {/* Parque */}
              <path d={parqueD} fill="var(--color-verde)" fillOpacity={noche ? 0.28 : 0.2} />
              <text x={proyecta([37.3738, -5.9893])[0]} y={proyecta([37.3738, -5.9893])[1]} fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="22" fill="var(--color-verde)" textAnchor="middle" opacity={noche ? 0.9 : 1}>
                {t(SEVILLA.parque)}
              </text>
              {/* Río */}
              <path d={rioD} fill="none" stroke="var(--color-verde)" strokeOpacity={noche ? 0.32 : 0.2} strokeWidth="44" strokeLinecap="round" />
              <path id="rio-texto" d={rioD} fill="none" stroke="var(--color-verde)" strokeOpacity={noche ? 0.2 : 0.12} strokeWidth="30" strokeLinecap="round" />
              <text fontFamily="Instrument Serif, serif" fontStyle="italic" fontSize="21" fill={tinta} opacity=".45" dy="7">
                <textPath href="#rio-texto" startOffset="18%">
                  {t(SEVILLA.rio)}
                </textPath>
              </text>

              {/* Ruta completa y tramo recorrido */}
              <path ref={trazo} d={rutaD} fill="none" stroke={tinta} strokeOpacity=".28" strokeWidth="3" strokeDasharray="1 9" strokeLinecap="round" />
              <path
                ref={recorrido}
                d={rutaD}
                fill="none"
                stroke="var(--color-naranja)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={largo}
                strokeDashoffset={largo}
                filter={noche ? 'url(#brillo)' : undefined}
              />

              {/* Paradas */}
              {PARADAS.map((p, i) => {
                const [x, y] = puntos[i];
                const hecha = i <= activa;
                const actual = i === activa;
                return (
                  <g key={p.id} transform={`translate(${x} ${y})`}>
                    {(actual || (noche && hecha)) && (
                      <circle r={actual ? 22 : 12} fill="var(--color-naranja)" opacity={actual ? 0.18 : 0.12}>
                        {actual && <animate attributeName="r" values="14;26;14" dur="2.2s" repeatCount="indefinite" />}
                      </circle>
                    )}
                    <circle
                      r={p.fotoParada ? 9 : 6.5}
                      fill={hecha ? 'var(--color-naranja)' : noche ? 'var(--color-tinta)' : 'var(--color-cal)'}
                      stroke={hecha ? 'var(--color-naranja)' : tinta}
                      strokeOpacity={hecha ? 1 : 0.45}
                      strokeWidth="2.2"
                      style={{ transition: 'fill .5s' }}
                    />
                    {p.fotoParada && <circle r="3" fill={hecha ? 'var(--color-azahar)' : tinta} opacity={hecha ? 1 : 0.5} />}
                    <text
                      x="14"
                      y="5"
                      fontSize={actual ? 17 : 13}
                      fontWeight={actual ? 500 : 400}
                      fill={tinta}
                      opacity={actual ? 1 : 0.5}
                      style={{ fontFamily: 'Jost, sans-serif', transition: 'opacity .4s' }}
                      paintOrder="stroke"
                      stroke={noche ? 'var(--color-tinta)' : 'var(--color-cal)'}
                      strokeWidth="5"
                      strokeLinejoin="round"
                    >
                      {t(p.nombre)}
                    </text>
                  </g>
                );
              })}

              <g ref={coche}>
                <CocheMini noche={noche} />
              </g>
            </g>
          </svg>

          {/* Foto de la parada, si la hay */}
          <AnimatePresence>
            {parada.foto && (
              <motion.figure
                key={parada.foto}
                className="absolute bottom-5 right-5 w-[34%] max-w-[260px] overflow-hidden rounded-2xl shadow-[0_24px_50px_-20px_rgba(43,33,26,.55)] md:bottom-10 md:right-10"
                initial={{ clipPath: 'inset(100% 0 0 0 round 16px)', rotate: 3 }}
                animate={{ clipPath: 'inset(0% 0 0 0 round 16px)', rotate: -2 }}
                exit={{ clipPath: 'inset(0 0 100% 0 round 16px)', rotate: -5 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={parada.foto} alt={t(parada.nombre)} className="aspect-[4/5] w-full object-cover" />
              </motion.figure>
            )}
          </AnimatePresence>


        </div>
      </div>
      </div>

      <div className="px-5 pb-20 md:hidden">
        <BotonPrincipal onClick={() => irA('contacto')}>{t(SEVILLA.reservar)}</BotonPrincipal>
      </div>
    </section>
  );
}
