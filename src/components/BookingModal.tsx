import React, { useState } from 'react';
import { Language, CarColor } from '../types';
import { BUSINESS_INFO } from '../data/content';
import { X, Send, Calendar, Users, Car, CheckCircle2, MessageCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  defaultService?: 'boda' | 'tour' | 'medida';
  initialCarColor?: CarColor;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  defaultService = 'boda',
  initialCarColor = 'naranja',
}) => {
  const [serviceType, setServiceType] = useState<'boda' | 'tour' | 'medida'>(defaultService);
  const [carChoice, setCarChoice] = useState<CarColor | 'ambos'>(initialCarColor);
  const [drivingMode, setDrivingMode] = useState<'chofer' | 'novios'>('chofer');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Generate pre-filled WhatsApp message
  const generateWhatsAppMessage = () => {
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
    if (date) text += `· Fecha prevista: ${date}\n`;
    text += `· Coche: ${carLabel}\n`;
    if (drivingLabel) text += `· Modalidad: ${drivingLabel}\n`;
    if (guests) text += `· Número de personas: ${guests}\n`;
    if (location) text += `· Lugar / Hotel / Hacienda: ${location}\n`;
    if (notes) text += `· Notas: ${notes}\n`;
    text += `\n¿Podríais confirmarme disponibilidad y presupuesto? ¡Muchas gracias!`;

    return encodeURIComponent(text);
  };

  const handleWhatsAppClick = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-[#FAF6EE] rounded-2xl border border-[#2A211B]/20 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#F1E6CF] border-b border-[#2A211B]/15 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#E8702A] tracking-wider uppercase">
              {BUSINESS_INFO.name}
            </span>
            <h3 className="text-xl font-serif text-[#2A211B]">
              {lang === 'es' ? 'Consultar Disponibilidad' : 'Check Availability'}
            </h3>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="p-1.5 rounded-lg text-[#2A211B]/60 hover:text-[#2A211B] hover:bg-[#2A211B]/10 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#1E6F6B]/15 text-[#1E6F6B] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-serif text-[#2A211B]">
                {lang === 'es' ? '¡Consulta iniciada con éxito!' : 'Inquiry Successfully Started!'}
              </h4>
              <p className="text-sm text-[#2A211B]/80 max-w-md mx-auto">
                {lang === 'es'
                  ? 'Se ha abierto WhatsApp con todos los detalles de tu consulta. Te responderemos personalmente en el menor tiempo posible.'
                  : 'WhatsApp has opened with your inquiry details. We will personally reply to you as soon as possible.'}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 rounded-xl bg-[#2A211B] text-[#FAF6EE] text-sm font-medium hover:bg-[#44362D] cursor-pointer transition-colors"
              >
                {lang === 'es' ? 'Cerrar ventana' : 'Close window'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppClick} className="space-y-4">
              {/* Service Type Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#2A211B]/70 uppercase tracking-wider mb-1.5">
                  {lang === 'es' ? '1. Tipo de Experiencia' : '1. Experience Type'}
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

              {/* Vehicle Selection */}
              <div>
                <label className="block text-xs font-semibold text-[#2A211B]/70 uppercase tracking-wider mb-1.5">
                  {lang === 'es' ? '2. Elección del Citroën Méhari' : '2. Citroën Méhari Selection'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCarChoice('naranja')}
                    className={`py-2 px-2.5 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                      carChoice === 'naranja'
                        ? 'bg-[#E8702A] text-white border-[#E8702A]'
                        : 'bg-[#F1E6CF] text-[#2A211B] border-[#2A211B]/15'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E8702A] border border-white/50" />
                    <span>Naranja Hopi</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCarChoice('beige')}
                    className={`py-2 px-2.5 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                      carChoice === 'beige'
                        ? 'bg-[#B58750] text-white border-[#B58750]'
                        : 'bg-[#F1E6CF] text-[#2A211B] border-[#2A211B]/15'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4B07D] border border-white/50" />
                    <span>Beige Clásico</span>
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

              {/* Driving Mode (Only for Weddings) */}
              {serviceType === 'boda' && (
                <div className="bg-[#F1E6CF]/80 p-3 rounded-xl border border-[#2A211B]/10">
                  <label className="block text-xs font-semibold text-[#2A211B]/70 uppercase tracking-wider mb-1.5">
                    {lang === 'es' ? '¿Quién conduce el Méhari?' : 'Who drives the Méhari?'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDrivingMode('chofer')}
                      className={`py-1.5 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
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
                      className={`py-1.5 px-3 text-xs font-medium rounded-lg border cursor-pointer ${
                        drivingMode === 'novios'
                          ? 'bg-[#E8702A] text-white border-[#E8702A]'
                          : 'bg-[#FAF6EE] text-[#2A211B] border-[#2A211B]/15'
                      }`}
                    >
                      {lang === 'es' ? 'Conducen Novios (con clase previa)' : 'Couples Drive (with lesson)'}
                    </button>
                  </div>
                  {drivingMode === 'novios' && (
                    <p className="text-[11px] text-[#1E6F6B] mt-1.5 font-medium">
                      ✓ {lang === 'es' ? 'Incluye clase previa de conducción antes de la boda.' : 'Includes driving lesson prior to wedding day.'}
                    </p>
                  )}
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                    {lang === 'es' ? 'Tu Nombre' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'es' ? 'Ej. Lucía Martínez' : 'e.g. Sarah Jenkins'}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-sm text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2A211B]/70 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Fecha Prevista' : 'Target Date'}</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-sm text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                  />
                </div>
              </div>

              {/* Location & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#2A211B]/70 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Pasajeros / Invitados' : 'Guests (1-3/car)'}</span>
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-sm text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                  >
                    <option value="2">{lang === 'es' ? '2 novios / pareja' : '2 bride & groom / couple'}</option>
                    <option value="3">{lang === 'es' ? '3 pasajeros (1 coche)' : '3 passengers (1 car)'}</option>
                    <option value="4-6">{lang === 'es' ? '4 a 6 personas (2 Méhari)' : '4 to 6 people (2 Méhari)'}</option>
                    <option value="evento">{lang === 'es' ? 'Más personas (evento)' : 'More (event)'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                    {lang === 'es' ? 'Lugar / Hacienda / Hotel' : 'Location / Hacienda / Hotel'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={lang === 'es' ? 'Ej. Hacienda de la Soledad' : 'e.g. Hotel Alfonso XIII'}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-sm text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A]"
                  />
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-medium text-[#2A211B]/70 mb-1">
                  {lang === 'es' ? 'Comentarios o preguntas' : 'Additional details or notes'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? 'Horarios, flores para las cestas, ceremonia...'
                      : 'Timings, floral arrangements, ceremony details...'
                  }
                  className="w-full px-3 py-2 bg-white rounded-lg border border-[#2A211B]/20 text-sm text-[#2A211B] focus:outline-none focus:ring-1 focus:ring-[#E8702A] resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {lang === 'es'
                      ? 'Consultar Disponibilidad por WhatsApp Directo'
                      : 'Send WhatsApp Inquiry Instantly'}
                  </span>
                </button>
                <p className="text-center text-[11px] text-[#2A211B]/60 mt-2">
                  {lang === 'es'
                    ? 'Atención personalizada SIEMPRE · Respuesta rápida en el +34 680 75 88 79'
                    : 'Personalized attention ALWAYS · Fast reply at +34 680 75 88 79'}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
