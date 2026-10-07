/*
  Datos de la marca. Fuente de verdad: Mehari/docs/cliente/brief.md.
  Mientras el cliente no decida, se usan los marcadores del brief. Nunca inventes datos aquí.

  Vista previa de las propuestas de nombre (Mehari/marca/README.md):
    ?marca=azahar   → propuesta A · «Mehari Azahar»
    ?marca=getaway  → propuesta B · «Mehari Getaway»
  Sin parámetro se ve el marcador [MARCA POR DEFINIR].
*/

export type IdMarca = 'pendiente' | 'azahar' | 'getaway';

export interface Marca {
  id: IdMarca;
  /** Nombre corto que se ve en el logotipo */
  nombre: string;
  /** Nombre completo para textos y metadatos */
  nombreCompleto: string;
  etiquetaPropuesta?: string;
}

export const MARCAS: Record<IdMarca, Marca> = {
  pendiente: {
    id: 'pendiente',
    nombre: '[MARCA POR DEFINIR]',
    nombreCompleto: '[MARCA POR DEFINIR]',
  },
  azahar: {
    id: 'azahar',
    nombre: 'Azahar',
    nombreCompleto: 'Mehari Azahar',
    etiquetaPropuesta: 'Propuesta A · Mehari Azahar',
  },
  getaway: {
    id: 'getaway',
    nombre: 'Getaway',
    nombreCompleto: 'Mehari Getaway',
    etiquetaPropuesta: 'Propuesta B · Mehari Getaway',
  },
};

/** Contacto de la marca nueva. Pendiente: no usar los datos de la marca antigua. */
export const CONTACTO = {
  email: '[EMAIL POR DEFINIR]',
  /** Solo dígitos con prefijo, p. ej. '34600000000'. Vacío mientras no exista. */
  whatsapp: '',
  whatsappVisible: '[WHATSAPP POR DEFINIR]',
  instagram: '@[usuario_por_definir]',
  instagramUrl: '',
  zona: 'Sevilla · Cádiz',
};

export const contactoListo = () => CONTACTO.whatsapp.length > 0;

export function marcaDesdeUrl(): IdMarca {
  if (typeof window === 'undefined') return 'pendiente';
  const p = new URLSearchParams(window.location.search).get('marca');
  return p === 'azahar' || p === 'getaway' ? p : 'pendiente';
}

/** El selector de propuestas solo aparece en modo presentación (?marca=… o ?demo). */
export function modoPresentacion(): boolean {
  if (typeof window === 'undefined') return false;
  const q = new URLSearchParams(window.location.search);
  return q.has('marca') || q.has('demo');
}
