import React, { useState } from 'react';
import { Language, CarColor } from '../types';
import { FREE_MONUMENTS_GUIDE, BUSINESS_INFO } from '../data/content';
import { RouteTimeline } from '../components/RouteTimeline';
import { BrandEmblem } from '../components/BrandEmblem';
import {
  Compass,
  Moon,
  Sparkles,
  Check,
  Clock,
  Users,
  Building,
  Car,
  Camera,
  MessageCircle,
  Info,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface ExperiencesPageProps {
  lang: Language;
  carColor: CarColor;
  onOpenBooking: () => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  lang,
  carColor,
  onOpenBooking,
}) => {
  const [selectedTour, setSelectedTour] = useState<'monumental' | 'nocturno' | 'medida'>('monumental');

  const tourTypes = [
    {
      id: 'monumental' as const,
      title: {
        es: 'Ruta Monumental',
        en: 'Monumental Tour',
      },
      tagline: {
        es: 'Recorrido por los principales lugares de interés cultural e histórico de Sevilla',
        en: 'Panoramic cruise through the crown jewels of Seville’s cultural heritage',
      },
      duration: '2 h — 2 h 30 min',
      timing: { es: 'Mañanas o tardes con luz dorada', en: 'Mornings or golden hour afternoons' },
      stopsHighlight: { es: '13 paradas · Plaza de América & Plaza de España', en: '13 landmarks · Plaza de América & Plaza de España' },
      icon: Compass,
    },
    {
      id: 'nocturno' as const,
      title: {
        es: 'Romántico / Nocturno Iluminado',
        en: 'Romantic / Illuminated Night Tour',
      },
      tagline: {
        es: 'Paseo de noche «donde el embrujo de la iluminación de la ciudad te enamora»',
        en: 'Evening open-top tour «where the spell of Seville’s warm illuminated monuments captures your heart»',
      },
      duration: '2 h',
      timing: { es: 'Al anochecer / Iluminación nocturna', en: 'Twilight & illuminated evening' },
      stopsHighlight: { es: 'Riberas del Guadalquivir, puentes y monumentos iluminados', en: 'Riverfront, illuminated bridges & monuments' },
      icon: Moon,
    },
    {
      id: 'medida' as const,
      title: {
        es: 'Experiencia a Medida',
        en: 'Tailor-Made Experience',
      },
      tagline: {
        es: '«¿Te imaginas confeccionar tu propio recorrido? Nosotros nos adaptamos a tu idea»',
        en: '«Can you imagine designing your own bespoke route? We adapt completely to your idea»',
      },
      duration: { es: 'Flexible según tu deseo', en: 'Custom flexible timing' },
      timing: { es: 'Cualquier franja horaria previa cita', en: 'Any agreed time slot' },
      stopsHighlight: { es: 'Itinerarios especiales, pedidas de mano, sesiones de fotos', en: 'Proposals, photo shoots, personalized stops' },
      icon: Sparkles,
    },
  ];

  const includedServices = [
    {
      title: { es: 'Recogida y regreso al hotel', en: 'Hotel pick-up & drop-off' },
      desc: {
        es: 'Te recogemos directamente en la puerta de tu hotel o alojamiento en Sevilla y te devolvemos con comodidad.',
        en: 'We collect you right at your hotel doorstep and return you comfortably at the end of the tour.',
      },
      icon: Building,
    },
    {
      title: { es: 'Citroën Méhari Clásico Restaurado', en: 'Restored Vintage Citroën Méhari' },
      desc: {
        es: 'Vehículo vintage impecable en color Naranja Hopi o Beige Colorado, techo abierto y asientos confortables.',
        en: 'Impeccable classic vehicle in Hopi Orange or Colorado Beige with open roof and relaxed seating.',
      },
      icon: Car,
    },
    {
      title: { es: 'Vehículo con Chófer Profesional', en: 'Professional Local Chauffeur' },
      desc: {
        es: 'Conducción experta, trato cercano y anécdotas auténticas sobre la historia y vida sevillana.',
        en: 'Expert local driver providing genuine insider stories of Seville’s history, architecture, and folklore.',
      },
      icon: Users,
    },
    {
      title: { es: 'Máximo 3 personas por coche', en: 'Max 3 guests per car' },
      desc: {
        es: 'Grupos de 1 a 3 personas en un coche, o hasta 6 personas viajando en convoy con nuestros dos Méhari.',
        en: '1 to 3 guests in a single car, or up to 6 people traveling in tandem convoy across both vehicles.',
      },
      icon: Users,
    },
    {
      title: { es: 'Mismo precio por coche (1-3 pax)', en: 'Flat rate per car (1-3 pax)' },
      desc: {
        es: 'La tarifa es por vehículo completo, sin suplementos si viajáis una, dos o tres personas.',
        en: 'Pricing is set per vehicle with no hidden surcharge whether you are 1, 2, or 3 passengers.',
      },
      icon: Sparkles,
    },
    {
      title: { es: 'Paradas fotográficas exclusivas', en: 'Dedicated photo stops' },
      desc: {
        es: 'Tiempo dedicado para bajaros y hacer fotos en Plaza de América y en la majestuosa Plaza de España.',
        en: 'Dedicated leisurely stops to step out and take photos at Plaza de América and Plaza de España.',
      },
      icon: Camera,
    },
  ];

  return (
    <div className="space-y-20 md:space-y-28 pt-4 pb-16">
      {/* =========================================================
          HERO SECTION — Sevilla Experience
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-14 shadow-sm mehari-ribbing relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1E6F6B]">
                <Compass className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Línea 2 · Sevilla Experience' : 'Line 2 · Seville Experience'}</span>
                <span aria-hidden="true">&middot;</span>
                <span>The Excursion</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-serif text-[#2A211B] leading-tight">
                {lang === 'es' ? (
                  <>
                    ¿Te imaginas conocer Sevilla desde un{' '}
                    <span className="italic font-light text-[#E8702A]">Citroën Méhari a cielo abierto?</span>
                  </>
                ) : (
                  <>
                    Can you imagine discovering Seville from an{' '}
                    <span className="italic font-light text-[#E8702A]">open-top vintage Citroën Méhari?</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#2A211B]/80 leading-relaxed">
                {lang === 'es'
                  ? '«The Excursion — Experience that will make your trip to Seville unique and special». Circulando por todo el centro monumental e histórico, con acceso privilegiado a calles y avenidas donde solo los vehículos autorizados pueden transitar.'
                  : '“The Excursion — Experience that will make your trip to Seville unique and special.” Gliding through the monumental historic center with privileged access to lanes reserved exclusively for authorized traffic.'}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Consultar Disponibilidad de Tour' : 'Inquire Tour Availability'}</span>
                </button>
                <span className="text-xs text-[#2A211B]/70">
                  {lang === 'es' ? 'Grupos de 1 a 6 personas (usando 1 o 2 coches)' : 'Groups from 1 to 6 people (1 or 2 cars)'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-[#F1E6CF] rounded-2xl border border-[#2A211B]/10 text-center mehari-ribbing">
              <BrandEmblem size={160} />
              <div className="mt-3 text-xs font-serif font-medium text-[#2A211B]">
                {lang === 'es' ? 'Emblema Oficial Sevilla Experience' : 'Official Seville Experience Seal'}
              </div>
              <p className="text-[11px] text-[#2A211B]/60 mt-0.5">
                {lang === 'es' ? 'La Giralda & Citroën Méhari a orillas del Guadalquivir' : 'La Giralda & Citroën Méhari along the Guadalquivir river'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3 TOUR MODALITIES
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
              {lang === 'es' ? 'Tipos de Tour' : 'Tour Modalities'}
            </span>
            <h2 className="text-3xl font-serif text-[#2A211B] mt-1">
              {lang === 'es' ? 'Elige tu forma de vivir Sevilla' : 'Choose your way to explore Seville'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tourTypes.map((tour) => {
              const Icon = tour.icon;
              const isSelected = selectedTour === tour.id;

              return (
                <div
                  key={tour.id}
                  onClick={() => setSelectedTour(tour.id)}
                  className={`bg-[#FAF6EE] rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2A211B] shadow-md ring-1 ring-[#2A211B]'
                      : 'border-[#2A211B]/15 hover:border-[#2A211B]/40'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F1E6CF] text-[#1E6F6B] flex items-center justify-center border border-[#2A211B]/10">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="text-xl font-serif text-[#2A211B]">{tour.title[lang]}</h3>
                      <p className="text-xs text-[#2A211B]/75 mt-1 leading-relaxed">{tour.tagline[lang]}</p>
                    </div>

                    <div className="space-y-1.5 pt-2 text-xs border-t border-[#2A211B]/10 text-[#2A211B]/80">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E8702A]" />
                        <span>
                          {typeof tour.duration === 'string' ? tour.duration : tour.duration[lang]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1E6F6B]" />
                        <span>{tour.timing[lang]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#2A211B]/10 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1E6F6B]">{tour.stopsHighlight[lang]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERACTIVE 13-STOP ROUTE TIMELINE
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RouteTimeline lang={lang} carColor={carColor} />
      </section>

      {/* =========================================================
          SERVICIO INCLUIDO (6 PILLARS)
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
              {lang === 'es' ? 'Compromiso & Calidad' : 'Included Services'}
            </span>
            <h2 className="text-3xl font-serif text-[#2A211B] mt-1">
              {lang === 'es' ? 'Todo incluido en tu experiencia' : 'Everything included in your experience'}
            </h2>
            <p className="text-xs sm:text-sm text-[#2A211B]/70 mt-1">
              {lang === 'es'
                ? 'Tarifa clara por vehículo (1, 2 o 3 personas pagan lo mismo), sin cargos ocultos ni sorpresas.'
                : 'Clear flat rate per car (1, 2, or 3 passengers pay the same), no hidden extras or surprises.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {includedServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-[#F1E6CF] p-5 rounded-xl border border-[#2A211B]/10 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF6EE] text-[#E8702A] flex items-center justify-center border border-[#2A211B]/10">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#2A211B]">{service.title[lang]}</h4>
                  <p className="text-xs text-[#2A211B]/75 leading-relaxed">{service.desc[lang]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          GUÍA PRÁCTICA: QUÉ VER GRATIS EN SEVILLA (SEO / Folleto)
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-semibold text-[#1E6F6B] uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>{lang === 'es' ? 'Guía Práctica del Folleto Oficial' : 'Practical Visitor Guide'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#2A211B] mt-1">
                {lang === 'es' ? 'Monumentos con Entrada Gratuita en Sevilla' : 'Free Monument Admission in Seville'}
              </h2>
            </div>
            <div className="text-xs text-[#2A211B]/60 max-w-xs">
              * {lang === 'es' ? 'Información orientativa del folleto. Consultar en páginas oficiales por posibles variaciones de temporada.' : 'Informative guide from brochure. Verify with official websites for seasonal changes.'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FREE_MONUMENTS_GUIDE.map((monument, idx) => (
              <div key={idx} className="bg-[#F1E6CF] p-4 rounded-xl border border-[#2A211B]/10 space-y-1.5">
                <h4 className="text-sm font-semibold text-[#2A211B]">{monument.name}</h4>
                <div className="text-xs font-medium text-[#1E6F6B]">{monument.freeSchedule[lang]}</div>
                <p className="text-[11px] text-[#2A211B]/70 leading-relaxed">{monument.note[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONVERSION CTA
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2A211B] text-[#FAF6EE] rounded-3xl p-8 md:p-12 text-center mehari-ribbing-dark space-y-5">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF6EE] max-w-xl mx-auto">
            {lang === 'es' ? 'Sevilla desde un descapotable de colección' : 'Seville from an authentic collector’s cabriolet'}
          </h2>
          <p className="text-sm text-[#FAF6EE]/75 max-w-lg mx-auto">
            {lang === 'es'
              ? 'Tours diarios previa reserva con chófer privado. Salidas desde tu hotel.'
              : 'Daily tours by advance booking with private chauffeur. Direct pick-up at your hotel.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'es' ? 'Reservar Tour por WhatsApp' : 'Book Tour on WhatsApp'}</span>
            </button>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF6EE] text-xs font-medium transition-colors"
            >
              {lang === 'es' ? 'Escribir Consulta' : 'Send an Email'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
