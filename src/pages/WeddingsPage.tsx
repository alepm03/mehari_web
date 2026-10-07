import React, { useState } from 'react';
import { Language, CarColor } from '../types';
import { WEDDING_FAQS, BUSINESS_INFO } from '../data/content';
import { MehariIllustration } from '../components/MehariIllustration';
import { RoofConfigViewer } from '../components/RoofConfigViewer';
import {
  Heart,
  Sparkles,
  Check,
  ChevronDown,
  MessageCircle,
  Calendar,
  Flower2,
  KeyRound,
  ShieldCheck,
  Camera,
  Car,
} from 'lucide-react';

interface WeddingsPageProps {
  lang: Language;
  carColor: CarColor;
  setCarColor: (color: CarColor) => void;
  onOpenBooking: () => void;
}

export const WeddingsPage: React.FC<WeddingsPageProps> = ({
  lang,
  carColor,
  setCarColor,
  onOpenBooking,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isOrange = carColor === 'naranja';

  // Editorial gallery cards representing verified dossier wedding moments
  const galleryItems = [
    {
      title: {
        es: 'Hacienda de la Soledad & Haciendas Sevillanas',
        en: 'Hacienda de la Soledad & Seville Estates',
      },
      tag: { es: 'Entrada Triunfal', en: 'Grand Arrival' },
      desc: {
        es: 'Llegada de los novios bajo palmeras centenarias y arcos señoriales, recibidos con copas de bienvenida.',
        en: 'Arrival of the newlyweds under palms and historic whitewashed arches, welcomed with celebration toasts.',
      },
      tone: 'albero',
    },
    {
      title: {
        es: 'Salida de la Iglesia & Pasillo de Invitados',
        en: 'Church Departure & Cheering Guests',
      },
      tag: { es: 'Emoción Pura', en: 'Pure Emotion' },
      desc: {
        es: 'El descapotable permite a los novios ponerse de pie, saludar a sus invitados y vivir el aplauso a cielo abierto.',
        en: 'The open convertible allows couples to stand, wave to guests, and immerse in joyous applause under the sky.',
      },
      tone: 'orange',
    },
    {
      title: {
        es: 'Sesión Nupcial en Viñedos & «Just Married»',
        en: 'Vineyard Romance & «Just Married»',
      },
      tag: { es: 'Fotografía Editorial', en: 'Editorial Photography' },
      desc: {
        es: 'Cartel tradicional de recién casados colgado del portón estriado junto a las cestas de mimbre con flores.',
        en: 'Classic wooden Just Married sign hung upon the corrugated tailgate beside floral wicker baskets.',
      },
      tone: 'teal',
    },
    {
      title: {
        es: 'Bodas Multiculturales & Ceremonias Indias',
        en: 'Multicultural & Indian Wedding Ceremonies',
      },
      tag: { es: 'Versatilidad Total', en: 'Total Versatility' },
      desc: {
        es: 'Decorado con exuberantes guirnaldas de flores exóticas y telas tradicionales, adaptándose a cualquier cultura.',
        en: 'Adorned with opulent exotic flower garlands and fabrics, celebrating vibrant cultural traditions.',
      },
      tone: 'beige',
    },
    {
      title: {
        es: 'Campos de Golf & Atardeceres Andaluces',
        en: 'Golf Resorts & Andalusian Sunsets',
      },
      tag: { es: 'Luz Dorada', en: 'Golden Hour' },
      desc: {
        es: 'La silueta del Méhari recortada contra el horizonte al caer el sol, el momento favorito de los fotógrafos.',
        en: 'The unmistakable silhouette of the Méhari against the twilight skyline, the wedding photographer’s dream.',
      },
      tone: 'albero',
    },
    {
      title: {
        es: 'Calles Empedradas del Casco Histórico',
        en: 'Historic Seville Cobblestones',
      },
      tag: { es: 'Encanto Urbano', en: 'Urban Charm' },
      desc: {
        es: 'Ágil y compacto para sortear las esquinas de Santa Cruz, Alfalfa y las plazas con aroma a naranjo.',
        en: 'Compact and agile to navigate the narrow alleys of Santa Cruz and historic squares filled with citrus trees.',
      },
      tone: 'orange',
    },
  ];

  return (
    <div className="space-y-20 md:space-y-28 pt-4 pb-16">
      {/* =========================================================
          HERO SECTION — Bodas en Méhari
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-14 shadow-sm mehari-ribbing relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E8702A]">
                <Heart className="w-3.5 h-3.5 fill-[#E8702A]" />
                <span>{lang === 'es' ? 'Línea Bodas & Celebraciones' : 'Weddings & Celebrations Line'}</span>
                <span aria-hidden="true">&middot;</span>
                <span>Sevilla &amp; Haciendas</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-serif text-[#2A211B] leading-tight">
                {lang === 'es' ? (
                  <>
                    Haz de tu boda un evento inolvidable con un{' '}
                    <span className="italic font-light text-[#E8702A]">toque vintage, exclusivo y original.</span>
                  </>
                ) : (
                  <>
                    Make your wedding unforgettable with an{' '}
                    <span className="italic font-light text-[#E8702A]">exclusive, original vintage touch.</span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-[#2A211B]/80 leading-relaxed">
                {lang === 'es'
                  ? '«Nuestro clásico Méhari lo disfrutan tanto los novios como los propios invitados. Es del gusto de los más pequeños y de los más mayores. Es el clásico que enamora a todos».'
                  : '“Our classic Méhari is loved by bride and groom and all their wedding guests. Cherished by the youngest and the oldest alike. It is the icon that captures every heart.”'}
              </p>

              {/* Service highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-start gap-2 bg-[#F1E6CF] p-3 rounded-xl border border-[#2A211B]/10">
                  <Check className="w-4 h-4 text-[#1E6F6B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2A211B] block">
                      {lang === 'es' ? 'Traslado Nupcial Completo' : 'Full Bridal Transfer'}
                    </span>
                    <span className="text-[#2A211B]/70">
                      {lang === 'es' ? 'De la iglesia o ceremonia a la hacienda' : 'From church ceremony to the reception'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-[#F1E6CF] p-3 rounded-xl border border-[#2A211B]/10">
                  <KeyRound className="w-4 h-4 text-[#E8702A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#2A211B] block">
                      {lang === 'es' ? 'Con Chófer o Autoconducción' : 'Chauffeur or Self-Drive'}
                    </span>
                    <span className="text-[#2A211B]/70">
                      {lang === 'es' ? 'Con clase de conducción previa incluida' : 'Includes private driving lesson prior to wedding'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === 'es' ? 'Consultar Disponibilidad de Fecha' : 'Check Wedding Date Availability'}</span>
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phoneClean}`}
                  className="px-5 py-3.5 rounded-xl border border-[#2A211B]/20 text-xs font-medium text-[#2A211B] hover:bg-[#F1E6CF] transition-colors"
                >
                  {BUSINESS_INFO.phone}
                </a>
              </div>
            </div>

            {/* Right side illustration and car toggle */}
            <div className="lg:col-span-5 bg-[#F1E6CF] p-6 rounded-2xl border border-[#2A211B]/15 shadow-sm text-center">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-[#2A211B]/10">
                <span className="text-[#2A211B]/70 uppercase font-semibold">
                  {lang === 'es' ? 'Color para la boda:' : 'Wedding Color Scheme:'}
                </span>
                <span className="font-medium text-[#2A211B]">
                  {isOrange ? 'Naranja Hopi' : 'Beige Colorado'}
                </span>
              </div>

              <div className="py-4">
                <MehariIllustration color={carColor} roofConfig="abierto" showFlowers={true} />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setCarColor('naranja')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border cursor-pointer ${
                    isOrange
                      ? 'bg-[#E8702A] text-white border-[#E8702A]'
                      : 'bg-white/80 text-[#2A211B] border-[#2A211B]/10'
                  }`}
                >
                  <span>Naranja (Radiante)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCarColor('beige')}
                  className={`py-2 px-2 text-xs font-medium rounded-lg border cursor-pointer ${
                    !isOrange
                      ? 'bg-[#B58750] text-white border-[#B58750]'
                      : 'bg-white/80 text-[#2A211B] border-[#2A211B]/10'
                  }`}
                >
                  <span>Beige (Clásico)</span>
                </button>
              </div>

              <p className="text-[11px] text-[#2A211B]/60 mt-3">
                {lang === 'es'
                  ? '¿Dudas entre los dos? Puedes contratar ambos para cortejo y padrinos.'
                  : 'Undecided? You can hire both in tandem for couple and bridal party.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KEY DIFFERENTIATOR: CLASE DE CONDUCCIÓN PREVIA
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-[#E8702A]/15 text-[#E8702A] flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider block">
              {lang === 'es' ? 'Diferencial Exclusivo Mehari W&E' : 'Exclusive Mehari W&E Differentiator'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2A211B]">
              {lang === 'es'
                ? '¿Queréis conducir vosotros? Os damos una clase de conducción previa'
                : 'Want to drive yourselves? We provide a prior driving lesson'}
            </h2>
            <p className="text-base text-[#2A211B]/80 leading-relaxed">
              {lang === 'es'
                ? 'El Citroën Méhari tiene una conducción vintage única: cambio de marchas en el salpicadero, tacto suave y respuesta noble. Para que el día de la boda conduzcáis relajados, con una sonrisa y total dominio, os citamos con antelación para practicar.'
                : 'The Citroën Méhari offers a one-of-a-kind vintage driving experience with its classic dashboard gear lever and open-air response. To ensure you drive effortlessly with total tranquility on your big day, we meet beforehand for a full practice run.'}
            </p>
            <div className="inline-block bg-[#F1E6CF] px-5 py-2.5 rounded-xl border border-[#2A211B]/15 text-xs font-medium text-[#1E6F6B]">
              {lang === 'es'
                ? '«Así nos aseguramos de que todo salga perfecto y esté bajo control»'
                : '“This way we ensure everything runs smoothly and is 100% under control”'}
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#2A211B]/10">
            <div className="bg-[#F1E6CF] p-6 rounded-2xl border border-[#2A211B]/10 space-y-2">
              <div className="text-2xl font-serif text-[#E8702A]">01</div>
              <h3 className="text-base font-semibold text-[#2A211B]">
                {lang === 'es' ? 'Cita Previa Tranquila' : 'Relaxed Prior Session'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Quedamos unos días antes de la boda en una zona despejada para que el novio, la novia o el familiar que vaya a conducir se familiarice con el coche.'
                  : 'We arrange a comfortable session days before the wedding so bride, groom or loved one gets fully familiar with the car.'}
              </p>
            </div>

            <div className="bg-[#F1E6CF] p-6 rounded-2xl border border-[#2A211B]/10 space-y-2">
              <div className="text-2xl font-serif text-[#1E6F6B]">02</div>
              <h3 className="text-base font-semibold text-[#2A211B]">
                {lang === 'es' ? 'Dominio del Cambio & Embrague' : 'Gears & Clutch Handling'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Practicamos la palanca tipo «pistola» en el salpicadero, el ángulo de giro y la suavidad de frenada para una conducción elegante.'
                  : 'We guide you through the iconic dashboard lever, turning circle and gentle braking for graceful driving.'}
              </p>
            </div>

            <div className="bg-[#F1E6CF] p-6 rounded-2xl border border-[#2A211B]/10 space-y-2">
              <div className="text-2xl font-serif text-[#D9B27C]">03</div>
              <h3 className="text-base font-semibold text-[#2A211B]">
                {lang === 'es' ? 'El Gran Día: Confianza Total' : 'Wedding Day: Pure Confidence'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Entraréis a la hacienda conduciendo como si fuera vuestro coche de toda la vida, saludando a los invitados y disfrutando al máximo.'
                  : 'You will enter the hacienda driving with absolute poise, waving to guests and enjoying every second of the moment.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CESTAS DE MIMBRE & DECORACIÓN FLORAL
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
                {lang === 'es' ? 'Detalle de Autor' : 'Signature Craft'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2A211B]">
                {lang === 'es'
                  ? 'Dos cestas de mimbre traseras para decorar con flores'
                  : 'Two rear wicker baskets for bespoke floral arrangements'}
              </h2>
              <p className="text-sm sm:text-base text-[#2A211B]/80 leading-relaxed">
                {lang === 'es'
                  ? 'En la zaga de nuestros dos Méhari instalamos dos cestas de mimbre tradicionales trenzadas a mano. Son el soporte perfecto para que vuestro florista cree arreglos con ramas de olivo andaluz, eucalipto, peonías o flores silvestres a juego con la decoración de la ceremonia.'
                  : 'Mounted on the rear tailgate of our Méhari are two authentic handwoven wicker baskets. They serve as the ideal vessel for your wedding florist to arrange sprays with olive twigs, eucalyptus, peonies, and wild flowers in harmony with your venue.'}
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-center gap-2 text-[#2A211B]">
                  <Flower2 className="w-4 h-4 text-[#E8702A]" />
                  <span>{lang === 'es' ? 'Coordinación con tu florista o floristería de cabecera' : 'Seamless coordination with your wedding florist'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2A211B]">
                  <Check className="w-4 h-4 text-[#1E6F6B]" />
                  <span>{lang === 'es' ? 'Posibilidad de añadir cartel artesanal «Just Married»' : 'Option to attach rustic «Just Married» calligraphy sign'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2A211B]">
                  <Camera className="w-4 h-4 text-[#D9B27C]" />
                  <span>{lang === 'es' ? 'El plano trasero favorito para el reportaje fotográfico' : 'Photographers’ favorite rear portrait angle'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#F1E6CF] p-8 rounded-2xl border border-[#2A211B]/15 mehari-ribbing text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF6EE] text-[#E8702A] flex items-center justify-center border border-[#2A211B]/10">
                <Flower2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif text-[#2A211B]">
                {lang === 'es' ? 'Personalización Floral Total' : 'Total Floral Customization'}
              </h3>
              <p className="text-xs text-[#2A211B]/80 max-w-sm mx-auto leading-relaxed">
                {lang === 'es'
                  ? 'Facilitamos las medidas exactas de las cestas a vuestro florista para que los centros encajen con firmeza y aguanten todo el trayecto sin descolocarse.'
                  : 'We supply exact inner dimensions to your florist so arrangements fit snugly and stay pristine throughout the journey.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3 ROOF CONFIGURATIONS IN WEDDINGS CONTEXT
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoofConfigViewer color={carColor} lang={lang} />
      </section>

      {/* =========================================================
          EDITORIAL ASYMMETRIC GALLERY (36 Pages Dossier Proofs)
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div>
            <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
              {lang === 'es' ? 'Galería Editorial · Dossier Real' : 'Editorial Gallery · Real Dossier'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2A211B] mt-1">
              {lang === 'es' ? 'Bodas reales en Sevilla y haciendas' : 'Real Weddings Across Seville & Haciendas'}
            </h2>
            <p className="text-sm text-[#2A211B]/70 max-w-2xl mt-1">
              {lang === 'es'
                ? 'Pruebas visuales del dossier de bodas de Mehari W&E: celebraciones en haciendas centenarias, cascos antiguos y enlaces de ensueño.'
                : 'Documented moments from the Mehari W&E wedding archive: celebrations across heritage estates, historic streets, and dreamy sunsets.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF6EE] rounded-2xl p-6 border border-[#2A211B]/12 shadow-xs hover:border-[#2A211B]/30 transition-all flex flex-col justify-between mehari-ribbing"
              >
                <div>
                  <span className="text-xs font-semibold text-[#E8702A] block mb-2">
                    {item.tag[lang]}
                  </span>
                  <h3 className="text-xl font-serif text-[#2A211B] mb-2">{item.title[lang]}</h3>
                  <p className="text-xs text-[#2A211B]/75 leading-relaxed">{item.desc[lang]}</p>
                </div>
                <div className="pt-6 mt-4 border-t border-[#2A211B]/10 flex items-center justify-between text-xs text-[#2A211B]/50">
                  <span>Mehari W&amp;E Bodas</span>
                  <Camera className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ ACCORDION
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
              {lang === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
            </span>
            <h2 className="text-3xl font-serif text-[#2A211B] mt-1">
              {lang === 'es' ? 'Todo lo que necesitáis saber' : 'Everything you need to know'}
            </h2>
          </div>

          <div className="space-y-3">
            {WEDDING_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#F1E6CF] rounded-xl border border-[#2A211B]/10 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#2A211B]">
                      {faq.question[lang]}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#2A211B]/60 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#E8702A]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#2A211B]/80 leading-relaxed border-t border-[#2A211B]/10">
                      {faq.answer[lang]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONVERSION CTA
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2A211B] text-[#FAF6EE] rounded-3xl p-8 md:p-12 text-center mehari-ribbing-dark space-y-5">
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF6EE] max-w-xl mx-auto">
            {lang === 'es' ? '¿Nos vemos el día de tu boda?' : 'Shall we share your special day?'}
          </h2>
          <p className="text-sm text-[#FAF6EE]/75 max-w-lg mx-auto leading-relaxed">
            {lang === 'es'
              ? 'Las fechas de primavera y otoño en Sevilla se reservan con meses de antelación. Consúltanos sin compromiso.'
              : 'Spring and autumn wedding dates in Seville book out months in advance. Get in touch to check availability.'}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'es' ? 'Consultar Disponibilidad por WhatsApp' : 'Inquire on WhatsApp'}</span>
            </button>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF6EE] text-xs font-medium transition-colors"
            >
              {lang === 'es' ? 'Escribir por Email' : 'Send us an Email'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
