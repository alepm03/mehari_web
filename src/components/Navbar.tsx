import React, { useState } from 'react';
import { Language, CarColor } from '../types';
import { MessageCircle, Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  carColor: CarColor;
  setCarColor: (color: CarColor) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  setLang,
  carColor,
  setCarColor,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isOrange = carColor === 'naranja';

  const navLinks = [
    { to: '/', label: lang === 'es' ? 'Inicio' : 'Home' },
    { to: '/bodas', label: lang === 'es' ? 'Bodas' : 'Weddings' },
    { to: '/sevilla-experience', label: lang === 'es' ? 'Sevilla Experience' : 'Seville Experience' },
    { to: '/contacto', label: lang === 'es' ? 'Contacto' : 'Contact' },
  ];

  const toggleLanguage = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F1E6CF]/95 backdrop-blur-md border-b border-[#2A211B]/12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark with refined monogram */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-2xl font-serif font-semibold tracking-tight text-[#2A211B] hover:opacity-90 transition-opacity"
        >
          <span className="w-8 h-8 rounded-lg bg-[#EAE0CA] border border-[#2A211B]/15 flex items-center justify-center p-0.5 shadow-2xs">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <path d="M 22 24 C 28 24 30 28 32 36 L 32 72 L 38 80 L 30 38 Z" fill="#1E6F6B" />
              <path d="M 33 34 L 50 68 L 56 68 L 41 34 Z" fill="#E8702A" />
              <path d="M 50 68 L 66 34 L 72 34 L 55 68 Z" fill="#D9B27C" />
              <path d="M 78 24 C 72 24 70 28 68 36 L 68 70 L 60 80 L 68 38 Z" fill="#E8702A" />
            </svg>
          </span>
          <span>Mehari W&amp;E</span>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2A211B]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-1 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#2A211B] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E8702A]'
                    : 'text-[#2A211B]/75 hover:text-[#2A211B]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Car Selector, Language Switcher, WhatsApp CTA) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Naranja / Beige Car Selector */}
          <div className="flex items-center p-0.5 bg-[#E5D7BD] rounded-lg border border-[#2A211B]/10">
            <button
              type="button"
              onClick={() => setCarColor('naranja')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                isOrange
                  ? 'bg-[#E8702A] text-white shadow-xs'
                  : 'text-[#2A211B]/70 hover:text-[#2A211B]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>Naranja</span>
            </button>
            <button
              type="button"
              onClick={() => setCarColor('beige')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                !isOrange
                  ? 'bg-[#B58750] text-white shadow-xs'
                  : 'text-[#2A211B]/70 hover:text-[#2A211B]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>Beige</span>
            </button>
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-[#2A211B]/15 text-[#2A211B] hover:bg-[#EAE0CA] cursor-pointer transition-colors whitespace-nowrap"
            title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
          >
            <Globe className="w-3.5 h-3.5 text-[#1E6F6B]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={onOpenBooking}
            className={`px-4 py-2 text-xs font-medium text-white rounded-lg transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              isOrange
                ? 'bg-[#E8702A] hover:bg-[#D45F1C]'
                : 'bg-[#B58750] hover:bg-[#9F723E]'
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{lang === 'es' ? 'Consultar fecha' : 'Inquire date'}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2 py-1 text-xs font-medium border border-[#2A211B]/20 rounded text-[#2A211B]"
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2A211B] hover:bg-[#E8DCBF] rounded-lg cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#FAF6EE] border-b border-[#2A211B]/15 space-y-4">
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-sm font-medium text-[#2A211B] hover:bg-[#F1E6CF] rounded-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Car Selector */}
          <div className="pt-2 border-t border-[#2A211B]/10">
            <span className="text-xs text-[#2A211B]/60 uppercase font-semibold block mb-2">
              {lang === 'es' ? 'Elige tu Méhari' : 'Choose your Méhari'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCarColor('naranja')}
                className={`py-2 px-3 text-xs font-medium rounded-lg flex items-center justify-center gap-2 ${
                  isOrange ? 'bg-[#E8702A] text-white' : 'bg-[#F1E6CF] text-[#2A211B]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span>Naranja Hopi</span>
              </button>
              <button
                type="button"
                onClick={() => setCarColor('beige')}
                className={`py-2 px-3 text-xs font-medium rounded-lg flex items-center justify-center gap-2 ${
                  !isOrange ? 'bg-[#B58750] text-white' : 'bg-[#F1E6CF] text-[#2A211B]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
                <span>Beige Colorado</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'es' ? 'Consultar por WhatsApp' : 'Inquire on WhatsApp'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
