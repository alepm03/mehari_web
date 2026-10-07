import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import { CTA_PRESUPUESTO, NAV } from '../data/contenido';
import { bloquearScroll, irA } from '../hooks/scroll';
import { useSitio } from '../i18n/contexto';
import { Logo } from './Logo';

export function Nav() {
  const { t, idioma, setIdioma } = useSitio();
  const { scrollY } = useScroll();
  const [solido, setSolido] = useState(false);
  const [oculto, setOculto] = useState(false);
  const [abierto, setAbierto] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolido(y > window.innerHeight * 0.85);
    setOculto(y > prev && y > window.innerHeight * 1.2);
  });

  const ir = (id: string) => {
    setMenu(false);
    setTimeout(() => irA(id), abierto ? 350 : 0);
  };
  const setMenu = (v: boolean) => {
    setAbierto(v);
    bloquearScroll(v);
  };

  const claro = !solido && !abierto;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: oculto && !abierto ? '-110%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`mx-auto flex items-center justify-between px-5 py-4 transition-all duration-700 md:px-10 ${
            solido && !abierto ? 'bg-cal/80 text-tinta shadow-[0_1px_0_rgba(43,33,26,.08)] backdrop-blur-xl' : ''
          } ${claro ? 'text-azahar' : 'text-tinta'}`}
        >
          <button onClick={() => ir('inicio')} className="relative z-10" aria-label="Inicio">
            <Logo />
          </button>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => ir(n.id)} className="enlace pb-0.5 text-[0.92rem] tracking-wide">
                {t(n.texto)}
              </button>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-3 md:gap-5">
            <div className="etiqueta flex items-center gap-1.5 !text-[0.68rem]" role="group" aria-label="Idioma">
              {(['es', 'en'] as const).map((i) => (
                <button
                  key={i}
                  onClick={() => setIdioma(i)}
                  aria-pressed={idioma === i}
                  className={`px-1 transition-opacity ${idioma === i ? 'opacity-100' : 'opacity-45 hover:opacity-80'}`}
                >
                  {i}
                </button>
              ))}
            </div>
            <button
              onClick={() => ir('contacto')}
              className={`hidden rounded-full px-5 py-2.5 text-[0.88rem] font-medium transition-colors duration-500 sm:inline-flex ${
                claro ? 'bg-azahar/15 backdrop-blur-md hover:bg-azahar hover:text-tinta' : 'bg-tinta text-azahar hover:bg-naranja'
              }`}
            >
              {t(CTA_PRESUPUESTO)}
            </button>
            <button
              onClick={() => setMenu(!abierto)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Menú"
              aria-expanded={abierto}
            >
              <span className={`h-px w-6 bg-current transition-transform duration-500 ${abierto ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`h-px w-6 bg-current transition-transform duration-500 ${abierto ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-cal px-6 pb-12 pt-28 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-1">
              {[...NAV, { id: 'contacto', texto: CTA_PRESUPUESTO }].map((n, i) => (
                <li key={n.id} className="overflow-hidden">
                  <motion.button
                    onClick={() => ir(n.id)}
                    className="titular text-[13vw] leading-[1.05]"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.06 }}
                  >
                    {t(n.texto)}
                  </motion.button>
                </li>
              ))}
            </ul>
            <div className="costillas mt-10 h-10 w-full rounded-md" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
