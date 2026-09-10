import React from 'react';
import { Award, Clock, Calendar, CheckCircle, Sparkles, Stethoscope } from 'lucide-react';
import { DENTISTS } from '../data/clinicData';

export default function Dentists({ onOpenBooking }) {
  return (
    <section id="dentists" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Master Clinicians & Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Meet Our World-Class <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Dental Surgeons & Specialists
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Trained at premier medical institutions across the UK and Pakistan, our specialist clinicians combine surgical mastery with an artistic eye for smile aesthetics.
          </p>
        </div>

        {/* Dentists Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DENTISTS.map((dentist) => (
            <div
              key={dentist.id}
              className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 group"
            >
              <div>
                {/* Doctor Headshot with Overlay */}
                <div className="relative aspect-[4/4] overflow-hidden bg-slate-900">
                  <img
                    src={dentist.image}
                    alt={dentist.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/assets/img/team-1.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091e36] via-[#091e36]/30 to-transparent" />
                  
                  {/* Experience Badge */}
                  <span className="absolute bottom-4 left-4 px-3 py-1 rounded-xl bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    {dentist.experience}
                  </span>
                </div>

                {/* Doctor Bio & Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {dentist.name}
                  </h3>
                  <div className="text-xs font-semibold text-cyan-400 mb-1.5">
                    {dentist.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mb-3">
                    {dentist.degrees}
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                    {dentist.bio}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="text-[11px]">{dentist.availability}</span>
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenBooking(undefined, dentist.id)}
                  className="w-full py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book with {dentist.name.split(' ')[1]}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
