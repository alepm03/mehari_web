/*
  Datos de la marca. Fuente de verdad: Mehari/docs/cliente/brief.md.
  Nombre aprobado por el cliente el 2026-10-16. Nunca inventes datos aquí: lo pendiente va con marcador.
*/

export const MARCA = {
  /** Nombre que se ve en el logotipo, los textos y los metadatos */
  nombre: 'Mehari We',
  subtitulo: 'Weddings & Events',
};

/** Contacto de la marca nueva. No usar los datos de la marca antigua. */
export const CONTACTO = {
  email: '[EMAIL POR DEFINIR]',
  telefono: '+34625064293',
  telefonoVisible: '625 06 42 93',
  /** Solo dígitos con prefijo, para wa.me. Vacío si no hubiera WhatsApp. */
  whatsapp: '34625064293',
  instagram: '@[usuario_por_definir]',
  instagramUrl: '',
  zona: 'Sevilla · Cádiz',
};

export const contactoListo = () => CONTACTO.whatsapp.length > 0;
