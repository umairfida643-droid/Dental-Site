import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Clock, Calendar, CheckCircle2, Sparkles, ShieldCheck, Stethoscope, Star, Check, ArrowRight } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { DENTISTS, CLINIC_INFO } from '../data/clinicData';

export default function Dentists({ onOpenBooking }) {
  const doctor = DENTISTS[0];

  return (
    <section id="dentists" className="py-20 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chief Dental Surgeon & Specialist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Meet Your Chief Consultant: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Dr. Muhammad Hafeez
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Providing bespoke, painless, world-class dental care backed by over 15 years of surgical excellence in dental implants, clear aligners, and aesthetic smile transformations.
          </p>
        </div>

        {/* Master Consultant Feature Showcase (Zero Empty Space) */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#091e36]/95 via-[#0b2444]/90 to-[#07172b]/95 border border-cyan-500/35 shadow-2xl shadow-cyan-950/60 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Doctor Portrait & Quick Credentials */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 border-2 border-cyan-500/40 shadow-2xl group">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top brightness-95 group-hover:brightness-105 transition-all duration-500 transform-gpu"
                  onError={(e) => {
                    e.target.src = '/assets/img/team-1.jpg';
                  }}
                />
                
                {/* Diagonal glass reflection sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -skew-x-12 z-10" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#061424] via-transparent to-black/10" />

                {/* Top Badge: FICOI (USA) */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-slate-900/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>FICOI (USA) Fellow</span>
                </div>

                {/* Bottom Overlay: Experience & Reviews */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#091e36]/90 border border-white/10 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{doctor.experience}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-[10px] text-cyan-300">Over 8,000+ Surgeries Treated</div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-slate-900/80 px-2 py-1 rounded-lg border border-amber-400/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Clinic Timing & Direct Availability Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Consulting Hours</div>
                    <div className="text-[11px] text-slate-400">{doctor.availability}</div>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                  On-Duty
                </span>
              </div>
            </div>

            {/* Right Column: Comprehensive Doctor Bio, Achievements & Direct Actions */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Doctor Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Lead Consultant & Dental Surgeon</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
                  {doctor.name}
                </h3>
                <div className="text-sm sm:text-base font-semibold text-cyan-300 mb-2">
                  {doctor.title}
                </div>
                <div className="inline-block px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-bold text-slate-200">
                  {doctor.degrees}
                </div>
              </div>

              {/* Bio Paragraph */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                {doctor.bio}
              </p>

              {/* 4 Clinical Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">15+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Years Practice</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-teal-400">8,000+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Smiles Restored</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-sky-400">99.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Success Rate</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Painless Care</div>
                </div>
              </div>

              {/* Key Clinical Expertise Areas */}
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Core Specialized Procedures:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {doctor.expertise?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/50 border border-white/5">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onOpenBooking(undefined, doctor.id)}
                  className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book VIP Appointment with Dr. Hafeez</span>
                </button>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Muhammad%20Hafeez,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20my%20dental%20treatment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 rounded-2xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xl shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WhatsApp Doctor</span>
                </a>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-400">Want to see Dr. Hafeez's complete credentials & timeline?</span>
                <Link
                  to="/chief-consultant"
                  className="inline-flex items-center gap-1.5 font-bold text-cyan-400 hover:text-cyan-300 transition"
                >
                  <span>Explore Full Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
