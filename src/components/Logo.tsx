import { useSitio } from '../i18n/contexto';

/** Flor de azahar de la propuesta A (Mehari/marca/propuestas/logos.html). */
export function FlorAzahar({ className = '', flor = 'currentColor', centro = 'var(--color-cal)' }: { className?: string; flor?: string; centro?: string }) {
  const petalo = 'M0,-9 C-17,-18 -18,-44 0,-52 C18,-44 17,-18 0,-9Z';
  return (
    <svg viewBox="-56 -56 112 112" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((r) => (
        <path key={r} d={petalo} fill={flor} transform={`rotate(${r})`} />
      ))}
      <circle r="11" fill={flor} />
      <circle r="6.5" fill={centro} />
      {[0, 72, 144, 216, 288].map((r) => (
        <circle key={r} cx="0" cy="-15" r="2.2" fill={centro} transform={`rotate(${r})`} />
      ))}
    </svg>
  );
}

/** Méhari de perfil dentro de un arco: símbolo de la propuesta B. */
export function ArcoGetaway({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 144 136" className={className} aria-hidden>
      <path d="M8,132 L8,72 A64,64 0 0 1 136,72 L136,132" fill="none" stroke="currentColor" strokeWidth="7" />
      <line x1="0" y1="132" x2="144" y2="132" stroke="currentColor" strokeWidth="5" />
      <g transform="translate(14 66) scale(.62)">
        <path d="M26,50 L32,20 Q76,15 121,19 L130,52" fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M18,50 L132,50 L184,58 Q188,59 188,63 L188,80 L170,80 A20,20 0 0 0 130,80 L70,80 A20,20 0 0 0 30,80 L18,80 Q14,80 14,76 L14,54 Q14,50 18,50Z" fill="var(--color-naranja)" />
        <circle cx="50" cy="84" r="15" fill="currentColor" />
        <circle cx="150" cy="84" r="15" fill="currentColor" />
      </g>
    </svg>
  );
}

export function Logo({ className = '', grande = false }: { className?: string; grande?: boolean }) {
  const { marca } = useSitio();
  if (marca.id === 'azahar') {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <FlorAzahar className={grande ? 'h-16 w-16 text-naranja' : 'h-7 w-7 text-naranja'} />
        <span className="titular" style={{ fontSize: grande ? '4rem' : '1.6rem', lineHeight: 1 }}>
          Azahar
        </span>
      </span>
    );
  }
  if (marca.id === 'getaway') {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <ArcoGetaway className={grande ? 'h-16 w-16' : 'h-8 w-8'} />
        <span className="font-medium uppercase" style={{ fontSize: grande ? '3rem' : '1.15rem', letterSpacing: '0.16em', lineHeight: 1 }}>
          Getaway
        </span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="costillas inline-block h-6 w-6 rounded-[6px]" />
      <span className="etiqueta" style={{ fontSize: grande ? '1.1rem' : '0.7rem' }}>
        {marca.nombre}
      </span>
    </span>
  );
}
