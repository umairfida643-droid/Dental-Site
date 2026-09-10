import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Dentists from './components/Dentists';
import BookingSection from './components/BookingSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AppointmentModal from './components/AppointmentModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

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
    <div className="min-h-screen bg-[#061220] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <StatsBar />
        <BeforeAfterSlider onOpenBooking={() => handleOpenBooking()} />
        <Services onOpenBooking={handleOpenBooking} />
        <WhyChooseUs onOpenBooking={() => handleOpenBooking()} />
        <Dentists onOpenBooking={handleOpenBooking} />
        <BookingSection />
        <Testimonials />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Interactive Global Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
        initialDentistId={selectedDentistId}
      />

      {/* Floating Instant WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
