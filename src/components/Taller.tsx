import { AnimatePresence, motion, useInView } from 'motion/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { TALLER } from '../data/contenido';
import { useSitio } from '../i18n/contexto';
import type { ColorCoche, Techo } from '../three/Mehari';
import { Etiqueta, TitularMascara } from './ui';

const cargarEscena = () => import('../three/Escena');
const Escena = lazy(cargarEscena);

/**
 * Precarga el coche en cuanto el navegador queda libre (mientras se ve la portada):
 * descarga el código 3D y el modelo, y monta la escena en pausa para que, al llegar
 * a la sección, el Méhari aparezca al momento.
 */
function usePrecargaEscena() {
  const [lista, setLista] = useState(false);
  useEffect(() => {
    let cancelado = false;
    const empezar = () => {
      cargarEscena().then(() => {
        if (!cancelado) setLista(true);
      });
    };
    // Safari no tiene requestIdleCallback: ahí basta con un pequeño retraso
    const conIdle = typeof window.requestIdleCallback === 'function';
    const id = conIdle ? window.requestIdleCallback(empezar, { timeout: 2000 }) : globalThis.setTimeout(empezar, 800);
    return () => {
      cancelado = true;
      if (conIdle) window.cancelIdleCallback(id as number);
      else globalThis.clearTimeout(id);
    };
  }, []);
  return lista;
}

const TECHOS: Techo[] = ['abierto', 'semiabierto', 'cerrado'];

/** Iconos mínimos de las tres configuraciones del techo, vistas de perfil. */
function IconoTecho({ techo }: { techo: Techo }) {
  const largo = techo === 'cerrado' ? 30 : techo === 'semiabierto' ? 15 : 0;
  return (
    <svg viewBox="0 0 48 24" className="h-5 w-10" aria-hidden>
      <path d="M4 15 H44 V19 H4Z" fill="currentColor" opacity=".9" />
      <circle cx="12" cy="20" r="3" fill="currentColor" />
      <circle cx="36" cy="20" r="3" fill="currentColor" />
      <path d="M34 15 L37 6" stroke="currentColor" strokeWidth="1.5" />
      {largo > 0 && <path d={`M37 6 H${37 - largo}`} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />}
      {largo === 0 && <circle cx="7" cy="13" r="2" fill="currentColor" />}
    </svg>
  );
}

export function Taller() {
  const { t } = useSitio();
  const ref = useRef<HTMLElement>(null);
  const cerca = useInView(ref, { margin: '300px 0px 300px 0px' });
  const visto = useInView(ref, { once: true, margin: '300px 0px 300px 0px' });
  const precargada = usePrecargaEscena();
  const [color, setColor] = useState<ColorCoche>('naranja');
  const [techo, setTecho] = useState<Techo>('semiabierto');
  const [flores, setFlores] = useState(true);

  return (
    <section id="coche" ref={ref} className="relative overflow-hidden bg-tinta text-azahar">
      {/* Halo cálido del color elegido */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[55%] h-[90vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[90px]"
        animate={{ backgroundColor: color === 'naranja' ? 'rgba(238,125,31,.32)' : 'rgba(220,198,160,.26)' }}
        transition={{ duration: 1.2 }}
      />
      <div className="relative mx-auto grid min-h-screen max-w-[1500px] grid-cols-1 lg:grid-cols-[1fr_380px]">
        <div className="relative h-[68vh] min-h-[460px] lg:h-auto">
          <div className="pointer-events-none absolute left-5 top-24 z-10 md:left-10 md:top-28">
            <Etiqueta className="text-naranja">{t(TALLER.etiqueta)}</Etiqueta>
            <TitularMascara texto={t(TALLER.titulo)} className="mt-5 text-[clamp(3rem,7vw,7.5rem)]" />
          </div>

          {/* Nombre del color, enorme y de fondo */}
          <AnimatePresence mode="wait">
            <motion.p
              key={color}
              className="titular pointer-events-none absolute bottom-[4%] left-0 right-0 select-none text-center text-[22vw] italic leading-none text-azahar/[0.06] lg:text-[15vw]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              {t(TALLER.colores[color].nombre)}
            </motion.p>
          </AnimatePresence>

          <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
            {(visto || precargada) && (
              <Suspense fallback={null}>
                <Escena color={color} techo={techo} flores={flores} activa={cerca} />
              </Suspense>
            )}
          </div>
          <p className="etiqueta pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-azahar/50">↻ {t(TALLER.arrastra)}</p>
        </div>

        {/* Panel de opciones */}
        <aside className="relative z-10 flex flex-col justify-center gap-10 px-5 pb-16 md:px-10 lg:border-l lg:border-azahar/10 lg:py-28">
          <p className="max-w-sm text-[1.02rem] leading-relaxed text-azahar/75">{t(TALLER.intro)}</p>

          <div>
            <p className="etiqueta mb-4 text-azahar/50">{t(TALLER.color)}</p>
            <div className="flex gap-3">
              {(Object.keys(TALLER.colores) as ColorCoche[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-pressed={color === c}
                  className={`flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-500 ${
                    color === c ? 'border-azahar/60 bg-azahar/[0.07]' : 'border-azahar/15 hover:border-azahar/35'
                  }`}
                >
                  <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-azahar/20" style={{ background: TALLER.colores[c].hex }}>
                    <span className="absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0_4px,rgba(0,0,0,.14)_4px_5px)]" />
                  </span>
                  <span className="text-[0.98rem]">{t(TALLER.colores[c].nombre)}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="etiqueta mb-4 text-azahar/50">{t(TALLER.techo)}</p>
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-azahar/[0.05] p-1.5">
              {TECHOS.map((tc) => (
                <button
                  key={tc}
                  onClick={() => setTecho(tc)}
                  aria-pressed={techo === tc}
                  className="relative flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-[0.82rem]"
                >
                  {techo === tc && (
                    <motion.span layoutId="techo-activo" className="absolute inset-0 rounded-xl bg-azahar" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className={`relative transition-colors duration-300 ${techo === tc ? 'text-tinta' : 'text-azahar/70'}`}>
                    <IconoTecho techo={tc} />
                  </span>
                  <span className={`relative transition-colors duration-300 ${techo === tc ? 'text-tinta' : 'text-azahar/70'}`}>{t(TALLER.techos[tc].nombre)}</span>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={techo}
                className="mt-4 min-h-[3em] text-[0.92rem] leading-relaxed text-azahar/65"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
              >
                {t(TALLER.techos[techo].texto)}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={() => setFlores(!flores)}
            aria-pressed={flores}
            className="flex items-center justify-between gap-4 rounded-2xl border border-azahar/15 px-5 py-4 text-left transition-colors hover:border-azahar/35"
          >
            <span>
              <span className="block text-[0.98rem]">{t(TALLER.flores)}</span>
              <span className="mt-1 block text-[0.85rem] text-azahar/55">{t(TALLER.floresTexto)}</span>
            </span>
            <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-500 ${flores ? 'bg-naranja' : 'bg-azahar/20'}`}>
              <motion.span className="absolute top-1 h-5 w-5 rounded-full bg-azahar" animate={{ left: flores ? 24 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 34 }} />
            </span>
          </button>
        </aside>
      </div>
    </section>
  );
}
