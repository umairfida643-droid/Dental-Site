import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Star, 
  GraduationCap, 
  Stethoscope, 
  HeartHandshake, 
  Phone, 
  Check 
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { DENTISTS, CLINIC_INFO } from '../data/clinicData';

export default function ChiefConsultantPage({ onOpenBooking }) {
  const doctor = DENTISTS[0];

  const milestones = [
    { year: "2009", title: "BDS Dental Graduation", desc: "Graduated with top clinical honors in oral surgery and prosthodontics." },
    { year: "2014", title: "FCPS in Orthodontics", desc: "Completed rigorous 4-year post-graduate fellowship training in dentofacial orthopedics and orthodontic biomechanics." },
    { year: "2018", title: "FICOI (USA) Fellowship", desc: "Awarded prestigious fellowship by the International Congress of Oral Implantologists (USA) for computerized implant placement." },
    { year: "2021", title: "Pioneer in Digital 3D Dentistry", desc: "Integrated full-arch 3D digital intraoral scanning, computerized surgical guides, and rotary micro-endodontics into dentbites." },
    { year: "Present", title: "8,000+ Restorations Treated", desc: "Leading one of Lahore's premier private centers for dental implants, clear aligners, and aesthetic smile rehabilitation." }
  ];

  const philosophyPoints = [
    {
      icon: ShieldCheck,
      title: "100% Pain-Free Guarantee",
      desc: "Using computerized delivery and buffered local anesthetics, patients feel zero discomfort during or after their procedures."
    },
    {
      icon: Award,
      title: "Computer-Guided 3D Precision",
      desc: "Every implant fixture and aligner sequence is virtually simulated in 3D millimeters before touching the patient's teeth."
    },
    {
      icon: HeartHandshake,
      title: "Compassionate, Anxiety-Free Care",
      desc: "Dedicated to eliminating dental phobia with gentle bedside manner, soothing music, and step-by-step transparency."
    }
  ];

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Hero Spotlight */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-br from-[#091e36]/95 via-[#0b2444]/90 to-[#07172b]/95 border border-cyan-500/35 shadow-2xl relative overflow-hidden mb-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Doctor High-Res Portrait & Quick Stats */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 border-2 border-cyan-500/40 shadow-2xl group">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top brightness-95 group-hover:brightness-105 transition-all duration-500 transform-gpu"
                  onError={(e) => { e.target.src = '/assets/img/team-1.jpg'; }}
                />
                
                {/* Diagonal glass sheen effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -skew-x-12 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061424] via-transparent to-black/10" />

                {/* Top Badge: FICOI (USA) */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-slate-900/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>FICOI (USA) Fellow</span>
                </div>

                {/* Bottom Overlay: 15+ Years & Star Rating */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#091e36]/90 border border-white/10 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{doctor.experience}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="text-[10px] text-cyan-300">Over 8,000+ Surgeries Treated</div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-slate-900/80 px-2.5 py-1 rounded-lg border border-amber-400/30">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>4.9 / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Verified Clinical Credentials Strip */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">Fellowship Certified</div>
                    <div className="text-[11px] text-slate-400">Oral Implantology (USA) & Orthodontics</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-bold">
                  BDS, FCPS, FICOI
                </span>
              </div>
            </div>

            {/* Right: Comprehensive Biography & Clinical Authority */}
            <div className="lg:col-span-7 flex flex-col">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-semibold text-cyan-300 w-fit mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Chief Consultant & Dental Surgeon</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">
                {doctor.name}
              </h1>

              <div className="text-base sm:text-lg font-bold text-cyan-300 mb-2">
                {doctor.title}
              </div>

              <div className="inline-block px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono font-bold text-slate-200 w-fit mb-6">
                {doctor.degrees}
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                {doctor.bio}
              </p>

              {/* 4 Clinical Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-2xl font-extrabold text-cyan-400">15+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Years Experience</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-2xl font-extrabold text-teal-400">8,000+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Smiles Restored</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-2xl font-extrabold text-sky-400">99.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Success Rate</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Painless Care</div>
                </div>
              </div>

              {/* Key Specialized Procedures */}
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Core Surgical & Orthodontic Specialties:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {doctor.expertise?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/50 border border-white/5">
                      <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => onOpenBooking(undefined, doctor.id)}
                  className="flex-1 py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book VIP Appointment with Dr. Hafeez</span>
                </button>

                <a
                  href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dr.%20Muhammad%20Hafeez,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20my%20dental%20treatment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 rounded-2xl font-bold text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xl shadow-[#25D366]/25 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2.5"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WhatsApp Doctor</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Clinical Philosophy Section */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Dr. Hafeez's Clinical Treatment Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Transforming dental visits from an intimidating chore into a comfortable, scientifically rigorous healing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philosophyPoints.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Career Milestones & Fellowship Timeline */}
        <div className="mb-16 glass-panel-glow rounded-3xl p-6 sm:p-10 bg-slate-900/80 border border-cyan-500/30 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-400" />
            <span>Clinical Career Timeline & Professional Distinctions</span>
          </h2>

          <div className="relative border-l-2 border-cyan-500/40 ml-4 space-y-8 pl-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-cyan-400 border-4 border-slate-900 ring-2 ring-cyan-500/50 group-hover:scale-125 transition-transform" />
                <div className="text-xs font-mono font-bold text-cyan-400 mb-1">{m.year}</div>
                <div className="text-base font-bold text-white mb-1">{m.title}</div>
                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Consulting Schedule & Office Hours Table */}
        <div className="rounded-3xl p-8 bg-gradient-to-br from-cyan-950/60 to-slate-900/90 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4" />
              <span>Weekly Consulting Schedule</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              Monday – Saturday: 09:00 AM – 09:00 PM
            </h3>
            <p className="text-xs text-slate-300">
              Exclusive 1-on-1 private appointments. Sunday slots reserved strictly for emergency trauma & acute pulpitis relief.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking(undefined, doctor.id)}
            className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-xl shadow-cyan-500/30 transition-all flex-shrink-0"
          >
            Reserve Consulting Slot Now
          </button>
        </div>

      </div>
    </div>
  );
}
