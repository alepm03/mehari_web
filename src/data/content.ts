import { TourStop, MonumentFreeGuide, WeddingFAQ } from '../types';

export const BUSINESS_INFO = {
  name: 'Mehari W&E',
  subtitle: 'Weddings & Experiences',
  phone: '+34 680 75 88 79',
  phoneClean: '34680758879',
  email: 'meharitoursur@gmail.com',
  instagram: '@mehari_toursur',
  instagramUrl: 'https://instagram.com/mehari_toursur',
  location: 'Sevilla, España',
  fleet: {
    orange: {
      name: 'Naranja Hopi Vintage',
      style: {
        es: 'Alegre, festivo y espectacular en fotografía de boda',
        en: 'Vibrant, festive, and striking in wedding photography',
      },
      hex: '#E8702A',
      secondaryHex: '#F69557',
    },
    beige: {
      name: 'Beige Colorado Clásico',
      style: {
        es: 'Elegante, sobrio y atemporal para celebraciones exclusivas',
        en: 'Elegant, timeless, and refined for classic celebrations',
      },
      hex: '#B58750',
      secondaryHex: '#D4B07D',
    },
  },
};

export const TOUR_STOPS: TourStop[] = [
  {
    id: 1,
    name: {
      es: 'Recogida en Hotel & Torre del Oro',
      en: 'Hotel Pick-up & Golden Tower (Torre del Oro)',
    },
    highlight: {
      es: 'Paseo de Colón y ribera del Guadalquivir',
      en: 'Paseo de Colón & Guadalquivir Riverbanks',
    },
    description: {
      es: 'Comenzamos recogiéndote en la puerta de tu hotel. Enfilamos el histórico Paseo de Colón con la Torre del Oro del siglo XIII dando la bienvenida al río.',
      en: 'We collect you directly at your hotel doorway. Cruise along historic Paseo de Colón as the 13th-century Torre del Oro guards the Guadalquivir river.',
    },
    category: 'monument',
  },
  {
    id: 2,
    name: {
      es: 'Paseo de las Delicias',
      en: 'Paseo de las Delicias',
    },
    highlight: {
      es: 'Arboledas señoriales y brisa fluvial',
      en: 'Stately tree avenues & river breezes',
    },
    description: {
      es: 'A orillas del Guadalquivir, deslizándonos entre palmeras y los pabellones históricos que anuncian la entrada a los grandes jardines.',
      en: 'Gliding along the Guadalquivir riverbanks under tall palms and historic pavilions welcoming you to Seville’s grand parks.',
    },
    category: 'scenic',
  },
  {
    id: 3,
    name: {
      es: 'Parque de María Luisa & Plaza de América',
      en: 'María Luisa Park & Plaza de América',
    },
    highlight: {
      es: 'Primera parada: Museo Arqueológico y Pabellón Mudéjar',
      en: 'First photo stop: Mudéjar Pavilion & Royal Gardens',
    },
    description: {
      es: 'Parada con el Méhari. Respira el aroma a azahar y eucalipto mientras contemplamos los pabellones de la Exposición de 1929 y los estanques de palomas.',
      en: 'Stop with the Méhari. Take in orange blossom aromas while admiring the 1929 Mudéjar pavilions and tranquil gardens.',
    },
    category: 'stop',
    isPhotoStop: true,
  },
  {
    id: 4,
    name: {
      es: 'Plaza de España',
      en: 'Plaza de España',
    },
    highlight: {
      es: 'Parada fotográfica estrella · Obra maestra de Aníbal González',
      en: 'Signature Photo Stop · Aníbal González Masterpiece',
    },
    description: {
      es: 'Momento mágico: parada para fotos junto a los puentes de cerámica y el canal semicircular. El Méhari en este escenario es una postal inolvidable.',
      en: 'The crown jewel photo stop by the glazed tile bridges and canal. The open-top Méhari against this backdrop makes an unforgettable memory.',
    },
    category: 'stop',
    isPhotoStop: true,
  },
  {
    id: 5,
    name: {
      es: 'Real Fábrica de Tabacos',
      en: 'Royal Tobacco Factory',
    },
    highlight: {
      es: 'Actual Universidad de Sevilla · Monumento industrial del s. XVIII',
      en: 'Current University of Seville · 18th-century landmark',
    },
    description: {
      es: 'El segundo edificio más grande de España tras El Escorial, cuna del mito universal de Carmen la cigarrera.',
      en: 'Spain’s second largest building after El Escorial, legendary birthplace of the worldwide opera Carmen.',
    },
    category: 'monument',
  },
  {
    id: 6,
    name: {
      es: 'Plaza de Cuba, Los Remedios & Triana',
      en: 'Plaza de Cuba & Triana District',
    },
    highlight: {
      es: 'Cruce del Guadalquivir hacia el arrabal marinero',
      en: 'Crossing the river into the historic artisan quarter',
    },
    description: {
      es: 'Cruzamos el río para sentir la personalidad única de Los Remedios y el barrio alfarero y flamenco de Triana.',
      en: 'We cross the river to feel the distinct bohemian soul of Seville’s famous pottery and flamenco quarter.',
    },
    category: 'bridge',
  },
  {
    id: 7,
    name: {
      es: 'Murallas de la Macarena & Calle San Luis',
      en: 'Macarena City Walls & San Luis Street',
    },
    highlight: {
      es: 'Basílica de la Macarena, San Luis de los Franceses y San Marcos',
      en: 'Macarena Basilica, San Luis de los Franceses & San Marcos',
    },
    description: {
      es: 'Muralla almorávide del siglo XII y la arteria barroca más fascinante de la ciudad, accesible de manera ágil y privilegiada en el Méhari.',
      en: '12th-century Moorish city walls followed by Seville’s most breathtaking baroque street, navigated effortlessly in the compact Méhari.',
    },
    category: 'monument',
  },
  {
    id: 8,
    name: {
      es: 'Setas de la Encarnación & Plaza del Duque',
      en: 'Metropol Parasol (Las Setas) & Plaza del Duque',
    },
    highlight: {
      es: 'La estructura de madera más grande del mundo',
      en: 'The world’s largest timber structure',
    },
    description: {
      es: 'Contraste vanguardista entre las curvas modernas de Jürgen Mayer y el pulso comercial tradicional del centro histórico.',
      en: 'Striking avant-garde timber architecture contrasting with the lively traditional street life of downtown Seville.',
    },
    category: 'monument',
  },
  {
    id: 9,
    name: {
      es: 'Alfalfa & Plaza del Salvador',
      en: 'Alfalfa Quarter & Plaza del Salvador',
    },
    highlight: {
      es: 'Corazón vibrante de tabernas y la colegiata barroca',
      en: 'Vibrant tavern square and collegiate baroque church',
    },
    description: {
      es: 'Calles angostas donde solo los vehículos autorizados pueden cruzar. El descapotable permite admirar los balcones de forja y el ambiente sevillano.',
      en: 'Narrow pedestrianized lanes open only to authorized cars. Look up from your open seat to ornate wrought-iron balconies and lively squares.',
    },
    category: 'scenic',
  },
  {
    id: 10,
    name: {
      es: 'Plaza de San Francisco & Catedral de Sevilla',
      en: 'Plaza de San Francisco & Seville Cathedral',
    },
    highlight: {
      es: 'Ayuntamiento plateresco, calle Hernando Colón y la Giralda',
      en: 'Plateresque City Hall, Hernando Colón street & the Giralda',
    },
    description: {
      es: 'Pasamos al pie de la mayor catedral gótica del mundo y el minarete de la Giralda recortado contra el cielo azul sevillano.',
      en: 'Glide beneath the largest Gothic cathedral in the world with the majestic Giralda tower towering into the open sky.',
    },
    category: 'monument',
  },
  {
    id: 11,
    name: {
      es: 'Avenida de la Constitución & Plaza de Toros',
      en: 'Avenida de la Constitución & Real Maestranza',
    },
    highlight: {
      es: 'García de Vinuesa, Paseo Colón y el coso del Baratillo',
      en: 'García de Vinuesa towards the iconic bullring on the river',
    },
    description: {
      es: 'Salida señorial hacia el río con la fachada ocre y blanca de la Plaza de Toros de la Maestranza.',
      en: 'Grand historic avenue opening back out towards the riverbanks alongside the white and ochre Maestranza arena.',
    },
    category: 'monument',
  },
  {
    id: 12,
    name: {
      es: 'Puente de Triana, Calle Betis & San Telmo',
      en: 'Triana Bridge, Calle Betis & San Telmo Palace',
    },
    highlight: {
      es: 'La panorámica fluvial más famosa y el palacio barroco',
      en: 'The most famous river panorama and Baroque palace',
    },
    description: {
      es: 'Vistas frontales de las casas de colores de calle Betis y la monumental portada del Palacio de San Telmo.',
      en: 'Stunning vistas across the water of the colorful Calle Betis facades and the magnificent entrance of San Telmo Palace.',
    },
    category: 'bridge',
  },
  {
    id: 13,
    name: {
      es: 'Regreso Confortable al Hotel',
      en: 'Comfortable Hotel Return',
    },
    highlight: {
      es: 'Fin de trayecto en la misma puerta de tu estancia',
      en: 'Door-to-door completion at your hotel',
    },
    description: {
      es: 'Concluimos una experiencia de más de 2 horas tras haber recorrido todo el casco monumental sin cansancio ni aglomeraciones.',
      en: 'We finish over 2 hours of pure open-air wonder, returning you relaxed right to your hotel entrance.',
    },
    category: 'scenic',
  },
];

export const FREE_MONUMENTS_GUIDE: MonumentFreeGuide[] = [
  {
    name: 'Archivo General de Indias',
    freeSchedule: {
      es: 'Entrada gratuita siempre (Martes a Domingo)',
      en: 'Free admission always (Tuesday to Sunday)',
    },
    note: {
      es: 'Junto a la Catedral. Custodia los documentos del descubrimiento de América.',
      en: 'Beside the Cathedral. Archives of the discovery of the New World.',
    },
  },
  {
    name: 'Torre del Oro',
    freeSchedule: {
      es: 'Lunes entrada gratuita (horario de mañana y tarde)',
      en: 'Free on Mondays (morning and afternoon slots)',
    },
    note: {
      es: 'Museo Marítimo en su interior y terraza mirador con vistas al río.',
      en: 'Naval museum inside with 360° river panorama terrace.',
    },
  },
  {
    name: 'Museo de Bellas Artes de Sevilla',
    freeSchedule: {
      es: 'Gratis ciudadanos UE siempre (No UE: 1,50 €)',
      en: 'Free for EU citizens always (Non-EU: €1.50)',
    },
    note: {
      es: 'Segunda pinacoteca más importante de España (Murillo, Zurbarán, Valdés Leal).',
      en: 'Spain’s second most important art gallery (Murillo, Zurbarán).',
    },
  },
  {
    name: 'Monasterio de la Cartuja (CAAC)',
    freeSchedule: {
      es: 'Martes a Viernes de 19:00 a 21:00 y Sábados 11:00 a 21:00',
      en: 'Tue–Fri 19:00–21:00 and Saturdays 11:00–21:00',
    },
    note: {
      es: 'Antigua fábrica de loza Pickman y Centro Andaluz de Arte Contemporáneo.',
      en: 'Historic monastery, former ceramic factory and contemporary art center.',
    },
  },
  {
    name: 'Basílica de la Macarena & Gran Poder',
    freeSchedule: {
      es: 'Acceso a templos gratuito diario en horario de culto',
      en: 'Free church access daily during worship hours',
    },
    note: {
      es: 'Los dos grandes devocionarios de la Semana Santa sevillana.',
      en: 'The two spiritual pillars of Holy Week in Seville.',
    },
  },
  {
    name: 'Conjunto Arqueológico de Itálica (Santiponce)',
    freeSchedule: {
      es: 'Gratis ciudadanos UE · A 15 min de Sevilla',
      en: 'Free for EU citizens · 15 min from Seville',
    },
    note: {
      es: 'Cuna de los emperadores Trajano y Adriano, anfiteatro romano colosal.',
      en: 'Birthplace of Trajan and Hadrian, colossal Roman amphitheater.',
    },
  },
];

export const WEDDING_FAQS: WeddingFAQ[] = [
  {
    question: {
      es: '¿Podemos conducir nosotros el Méhari el día de la boda?',
      en: 'Can we drive the Méhari ourselves on our wedding day?',
    },
    answer: {
      es: '¡Sí, por supuesto! Es uno de nuestros diferenciales más celebrados. Tanto si prefieres chófer profesional como si quieres conducir tú o un ser querido, incluimos una clase previa de conducción con el Méhari para familiarizarte con el cambio en el salpicadero y el tacto del coche. Así todo saldrá perfecto y con total tranquilidad.',
      en: 'Yes, absolutely! It is one of our most loved features. You can hire with a professional chauffeur or drive yourselves. If you choose to drive, we include a prior driving lesson so you master the dashboard gear lever and vintage handling with complete peace of mind.',
    },
  },
  {
    question: {
      es: '¿Cómo decoramos las cestas de mimbre traseras con flores?',
      en: 'How do the rear wicker baskets work for floral decoration?',
    },
    answer: {
      es: 'Nuestros Méhari cuentan con dos cestas de mimbre tradicionales en la parte trasera. Puedes pedir a tu florista que prepare arreglos a juego con tu ramo y paleta de la boda (eucalipto, peonías, olivo, buganvilla), o podemos orientaros con las medidas exactas para que luzcan perfectas.',
      en: 'Our Méharis feature two authentic wicker baskets on the rear. Your florist can create bespoke floral sprays matching your bridal bouquet and wedding theme (olive leaves, peonies, bougainvillea). We provide exact dimensions to ensure seamless fitting.',
    },
  },
  {
    question: {
      es: '¿Qué ocurre si el tiempo cambia o llueve?',
      en: 'What happens if the weather turns or it rains?',
    },
    answer: {
      es: 'El Citroën Méhari dispone de 3 configuraciones de capota modulares: completamente abierto, semiabierto (combinando protección y estilo) y completamente cerrado (con opción de techo solar). En caso de llovizna o frío, la capota vintage se monta de manera rápida garantizando que el peinado y el vestido de los novios permanezcan impecables.',
      en: 'The Méhari features 3 quick-adjust canvas roof configurations: fully open, semi-open, and fully enclosed (with an optional sunroof). If there is sudden wind or drizzle, the stylish vintage hood keeps you sheltered without losing classic charm.',
    },
  },
  {
    question: {
      es: '¿Hasta qué zonas y haciendas os desplazáis?',
      en: 'What areas and wedding haciendas do you cover?',
    },
    answer: {
      es: 'Cubrimos Sevilla capital, toda la provincia (Hacienda de la Soledad, Hacienda Los Ángeles, El Pino de San José, etc.), Aljarafe, pueblos de la vega y campiña, así como desplazamientos especiales a otras provincias de Andalucía y Extremadura previa consulta.',
      en: 'We cover Seville city, the entire province and renowned haciendas (Hacienda de la Soledad, Hacienda Los Ángeles, etc.), plus custom transfers across Andalusia and Extremadura upon request.',
    },
  },
  {
    question: {
      es: '¿Cuál es la diferencia entre el Méhari Naranja y el Beige?',
      en: 'What is the difference between the Orange and the Beige Méhari?',
    },
    answer: {
      es: 'Son dos personalidades visuales muy marcadas: el Naranja Hopi es alegre, divertido, mediterráneo y genera un contraste fotográfico espectacular con el blanco del vestido de novia. El Beige Colorado es sobrio, elegante, clásico y encaja a la perfección con estéticas campestres tradicionales y bodas en haciendas señoriales. ¡O incluso podéis contratar los dos juntos!',
      en: 'They embody two unique aesthetics: Hopi Orange is joyful, festive, Mediterranean and creates stunning photographic contrast with white wedding attire. Colorado Beige is stately, classic, and timeless for rustic haciendas and black-tie celebrations. You can even hire both in tandem!',
    },
  },
];
