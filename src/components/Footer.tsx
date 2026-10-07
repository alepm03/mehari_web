import React from 'react';
import { Language } from '../types';
import { BUSINESS_INFO } from '../data/content';
import { Instagram, Mail, Phone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-[#2A211B] text-[#FAF6EE] pt-14 pb-10 border-t border-[#3F332B] mehari-ribbing-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="text-2xl font-serif font-semibold text-[#FAF6EE] tracking-tight">
              {BUSINESS_INFO.name}
            </Link>
            <p className="text-sm text-[#FAF6EE]/75 max-w-sm leading-relaxed">
              {lang === 'es'
                ? 'Alquiler de Citroën Méhari clásicos restaurados para bodas en haciendas y tours monumentales por Sevilla. El clásico que enamora a todos.'
                : 'Restored vintage Citroën Méhari rentals for Andalusian wedding haciendas and monumental Seville tours. The classic that enchants everyone.'}
            </p>
            <div className="pt-2 text-xs text-[#FAF6EE]/50">
              <span>Sevilla &middot; Provincia &middot; Andalucía &middot; España</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
              {lang === 'es' ? 'Navegación' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF6EE]/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Inicio' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/bodas" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Bodas & Haciendas' : 'Weddings & Haciendas'}
                </Link>
              </li>
              <li>
                <Link to="/sevilla-experience" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Sevilla Experience Tours' : 'Seville Experience Tours'}
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white transition-colors">
                  {lang === 'es' ? 'Contacto & Disponibilidad' : 'Contact & Availability'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-[#E8702A] uppercase tracking-wider">
              {lang === 'es' ? 'Contacto Directo' : 'Direct Inquiries'}
            </h4>
            <div className="space-y-2.5 text-sm text-[#FAF6EE]/80">
              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#25D366]" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D9B27C]" />
                <span>{BUSINESS_INFO.email}</span>
              </a>
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#E8702A] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#E8702A]" />
                <span>{BUSINESS_INFO.instagram}</span>
              </a>
            </div>
            <p className="text-xs text-[#FAF6EE]/50 pt-2">
              {lang === 'es'
                ? 'Te atenderemos con gusto de forma personalizada SIEMPRE.'
                : 'Personalized attention ALWAYS with genuine Andalusian warmth.'}
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF6EE]/50 gap-4">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
          <p className="flex items-center gap-1">
            <span>{lang === 'es' ? 'Citroën Méhari clásicos restaurados con alma en Sevilla' : 'Restored vintage Citroën Méhari with soul in Seville'}</span>
            <Heart className="w-3 h-3 text-[#E8702A]" />
          </p>
        </div>
      </div>
    </footer>
  );
};
