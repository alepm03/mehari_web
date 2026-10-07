import { motion, useInView, type Variants } from 'motion/react';
import { Fragment, useRef, type ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Convierte «texto *en cursiva*» en nodos con <em>. */
export function ConCursiva({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/(\*[^*]+\*)/).map((trozo, i) =>
        trozo.startsWith('*') ? <em key={i}>{trozo.slice(1, -1)}</em> : <Fragment key={i}>{trozo}</Fragment>,
      )}
    </>
  );
}

/** Titular que entra línea a línea desde abajo, con máscara. */
export function TitularMascara({
  texto,
  className = '',
  como: Como = 'h2',
  retardo = 0,
}: {
  texto: string;
  className?: string;
  como?: 'h1' | 'h2' | 'h3';
  retardo?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const visto = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const palabras = texto.split(' ');
  let enCursiva = false;
  return (
    <Como ref={ref} className={`titular ${className}`}>
      <span className="sr-only">{texto.replace(/\*/g, '')}</span>
      <span aria-hidden>
        {palabras.map((p, i) => {
          const abre = p.startsWith('*');
          const cierra = p.endsWith('*');
          if (abre) enCursiva = true;
          const limpio = p.replace(/\*/g, '');
          const cursiva = enCursiva;
          if (cierra) enCursiva = false;
          return (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: '110%', rotate: 4 }}
                animate={visto ? { y: '0%', rotate: 0 } : undefined}
                transition={{ duration: 1.1, ease: EASE, delay: retardo + i * 0.06 }}
              >
                {cursiva ? <em>{limpio}</em> : limpio}
                {i < palabras.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Como>
  );
}

const aparecer: Variants = {
  oculto: { opacity: 0, y: 28 },
  visible: (r: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 1, ease: EASE, delay: r } }),
};

export function Aparece({ children, retardo = 0, className = '' }: { children: ReactNode; retardo?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={aparecer}
      custom={retardo}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  );
}

/** Foto que se descubre con una cortina al entrar en pantalla. */
export function FotoCortina({
  src,
  alt,
  className = '',
  foco = '50% 50%',
  retardo = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  foco?: string;
  retardo?: number;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.3, ease: EASE, delay: retardo }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
        style={{ objectPosition: foco }}
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.8, ease: EASE, delay: retardo }}
      />
    </motion.div>
  );
}

export function Etiqueta({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`etiqueta flex items-center gap-3 ${className}`}>
      <span className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function BotonPrincipal({
  children,
  onClick,
  oscuro = false,
  className = '',
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  oscuro?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-500 ${
        oscuro ? 'bg-tinta text-azahar' : 'bg-naranja text-azahar'
      } ${className}`}
    >
      <span
        className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0 ${
          oscuro ? 'bg-naranja' : 'bg-naranja-oscuro'
        }`}
      />
      <span className="relative">{children}</span>
      <span className="relative inline-flex h-6 w-6 items-center justify-center overflow-hidden">
        <span className="transition-transform duration-500 group-hover:translate-x-6">→</span>
        <span className="absolute -translate-x-6 transition-transform duration-500 group-hover:translate-x-0">→</span>
      </span>
    </button>
  );
}
