import React, { useState } from 'react';
import { Language, CarColor } from '../types';
import { BUSINESS_INFO } from '../data/content';
import {
  MessageCircle,
  Mail,
  Phone,
  Instagram,
  MapPin,
  Calendar,
  Users,
  Car,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface ContactPageProps {
  lang: Language;
  carColor: CarColor;
  setCarColor: (color: CarColor) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  lang,
  carColor,
  setCarColor,
}) => {
  const [serviceType, setServiceType] = useState<'boda' | 'tour' | 'medida'>('boda');
  const [carChoice, setCarChoice] = useState<CarColor | 'ambos'>(carColor);
  const [drivingMode, setDrivingMode] = useState<'chofer' | 'novios'>('chofer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let serviceLabel = '';
    if (serviceType === 'boda') serviceLabel = lang === 'es' ? 'Boda' : 'Wedding';
    else if (serviceType === 'tour') serviceLabel = lang === 'es' ? 'Tour Sevilla Experience' : 'Seville Experience Tour';
    else serviceLabel = lang === 'es' ? 'Servicio a Medida / Evento' : 'Custom Event';

    const carLabel =
      carChoice === 'ambos'
        ? lang === 'es'
          ? 'Ambos coches (Naranja y Beige)'
          : 'Both cars (Orange & Beige)'
        : carChoice === 'naranja'
        ? lang === 'es'
          ? 'Méhari Naranja'
          : 'Orange Méhari'
        : lang === 'es'
        ? 'Méhari Beige'
        : 'Beige Méhari';

    const drivingLabel =
      serviceType === 'boda'
        ? drivingMode === 'chofer'
          ? lang === 'es'
            ? 'Con chófer'
            : 'With chauffeur'
          : lang === 'es'
          ? 'Conducción novios (con clase previa)'
          : 'Bride/groom driving (with lesson)'
        : '';

    let text = `¡Hola Mehari W&E! Me gustaría consultar disponibilidad:\n\n`;
    text += `· Servicio: ${serviceLabel}\n`;
    if (name) text += `· Nombre: ${name}\n`;
    if (email) text += `· Email: ${email}\n`;
    if (phone) text += `· Teléfono: ${phone}\n`;
    if (date) text += `· Fecha prevista: ${date}\n`;
    text += `· Coche preferido: ${carLabel}\n`;
    if (drivingLabel) text += `· Conducción: ${drivingLabel}\n`;
    if (guests) text += `· Pasajeros: ${guests}\n`;
    if (location) text += `· Lugar / Hotel / Hacienda: ${location}\n`;
    if (notes) text += `· Comentarios: ${notes}\n`;
    text += `\n¿Podríais confirmarme disponibilidad y presupuesto? ¡Muchas gracias!`;

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 md:space-y-24 pt-4 pb-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-3xl p-8 md:p-14 shadow-sm mehari-ribbing">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
              {lang === 'es' ? 'Atención Personalizada SIEMPRE' : 'Personalized Attention ALWAYS'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-[#2A211B] leading-tight">
              {lang === 'es' ? 'Contacto & Disponibilidad' : 'Contact & Availability'}
            </h1>
            <p className="text-base text-[#2A211B]/80 leading-relaxed">
              {lang === 'es'
                ? 'El canal más directo y rápido es nuestro WhatsApp. Te responderemos personalmente para consultar fecha, opciones de ruta o traslados a tu hacienda.'
                : 'The fastest, most direct communication channel is our WhatsApp. We will personally check your date, route options, or countryside hacienda transfers.'}
            </p>
          </div>
        </div>
      </section>

      {/* Grid: Form & Direct Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info and Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF6EE] rounded-2xl p-6 md:p-8 border border-[#2A211B]/15 space-y-6">
              <h2 className="text-2xl font-serif text-[#2A211B]">
                {lang === 'es' ? 'Datos de Contacto' : 'Direct Channels'}
              </h2>

              <div className="space-y-4">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#2A211B] uppercase tracking-wider">
                      {lang === 'es' ? 'WhatsApp Directo (Recomendado)' : 'Direct WhatsApp (Fastest)'}
                    </div>
                    <div className="text-sm font-semibold text-[#2A211B] mt-0.5">{BUSINESS_INFO.phone}</div>
                    <div className="text-[11px] text-[#2A211B]/70 mt-0.5">
                      {lang === 'es' ? 'Respuesta rápida en el día' : 'Same-day personal reply'}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F1E6CF] border border-[#2A211B]/10 hover:bg-[#EAE0CA] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#E8702A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#2A211B] uppercase tracking-wider">
                      {lang === 'es' ? 'Correo Electrónico' : 'Email Address'}
                    </div>
                    <div className="text-sm font-medium text-[#2A211B] mt-0.5">{BUSINESS_INFO.email}</div>
                    <div className="text-[11px] text-[#2A211B]/70 mt-0.5">
                      {lang === 'es' ? 'Para presupuestos detallados' : 'For formal quote requests'}
                    </div>
                  </div>
                </a>

                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F1E6CF] border border-[#2A211B]/10 hover:bg-[#EAE0CA] transition-colors"
                >
                  <Instagram className="w-5 h-5 text-[#1E6F6B] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#2A211B] uppercase tracking-wider">
                      Instagram
                    </div>
                    <div className="text-sm font-medium text-[#2A211B] mt-0.5">{BUSINESS_INFO.instagram}</div>
                    <div className="text-[11px] text-[#2A211B]/70 mt-0.5">
                      {lang === 'es' ? 'Fotos de bodas y tours recientes' : 'Recent wedding and tour photos'}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F1E6CF] border border-[#2A211B]/10">
                  <MapPin className="w-5 h-5 text-[#D9B27C] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-[#2A211B] uppercase tracking-wider">
                      {lang === 'es' ? 'Zona Operativa' : 'Operating Territory'}
                    </div>
                    <div className="text-sm font-medium text-[#2A211B] mt-0.5">
                      {lang === 'es' ? 'Sevilla y Provincia' : 'Seville City & Province'}
                    </div>
                    <div className="text-[11px] text-[#2A211B]/70 mt-0.5">
                      {lang === 'es' ? 'Haciendas, casco histórico y desplazamientos a toda Andalucía' : 'Haciendas, city center and transfers across Andalusia'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Owner Note */}
              <div className="p-4 rounded-xl bg-[#F1E6CF]/70 border border-[#2A211B]/10 text-xs text-[#2A211B]/80 space-y-1 mehari-ribbing">
                <span className="font-semibold text-[#2A211B] block">
                  {lang === 'es' ? 'Trato directo con el propietario' : 'Direct owner contact'}
                </span>
                <p>
                  {lang === 'es'
                    ? 'Sin intermediarios ni comisiones de agencia. Hablas directamente con quien preparará el coche y te acompañará en tu gran día.'
                    : 'No agency middlemen or third-party markups. You speak directly with the passionate caretaker who prepares the car.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Availability Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF6EE] rounded-2xl p-6 md:p-10 border border-[#2A211B]/15 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
                  {lang === 'es' ? 'Formulario de Consulta' : 'Inquiry Builder'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#2A211B] mt-1">
                  {lang === 'es' ? 'Consulta fecha para tu boda o tour' : 'Check date for your wedding or tour'}
                </h2>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#1E6F6B]/15 text-[#1E6F6B] flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#2A211B]">
                    {lang === 'es' ? '¡Consulta preparada!' : 'Inquiry Ready!'}
                  </h3>
                  <p className="text-sm text-[#2A211B]/80 max-w-md mx-auto">
                    {lang === 'es'
                      ? 'Se ha enviado tu consulta directamente a WhatsApp con el mensaje estructurado. Te contestaremos en breve.'
                      : 'Your inquiry has been generated and sent via WhatsApp. We will reply promptly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl border border-[#2A211B]/20 text-xs font-medium text-[#2A211B] hover:bg-[#F1E6CF] cursor-pointer"
                  >
                    {lang === 'es' ? 'Hacer otra consulta' : 'Submit another inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitWhatsApp} className="space-y-5">
                  {/* Service selector */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2A211B]/70 uppercase tracking-wider mb-2">
                      {lang === 'es' ? '1. Servicio deseado' : '1. Service type'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'boda', label: lang === 'es' ? '💍 Boda' : '💍 Wedding' },
                        { id: 'tour', label: lang === 'es' ? '🏛️ Sevilla Tour' : '🏛️ Seville Tour' },
                        { id: 'medida', label: lang === 'es' ? '✨ A Medida' : '✨ Custom' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setServiceType(s.id as any)}
                          className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all cursor-pointer ${
                            serviceType === s.id
                              ? 'bg-[#2A211B] text-[#FAF6EE] border-[#2A211B]'
                              : 'bg-[#F1E6CF] text-[#2A211B] border-[#2A211B]/15 hover:border-[#2A211B]/40'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Car Choice */}
                  <div>
                    <label className="block text-xs font-semibold text-[#2A211B]/70 uppercase tracking-wider mb-2">
                      {lang === 'es' ? '2. Preferencia de vehículo' : '2. Vehicle preference'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCarChoice('naranja');
                          setCarColor('naranja');
                        }}
                        className={`py-2 px-2.5 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                          carChoice === 'naranja'
                            ? 'bg-[#E8702A] text-white border-[#E8702A]'
                            : 'bg-[#F1E6CF] text-[#2A211B] border-[#2A211B]/15'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E8702A] border border-white" />
                        <span>Naranja Hopi</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCarChoice('beige');
                          setCarColor('beige');
                        }}
                        className={`py-2 px-2.5 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                          carChoice === 'beige'
                            ? 'bg-[#B58750] text-white border-[#B58750]'
                            : 'bg-[#F1E6CF] text-[#2A211B] border-[#2A211B]/15'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D4B07D] border border-white" />
                        <span>Beige Colorado</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarChoice('ambos')}
                        className={`py-2 px-2.5 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                          carChoice === 'ambos'
                            ? 'bg-[#1E6F6B] text-white border-[#1E6F6B]'
                            : 'bg-[#F1E6CF] text-[#2A211B] border-[#2A211B]/15'
                        }`}
                      >
                        <Car className="w-3.5 h-3.5" />
                        <span>{lang === 'es' ? 'Ambos coches' : 'Both cars'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Driving Mode (only if wedding) */}
                  {serviceType === 'boda' && (
                    <div className="bg-[#F1E6CF]/80 p-3.5 rounded-xl border border-[#2A211B]/10">
                      <label className="block text-xs font-semibold text-[#2A211B]/70 uppercase tracking-wider mb-2">
                        {lang === 'es' ? 'Modalidad de conducción' : 'Driving Mode'}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDrivingMode('chofer')}
                          className={`py-2 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
                            drivingMode === 'chofer'
                              ? 'bg-[#2A211B] text-[#FAF6EE] border-[#2A211B]'
                              : 'bg-[#FAF6EE] text-[#2A211B] border-[#2A211B]/15'
                          }`}
                        >
                          {lang === 'es' ? 'Con Chófer Profesional' : 'With Chauffeur'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDrivingMode('novios')}
                          className={`py-2 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
                            drivingMode === 'novios'
                              ? 'bg-[#E8702A] text-white border-[#E8702A]'
                              : 'bg-[#FAF6EE] text-[#2A211B] border-[#2A211B]/15'
                          }`}
                        >
                          {lang === 'es' ? 'Conducen Novios (con clase)' : 'Couples Drive (with lesson)'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Name, Phone, Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                        {lang === 'es' ? 'Nombre completo' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={lang === 'es' ? 'Lucía & Carlos' : 'Jane & John'}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-xs text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                        {lang === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+34 600..."
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-xs text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                        {lang === 'es' ? 'Correo electrónico' : 'Email address'}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="novios@gmail.com"
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-xs text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                      />
                    </div>
                  </div>

                  {/* Date, Guests & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                        {lang === 'es' ? 'Fecha del evento' : 'Date of Event'}
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-xs text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                        {lang === 'es' ? 'Pasajeros' : 'Number of guests'}
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-xs text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                      >
                        <option value="2">{lang === 'es' ? '2 novios / pareja' : '2 bride & groom / couple'}</option>
                        <option value="3">{lang === 'es' ? '3 personas (1 Méhari)' : '3 guests (1 Méhari)'}</option>
                        <option value="4-6">{lang === 'es' ? '4 a 6 personas (2 Méhari)' : '4 to 6 people (2 Méhari)'}</option>
                        <option value="otro">{lang === 'es' ? 'Evento / Otro' : 'Other event'}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                        {lang === 'es' ? 'Hacienda / Hotel / Zona' : 'Venue / Hotel / Area'}
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={lang === 'es' ? 'Ej. Hacienda de la Soledad' : 'e.g. Hotel Inglaterra'}
                        className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-xs text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                      {lang === 'es' ? 'Notas o peticiones especiales' : 'Notes or special requests'}
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={
                        lang === 'es'
                          ? 'Horarios, flores para las cestas de mimbre, si queréis hacer paradas fotográficas...'
                          : 'Schedules, flowers for wicker baskets, specific photo stops...'
                      }
                      className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-xs text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A] resize-none"
                    />
                  </div>

                  {/* Submit via WhatsApp */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{lang === 'es' ? 'Enviar Consulta por WhatsApp Directo' : 'Send WhatsApp Inquiry'}</span>
                    </button>
                    <p className="text-center text-[11px] text-[#2A211B]/60 mt-2">
                      {lang === 'es'
                        ? 'Al hacer clic se abrirá WhatsApp con el mensaje ya redactado para que solo tengas que darle a enviar.'
                        : 'Clicking opens WhatsApp with your pre-formatted inquiry ready to send.'}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
