import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Dedicated Page Views
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BeforeAfterPage from './pages/BeforeAfterPage';
import ChiefConsultantPage from './pages/ChiefConsultantPage';
import WhyUsPage from './pages/WhyUsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(undefined);
  const [selectedDentistId, setSelectedDentistId] = useState(undefined);

  const handleOpenBooking = (serviceId, dentistId) => {
    setSelectedServiceId(serviceId);
    setSelectedDentistId(dentistId);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
  };

  return (
    <BrowserRouter>
      {/* Resets scroll to top upon page navigation */}
      <ScrollToTop />

      <div className="min-h-screen bg-[#061220] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
        {/* Top Global Navigation */}
        <Navbar onOpenBooking={() => handleOpenBooking()} />

        {/* Multi-Page Route Render */}
        <main className="flex-1">
          <Routes>
            {/* 1. Home Route: Untouched Hero & complete homepage preserved */}
            <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />

            {/* 2. Dedicated Full-Fledged Menu Pages */}
            <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/before-after" element={<BeforeAfterPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/chief-consultant" element={<ChiefConsultantPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/why-us" element={<WhyUsPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/testimonials" element={<TestimonialsPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/faq" element={<FAQPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/contact" element={<ContactPage onOpenBooking={handleOpenBooking} />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer with Dedicated Page Links */}
        <Footer onOpenBooking={handleOpenBooking} />

        {/* Global Interactive Appointment Modal */}
        <AppointmentModal
          isOpen={isModalOpen}
          onClose={handleCloseBooking}
          initialServiceId={selectedServiceId}
          initialDentistId={selectedDentistId}
        />

        {/* Floating Instant WhatsApp Button */}
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}
