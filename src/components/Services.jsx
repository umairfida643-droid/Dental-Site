import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../data/clinicData';

export default function Services({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Restorative', 'Cosmetics', 'Orthodontics', 'Endodontics', 'Oral Surgery', 'Preventive', 'Kids Care'];

  const filteredServices = activeCategory === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="services" className="py-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Comprehensive Specialized Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Precision Dental Treatments <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Tailored For Your Ultimate Comfort
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            From single-visit computerized root canals to titanium dental implants and discreet clear aligners, experience elite clinical precision.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
            >
              {/* Image & Badge Header */}
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all duration-300 transform-gpu"
                    onError={(e) => {
                      e.target.src = '/assets/img/service-1.jpg';
                    }}
                  />
                  {/* Diagonal glass reflection sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -skew-x-12 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091e36] via-transparent to-black/20" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-cyan-300">
                    {service.category}
                  </span>

                  {service.popular && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow-md">
                      ★ Popular
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-4">
                    {service.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer with Info & Action */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 mb-3.5">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="text-emerald-400 font-medium truncate max-w-[150px]">
                    {service.painLevel}
                  </div>
                </div>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-cyan-300 bg-cyan-950/60 hover:bg-cyan-500 hover:text-white border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
