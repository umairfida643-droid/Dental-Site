import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050e18] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-sky-600 p-0.5 shadow-lg shadow-cyan-500/30">
                <div className="w-full h-full bg-[#081726] rounded-[10px] flex items-center justify-center p-1.5">
                  <img src="/assets/img/Logo.png" alt="DentCare Logo" className="w-full h-full object-contain filter brightness-125" />
                </div>
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-white">
                  Dent<span className="text-cyan-400">Care</span>
                </div>
                <p className="text-[10px] text-slate-400 uppercase font-medium">Advanced 3D Dentistry</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Dedicated to pain-free, world-class dental care with computer-guided 3D diagnostics, certified implant specialists, and Class-B European sterilization protocols.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified European Sterilization Standard</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#services" className="hover:text-cyan-400 transition">Our Treatments</a></li>
              <li><a href="#before-after" className="hover:text-cyan-400 transition">Before & After Showcase</a></li>
              <li><a href="#dentists" className="hover:text-cyan-400 transition">Meet The Specialists</a></li>
              <li><a href="#why-us" className="hover:text-cyan-400 transition">Why Choose DentCare</a></li>
              <li><a href="#testimonials" className="hover:text-cyan-400 transition">Patient Reviews</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Featured Procedures */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Treatments</h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <button 
                    onClick={() => onOpenBooking(s.id)}
                    className="hover:text-cyan-400 transition text-left"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact & Visit</h4>
            <div className="flex items-start gap-2.5 text-xs">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white transition">{CLINIC_INFO.phone}</a>
            </div>
            <div className="flex items-center gap-2.5 text-xs">
              <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{CLINIC_INFO.email}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs pt-1">
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.timing}</span>
            </div>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} DentCare Luxury Clinic. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
