import { MARCA } from '../config/marca';

/**
 * Logotipo provisional: las costillas y el nombre. El símbolo definitivo se elige entre las cinco
 * propuestas de Mehari/marca/propuestas/mehari-we.html; cuando se decida, se sustituye aquí.
 */
export function Logo({ className = '', grande = false }: { className?: string; grande?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className={`costillas inline-block ${grande ? 'h-14 w-14 rounded-[12px]' : 'h-7 w-7 rounded-[7px]'}`} />
      <span className="titular" style={{ fontSize: grande ? '3.4rem' : '1.45rem', lineHeight: 1 }}>
        {MARCA.nombre}
      </span>
    </span>
  );
}
