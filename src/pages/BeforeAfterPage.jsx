import React, { useState, useRef, useCallback } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Award,
  Layers
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { CLINIC_INFO } from '../data/clinicData';

const CASES = [
  {
    id: 1,
    title: "Porcelain Veneers & Smile Alignment Makeover",
    category: "Aesthetic Dentistry",
    beforeImg: "/assets/img/before.jpg",
    afterImg: "/assets/img/after.jpg",
    complaint: "Discolored enamel, irregular tooth edges, and prominent gaps causing severe smile inhibition.",
    solution: "Placement of 8 handcrafted ultra-thin porcelain veneers designed with 3D facial aesthetic symmetry.",
    duration: "10 Days",
    visits: "2 Visits",
    painLevel: "Completely Painless",
    specialist: "Dr. Muhammad Hafeez (FCPS, FICOI)",
    patientQuote: "“My friends couldn't believe how natural it looks! My confidence at work has skyrocketed.” — Ayesha M."
  },
  {
    id: 2,
    title: "3D Computer-Guided Dental Implant Restoration",
    category: "Implantology",
    beforeImg: "/assets/media/services/Tooth_Extraction.jpeg",
    afterImg: "/assets/media/services/Dental_Implant.webp",
    complaint: "Missing upper premolar tooth preventing comfortable chewing and causing sunken facial profile.",
    solution: "Minimally invasive titanium implant placed with 3D digital surgical stent, topped with screw-retained Zirconia crown.",
    duration: "Single Sitting Surgery + Osseointegration",
    visits: "3 Visits",
    painLevel: "Painless Local Anesthesia",
    specialist: "Dr. Muhammad Hafeez (FCPS, FICOI)",
    patientQuote: "“I was eating normally by the next day. Feels identical to my original tooth!” — Tariq M."
  },
  {
    id: 3,
    title: "Ultrasonic Calculus Debridement & Enamel Polish",
    category: "Periodontal Care",
    beforeImg: "/assets/media/cases/scalling.jpeg",
    afterImg: "/assets/img/after.jpg",
    complaint: "Heavy tobacco & caffeine tartar buildup with swollen, bleeding gingival margins.",
    solution: "Full-mouth ultrasonic cavitation scaling, subgingival curettage, and fluoridated prophy-paste polishing.",
    duration: "35 Minutes",
    visits: "1 Visit",
    painLevel: "Zero Pain & Gentle",
    specialist: "Dr. Muhammad Hafeez (FCPS, FICOI)",
    patientQuote: "“Fresh breath and my teeth felt super smooth immediately after stepping off the chair.” — Faseeh U."
  }
];

function SingleCaseSlider({ caseData, onOpenBooking }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  return (
    <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#091e36]/90 via-[#0b2444]/80 to-[#07172b]/90 border border-cyan-500/30 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Interactive Comparison Slider */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-cyan-500/40 shadow-2xl bg-slate-950"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Full Base) */}
            <img
              src={caseData.afterImg}
              alt="After Treatment"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              onError={(e) => { e.target.src = '/assets/img/after.jpg'; }}
            />

            {/* Before Image (Clipped overlay using clip-path) */}
            <img
              src={caseData.beforeImg}
              alt="Before Treatment"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                WebkitClipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
              }}
              onError={(e) => { e.target.src = '/assets/img/before.jpg'; }}
            />

            {/* Before Badge */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-xs font-bold text-slate-200">
              BEFORE
            </div>

            {/* After Badge */}
            <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-xl bg-cyan-950/85 backdrop-blur-md border border-cyan-500/30 text-xs font-bold text-cyan-300">
              AFTER DENTBITES
            </div>

            {/* Vertical Divider Line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-1 bg-cyan-400 pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.8)]"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Central Drag Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 border-2 border-white shadow-xl flex items-center justify-center text-white cursor-grab">
                <ChevronLeft className="w-3.5 h-3.5 -mr-1" />
                <ChevronRight className="w-3.5 h-3.5 -ml-1" />
              </div>
            </div>
          </div>

          <div className="mt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
            <span>⟵ Drag slider left or right to inspect before and after ⟶</span>
          </div>
        </div>

        {/* Case Study Details */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-semibold text-cyan-300 w-fit mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>{caseData.category} Case Study</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
            {caseData.title}
          </h3>

          <div className="space-y-3 mb-6 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-red-400 block mb-1">Chief Complaint:</span>
              <span>{caseData.complaint}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">Clinical Solution:</span>
              <span>{caseData.solution}</span>
            </div>
          </div>

          {/* Clinical Metrics Table */}
          <div className="grid grid-cols-2 gap-2 text-xs mb-6">
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Time to Finish:</span>
              <span className="font-bold text-cyan-300">{caseData.duration}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Clinical Visits:</span>
              <span className="font-bold text-white">{caseData.visits}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Pain Protocol:</span>
              <span className="font-bold text-emerald-400">{caseData.painLevel}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Lead Specialist:</span>
              <span className="font-bold text-white text-[11px] truncate">{caseData.specialist}</span>
            </div>
          </div>

          {/* Patient Quote */}
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs italic text-cyan-200 mb-6">
            {caseData.patientQuote}
          </div>

          {/* Action Button */}
          <button
            onClick={() => onOpenBooking()}
            className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Smile Makeover Consultation</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function BeforeAfterPage({ onOpenBooking }) {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Real Patient Smile Transformations • Unfiltered Clinical Proof</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Before & After <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Clinical Transformation Gallery
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Witness how custom 3D digital smile engineering, computer-guided implantology, and micro-thin porcelain veneers restore aesthetic radiance and healthy chewing function.
          </p>
        </div>

        {/* Cases List */}
        <div className="space-y-12 mb-16">
          {CASES.map(caseItem => (
            <SingleCaseSlider 
              key={caseItem.id} 
              caseData={caseItem} 
              onOpenBooking={onOpenBooking} 
            />
          ))}
        </div>

        {/* 3D Smile Simulation CTA Banner */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#0a1e36] via-[#0c2b4e] to-[#071d34] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Preview Your Future Smile First</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Want To See Your Own Smile Simulation in 3D?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              During your consultation with Dr. Muhammad Hafeez, we capture a 3D digital scan of your mouth and show you an animated simulation of your final smile transformation before starting any treatment.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-xl shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 3D Smile Scan</span>
            </button>

            <a
              href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20dentbites,%20I%20would%20like%20to%20send%20my%20smile%20photos%20for%20a%20free%20quick%20assessment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xl shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>WhatsApp Smile Photos</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
