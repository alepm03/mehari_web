import React from 'react';
import { Language, CarColor } from '../types';
import { BUSINESS_INFO } from '../data/content';
import { MehariIllustration } from '../components/MehariIllustration';
import { RoofConfigViewer } from '../components/RoofConfigViewer';
import { RouteTimeline } from '../components/RouteTimeline';
import { BrandEmblem } from '../components/BrandEmblem';
import {
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Compass,
  CheckCircle,
  MessageCircle,
  Camera,
  MapPin,
  Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  lang: Language;
  carColor: CarColor;
  setCarColor: (color: CarColor) => void;
  onOpenBooking: (service?: 'boda' | 'tour') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  carColor,
  setCarColor,
  onOpenBooking,
}) => {
  const isOrange = carColor === 'naranja';

  return (
    <div className="space-y-20 md:space-y-28">
      {/* =========================================================
          HERO SECTION — Split Asimétrico 60/40
      ========================================================= */}
      <section className="relative pt-6 md:pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 60% — Value Proposition & Two Doors */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed natural metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E8702A]">
                <span>Citroën Méhari Clásicos</span>
                <span aria-hidden="true">&middot;</span>
                <span>Sevilla &amp; Hacienda Weddings</span>
                <span aria-hidden="true">&middot;</span>
                <span>1968–1988</span>
              </div>

              {/* Headline with text-wrap balance */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2A211B] tracking-tight leading-[1.08] [text-wrap:balance]">
                {lang === 'es' ? (
                  <>
                    El clásico que <span className="italic font-light text-[#E8702A]">enamora a todos.</span>
                  </>
                ) : (
                  <>
                    The vintage icon that <span className="italic font-light text-[#E8702A]">enchants everyone.</span>
                  </>
                )}
              </h1>

              <p className="text-lg text-[#2A211B]/80 leading-relaxed max-w-2xl">
                {lang === 'es'
                  ? 'Salida de iglesia, entrada de cine. Sevilla a cielo abierto en dos Citroën Méhari restaurados con esmero para bodas inolvidables y rutas monumentales exclusivas.'
                  : 'Church departure, cinematic grand entrance. Experience Seville under the open sky in two meticulously restored vintage Citroën Méhari for weddings and luxury tours.'}
              </p>

              {/* In-Hero Car Selector Toggle (Orange vs Beige) */}
              <div className="p-3.5 bg-[#FAF6EE] rounded-xl border border-[#2A211B]/12 max-w-md shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#2A211B]/70 mb-2">
                  <span className="font-semibold uppercase tracking-wider">
                    {lang === 'es' ? 'Elige tu estética Méhari:' : 'Select your Méhari aesthetic:'}
                  </span>
                  <span className="text-[#E8702A] font-medium">
                    {isOrange ? 'Naranja Hopi' : 'Beige Colorado'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCarColor('naranja')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      isOrange
                        ? 'bg-[#E8702A] text-white border-[#E8702A] shadow-xs'
                        : 'bg-[#F1E6CF] text-[#2A211B] border-[#2A211B]/15 hover:border-[#2A211B]/40'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    <span>Naranja (Alegre &amp; Festivo)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarColor('beige')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      !isOrange
                        ? 'bg-[#B58750] text-white border-[#B58750] shadow-xs'
                        : 'bg-[#F1E6CF] text-[#2A211B] border-[#2A211B]/15 hover:border-[#2A211B]/40'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                    <span>Beige (Elegante &amp; Clásico)</span>
                  </button>
                </div>
              </div>

              {/* Two Doors Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/bodas"
                  className="px-6 py-3.5 rounded-xl bg-[#2A211B] text-[#FAF6EE] font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#43352A] transition-colors shadow-sm"
                >
                  <Heart className="w-4 h-4 text-[#E8702A]" />
                  <span>{lang === 'es' ? 'Línea Bodas & Haciendas' : 'Weddings & Haciendas'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/sevilla-experience"
                  className="px-6 py-3.5 rounded-xl bg-[#1E6F6B] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#165653] transition-colors shadow-sm"
                >
                  <Compass className="w-4 h-4 text-[#FAF6EE]" />
                  <span>{lang === 'es' ? 'Línea Sevilla Experience' : 'Seville Experience Tours'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust signals */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-[#2A211B]/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1E6F6B]" />
                  <span>{lang === 'es' ? 'Chófer profesional o autoconducción con clase previa' : 'Chauffeur or self-drive with lesson'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#E8702A]" />
                  <span>{lang === 'es' ? '2 Cestas de mimbre para flores' : '2 Rear floral wicker baskets'}</span>
                </div>
              </div>
            </div>

            {/* Right 40% — Visual Showcase of the selected car */}
            <div className="lg:col-span-5 relative">
              <div className="bg-[#FAF6EE] rounded-2xl p-6 md:p-8 border border-[#2A211B]/15 shadow-md mehari-ribbing relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A211B]/10 text-xs">
                  <span className="font-semibold text-[#2A211B]">
                    {isOrange ? 'Citroën Méhari Naranja Hopi' : 'Citroën Méhari Beige Colorado'}
                  </span>
                  <span className="text-[#1E6F6B] font-medium">
                    {lang === 'es' ? 'Totalmente Restaurado' : 'Fully Restored'}
                  </span>
                </div>

                {/* Car Vector Illustration */}
                <div className="py-4">
                  <MehariIllustration
                    color={carColor}
                    roofConfig="abierto"
                    showFlowers={true}
                    className="w-full"
                  />
                </div>

                {/* Hotspot features */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
                  <div className="bg-[#F1E6CF] p-2.5 rounded-lg border border-[#2A211B]/10">
                    <span className="font-semibold text-[#2A211B] block">
                      {lang === 'es' ? 'Cestas de mimbre' : 'Wicker baskets'}
                    </span>
                    <span className="text-[#2A211B]/70 text-[11px]">
                      {lang === 'es' ? 'Arreglos florales a medida' : 'Bespoke floral styling'}
                    </span>
                  </div>
                  <div className="bg-[#F1E6CF] p-2.5 rounded-lg border border-[#2A211B]/10">
                    <span className="font-semibold text-[#2A211B] block">
                      {lang === 'es' ? '3 Techos modulares' : '3 Roof setups'}
                    </span>
                    <span className="text-[#2A211B]/70 text-[11px]">
                      {lang === 'es' ? 'Abierto, semi y cerrado' : 'Open, canopy & enclosed'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2A211B]/10 flex items-center justify-between">
                  <div className="text-xs text-[#2A211B]/70">
                    <span>{lang === 'es' ? '¿Quieres ver la disponibilidad?' : 'Check availability?'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenBooking()}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#25D366] text-white hover:bg-[#20BA5A] cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE VEHICLE DNA — 1968–1988, Historia & Exclusividad
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
              {lang === 'es' ? 'El Producto: Una Joya Vintage' : 'The Vehicle: A Vintage Icon'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2A211B] mt-1 mb-4">
              Citroën Méhari (1968–1988)
            </h2>
            <p className="text-base text-[#2A211B]/80 leading-relaxed">
              {lang === 'es'
                ? 'Producido entre 1968 y 1988, el Citroën Méhari es un vehículo legendario por su diseño ligero en ABS, su carrocería estriada y su producción limitada. Un coche que transmite cercanía, simpatía y distinción: es el clásico que enamora tanto a niños como a abuelos.'
                : 'Manufactured between 1968 and 1988, the Citroën Méhari is a legendary automobile celebrated for its ribbed ABS bodywork, open cabriolet soul, and strictly limited production numbers. An icon of warmth and effortless distinction.'}
            </p>
          </div>

          {/* 3 Pillars Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-[#2A211B]/10">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#E8702A]/15 text-[#E8702A] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#2A211B]">
                {lang === 'es' ? 'Originalidad y Exclusividad' : 'Originality & Exclusivity'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Frente a las berlinas solemnes tradicionales, el Méhari aporta frescura, sonrisas y una entrada inolvidable.'
                  : 'Unlike solemn limousines, the Méhari brings genuine joy, vibrant photos, and an unforgettable grand entrance.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#1E6F6B]/15 text-[#1E6F6B] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#2A211B]">
                {lang === 'es' ? '2 Cestas de Mimbre Traseras' : '2 Rear Wicker Baskets'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Diseñadas para acoger arreglos florales coordinados con el ramo de novia, olivo, eucalipto o paniculata.'
                  : 'Tailored to host bespoke floral displays matching your bridal bouquet with olive leaves and eucalyptus.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-lg bg-[#D9B27C]/30 text-[#2A211B] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#2A211B]">
                {lang === 'es' ? 'Dos Estéticas de Boda' : 'Two Wedding Aesthetics'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'El naranja luce con energía radiante; el beige aporta serenidad clásica. Contrata uno o ambos para cortejo.'
                  : 'Orange brings radiant summer joy; beige offers timeless elegance. Hire one or both in tandem.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3 ROOF CONFIGURATIONS VIEWER
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoofConfigViewer color={carColor} lang={lang} />
      </section>

      {/* =========================================================
          WEDDINGS SECTION HIGHLIGHT (Bodas en Haciendas)
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
                {lang === 'es' ? 'Línea 1 · Bodas' : 'Line 1 · Weddings'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2A211B] leading-tight">
                {lang === 'es' ? (
                  <>
                    Traslado nupcial:{' '}
                    <span className="italic font-light">de la iglesia a la hacienda.</span>
                  </>
                ) : (
                  <>
                    Bridal journey:{' '}
                    <span className="italic font-light">from church ceremony to countryside hacienda.</span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#2A211B]/80 leading-relaxed">
                {lang === 'es'
                  ? 'Salida triunfal entre vítores y confeti, paseo íntimo como recién casados y entrada inolvidable en la hacienda sevillana. Puedes elegir chófer profesional con camisa blanca o conducir vosotros mismos.'
                  : 'Triumphant exit through cheering guests and confetti, intimate first ride as newlyweds, and cinematic arrival at the Andalusian hacienda. Choose a professional chauffeur or drive yourselves.'}
              </p>

              {/* Differentiator Callout: Driving lesson */}
              <div className="bg-[#F1E6CF] border-l-4 border-[#E8702A] p-4 rounded-r-xl">
                <h4 className="text-sm font-semibold text-[#2A211B]">
                  {lang === 'es'
                    ? 'Diferencial clave: Clase previa de conducción para los novios'
                    : 'Signature Feature: Prior Driving Lesson for Bride & Groom'}
                </h4>
                <p className="text-xs text-[#2A211B]/80 mt-1">
                  {lang === 'es'
                    ? '«Si conducen los novios, antes de la boda os damos una clase de conducción. Así nos aseguramos de que todo salga perfecto y esté bajo control».'
                    : '“If the couple drives, we provide a driving lesson before the wedding day so you master the classic controls with total confidence.”'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/bodas"
                  className="px-6 py-3 rounded-xl bg-[#2A211B] text-[#FAF6EE] text-xs font-medium hover:bg-[#43352A] transition-colors inline-flex items-center gap-2"
                >
                  <span>{lang === 'es' ? 'Ver detalles de Bodas & Galería' : 'Explore Wedding Details & Gallery'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => onOpenBooking('boda')}
                  className="px-5 py-3 rounded-xl border border-[#2A211B]/20 text-xs font-medium text-[#2A211B] hover:bg-[#F1E6CF] transition-colors cursor-pointer"
                >
                  {lang === 'es' ? 'Consultar disponibilidad de fecha' : 'Check wedding date availability'}
                </button>
              </div>
            </div>

            {/* Visual Editorial Wedding Vignette */}
            <div className="lg:col-span-5 bg-[#F1E6CF] rounded-xl p-6 border border-[#2A211B]/10 mehari-ribbing space-y-4">
              <div className="text-xs font-medium text-[#2A211B]/60 tracking-wider uppercase">
                {lang === 'es' ? 'Pruebas visuales del dossier' : 'Real Wedding Dossier'}
              </div>
              <div className="space-y-3">
                <div className="bg-[#FAF6EE] p-4 rounded-lg border border-[#2A211B]/10">
                  <div className="font-serif text-base text-[#2A211B]">Haciendas Sevillanas</div>
                  <div className="text-xs text-[#2A211B]/70 mt-1">
                    Hacienda de la Soledad, Hacienda Los Ángeles, campos de golf al atardecer y viñedos con cartel «Just Married».
                  </div>
                </div>
                <div className="bg-[#FAF6EE] p-4 rounded-lg border border-[#2A211B]/10">
                  <div className="font-serif text-base text-[#2A211B]">Bodas Multiculturales</div>
                  <div className="text-xs text-[#2A211B]/70 mt-1">
                    Ceremonias indias con guirnaldas florales exóticas, bodas internacionales y celebraciones campestres.
                  </div>
                </div>
                <div className="bg-[#FAF6EE] p-4 rounded-lg border border-[#2A211B]/10">
                  <div className="font-serif text-base text-[#2A211B]">Fotografía Editorial B/N y Color</div>
                  <div className="text-xs text-[#2A211B]/70 mt-1">
                    El coche preferido por fotógrafos de boda profesionales por su contraste y su textura retro.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SEVILLA EXPERIENCE HIGHLIGHT (13 Paradas)
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RouteTimeline lang={lang} carColor={carColor} />
      </section>

      {/* =========================================================
          DETALLES REALES & ESENCIA DEL VEHÍCULO (Basado en dossier y fotos)
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2A211B]/10">
            <div>
              <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
                {lang === 'es' ? 'Autenticidad & Patrimonio' : 'Authenticity & Heritage'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#2A211B] mt-1">
                {lang === 'es' ? 'La Esencia Real de Mehari W&E' : 'The True Essence of Mehari W&E'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#2A211B]/70 max-w-md">
              {lang === 'es'
                ? 'Dos clásicos de colección cuidados con mimo artesanal en Sevilla, listos para escribir los momentos más bonitos de tu vida.'
                : 'Two vintage collector’s icons lovingly preserved in Seville, ready to accompany the most memorable moments of your life.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Cockpit & Driving */}
            <div className="bg-[#F1E6CF] p-6 rounded-2xl border border-[#2A211B]/10 mehari-ribbing space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#E8702A] flex items-center justify-center border border-[#2A211B]/10">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#2A211B]">
                {lang === 'es' ? 'Salpicadero Vintage Original' : 'Original Vintage Dashboard'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Salpicadero en color carrocería con placa clásica «Méhari», velocímetro retro y palanca de cambios ergonómica. La clave de nuestra clase de conducción previa.'
                  : 'Body-colored dashboard with original «Méhari» badge, retro speedometer and vintage gear lever. The foundation of our private couple’s driving lesson.'}
              </p>
            </div>

            {/* Feature 2: Andalusian Hacienda Courtyard */}
            <div className="bg-[#F1E6CF] p-6 rounded-2xl border border-[#2A211B]/10 mehari-ribbing space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#1E6F6B] flex items-center justify-center border border-[#2A211B]/10">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#2A211B]">
                {lang === 'es' ? 'Pérgolas & Muros Encalados' : 'Pergolas & Whitewashed Walls'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Arco de buganvillas moradas, tejas árabes y albero andaluz. La estética natural donde nuestros Méhari lucen con luz propia en cada boda.'
                  : 'Purple bougainvillea pergolas, antique curved roof tiles and albero sand. The natural landscape where our Méhari shines during Andalusian weddings.'}
              </p>
            </div>

            {/* Feature 3: Personal Driver & Chauffeur */}
            <div className="bg-[#F1E6CF] p-6 rounded-2xl border border-[#2A211B]/10 mehari-ribbing space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF6EE] text-[#D9B27C] flex items-center justify-center border border-[#2A211B]/10">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#2A211B]">
                {lang === 'es' ? 'Chófer & Anfitrión Sevillano' : 'Chauffeur & Local Host'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Camisa blanca, gafas de diseño y trato exquisito. Conducción suave y conocimiento exhaustivo de cada rincón y hacienda de la provincia.'
                  : 'White linen shirt, designer spectacles and attentive hospitality. Gentle driving and encyclopedic knowledge of Seville’s streets and venues.'}
              </p>
            </div>

            {/* Feature 4: Brand Seal */}
            <div className="bg-[#F1E6CF] p-6 rounded-2xl border border-[#2A211B]/10 mehari-ribbing space-y-3 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF6EE] border border-[#2A211B]/15 flex items-center justify-center p-1 shadow-2xs">
                <BrandEmblem size={56} />
              </div>
              <h3 className="text-lg font-serif text-[#2A211B]">
                {lang === 'es' ? 'Sello Mehari W&E' : 'Mehari W&E Seal'}
              </h3>
              <p className="text-xs text-[#2A211B]/75 leading-relaxed">
                {lang === 'es'
                  ? 'Inspirado en el skyline de la Giralda, la Catedral y las palmeras de Sevilla bajo el sol del Guadalquivir.'
                  : 'Inspired by the silhouette of the Giralda, Cathedral towers and riverfront palms under the Seville sky.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUIÉNES SOMOS & ATENCIÓN PERSONALIZADA
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-8 bg-[#F1E6CF] rounded-2xl border border-[#2A211B]/10 text-center mehari-ribbing">
              <div className="mb-4">
                <BrandEmblem size={130} />
              </div>
              <h3 className="text-xl font-serif text-[#2A211B]">Mehari W&amp;E</h3>
              <p className="text-xs text-[#2A211B]/70 mt-1">
                {lang === 'es' ? 'Propietario & Chófer local · Sevilla' : 'Owner & Local Chauffeur · Seville'}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6EE] border border-[#2A211B]/15 text-xs text-[#2A211B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E6F6B]" />
                <span>{lang === 'es' ? 'Atención directa sin intermediarios' : 'Direct personal attention'}</span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
                {lang === 'es' ? 'Quiénes Somos' : 'About Mehari W&E'}
              </span>
              <h2 className="text-3xl font-serif text-[#2A211B]">
                {lang === 'es' ? 'Cercanía, pasión y orgullo sevillano' : 'Warmth, passion & authentic Seville soul'}
              </h2>
              <p className="text-sm text-[#2A211B]/80 leading-relaxed">
                {lang === 'es'
                  ? 'Cuidamos cada detalle de nuestros dos Citroën Méhari como las piezas de colección que son. Conducidos con respeto y alegría por quien conoce cada hacienda, cada calle empedrada y cada secreto monumental de Sevilla.'
                  : 'We care for each of our two restored Citroën Méhari as the authentic collection pieces they are. Driven with joy and deep pride by a local host who knows every hacienda, every cobblestone lane, and every historic viewpoint.'}
              </p>
              <blockquote className="border-l-2 border-[#1E6F6B] pl-4 italic text-sm text-[#1E6F6B]">
                {lang === 'es'
                  ? '«Te atenderemos con gusto de forma personalizada SIEMPRE».'
                  : '“We will ALWAYS assist you personally with dedication and genuine care.”'}
              </blockquote>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#2A211B] hover:text-[#E8702A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{lang === 'es' ? 'Hablar directamente por WhatsApp: +34 680 75 88 79' : 'Chat directly via WhatsApp: +34 680 75 88 79'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONVERSION BANNER
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-[#2A211B] text-[#FAF6EE] rounded-2xl p-8 md:p-12 text-center mehari-ribbing-dark space-y-6">
          <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
            {lang === 'es' ? 'Reserva tu fecha' : 'Reserve your date'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#FAF6EE] max-w-2xl mx-auto">
            {lang === 'es'
              ? 'Solo 2 coches en flota: exclusividad asegurada para tu día'
              : 'Only 2 cars in our fleet: guaranteed exclusivity for your special day'}
          </h2>
          <p className="text-sm text-[#FAF6EE]/75 max-w-xl mx-auto">
            {lang === 'es'
              ? 'Consulta disponibilidad de tu boda o tour con antelación para asegurar tu Méhari preferido.'
              : 'Inquire early for your wedding date or private tour to secure your preferred Méhari.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'es' ? 'Consultar Disponibilidad por WhatsApp' : 'Inquire Availability via WhatsApp'}</span>
            </button>
            <Link
              to="/contacto"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF6EE] text-xs font-medium transition-colors"
            >
              {lang === 'es' ? 'Formulario & Datos de Contacto' : 'Inquiry Form & Contact Details'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
