import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Language, CarColor } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { WeddingsPage } from './pages/WeddingsPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ContactPage } from './pages/ContactPage';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from './data/content';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [lang, setLang] = useState<Language>('es');
  const [carColor, setCarColor] = useState<CarColor>('naranja');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState<'boda' | 'tour' | 'medida'>('boda');

  const handleOpenBooking = (service: 'boda' | 'tour' | 'medida' = 'boda') => {
    setBookingService(service);
    setBookingModalOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F1E6CF] text-[#2A211B] antialiased selection:bg-[#E8702A]/20 selection:text-[#2A211B]">
        {/* Navigation Bar */}
        <Navbar
          lang={lang}
          setLang={setLang}
          carColor={carColor}
          setCarColor={setCarColor}
          onOpenBooking={() => handleOpenBooking('boda')}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  lang={lang}
                  carColor={carColor}
                  setCarColor={setCarColor}
                  onOpenBooking={(s) => handleOpenBooking(s || 'boda')}
                />
              }
            />
            <Route
              path="/bodas"
              element={
                <WeddingsPage
                  lang={lang}
                  carColor={carColor}
                  setCarColor={setCarColor}
                  onOpenBooking={() => handleOpenBooking('boda')}
                />
              }
            />
            <Route
              path="/sevilla-experience"
              element={
                <ExperiencesPage
                  lang={lang}
                  carColor={carColor}
                  onOpenBooking={() => handleOpenBooking('tour')}
                />
              }
            />
            <Route
              path="/contacto"
              element={
                <ContactPage
                  lang={lang}
                  carColor={carColor}
                  setCarColor={setCarColor}
                />
              }
            />
          </Routes>
        </main>

        {/* Global Floating WhatsApp Quick Action Button */}
        <aside
          aria-label="WhatsApp Directo"
          className="fixed bottom-5 right-5 z-40 flex items-center"
        >
          <a
            href={`https://wa.me/${BUSINESS_INFO.phoneClean}?text=${encodeURIComponent(
              lang === 'es'
                ? '¡Hola Mehari W&E! Me gustaría consultar información y disponibilidad para bodas / tours por Sevilla.'
                : 'Hello Mehari W&E! I would like to inquire about availability for weddings / Seville tours.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
              WhatsApp
            </span>
          </a>
        </aside>

        {/* Global Booking / Availability Modal */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          lang={lang}
          defaultService={bookingService}
          initialCarColor={carColor}
        />

        {/* Quiet Footer */}
        <Footer lang={lang} />
      </div>
    </BrowserRouter>
  );
}
