import { MARCA } from '../config/marca';

type Variante = 'naranja' | 'blanco' | 'tinta';

/**
 * Logo aprobado por el cliente el 2026-10-28 (Mehari/marca/logo/, versión 03). Se usa tal cual:
 * naranja sobre fondo claro, blanco sobre naranja, tinta o foto, y tinta sobre beige o cal.
 */
export function Logo({ variante = 'naranja', className = 'h-14' }: { variante?: Variante; className?: string }) {
  return (
    <img
      src={`/logo/mehari-we-${variante}.svg`}
      alt={`${MARCA.nombre} · ${MARCA.subtitulo}`}
      width={1549}
      height={1579}
      className={`block w-auto ${className}`}
      draggable={false}
    />
  );
}
