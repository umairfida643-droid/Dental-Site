import React from 'react';
import { Calendar, ArrowRight, Shield, Award, CheckCircle, Sparkles, Star } from 'lucide-react';
import Tooth3DCanvas from './3d/Tooth3DCanvas';
import { CLINIC_INFO } from '../data/clinicData';

export default function Hero({ onOpenBooking }) {
  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      {/* Dynamic Background Light Rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-12 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-6 backdrop-blur-md shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next-Gen 3D Guided Dentistry • Painless Care</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              Crafting Confident, Radiant Smiles With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
                Precision 3D Care.
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed font-normal">
              Say goodbye to dental anxiety. Experience world-class dental implants, clear invisible aligners, 
              and single-visit root canals using advanced digital 3D diagnostics and gentle, pain-free sedation.
            </p>

            {/* Primary Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOpenBooking}
                className="group relative px-7 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Instant Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#services"
                className="px-6 py-4 rounded-2xl font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>View Treatments</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="w-full grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">100% Painless</div>
                  <div className="text-xs text-slate-400">Gentle Anesthesia</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-500/30 flex items-center justify-center text-teal-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">15k+ Smiles</div>
                  <div className="text-xs text-slate-400">Restored Perfectly</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">4.9/5 Rating</div>
                  <div className="text-xs text-slate-400">Google Verified</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Tooth Showcase with Glassmorphic Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Main Interactive 3D Card Frame */}
            <div className="relative w-full rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-900/90 via-[#0a1e36]/80 to-slate-900/95 border border-cyan-500/25 shadow-2xl shadow-cyan-950/50 backdrop-blur-2xl">
              
              {/* 3D Canvas Canvas */}
              <Tooth3DCanvas />

              {/* Floating Badge 1: 99.4% Success */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3.5 rounded-2xl bg-[#0b213b]/90 border border-cyan-400/40 backdrop-blur-md shadow-xl flex items-center gap-3 animate-float">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm">
                  99%
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Clinical Success</div>
                  <div className="text-[10px] text-cyan-300 font-medium">Computer Guided</div>
                </div>
              </div>

              {/* Floating Badge 2: Google 5-Star Reviews */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 p-3.5 rounded-2xl bg-[#0b213b]/90 border border-amber-400/40 backdrop-blur-md shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">4.9/5 Stars</div>
                  <div className="text-[10px] text-amber-300 font-medium">480+ Happy Reviews</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
