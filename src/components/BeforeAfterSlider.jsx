import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MoveHorizontal, Check, ShieldCheck, ArrowRight } from 'lucide-react';

export default function BeforeAfterSlider({ onOpenBooking }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let percentage = (x / width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  return (
    <section id="before-after" className="py-20 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Proven Real Clinical Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Witness The Transformation: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              Before & After Smile Restoration
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Drag the interactive slider below to see how our bespoke cosmetic dentistry and aligner therapy restores aesthetic perfection and natural bite function.
          </p>
        </div>

        {/* Interactive Comparison Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Comparison Slider Box */}
          <div className="lg:col-span-8">
            <div 
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={(e) => { if (e.touches[0]) handleMove(e.touches[0].clientX); }}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-500/30 cursor-ew-resize select-none bg-slate-950"
            >
              {/* After Image (Background full) */}
              <img 
                src="/assets/img/after.jpg" 
                alt="After Dental Smile Makeover" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Before Image (Top overlay clipped seamlessly via clip-path for 100% instant alignment) */}
              <img 
                src="/assets/img/before.jpg" 
                alt="Before Dental Treatment" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                  WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
              />

              {/* Badges on Images */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="px-3 py-1 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  Before
                </span>
              </div>
              <div className="absolute top-4 right-4 pointer-events-none">
                <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  After Treatment
                </span>
              </div>

              {/* Vertical Divider Handle Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-500 border-2 border-white shadow-xl flex items-center justify-center text-white">
                  <MoveHorizontal className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              {/* Bottom subtle drag instruction */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] text-slate-300 border border-white/10">
                ↔ Slide left or right to compare
              </div>
            </div>
          </div>

          {/* Case Information & Benefits */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="glass-card rounded-2xl p-6 border border-cyan-500/20">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Featured Case Study
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Full Arch Smile Makeover
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                Patient presented with severe tooth discolouration, enamel micro-cracks, and spacing. Restored with handcrafted lithium disilicate porcelain veneers and ultrasonic scaling.
              </p>

              <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Procedure:</span>
                  <span className="font-semibold text-white">Porcelain Veneers + Polishing</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Total Visits:</span>
                  <span className="font-semibold text-cyan-300">2 Appointments</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Pain Level:</span>
                  <span className="font-semibold text-emerald-400">Painless & Non-Invasive</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Lead Specialist:</span>
                  <span className="font-semibold text-white">Dr. Muhammad Hafeez (FCPS, FICOI)</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation CTA */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/70 to-slate-900/90 border border-cyan-500/30">
              <h4 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                Want Your Own Transformation?
              </h4>
              <p className="text-xs text-slate-300 mb-4">
                Book a 3D digital smile simulation and discover how your teeth can look before undergoing any procedure.
              </p>
              <button
                onClick={onOpenBooking}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all"
              >
                Schedule 3D Smile Consultation
              </button>

              <div className="mt-3 text-center">
                <Link
                  to="/before-after"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
                >
                  <span>Explore Full Transformation Gallery</span>
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
