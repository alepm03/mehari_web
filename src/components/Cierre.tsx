import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, type FormEvent } from 'react';
import { CONTACTO, contactoListo, MARCAS, modoPresentacion, type IdMarca } from '../config/marca';
import { CONTACTO_TEXTO, NAV, PREGUNTAS } from '../data/contenido';
import { irA } from '../hooks/scroll';
import { useSitio } from '../i18n/contexto';
import { Logo } from './Logo';
import { BotonPrincipal, Etiqueta, TitularMascara } from './ui';

export function Preguntas() {
  const { t } = useSitio();
  const [abierta, setAbierta] = useState<number | null>(0);
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Etiqueta className="text-naranja-oscuro">{t(PREGUNTAS.etiqueta)}</Etiqueta>
        </div>
        <div className="lg:col-span-8">
          {PREGUNTAS.lista.map((q, i) => (
            <div key={i} className="border-b border-tinta/15">
              <button
                onClick={() => setAbierta(abierta === i ? null : i)}
                aria-expanded={abierta === i}
                className="flex w-full items-center justify-between gap-6 py-7 text-left"
              >
                <span className="titular text-[clamp(1.5rem,2.6vw,2.4rem)] !leading-tight">{t(q.p)}</span>
                <motion.span animate={{ rotate: abierta === i ? 45 : 0 }} className="text-3xl font-light text-naranja-oscuro">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {abierta === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-8 text-[1.05rem] leading-relaxed text-tinta/70">{t(q.r)}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const campo =
  'w-full border-0 border-b border-azahar/25 bg-transparent pb-3 pt-1 text-[1.05rem] text-azahar placeholder:text-azahar/35 focus:border-naranja focus:outline-none focus:ring-0 transition-colors';

export function Contacto() {
  const { t, marca } = useSitio();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const escala = useTransform(scrollYProgress, [0, 1], [1.25, 1]);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const C = CONTACTO_TEXTO;

  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const texto = [
      `Hola ${marca.nombreCompleto}:`,
      `${t(C.campos.nombre)}: ${d.get('nombre') || '-'}`,
      `${t(C.campos.servicio)}: ${d.get('servicio')}`,
      `${t(C.campos.fecha)}: ${d.get('fecha') || '-'}`,
      `${t(C.campos.lugar)}: ${d.get('lugar') || '-'}`,
      `${t(C.campos.coche)}: ${d.get('coche')}`,
      d.get('mensaje') ? `${d.get('mensaje')}` : '',
    ]
      .filter(Boolean)
      .join('\n');
    if (contactoListo()) window.open(`https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
    else setMensaje(texto);
  };

  return (
    <section id="contacto" ref={ref} className="relative overflow-hidden bg-tinta text-azahar">
      <motion.img src="/img/sombra.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" style={{ scale: escala }} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-tinta)_0%,rgba(43,33,26,.55)_45%,var(--color-tinta)_100%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Etiqueta className="text-naranja">{t(C.etiqueta)}</Etiqueta>
          <TitularMascara texto={t(C.titulo)} className="mt-6 text-[clamp(3rem,6.5vw,6.8rem)]" />
          <p className="mt-8 max-w-sm text-[1.05rem] leading-relaxed text-azahar/75">{t(C.intro)}</p>
          <ul className="mt-10 space-y-2 text-[0.98rem] text-azahar/80">
            <li>{CONTACTO.whatsappVisible}</li>
            <li>{CONTACTO.email}</li>
            <li>{CONTACTO.instagram}</li>
            <li className="etiqueta pt-2 text-azahar/50">{CONTACTO.zona}</li>
          </ul>
        </div>

        <form onSubmit={enviar} className="grid grid-cols-1 gap-x-8 gap-y-9 self-end md:grid-cols-2 lg:col-span-7">
          <label className="md:col-span-2">
            <span className="etiqueta mb-2 block text-azahar/50">{t(C.campos.nombre)}</span>
            <input name="nombre" required autoComplete="name" className={campo} />
          </label>
          <fieldset className="md:col-span-2">
            <legend className="etiqueta mb-3 text-azahar/50">{t(C.campos.servicio)}</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(C.servicios) as (keyof typeof C.servicios)[]).map((s, i) => (
                <label key={s} className="cursor-pointer">
                  <input type="radio" name="servicio" value={t(C.servicios[s])} defaultChecked={i === 0} className="peer sr-only" />
                  <span className="inline-block rounded-full border border-azahar/25 px-4 py-2 text-[0.9rem] transition-colors peer-checked:border-naranja peer-checked:bg-naranja peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-naranja">
                    {t(C.servicios[s])}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label>
            <span className="etiqueta mb-2 block text-azahar/50">{t(C.campos.fecha)}</span>
            <input name="fecha" type="date" className={`${campo} [color-scheme:dark]`} />
          </label>
          <label>
            <span className="etiqueta mb-2 block text-azahar/50">{t(C.campos.lugar)}</span>
            <input name="lugar" className={campo} />
          </label>
          <fieldset className="md:col-span-2">
            <legend className="etiqueta mb-3 text-azahar/50">{t(C.campos.coche)}</legend>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(C.coches) as (keyof typeof C.coches)[]).map((s, i) => (
                <label key={s} className="cursor-pointer">
                  <input type="radio" name="coche" value={t(C.coches[s])} defaultChecked={i === 3} className="peer sr-only" />
                  <span className="inline-flex items-center gap-2 rounded-full border border-azahar/25 px-4 py-2 text-[0.9rem] transition-colors peer-checked:border-azahar peer-checked:bg-azahar peer-checked:text-tinta peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-naranja">
                    {(s === 'naranja' || s === 'beige') && <span className={`h-3 w-3 rounded-full ${s === 'naranja' ? 'bg-naranja' : 'bg-beige'}`} />}
                    {t(C.coches[s])}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="md:col-span-2">
            <span className="etiqueta mb-2 block text-azahar/50">{t(C.campos.mensaje)}</span>
            <textarea name="mensaje" rows={2} className={`${campo} resize-none`} />
          </label>
          <div className="md:col-span-2">
            <BotonPrincipal type="submit">{t(C.enviar)}</BotonPrincipal>
          </div>
          <AnimatePresence>
            {mensaje && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-naranja/50 bg-naranja/10 p-5 text-[0.9rem] md:col-span-2"
              >
                <p className="text-azahar/80">{t(C.pendiente)}</p>
                <pre className="mt-3 whitespace-pre-wrap font-texto text-azahar/95">{mensaje}</pre>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </section>
  );
}

export function Pie() {
  const { t, marca } = useSitio();
  return (
    <footer className="relative overflow-hidden bg-cal px-5 pb-8 pt-20 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 md:flex-row md:items-end">
        <Logo grande />
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem]">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => irA(n.id)} className="enlace">
              {t(n.texto)}
            </button>
          ))}
          <button onClick={() => irA('contacto')} className="enlace">
            {t(CONTACTO_TEXTO.etiqueta)}
          </button>
        </nav>
      </div>
      <div className="costillas mx-auto mt-14 h-16 max-w-[1400px] rounded-xl md:h-24" />
      <div className="mx-auto mt-6 flex max-w-[1400px] flex-col justify-between gap-2 text-[0.8rem] text-tinta/55 md:flex-row">
        <p>
          © {new Date().getFullYear()} {marca.nombreCompleto} · {CONTACTO.zona}
        </p>
        <p>Citroën® y Méhari® son marcas de sus respectivos propietarios.</p>
      </div>
    </footer>
  );
}

/** Botón flotante de contacto: WhatsApp si existe; si no, lleva al formulario. */
export function BotonFlotante() {
  const { t } = useSitio();
  const { scrollYProgress } = useScroll();
  const opacidad = useTransform(scrollYProgress, [0.04, 0.08], [0, 1]);
  const href = contactoListo() ? `https://wa.me/${CONTACTO.whatsapp}` : undefined;
  return (
    <motion.a
      href={href ?? '#contacto'}
      target={href ? '_blank' : undefined}
      rel="noopener noreferrer"
      onClick={(e) => {
        if (!href) {
          e.preventDefault();
          irA('contacto');
        }
      }}
      style={{ opacity: opacidad }}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-tinta py-3 pl-4 pr-5 text-[0.85rem] font-medium text-azahar shadow-[0_18px_40px_-14px_rgba(43,33,26,.6)] transition-colors hover:bg-naranja"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4 5.2 5.2 0 0 0 3.1.6 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
      </svg>
      WhatsApp
      <span className="sr-only">{t({ es: 'Escríbenos', en: 'Message us' })}</span>
    </motion.a>
  );
}

/** Solo en modo presentación (?marca=… o ?demo): cambia entre las propuestas de nombre. */
export function SelectorMarca() {
  const { marca, setMarca } = useSitio();
  if (!modoPresentacion()) return null;
  const ids: IdMarca[] = ['pendiente', 'azahar', 'getaway'];
  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-1 rounded-full bg-azahar/90 p-1 text-[0.75rem] shadow-[0_12px_30px_-12px_rgba(43,33,26,.5)] backdrop-blur-md">
      <span className="etiqueta px-2 !text-[0.6rem] text-tinta/50">Marca</span>
      {ids.map((id) => (
        <button
          key={id}
          onClick={() => setMarca(id)}
          className={`rounded-full px-3 py-1.5 transition-colors ${marca.id === id ? 'bg-tinta text-azahar' : 'text-tinta hover:bg-tinta/10'}`}
        >
          {id === 'pendiente' ? 'Sin definir' : MARCAS[id].nombre}
        </button>
      ))}
    </div>
  );
}
