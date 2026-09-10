import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Dentists from '../components/Dentists';
import BookingSection from '../components/BookingSection';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function HomePage({ onOpenBooking }) {
  return (
    <>
      {/* 100% Untouched Hero Section */}
      <Hero onOpenBooking={() => onOpenBooking()} />

      {/* Clinical Trust Stats Bar */}
      <StatsBar />

      {/* Interactive Smile Transformation Showcase */}
      <BeforeAfterSlider onOpenBooking={() => onOpenBooking()} />

      {/* Core Services Overview */}
      <Services onOpenBooking={onOpenBooking} />

      {/* Why dentbites & Technology */}
      <WhyChooseUs onOpenBooking={() => onOpenBooking()} />

      {/* Chief Consultant Dr. Muhammad Hafeez Spotlight */}
      <Dentists onOpenBooking={onOpenBooking} />

      {/* Direct Booking Section */}
      <BookingSection />

      {/* Verified Patient Reviews */}
      <Testimonials />

      {/* Frequently Asked Questions */}
      <FAQ />
    </>
  );
}
