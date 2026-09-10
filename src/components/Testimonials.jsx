import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';
import { TESTIMONIALS, CLINIC_INFO } from '../data/clinicData';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Real Patient Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Loved By Over 15,000+ <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Smiling Patients Across Lahore
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white">{CLINIC_INFO.googleRating} out of 5</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Based on {CLINIC_INFO.reviewsCount}+ verified Google reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="glass-card rounded-3xl p-7 border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between"
            >
              <div>
                {/* Header with stars & quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-cyan-500/20" />
                </div>

                {/* Review text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
              </div>

              {/* Author & Treatment */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800/60">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/40"
                  onError={(e) => {
                    e.target.src = '/assets/img/default-user.png';
                  }}
                />
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    {review.name}
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xs text-cyan-300 font-medium">
                    {review.treatment}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
