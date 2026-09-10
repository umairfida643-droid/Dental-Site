import React from 'react';
import { Scan, ShieldCheck, HeartPulse, Sparkles, Clock, Award } from 'lucide-react';

export default function WhyChooseUs({ onOpenBooking }) {
  const features = [
    {
      icon: <Scan className="w-6 h-6 text-cyan-400" />,
      title: "3D Digital Precision & CBCT",
      description: "Zero guesswork. 3D high-resolution computer-aided diagnosis reveals micro-fractures, bone density, and nerve channels prior to treatment."
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-teal-400" />,
      title: "100% Painless Gentle Protocol",
      description: "Advanced computerized local anesthesia and soothing sedation options guarantee your complete comfort from start to finish."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Class-B European Sterilization",
      description: "Strict hospital-grade vacuum autoclave sterilization. Every instrument is vacuum sealed and opened exclusively in front of you."
    },
    {
      icon: <Award className="w-6 h-6 text-sky-400" />,
      title: "UK & FCPS Certified Specialists",
      description: "Our clinicians have over 25 years of combined international experience in advanced implantology and aesthetic smile reconstruction."
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: "Zero-Wait VIP Appointments",
      description: "Your time is respected. Pre-booked slots mean you are attended to immediately with no chaotic clinic waiting room delays."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: "Ultra-Modern Luxury Ambience",
      description: "Designed like a high-end wellness retreat with ergonomic dental massage chairs, calming acoustics, and personalized care."
    }
  ];

  return (
    <section id="why-us" className="py-20 relative bg-slate-950/60 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The dentbites Gold Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Why Discerning Patients Choose <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              dentbites For Their Dental Health
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            We merge cutting-edge 3D bio-engineering with compassionate, gentle dentistry to redefine your clinical experience.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 border border-slate-800/80 hover:border-cyan-500/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center mb-5 shadow-inner">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2.5">
                {feat.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950/80 via-[#0a233f]/90 to-teal-950/80 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
              Ready to experience painless dental excellence?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak with our lead dentists today or book your preferred slot online in under 60 seconds.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-xl shadow-cyan-500/30 transition-all flex-shrink-0"
          >
            Reserve Your Visit
          </button>
        </div>

      </div>
    </section>
  );
}
