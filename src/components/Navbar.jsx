import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Clock, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Before & After', href: '#before-after' },
    { name: 'Chief Consultant', href: '#dentists' },
    { name: 'Why dentbites', href: '#why-us' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' }
  ];

  return (
    <>
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 text-xs py-2 px-4 border-b border-cyan-900/40 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Class-B European Sterilization Standard
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Mon - Sat: 9:00 AM - 9:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${CLINIC_INFO.phone}`} 
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> Urgent: {CLINIC_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#071321]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/40 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center group py-0.5">
              <img 
                src="/assets/img/Logo.png" 
                alt="dentbites" 
                className="h-14 sm:h-16 md:h-20 w-auto object-contain filter drop-shadow-[0_4px_14px_rgba(87,202,219,0.35)] group-hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20dentbites,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                <span>WhatsApp Live</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#071321]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-4 pt-3 pb-6 mt-3 animate-fadeIn">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-cyan-400 hover:bg-cyan-950/40 rounded-lg transition"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-sky-600 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment Now
                </button>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-center text-slate-300 bg-slate-800/80 border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  Call: {CLINIC_INFO.phone}
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
