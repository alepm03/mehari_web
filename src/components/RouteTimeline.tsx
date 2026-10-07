import React, { useState } from 'react';
import { Language, CarColor } from '../types';
import { TOUR_STOPS } from '../data/content';
import { Camera, MapPin, ChevronRight, ChevronLeft, Clock, Car, Sparkles, Navigation } from 'lucide-react';

interface RouteTimelineProps {
  lang: Language;
  carColor: CarColor;
}

export const RouteTimeline: React.FC<RouteTimelineProps> = ({ lang, carColor }) => {
  const [selectedStopId, setSelectedStopId] = useState<number>(4); // Plaza de España default

  const currentStop = TOUR_STOPS.find((s) => s.id === selectedStopId) || TOUR_STOPS[3];
  const isOrange = carColor === 'naranja';

  const nextStop = () => {
    if (selectedStopId < TOUR_STOPS.length) {
      setSelectedStopId(selectedStopId + 1);
    }
  };

  const prevStop = () => {
    if (selectedStopId > 1) {
      setSelectedStopId(selectedStopId - 1);
    }
  };

  return (
    <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Header and key metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#2A211B]/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E8702A]">
            <Navigation className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Ruta Monumental Completa' : 'Full Monumental Itinerary'}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-serif text-[#2A211B] mt-1">
            {lang === 'es' ? '13 Paradas Históricas a Cielo Abierto' : '13 Historic Open-Top Landmarks'}
          </h3>
          <p className="text-sm text-[#2A211B]/70 mt-1 max-w-2xl">
            {lang === 'es'
              ? 'Un recorrido exclusivo por el casco histórico y monumental donde los coches convencionales no pueden acceder.'
              : 'An exclusive cruise through historical alleys and monumental squares inaccessible to standard tourist traffic.'}
          </p>
        </div>

        {/* Quick Tour Specs */}
        <div className="flex items-center gap-4 text-xs bg-[#F1E6CF] px-4 py-2.5 rounded-xl border border-[#2A211B]/10 self-start lg:self-auto">
          <div className="flex items-center gap-1.5 font-medium text-[#2A211B]">
            <Clock className="w-4 h-4 text-[#1E6F6B]" />
            <span>2 h — 2 h 30 min</span>
          </div>
          <span className="text-[#2A211B]/30">|</span>
          <div className="flex items-center gap-1.5 font-medium text-[#2A211B]">
            <Car className="w-4 h-4 text-[#E8702A]" />
            <span>{lang === 'es' ? '1 a 3 pers. por coche' : '1 to 3 guests / car'}</span>
          </div>
          <span className="text-[#2A211B]/30">|</span>
          <div className="flex items-center gap-1.5 font-medium text-[#1E6F6B]">
            <Camera className="w-4 h-4" />
            <span>{lang === 'es' ? '2 Paradas fotográficas' : '2 Photo stops'}</span>
          </div>
        </div>
      </div>

      {/* Horizontal Interactive Scrubbing Route Bar with mini Méhari position */}
      <div className="relative mt-8 mb-8 pt-4">
        {/* Track Line */}
        <div className="relative h-2 bg-[#E2D4BA] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1E6F6B] via-[#E8702A] to-[#D9B27C] transition-all duration-300"
            style={{ width: `${((selectedStopId - 1) / (TOUR_STOPS.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stop Nodes */}
        <div className="relative flex justify-between -mt-3.5 px-0.5">
          {TOUR_STOPS.map((stop) => {
            const isSelected = stop.id === selectedStopId;
            const isPast = stop.id <= selectedStopId;

            return (
              <button
                key={stop.id}
                type="button"
                onClick={() => setSelectedStopId(stop.id)}
                className={`group relative flex flex-col items-center cursor-pointer focus:outline-none`}
                title={`${stop.id}. ${stop.name[lang]}`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                    isSelected
                      ? 'bg-[#2A211B] border-[#FAF6EE] scale-125 shadow-md ring-2 ring-[#E8702A]'
                      : isPast
                      ? 'bg-[#1E6F6B] border-[#FAF6EE]'
                      : 'bg-[#FAF6EE] border-[#B5A486] hover:border-[#2A211B]'
                  }`}
                >
                  {stop.isPhotoStop ? (
                    <Camera className={`w-2.5 h-2.5 ${isSelected ? 'text-[#FAF6EE]' : 'text-[#FAF6EE]'}`} />
                  ) : (
                    <span
                      className={`text-[9px] font-bold ${
                        isSelected ? 'text-[#FAF6EE]' : isPast ? 'text-[#FAF6EE]' : 'text-[#7D6E54]'
                      }`}
                    >
                      {stop.id}
                    </span>
                  )}
                </div>

                {/* Photo Stop Marker Pin */}
                {stop.isPhotoStop && (
                  <span className="absolute -top-6 text-[10px] font-bold text-[#E8702A] bg-[#FAF6EE] px-1 rounded shadow-xs border border-[#E8702A]/30">
                    📸
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic moving badge indicator */}
        <div className="mt-3 flex items-center justify-between text-xs text-[#2A211B]/60">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#1E6F6B]" />
            {lang === 'es' ? 'Parada 1: Hotel / Torre del Oro' : 'Stop 1: Hotel / Torre del Oro'}
          </span>
          <span className="font-medium text-[#2A211B]">
            {lang === 'es' ? `Parada activa: ${selectedStopId} de 13` : `Active landmark: ${selectedStopId} of 13`}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#D9B27C]" />
            {lang === 'es' ? 'Parada 13: Regreso Hotel' : 'Stop 13: Hotel Return'}
          </span>
        </div>
      </div>

      {/* Selected Stop Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F1E6CF] border border-[#2A211B]/15 rounded-xl p-6 mehari-ribbing relative">
        <div className="md:col-span-8 space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-[#2A211B] text-[#FAF6EE]">
              {lang === 'es' ? `Parada ${currentStop.id}` : `Stop ${currentStop.id}`}
            </span>
            {currentStop.isPhotoStop && (
              <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded bg-[#E8702A] text-white">
                <Camera className="w-3 h-3" />
                {lang === 'es' ? 'Parada fotográfica con el coche' : 'Photo stop with Méhari'}
              </span>
            )}
          </div>

          <h4 className="text-2xl font-serif text-[#2A211B]">{currentStop.name[lang]}</h4>
          <p className="text-sm font-medium text-[#1E6F6B] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 shrink-0 text-[#E8702A]" />
            {currentStop.highlight[lang]}
          </p>

          <p className="text-sm text-[#2A211B]/80 leading-relaxed pt-1">{currentStop.description[lang]}</p>

          {/* Previous / Next Navigation Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              disabled={selectedStopId === 1}
              onClick={prevStop}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#2A211B]/20 text-xs font-medium text-[#2A211B] hover:bg-[#FAF6EE] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              {lang === 'es' ? 'Anterior parada' : 'Previous landmark'}
            </button>
            <button
              type="button"
              disabled={selectedStopId === TOUR_STOPS.length}
              onClick={nextStop}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#2A211B]/20 text-xs font-medium text-[#2A211B] hover:bg-[#FAF6EE] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              {lang === 'es' ? 'Siguiente parada' : 'Next landmark'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Map Vignette / Méhari Graphic */}
        <div className="md:col-span-4 bg-[#FAF6EE] rounded-xl p-5 border border-[#2A211B]/10 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-[#2A211B]/50 tracking-wider uppercase mb-1">
              {lang === 'es' ? 'Experiencia a bordo' : 'On-Board Experience'}
            </div>
            <div className="text-sm font-serif text-[#2A211B] font-medium">
              {isOrange ? 'Citroën Méhari Naranja' : 'Citroën Méhari Beige'}
            </div>
            <p className="text-xs text-[#2A211B]/70 mt-1">
              {lang === 'es'
                ? 'Con chófer profesional que conoce cada rincón, anécdota y ángulo fotográfico de Sevilla.'
                : 'With a local expert chauffeur who knows every corner, anecdote and photo angle in Seville.'}
            </p>
          </div>

          <div className="pt-4 border-t border-[#2A211B]/10 flex items-center justify-between text-xs">
            <span className="text-[#2A211B]/60">{lang === 'es' ? 'Vehículo:' : 'Vehicle:'}</span>
            <span className="font-medium text-[#2A211B]">
              {isOrange ? 'Naranja Hopi · Clásico' : 'Beige Colorado · Clásico'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
