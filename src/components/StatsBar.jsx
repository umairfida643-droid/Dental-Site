import React from 'react';
import { Sparkles, CheckCircle2, Award, Star, Users, Stethoscope } from 'lucide-react';
import { STATS } from '../data/clinicData';

export default function StatsBar() {
  const iconMap = {
    Sparkles: <Sparkles className="w-6 h-6 text-cyan-400" />,
    CheckCircle2: <CheckCircle2 className="w-6 h-6 text-teal-400" />,
    Award: <Award className="w-6 h-6 text-sky-400" />,
    Star: <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
  };

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 bg-[#091e36]/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-cyan-950/40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {STATS.map((stat, idx) => (
            <div key={idx} className={`flex items-center gap-4 ${idx !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 shadow-inner">
                {iconMap[stat.icon] || <CheckCircle2 className="w-6 h-6 text-cyan-400" />}
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-400">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
