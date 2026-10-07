/*
  Textos de la web. Todo sale de Mehari/docs/cliente/brief.md: si un dato no está allí, no se escribe.
  Para añadir fotos de bodas nuevas basta con sumarlas a GALERIA (y dejarlas en public/img).
*/
import type { Texto } from '../i18n/contexto';

export const NAV: { id: string; texto: Texto }[] = [
  { id: 'bodas', texto: { es: 'Bodas', en: 'Weddings' } },
  { id: 'coche', texto: { es: 'El coche', en: 'The car' } },
  { id: 'sevilla', texto: { es: 'Sevilla Experience', en: 'Sevilla Experience' } },
  { id: 'galeria', texto: { es: 'Galería', en: 'Gallery' } },
];

export const CTA_PRESUPUESTO: Texto = { es: 'Pedir presupuesto', en: 'Request a quote' };

export const HERO = {
  supra: { es: 'Bodas y paseos en Citroën Méhari', en: 'Weddings & rides in a Citroën Méhari' },
  lineas: [
    { es: 'El clásico', en: 'The classic' },
    { es: 'que enamora', en: 'everyone' },
    { es: 'a todos.', en: 'falls for.' },
  ] as Texto[],
  sub: {
    es: 'Dos Méhari originales, uno naranja y otro beige, para el día de vuestra boda en Sevilla y Cádiz.',
    en: 'Two original Méharis, one orange and one beige, for your wedding day in Seville and Cádiz.',
  },
  verCoche: { es: 'Ver el coche', en: 'See the car' },
  diapositivas: [
    { src: '/img/llegada-hacienda.webp', pie: { es: 'Llegada a la hacienda', en: 'Arriving at the hacienda' }, foco: '60% 55%' },
    { src: '/img/naranja-campo.webp', pie: { es: 'Camino de la celebración', en: 'On the way to the party' }, foco: '50% 60%' },
    { src: '/img/novia-sombrero.webp', pie: { es: 'El beige, en el campo', en: 'The beige one, in the countryside' }, foco: '45% 50%' },
    { src: '/img/salida-iglesia.webp', pie: { es: 'Salida de la iglesia', en: 'Leaving the church' }, foco: '55% 40%' },
  ],
};

export const MANIFIESTO = {
  texto: {
    es: 'Haced de vuestro día un día inolvidable, único y original. Salid de la iglesia en un clásico de verdad y llegad a la hacienda como en una película.',
    en: 'Make your day unforgettable, unique and original. Leave the church in a true classic and arrive at the hacienda like in a film.',
  },
  datos: [
    { cifra: '1968–1988', texto: { es: 'Años en que se fabricó el Méhari', en: 'Years the Méhari was built' } },
    { cifra: '2', texto: { es: 'Coches: naranja y beige', en: 'Cars: orange and beige' } },
    { cifra: '3', texto: { es: 'Techos: abierto, semiabierto o cerrado', en: 'Roofs: open, half-open or closed' } },
    { cifra: '2', texto: { es: 'Cestas de mimbre para vuestras flores', en: 'Wicker baskets for your flowers' } },
  ],
};

export const EL_DIA = {
  etiqueta: { es: 'Bodas y eventos', en: 'Weddings & events' },
  titulo: { es: 'Vuestro día, *en un clásico*', en: 'Your day, *in a classic*' },
  capitulos: [
    {
      num: '01',
      titulo: { es: 'La salida', en: 'The exit' },
      texto: {
        es: 'Salís de la iglesia y os espera el Méhari, con los invitados alrededor.',
        en: 'You step out of the church and the Méhari is waiting, with your guests all around.',
      },
      foto: '/img/salida-iglesia-2.webp',
      foto2: '/img/calle-flores.webp',
    },
    {
      num: '02',
      titulo: { es: 'El camino', en: 'The drive' },
      texto: {
        es: 'Con chófer, o al volante vosotros: antes de la boda os damos una clase de conducción para que todo esté bajo control.',
        en: 'With a driver, or at the wheel yourselves: before the wedding we give you a driving lesson so everything is under control.',
      },
      foto: '/img/saludo-naranja.webp',
      foto2: '/img/desde-atras.webp',
    },
    {
      num: '03',
      titulo: { es: 'La llegada', en: 'The arrival' },
      texto: {
        es: 'Hasta la hacienda o el lugar de la celebración, por Sevilla y la provincia de Cádiz.',
        en: 'All the way to the hacienda or venue, across Seville and the province of Cádiz.',
      },
      foto: '/img/arco.webp',
      foto2: '/img/hacienda-naranja.webp',
    },
    {
      num: '04',
      titulo: { es: 'El recuerdo', en: 'The memory' },
      texto: {
        es: 'Lo disfrutan los novios y los invitados, los pequeños y los mayores. Éxito asegurado.',
        en: 'Loved by the couple and the guests, by kids and grandparents alike. A safe bet.',
      },
      foto: '/img/novios-hacienda.webp',
      foto2: '/img/beige-atardecer.webp',
    },
  ],
};

export const TALLER = {
  etiqueta: { es: 'El coche', en: 'The car' },
  titulo: { es: 'Elegid *el vuestro*', en: 'Choose *yours*' },
  intro: {
    es: 'Dos Citroën Méhari originales. Giradlo, cambiad el color, el techo y las flores.',
    en: 'Two original Citroën Méharis. Spin it, change the colour, the roof and the flowers.',
  },
  arrastra: { es: 'Arrastra para girar', en: 'Drag to rotate' },
  color: { es: 'Color', en: 'Colour' },
  colores: {
    naranja: { nombre: { es: 'Naranja', en: 'Orange' }, hex: '#EE7D1F' },
    beige: { nombre: { es: 'Beige', en: 'Beige' }, hex: '#DCC6A0' },
  },
  techo: { es: 'Techo', en: 'Roof' },
  techos: {
    abierto: {
      nombre: { es: 'Abierto', en: 'Open' },
      texto: { es: 'Capota recogida atrás. Para días de sol y ver el paisaje sin obstáculos.', en: 'Hood folded at the back. For sunny days and unobstructed views.' },
    },
    semiabierto: {
      nombre: { es: 'Semiabierto', en: 'Half-open' },
      texto: { es: 'La capota llega hasta la mitad del coche. Estilo y protección.', en: 'The hood covers half of the car. Style and protection.' },
    },
    cerrado: {
      nombre: { es: 'Cerrado', en: 'Closed' },
      texto: { es: 'Cerrado, con techo solar. Privacidad o protección si el tiempo es incierto.', en: 'Closed, with a sunroof. Privacy, or cover if the weather is uncertain.' },
    },
  },
  flores: { es: 'Cestas con flores', en: 'Baskets with flowers' },
  floresTexto: {
    es: 'Dos cestas de mimbre atrás para decorar con flores.',
    en: 'Two wicker baskets at the back to decorate with flowers.',
  },
};

export const PRENSA = {
  etiqueta: { es: 'Lo que se ha visto', en: 'As seen' },
  cita: {
    es: 'Los novios se despiden ante el templo «en un informal Mehari».',
    en: 'The newlyweds wave goodbye outside the church “in a casual Mehari”.',
  },
  fuente: { es: 'Diario de Sevilla · Pasarela · 19 de octubre de 2025', en: 'Diario de Sevilla · Pasarela · 19 October 2025' },
  boda: {
    es: 'Boda de Alberto Herrera y Blanca Llandres en Sanlúcar de Barrameda.',
    en: 'Wedding of Alberto Herrera and Blanca Llandres in Sanlúcar de Barrameda.',
  },
  herrera: { es: 'Carlos Herrera, al volante del Méhari naranja.', en: 'Carlos Herrera at the wheel of the orange Méhari.' },
};

export const SEVILLA = {
  etiqueta: { es: 'Sevilla Experience', en: 'Sevilla Experience' },
  titulo: { es: 'Sevilla, *a cielo abierto*', en: 'Seville, *under open skies*' },
  intro: {
    es: 'Un paseo por Sevilla en Méhari con chófer. Te recogemos en el hotel y nos adaptamos a tu idea.',
    en: 'A ride around Seville in a Méhari with a driver. We pick you up at your hotel and adapt to your plans.',
  },
  datos: [
    { es: '2 h – 2 h 30', en: '2 h – 2 h 30' },
    { es: 'Recogida en el hotel', en: 'Hotel pick-up' },
    { es: 'Hasta 3 personas por coche, mismo precio', en: 'Up to 3 people per car, same price' },
    { es: 'De 1 a 6 personas con los dos coches', en: '1 to 6 people with both cars' },
  ] as Texto[],
  tours: {
    monumental: { es: 'Monumental', en: 'Monumental' },
    romantico: { es: 'Romántico · iluminado', en: 'Romantic · lit up' },
  },
  rutaBase: { es: 'Ruta base · personalizable', en: 'Base route · customisable' },
  parada: { es: 'Parada', en: 'Stop' },
  paradaFoto: { es: 'Parada para fotos', en: 'Photo stop' },
  reservar: { es: 'Reservar el paseo', en: 'Book the ride' },
  sigue: { es: 'Sigue bajando y el Méhari hace la ruta', en: 'Keep scrolling and the Méhari drives the route' },
  rio: { es: 'Guadalquivir', en: 'Guadalquivir' },
  parque: { es: 'Parque de María Luisa', en: 'María Luisa Park' },
  casco: { es: 'Casco antiguo', en: 'Old town' },
};

/** Coordenadas aproximadas [latitud, longitud] */
export type Coord = [number, number];

export interface Parada {
  id: string;
  nombre: Texto;
  nota: Texto;
  coord: Coord;
  foto?: string;
  fotoParada?: boolean;
}

/**
 * Ruta base del folleto (brief, línea 2). Las paradas con nombre se ven en el mapa;
 * los puntos de paso solo sirven para que el trazado siga las calles a grandes rasgos.
 */
export const RUTA: (Parada | Coord)[] = [
  { id: 'torre-oro', nombre: { es: 'Torre del Oro', en: 'Torre del Oro' }, nota: { es: 'Te recogemos en tu hotel y empezamos a orillas del Guadalquivir.', en: 'We pick you up at your hotel and start on the banks of the Guadalquivir.' }, coord: [37.3824, -5.9964], foto: '/img/torre-oro.webp' },
  [37.3795, -5.9952],
  { id: 'delicias', nombre: { es: 'Paseo de las Delicias', en: 'Paseo de las Delicias' }, nota: { es: 'Junto al río, camino del parque.', en: 'Along the river, towards the park.' }, coord: [37.3765, -5.9938] },
  [37.3728, -5.9912],
  { id: 'plaza-america', nombre: { es: 'Plaza de América', en: 'Plaza de América' }, nota: { es: 'Primera parada en el Parque de María Luisa.', en: 'First stop in María Luisa Park.' }, coord: [37.3703, -5.9878], fotoParada: true },
  [37.3735, -5.9858],
  { id: 'plaza-espana', nombre: { es: 'Plaza de España', en: 'Plaza de España' }, nota: { es: 'Parada para fotos.', en: 'Photo stop.' }, coord: [37.3772, -5.9868], fotoParada: true },
  { id: 'tabacos', nombre: { es: 'Fábrica de Tabacos', en: 'Royal Tobacco Factory' }, nota: { es: 'Hoy, Universidad de Sevilla.', en: 'Today, the University of Seville.' }, coord: [37.3806, -5.9913] },
  [37.3811, -5.9972],
  { id: 'plaza-cuba', nombre: { es: 'Plaza de Cuba · Los Remedios', en: 'Plaza de Cuba · Los Remedios' }, nota: { es: 'Cruzamos el río.', en: 'We cross the river.' }, coord: [37.3793, -5.9996], foto: '/img/rio.webp' },
  [37.3828, -6.0026],
  { id: 'triana', nombre: { es: 'Triana', en: 'Triana' }, nota: { es: 'El barrio al otro lado del puente.', en: 'The neighbourhood across the bridge.' }, coord: [37.3866, -6.0036] },
  [37.3950, -6.0062],
  [37.4032, -6.0028],
  [37.4040, -5.9955],
  { id: 'macarena', nombre: { es: 'Murallas de la Macarena', en: 'Macarena city walls' }, nota: { es: 'Entramos en el casco antiguo por el norte.', en: 'Into the old town from the north.' }, coord: [37.4028, -5.9892] },
  { id: 'san-luis', nombre: { es: 'Calle San Luis', en: 'Calle San Luis' }, nota: { es: 'Bajando hacia el centro.', en: 'Heading down to the centre.' }, coord: [37.3978, -5.9877] },
  { id: 'setas', nombre: { es: 'Setas de la Encarnación', en: 'Las Setas (Metropol Parasol)' }, nota: { es: 'La Sevilla más moderna.', en: 'Modern Seville.' }, coord: [37.3934, -5.9918] },
  { id: 'duque', nombre: { es: 'Plaza del Duque', en: 'Plaza del Duque' }, nota: { es: 'Centro comercial de la ciudad.', en: 'The shopping heart of the city.' }, coord: [37.3929, -5.9962] },
  [37.3906, -5.9930],
  { id: 'alfalfa', nombre: { es: 'Alfalfa', en: 'Alfalfa' }, nota: { es: 'Calles estrechas del centro.', en: 'Narrow streets of the centre.' }, coord: [37.3898, -5.9894] },
  { id: 'salvador', nombre: { es: 'El Salvador', en: 'El Salvador' }, nota: { es: 'Plaza e iglesia del Salvador.', en: 'El Salvador square and church.' }, coord: [37.3888, -5.9930] },
  { id: 'san-francisco', nombre: { es: 'Plaza de San Francisco', en: 'Plaza de San Francisco' }, nota: { es: 'Junto al Ayuntamiento.', en: 'Next to the City Hall.' }, coord: [37.3879, -5.9946] },
  { id: 'catedral', nombre: { es: 'Catedral', en: 'Cathedral' }, nota: { es: 'La Catedral y la Giralda.', en: 'The Cathedral and the Giralda.' }, coord: [37.3858, -5.9932], foto: '/img/catedral.webp' },
  [37.3862, -5.9968],
  { id: 'toros', nombre: { es: 'Paseo Colón · Plaza de Toros', en: 'Paseo Colón · Bullring' }, nota: { es: 'De nuevo junto al río.', en: 'Back by the river.' }, coord: [37.3866, -5.9987] },
  { id: 'betis', nombre: { es: 'Puente de Triana · calle Betis', en: 'Triana Bridge · Calle Betis' }, nota: { es: 'Las fachadas de colores frente al río.', en: 'Colourful façades facing the river.' }, coord: [37.3836, -6.0012] },
  [37.3812, -5.9978],
  { id: 'san-telmo', nombre: { es: 'Palacio de San Telmo', en: 'San Telmo Palace' }, nota: { es: 'De vuelta hacia el parque.', en: 'Heading back to the park.' }, coord: [37.3808, -5.9940], foto: '/img/san-telmo.webp' },
  [37.3790, -5.9895],
  { id: 'vuelta', nombre: { es: 'Plaza de España y vuelta al hotel', en: 'Plaza de España and back to the hotel' }, nota: { es: 'Último vistazo y te dejamos en el hotel.', en: 'One last look and we drop you at your hotel.' }, coord: [37.3775, -5.9862] },
];

/** Cauce del Guadalquivir (canal de Alfonso XIII), de norte a sur */
export const RIO: Coord[] = [
  [37.4120, -6.0010], [37.4060, -6.0022], [37.4000, -6.0042], [37.3950, -6.0048],
  [37.3905, -6.0034], [37.3868, -6.0018], [37.3842, -6.0001], [37.3818, -5.9986],
  [37.3790, -5.9974], [37.3750, -5.9962], [37.3700, -5.9948], [37.3640, -5.9938],
];

export const PARQUE: Coord[] = [
  [37.3800, -5.9908], [37.3792, -5.9866], [37.3755, -5.9848], [37.3700, -5.9858],
  [37.3688, -5.9890], [37.3720, -5.9918], [37.3765, -5.9922],
];

export const CASCO: Coord[] = [
  [37.4045, -5.9950], [37.4038, -5.9862], [37.3990, -5.9832], [37.3920, -5.9838],
  [37.3870, -5.9872], [37.3838, -5.9925], [37.3850, -5.9978], [37.3905, -5.9995],
  [37.3975, -5.9990],
];

export const GALERIA: { src: string; alt: Texto; formato: 'v' | 'h' }[] = [
  { src: '/img/ramo-hacienda.webp', alt: { es: 'La novia lanza el ramo desde el Méhari naranja', en: 'The bride throws the bouquet from the orange Méhari' }, formato: 'v' },
  { src: '/img/beso-beige.webp', alt: { es: 'Los novios en el Méhari beige', en: 'The couple in the beige Méhari' }, formato: 'h' },
  { src: '/img/padrino-beige.webp', alt: { es: 'La novia baja del Méhari beige', en: 'The bride steps out of the beige Méhari' }, formato: 'v' },
  { src: '/img/novia-sonrisa.webp', alt: { es: 'Novia sonriendo en el Méhari', en: 'Bride smiling in the Méhari' }, formato: 'h' },
  { src: '/img/patio-naranja.webp', alt: { es: 'El Méhari naranja en el patio de una hacienda', en: 'The orange Méhari in a hacienda courtyard' }, formato: 'v' },
  { src: '/img/invitados-beige.webp', alt: { es: 'Invitados alrededor del Méhari beige', en: 'Guests around the beige Méhari' }, formato: 'h' },
  { src: '/img/blanco-negro.webp', alt: { es: 'El Méhari beige tras una reja', en: 'The beige Méhari behind a window grille' }, formato: 'v' },
  { src: '/img/novios-beige.webp', alt: { es: 'Novios abrazados en el Méhari', en: 'Couple embracing in the Méhari' }, formato: 'h' },
  { src: '/img/beige-puerta.webp', alt: { es: 'El Méhari beige entra por la puerta de la hacienda', en: 'The beige Méhari arrives through the hacienda gate' }, formato: 'h' },
  { src: '/img/camino-palmeras.webp', alt: { es: 'El Méhari naranja por un camino de palmeras', en: 'The orange Méhari on a palm-lined road' }, formato: 'h' },
];

export const GALERIA_TEXTO = {
  etiqueta: { es: 'Galería', en: 'Gallery' },
  titulo: { es: 'Bodas *en Méhari*', en: 'Weddings *in a Méhari*' },
};

export const PREGUNTAS = {
  etiqueta: { es: 'Preguntas', en: 'Questions' },
  lista: [
    {
      p: { es: '¿Podemos conducirlo nosotros?', en: 'Can we drive it ourselves?' },
      r: {
        es: 'Sí. Puede ir con chófer o conducirlo los novios o una persona cercana. Si lo conducís, os damos una clase de conducción antes de la boda para que todo salga perfecto.',
        en: 'Yes. It can come with a driver, or be driven by the couple or someone close. If you drive, we give you a driving lesson before the wedding so everything goes perfectly.',
      },
    },
    {
      p: { es: '¿Y si llueve o hace mucho sol?', en: 'What if it rains or it’s very sunny?' },
      r: {
        es: 'El techo tiene tres configuraciones: abierto, semiabierto y cerrado con techo solar. Se elige según el día.',
        en: 'The roof has three set-ups: open, half-open and closed with a sunroof. We pick one depending on the day.',
      },
    },
    {
      p: { es: '¿Dónde trabajáis?', en: 'Where do you operate?' },
      r: {
        es: 'En Sevilla y en la provincia de Cádiz, sobre todo en iglesias y haciendas.',
        en: 'In Seville and the province of Cádiz, mostly churches and haciendas.',
      },
    },
    {
      p: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
      r: {
        es: 'Cada día es distinto. Escribidnos con la fecha y el lugar y os respondemos con la disponibilidad y el presupuesto. Te atenderemos de forma personalizada, siempre.',
        en: 'Every day is different. Send us the date and place and we’ll reply with availability and a quote. Personal attention, always.',
      },
    },
  ],
};

export const CONTACTO_TEXTO = {
  etiqueta: { es: 'Contacto', en: 'Contact' },
  titulo: { es: '¿Hablamos de *vuestro día*?', en: 'Shall we talk about *your day*?' },
  intro: {
    es: 'Contadnos la fecha y el lugar. Os respondemos con disponibilidad y presupuesto.',
    en: 'Tell us the date and place. We’ll reply with availability and a quote.',
  },
  campos: {
    nombre: { es: 'Vuestro nombre', en: 'Your name' },
    servicio: { es: 'Qué buscáis', en: 'What you’re after' },
    fecha: { es: 'Fecha', en: 'Date' },
    lugar: { es: 'Iglesia, hacienda o lugar', en: 'Church, hacienda or venue' },
    coche: { es: 'Coche', en: 'Car' },
    mensaje: { es: 'Algo más que debamos saber', en: 'Anything else we should know' },
  },
  servicios: {
    boda: { es: 'Boda', en: 'Wedding' },
    tour: { es: 'Sevilla Experience', en: 'Sevilla Experience' },
    otro: { es: 'Otro evento', en: 'Other event' },
  },
  coches: {
    naranja: { es: 'Naranja', en: 'Orange' },
    beige: { es: 'Beige', en: 'Beige' },
    dos: { es: 'Los dos', en: 'Both' },
    igual: { es: 'Nos da igual', en: 'No preference' },
  },
  enviar: { es: 'Enviar por WhatsApp', en: 'Send via WhatsApp' },
  pendiente: {
    es: 'El WhatsApp de la marca aún no está configurado. Este es el mensaje que se enviaría:',
    en: 'The brand’s WhatsApp is not configured yet. This is the message that would be sent:',
  },
};
