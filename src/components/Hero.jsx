import React, { useState, useEffect } from 'react';
import { Calendar, ShieldCheck, Award, Star, ArrowRight, Clock, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { CLINIC_INFO } from '../data/clinicData';

export default function Hero({ onOpenBooking }) {
  // Background slides showcasing teeth, smile transformations, and dental clinic procedures
  const backgroundSlides = [
    {
      image: '/assets/img/carousel-1.jpg',
      tag: 'Advanced Dental Clinic',
      caption: 'Ultra-Modern Operatory & Digital 3D Diagnostic Suites'
    },
    {
      image: '/assets/media/services/smile-makeover-with-porcelain-veneers.jpg',
      tag: 'Smile Makeover',
      caption: 'Bespoke Porcelain Veneers & Natural Teeth Transformation'
    },
    {
      image: '/assets/img/carousel-2.jpg',
      tag: 'Implantology Suite',
      caption: 'Computer-Guided Titanium Implants With Lifetime Durability'
    },
    {
      image: '/assets/img/slide1.webp',
      tag: 'Clear Aligners & Braces',
      caption: 'Discreet Orthodontic Teeth Alignment Without Metal Wires'
    },
    {
      image: '/assets/media/services/tooth-scaling-root-planing.jpg',
      tag: 'Preventive Oral Care',
      caption: 'Ultrasonic Teeth Scaling, Polishing & Gum Health Care'
    },
    {
      image: '/assets/img/slide6.jpg',
      tag: 'Gentle Specialist Care',
      caption: 'Single-Sitting Painless Rotary Root Canal Treatment'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState(0);

  // Auto-slide effect for background slides (5 seconds interval)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgroundSlides.length]);

  const clinicHighlights = [
    {
      title: 'Dental Implants',
      badge: 'Permanent Teeth',
      image: '/assets/media/services/Dental_Implant.webp',
      desc: 'Computer-guided titanium implants that look and bite like natural teeth.',
      highlight: '99.4% Success Rate'
    },
    {
      title: 'Clear Aligners',
      badge: 'Invisible Braces',
      image: '/assets/media/services/aligners.webp',
      desc: 'Discreet 3D digital aligners to straighten teeth with zero sharp wires.',
      highlight: 'Digital 3D Preview'
    },
    {
      title: 'Smile Makeover',
      badge: 'Cosmetic Veneers',
      image: '/assets/img/after.jpg',
      desc: 'Handcrafted ultra-thin porcelain veneers for a radiant, symmetrical smile.',
      highlight: 'Instant Transformation'
    },
    {
      title: 'Rotary RCT',
      badge: 'Painless Root Canal',
      image: '/assets/media/services/RCT.jpg',
      desc: 'Computerized gentle root canal to eliminate throbbing pain in 1 visit.',
      highlight: 'Zero Discomfort'
    }
  ];

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex items-center pt-8 pb-16 lg:py-20 overflow-hidden select-none">
      
      {/* 1. Full-Bleed Dark Carousel Background Slides with Cinematic Dark Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#030914]">
        {backgroundSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className={`w-full h-full object-cover object-center filter brightness-[0.38] contrast-125 saturate-110 transform transition-transform duration-[6000ms] ${
                idx === currentSlide ? 'scale-105' : 'scale-100'
              }`}
              onError={(e) => {
                e.target.src = '/assets/img/carousel-1.jpg';
              }}
            />
          </div>
        ))}

        {/* Dark Cinematic Gradient Overlay - Keeps teeth slides visible while maintaining rich dark contrast */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#030a14]/85 via-[#051324]/75 to-[#030a14]/85 pointer-events-none" />
        
        {/* Top and Bottom soft vignette fade for smooth page blending */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#061220]/75 via-transparent to-[#061220] pointer-events-none" />
        
        {/* Radial ambient vignette to focus on text content */}
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#030a14_90%)] opacity-75 pointer-events-none" />
        
        {/* Subtle cyan ambient glow */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-20" />
      </div>

      {/* 2. Main Hero Grid Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Clinic Value Proposition & Direct Booking CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-semibold text-cyan-300 mb-6 backdrop-blur-md shadow-lg shadow-cyan-950/50">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Award-Winning Dental Excellence • Class-B Sterilization</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Transform Your Smile With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 drop-shadow-sm">
                Leading Dental Specialists.
              </span>
            </h1>

            {/* Engaging Subtext */}
            <p className="text-base sm:text-lg text-slate-200 mb-8 max-w-2xl leading-relaxed font-normal">
              Say goodbye to dental anxiety. Experience painless, computer-guided dental implants, 
              invisible aligners, and single-visit root canals conducted in a relaxing, luxury clinic environment.
            </p>

            {/* Primary Action Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              {/* Book Appointment CTA */}
              <button
                onClick={() => onOpenBooking()}
                className="group relative px-7 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Priority Appointment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Official WhatsApp Quick Chat */}
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20DentCare!%20I%20would%20like%20to%20inquire%20about%20dental%20treatments%20and%20booking.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/45 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2.5"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 w-full max-w-xl text-xs text-slate-200">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>100% Painless Protocol</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>Same-Day Appointments</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>0% Installment Plans</span>
              </div>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-5">
              {/* Doctor Headshots Stack */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-cyan-500 object-cover" src="/assets/media/dentists/hafeez.jpg" alt="Dr. Hafeez" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-cyan-500 object-cover" src="/assets/media/dentists/noor.jpg" alt="Dr. Noor" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-cyan-500 object-cover" src="/assets/media/dentists/doctor.jpg" alt="Dr. Bilal" />
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-900 ring-2 ring-cyan-500 text-xs font-bold text-cyan-200">
                  +15k
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="font-bold text-white text-sm ml-1">4.9 / 5.0</span>
                </div>
                <div className="text-xs text-slate-400">
                  Over <span className="text-white font-semibold">15,000+ satisfied patients</span> across Lahore
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Interactive Dental Showcase Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Dental Showcase Card */}
            <div className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-[#0a1e36]/90 via-[#0a233f]/90 to-[#07182c]/95 border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl">
              
              {/* Top Live Clinic Banner */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>DentCare Specialist Center</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Open: 9 AM - 9 PM</span>
                </div>
              </div>

              {/* Featured Treatment Image with Light Reflection Sheen */}
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-5 bg-slate-900 border border-white/10 shadow-lg group">
                <img
                  src={clinicHighlights[selectedFeature].image}
                  alt={clinicHighlights[selectedFeature].title}
                  className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all duration-300 transform-gpu"
                  onError={(e) => {
                    e.target.src = '/assets/img/carousel-1.jpg';
                  }}
                />
                {/* Diagonal glass reflection sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none -skew-x-12 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061424] via-transparent to-black/20" />
                
                {/* Floating Highlight Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-slate-900/85 backdrop-blur-md border border-cyan-400/40 text-xs font-bold text-cyan-300 shadow-md">
                  ✦ {clinicHighlights[selectedFeature].highlight}
                </div>

                {/* Overlaid Title on Image */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
                    {clinicHighlights[selectedFeature].badge}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {clinicHighlights[selectedFeature].title}
                  </h3>
                </div>
              </div>

              {/* Description text */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {clinicHighlights[selectedFeature].desc}
              </p>

              {/* Interactive Treatment Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {clinicHighlights.map((hl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedFeature(i)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all ${
                      selectedFeature === i
                        ? 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 shadow-md'
                        : 'bg-slate-900/70 border border-white/5 text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="font-bold text-[11px] truncate">{hl.title}</div>
                    <div className="text-[10px] text-slate-400 font-normal truncate">{hl.badge}</div>
                  </button>
                ))}
              </div>

              {/* Card Action: Book Consultation */}
              <button
                onClick={() => onOpenBooking()}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment Online</span>
              </button>

              {/* Floating Doctor Badge */}
              <div className="absolute -bottom-4 -left-4 p-3 rounded-2xl bg-[#0b213b]/95 border border-cyan-400/40 backdrop-blur-md shadow-xl flex items-center gap-3">
                <img
                  src="/assets/media/dentists/hafeez.jpg"
                  alt="Dr. Hafeez"
                  className="w-10 h-10 rounded-xl object-cover border border-cyan-400"
                />
                <div>
                  <div className="text-xs font-bold text-white">Dr. Muhammad Hafeez</div>
                  <div className="text-[10px] text-cyan-300 font-medium">Chief Consultant Orthodontist</div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 3. Bottom Background Slides Indicator & Controls */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Clinic Showcase:</span>
            <div className="flex items-center gap-2">
              {backgroundSlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-8 bg-cyan-400 shadow-lg shadow-cyan-400/50'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={slide.tag}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
            <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-white/10 font-semibold text-cyan-400">
              {backgroundSlides[currentSlide].tag}
            </span>
            <span className="text-slate-400">• {backgroundSlides[currentSlide].caption}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? backgroundSlides.length - 1 : prev - 1))}
              className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % backgroundSlides.length)}
              className="p-1.5 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
