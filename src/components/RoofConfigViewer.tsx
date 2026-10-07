import React, { useState } from 'react';
import { CarColor, Language, RoofConfig } from '../types';
import { MehariIllustration } from './MehariIllustration';
import { Sun, Shield, CloudRain, Check } from 'lucide-react';

interface RoofConfigViewerProps {
  color: CarColor;
  lang: Language;
}

export const RoofConfigViewer: React.FC<RoofConfigViewerProps> = ({ color, lang }) => {
  const [activeConfig, setActiveConfig] = useState<RoofConfig>('abierto');

  const configs: Record<
    RoofConfig,
    {
      title: { es: string; en: string };
      badge: { es: string; en: string };
      description: { es: string; en: string };
      icon: typeof Sun;
      idealFor: { es: string; en: string };
      details: { es: string[]; en: string[] };
    }
  > = {
    abierto: {
      title: {
        es: 'Completamente Abierto',
        en: 'Fully Open',
      },
      badge: {
        es: 'Vistas 360° & Sol',
        en: '360° Panoramas & Sun',
      },
      description: {
        es: 'Capota recogida por completo en la parte trasera con correas de cuero vintage. Sensación inigualable de libertad, sol andaluz y el mejor ángulo para las fotos de los novios.',
        en: 'Canvas top fully folded away at the rear secured with vintage leather straps. Pure open-air freedom, Seville sun, and the premier photography angle.',
      },
      icon: Sun,
      idealFor: {
        es: 'Días soleados, salida de iglesia y tours monumentales de primavera / otoño.',
        en: 'Sunny celebrations, church departures, and spring or autumn city tours.',
      },
      details: {
        es: ['Arco antivuelco tubular a la vista', 'Fotos nítidas desde todos los ángulos', 'Brisa y aire puro'],
        en: ['Exposed tubular classic roll bar', 'Crisp photography from all angles', 'Gentle breeze and pure air'],
      },
    },
    semiabierto: {
      title: {
        es: 'Semiabierto (Bimini Top)',
        en: 'Semi-Open (Canopy)',
      },
      badge: {
        es: 'Estilo & Sombra',
        en: 'Style & Shade',
      },
      description: {
        es: 'Capota recogida de forma elegante más o menos a la mitad del coche. Mantiene el habitáculo trasero ventilado mientras protege del sol directo del mediodía.',
        en: 'Canvas roof collected mid-way. Shields passengers from intense midday sun while preserving open sides and vintage airflow.',
      },
      icon: Shield,
      idealFor: {
        es: 'Mediodías de verano en Sevilla, traslados largos entre haciendas.',
        en: 'Summer mid-day journeys and scenic transfers between countryside haciendas.',
      },
      details: {
        es: ['Protección solar sobre los asientos delanteros', 'Línea de perfil icónica', 'Confort térmico óptimo'],
        en: ['Shade over front seating', 'Iconic profile silhouette', 'Balanced thermal comfort'],
      },
    },
    cerrado: {
      title: {
        es: 'Completamente Cerrado',
        en: 'Fully Enclosed',
      },
      badge: {
        es: 'Intimidad & Clima',
        en: 'Shelter & Privacy',
      },
      description: {
        es: 'Para tener intimidad, momentos de lluvia o noches frescas. Ventanillas laterales de mica transparente y opción de techo solar abatible para los novios.',
        en: 'Sheltered protection for privacy, drizzle or crisp evenings. Transparent mica side windows with an operable roll-up sunroof flap.',
      },
      icon: CloudRain,
      idealFor: {
        es: 'Inclemencias meteorológicas, bodas de invierno y recogidas nocturnas.',
        en: 'Changing weather conditions, winter weddings, and late evening hotel drop-offs.',
      },
      details: {
        es: ['Ventanillas panorámicas flexibles', 'Opción de techo solar superior', 'Protección del peinado y vestido'],
        en: ['Flexible panoramic side mica panels', 'Operable overhead sunroof flap', 'Total hairstyle and dress shelter'],
      },
    },
  };

  const active = configs[activeConfig];
  const IconComponent = active.icon;

  return (
    <div className="bg-[#FAF6EE] border border-[#2A211B]/15 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#2A211B]/10">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#E8702A]">
            {lang === 'es' ? 'Versatilidad del Citroën Méhari' : 'Citroën Méhari Versatility'}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-[#2A211B] mt-1">
            {lang === 'es' ? '3 Configuraciones de Techo' : '3 Modular Roof Configurations'}
          </h3>
        </div>

        {/* Segmented Controller */}
        <div className="inline-flex p-1 bg-[#E8DCBF] rounded-xl border border-[#2A211B]/10 self-start md:self-auto">
          {(['abierto', 'semiabierto', 'cerrado'] as RoofConfig[]).map((cfg) => {
            const isSelected = activeConfig === cfg;
            return (
              <button
                key={cfg}
                type="button"
                onClick={() => setActiveConfig(cfg)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#2A211B] text-[#FAF6EE] shadow-sm'
                    : 'text-[#2A211B]/70 hover:text-[#2A211B] hover:bg-[#FAF6EE]/50'
                }`}
              >
                {configs[cfg].title[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main interactive showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        <div className="lg:col-span-7 bg-[#F1E6CF] rounded-xl p-4 md:p-6 border border-[#2A211B]/10 mehari-ribbing relative overflow-hidden">
          <div className="absolute top-3 left-4 text-xs font-medium text-[#2A211B]/60 tracking-wider">
            CITROËN MÉHARI · {active.badge[lang]}
          </div>
          <MehariIllustration
            color={color}
            roofConfig={activeConfig}
            showFlowers={true}
            className="w-full max-w-xl mx-auto py-2"
          />
          <div className="text-center text-xs text-[#2A211B]/50 mt-1">
            {lang === 'es'
              ? 'Haz clic en los botones superiores para ver cada posición de capota'
              : 'Click the buttons above to preview each canopy position'}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8702A]/15 text-[#E8702A] flex items-center justify-center shrink-0 border border-[#E8702A]/20">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xl font-serif text-[#2A211B]">{active.title[lang]}</h4>
              <p className="text-xs text-[#2A211B]/60">{active.badge[lang]}</p>
            </div>
          </div>

          <p className="text-sm text-[#2A211B]/80 leading-relaxed">{active.description[lang]}</p>

          <div className="bg-[#F1E6CF]/80 p-3.5 rounded-lg border border-[#2A211B]/10 text-xs text-[#2A211B]/80">
            <span className="font-semibold text-[#2A211B]">
              {lang === 'es' ? 'Ideal para: ' : 'Ideal for: '}
            </span>
            {active.idealFor[lang]}
          </div>

          <div className="pt-2">
            <div className="text-xs font-semibold text-[#2A211B]/60 uppercase tracking-wider mb-2">
              {lang === 'es' ? 'Detalles constructivos' : 'Key Engineering Features'}
            </div>
            <ul className="space-y-1.5">
              {active.details[lang].map((detail, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-[#2A211B]/80">
                  <Check className="w-3.5 h-3.5 text-[#1E6F6B] shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
