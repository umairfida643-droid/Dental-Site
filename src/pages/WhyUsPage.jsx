import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  HeartHandshake, 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Zap, 
  Clock, 
  BadgeCheck 
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { CLINIC_INFO } from '../data/clinicData';

export default function WhyUsPage({ onOpenBooking }) {
  const pillars = [
    {
      icon: ShieldCheck,
      badge: "European Standard",
      title: "Class-B Fractional Pre-Vacuum Sterilization",
      desc: "We strictly adopt European Class-B autoclaves capable of sterilizing hollow and porous surgical instruments at 134°C under triple vacuum pulses. Every instrument set is sealed in an individual sterile indicator pouch and cracked open right before your eyes."
    },
    {
      icon: Cpu,
      badge: "Zero Putty Impressions",
      title: "3D Digital Intraoral Laser Scanning",
      desc: "Forget choking on nauseating impression goop. Our handheld digital laser scanner generates an exact 3D color hologram of your teeth in under 3 minutes with sub-millimeter clinical accuracy for precision aligners, crowns, and implants."
    },
    {
      icon: HeartHandshake,
      badge: "Zero Discomfort",
      title: "100% Painless Anesthesia Protocol",
      desc: "Dental visits shouldn't hurt. We utilize topical numbing gels followed by micro-gauge buffered anesthetic delivery. Even patients with severe dental phobia find our root canal and implant sessions soothing and painless."
    },
    {
      icon: CreditCard,
      badge: "Transparent Care",
      title: "0% Markup Installment Payment Plans",
      desc: "Premium oral healthcare should be accessible. We offer flexible zero-interest monthly installment plans for Clear Aligners, Dental Implants, and Smile Makeovers, accompanied by a written, all-inclusive treatment quote."
    }
  ];

  const comparison = [
    { feature: "Sterilization Standard", dentbites: "Class-B European Autoclave with Vacuum Pouch Seals", ordinary: "Standard boil/dry heat with unsealed trays" },
    { feature: "Dental Impressions", dentbites: "Full-Arch 3D Digital Color Laser Scanner (No Gagging)", ordinary: "Messy, sticky rubber putty trays" },
    { feature: "Implant Placement", dentbites: "Computer-Guided 3D Stents & Surgical CBCT", ordinary: "Freehand manual guesswork" },
    { feature: "Pain Management", dentbites: "Topical fruit gel + Computerized buffered anesthetic", ordinary: "Cold, painful traditional needle injections" },
    { feature: "Lead Surgeon", dentbites: "Dr. Muhammad Hafeez (FCPS, FICOI USA Fellow)", ordinary: "Junior rotating trainee dentists" },
    { feature: "Pricing Transparency", dentbites: "100% Written upfront fee with 0% installment options", ordinary: "Hidden costs added after treatment" }
  ];

  const sterilizationSteps = [
    { step: "01", name: "Ultrasonic Enzymatic Bath", detail: "Microscopic debris and protein particles loosened using medical cavitation." },
    { step: "02", name: "Thermal Chemical Decontamination", detail: "High-grade hospital disinfectant flush eliminating 99.99% of bacterial pathogens." },
    { step: "03", name: "Individual Heat-Sealing", detail: "Instruments sealed airtight into medical-grade transparent indicator pouches." },
    { step: "04", name: "134°C Class-B Autoclave Cycle", detail: "Fractionated vacuum extraction forcing saturated steam into every porous micro-groove." },
    { step: "05", name: "Patient-Side Inspection", detail: "Sterile pouches opened and chemical color verification shown directly to you in the chair." }
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>The dentbites Standard of Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Why Patients Choose <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              dentbites Dental Clinic
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We built dentbites to challenge outdated, painful dentistry. By merging 3D bio-engineering, European sterilization standards, and genuine empathy, we deliver care that feels as luxurious as it is curative.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div 
                key={idx}
                className="glass-panel-glow rounded-3xl p-8 bg-gradient-to-br from-[#091e36]/90 via-[#0b2444]/80 to-[#07172b]/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/90 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[11px] font-bold text-cyan-300">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Sterilization 5-Step Protocol Feature */}
        <div className="mb-20 glass-panel-glow rounded-3xl p-8 sm:p-12 bg-slate-900/80 border border-cyan-500/30 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Infection Risk Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Hospital-Grade 5-Stage Sterilization
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Cross-contamination is virtually impossible at dentbites. Every reusable instrument is processed through medical-grade autoclaves.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sterilizationSteps.map((st, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-cyan-400 mb-1">STAGE {st.step}</div>
                  <div className="text-sm font-bold text-white mb-2">{st.name}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{st.detail}</div>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-800 text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table: dentbites vs Ordinary Dental Clinics */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How dentbites Compares
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              A transparent look at the tangible differences in technology, sterility, and surgical mastery.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-cyan-500/30 shadow-2xl bg-slate-900/90">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0b213b] border-b border-cyan-500/30 text-white font-bold">
                <tr>
                  <th className="p-4 sm:p-5">Clinical Aspect</th>
                  <th className="p-4 sm:p-5 text-cyan-300">dentbites Dental Clinic</th>
                  <th className="p-4 sm:p-5 text-slate-400">Ordinary Local Clinics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {comparison.map((row, i) => (
                  <tr key={i} className="hover:bg-cyan-950/20 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-white">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-cyan-300 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{row.dentbites}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">
                      <span className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-red-400/80 flex-shrink-0" />
                        <span>{row.ordinary}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Banner */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950 via-[#0a233f] to-teal-950 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Experience The dentbites Difference Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule your priority visit with Dr. Muhammad Hafeez. Walk into a relaxed, spotless clinic designed for your comfort.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-xl shadow-cyan-500/30 transition-all flex-shrink-0"
          >
            Book Your Priority Appointment
          </button>
        </div>

      </div>
    </div>
  );
}
