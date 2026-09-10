import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  Activity, 
  HeartHandshake, 
  BadgeCheck, 
  SlidersHorizontal 
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { SERVICES, CLINIC_INFO } from '../data/clinicData';

const EXTENDED_SERVICES_DATA = {
  implants: {
    indications: ["Missing single or multiple teeth", "Loose, uncomfortable dentures", "Severe bone preservation requirement"],
    steps: [
      { step: "01", title: "3D CBCT Digital Planning", desc: "High-resolution 3D radiographic mapping of jaw bone density and nerve canals for computer-guided placement." },
      { step: "02", title: "Gentle Micro-Surgical Placement", desc: "Precision placement of Swiss/German biocompatible titanium implant root under painless local anesthesia." },
      { step: "03", title: "Custom Zirconia Crown Fitting", desc: "Attachment of handcrafted porcelain-fused-to-zirconia crown matching adjacent teeth translucency perfectly." }
    ],
    longevity: "Lifetime Durability with Proper Oral Hygiene",
    postOpCare: "Soft diet for 48 hours, ice pack application, and prescribed antiseptic warm salt water rinses."
  },
  rct: {
    indications: ["Severe toothache or sensitivity to hot/cold", "Deep dental decay reaching nerve pulp", "Swelling or tenderness near tooth root"],
    steps: [
      { step: "01", title: "Digital Apex Localization", desc: "Electronic apex locator maps the exact depth of root canals with 99.8% millimeter precision." },
      { step: "02", title: "Computerized Rotary Cleaning", desc: "Flexible nickel-titanium rotary files gently debride and sterilize the root canals painlessly in a single sitting." },
      { step: "03", title: "Biocompatible Hermetic Seal", desc: "3D thermoplastic obturation completely seals the canals to prevent reinfection, capped with a protective crown." }
    ],
    longevity: "Can last 15-20+ years or a lifetime with crown support",
    postOpCare: "Avoid chewing hard foods on treated tooth until permanent crown placement is completed."
  },
  aligners: {
    indications: ["Crooked, overlapping, or crowded teeth", "Gaps and spacing between teeth", "Overbite, underbite, or crossbite misalignments"],
    steps: [
      { step: "01", title: "3D Intraoral Laser Scanning", desc: "Full-arch digital scan capturing 50,000 data points in under 3 minutes—no messy impression putty." },
      { step: "02", title: "AI Smile Path Simulation", desc: "Review a 3D animated simulation of your teeth moving into perfect alignment before starting." },
      { step: "03", title: "Custom Clear Trays Delivery", desc: "Receive custom medical-grade thermoplastic trays, changing to a new set every 10-14 days." }
    ],
    longevity: "Permanent alignment maintained with nighttime clear retainers",
    postOpCare: "Wear aligners 20-22 hours per day; remove only when eating, drinking hot liquids, and brushing."
  },
  veneers: {
    indications: ["Discolored or intrinsic tetracycline stains", "Chipped, worn down, or uneven tooth edges", "Irregularly shaped or slightly crooked front teeth"],
    steps: [
      { step: "01", title: "Aesthetic Smile Architectural Design", desc: "Facial contour analysis and digital preview to design the ideal tooth width-to-length ratio." },
      { step: "02", title: "Conservative Micro-Preparation", desc: "Minimal 0.3mm to 0.5mm enamel prep preserving natural tooth structure, followed by temporary mockups." },
      { step: "03", title: "Porcelain Fusion Bonding", desc: "Permanent dual-cure resin bonding of handcrafted translucent porcelain laminates." }
    ],
    longevity: "15 to 20+ years with stain-resistant glazed porcelain",
    postOpCare: "Regular brushing and flossing, routine 6-month checkups, and use of a nightguard if clenching."
  },
  scaling: {
    indications: ["Bleeding gums during brushing", "Visible tartar / yellow calculus buildup", "Persistent bad breath or tobacco/coffee stains"],
    steps: [
      { step: "01", title: "Periodontal Pocket Assessment", desc: "Gentle measurement of gum health and pocket depth to pinpoint inflammation zones." },
      { step: "02", title: "Magnetostrictive Ultrasonic Cavitation", desc: "High-frequency micro-vibrations shatter hard calculus deposits without scratching enamel." },
      { step: "03", title: "Fluoridated Prophy-Polishing", desc: "Enamel micro-polishing with mineral paste to remove microscopic stains and restore glassy gloss." }
    ],
    longevity: "Recommended every 6 months for optimal gum health",
    postOpCare: "Enjoy clean teeth immediately; avoid colored beverages (black coffee, turmeric) for 24 hours."
  },
  fillings: {
    indications: ["Cavities and visible black tooth decay", "Chipped incisal edges or worn biting surfaces", "Replacement of old, dangerous mercury amalgam fillings"],
    steps: [
      { step: "01", title: "Gentle Decay Removal", desc: "Selective removal of softened tooth decay while keeping maximum healthy tooth intact." },
      { step: "02", title: "Micro-Mechanical Etching & Bonding", desc: "Application of adhesive bonding agent creating microscopic interlocking grips with enamel." },
      { step: "03", title: "Layered Composite Sculpting", desc: "Shade-matched nanohybrid composite sculpted and cured with medical blue UV light." }
    ],
    longevity: "7 to 12+ years with good hygiene",
    postOpCare: "Full chewing function is restored immediately after the local anesthesia wears off."
  },
  pediatric: {
    indications: ["Early childhood tooth decay & bottle rot", "Preventive dental pit & fissure sealants", "Habit breaking (thumb sucking, tongue thrusting)"],
    steps: [
      { step: "01", title: "Tell-Show-Do Acclimatization", desc: "Child-friendly walkthrough of dental tools to eliminate fear and build enthusiastic trust." },
      { step: "02", title: "Gentle Protective Treatment", desc: "Quick, painless treatment utilizing topical numbing gels with delicious fruit flavors." },
      { step: "03", title: "Fluoride Shield & Bravery Award", desc: "Enamel strengthening fluoride varnish application, plus a celebratory bravery certificate!" }
    ],
    longevity: "Protects developing primary and permanent dentition",
    postOpCare: "Supervised twice-daily brushing and routine six-month preventive checkups."
  },
  extraction: {
    indications: ["Impacted third molars (wisdom teeth) causing jaw pain", "Severe non-restorable tooth fracture", "Orthodontic crowd relief requirements"],
    steps: [
      { step: "01", title: "Panoramic 3D Nerve Mapping", desc: "Digital verification of roots and proximity to mandibular nerve canal." },
      { step: "02", title: "Atraumatic Periotome Luxation", desc: "Sectioning technique that preserves surrounding cortical bone and accelerates socket healing." },
      { step: "03", title: "Hemostatic Socket Preservation", desc: "Sterile collagen plug and dissolving sutures placed to ensure smooth, clot-protected recovery." }
    ],
    longevity: "Permanent removal of problematic pathology",
    postOpCare: "Bite on sterile gauze for 45 minutes; no spitting, straw drinking, or smoking for 48 hours."
  }
};

const CATEGORIES = [
  { id: 'all', label: 'All Procedures' },
  { id: 'implants', label: 'Dental Implants' },
  { id: 'orthodontics', label: 'Aligners & Braces' },
  { id: 'cosmetics', label: 'Smile Design & Veneers' },
  { id: 'restorative', label: 'Root Canal & Fillings' },
  { id: 'preventive', label: 'Hygiene & Kids' }
];

export default function ServicesPage({ onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredServices = SERVICES.filter(service => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'implants') return service.id === 'implants' || service.id === 'extraction';
    if (activeCategory === 'orthodontics') return service.id === 'aligners';
    if (activeCategory === 'cosmetics') return service.id === 'veneers';
    if (activeCategory === 'restorative') return service.id === 'rct' || service.id === 'fillings';
    if (activeCategory === 'preventive') return service.id === 'scaling' || service.id === 'pediatric';
    return true;
  });

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Class-B European Sterilization • Advanced 3D Digital Dentistry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Comprehensive Dental Treatments & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Surgical Procedures
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every procedure at dentbites is performed with computer-guided micro-precision, strict European hospital-grade sterilization protocols, and a 100% painless anesthesia guarantee.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-cyan-500/30 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Detailed Services Grid */}
        <div className="space-y-12 mb-16">
          {filteredServices.map((service, index) => {
            const extra = EXTENDED_SERVICES_DATA[service.id] || {};
            const isReversed = index % 2 === 1;

            return (
              <div 
                key={service.id}
                id={service.id}
                className="glass-panel-glow rounded-3xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#091e36]/90 via-[#0b2444]/80 to-[#07172b]/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Service Image & Quick Badges Column */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-cyan-500/40 shadow-xl group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = '/assets/img/service-1.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#061424]/90 via-transparent to-black/20" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-[11px] font-bold text-cyan-300 border border-cyan-400/30">
                          {service.category}
                        </span>
                        {service.popular && (
                          <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold uppercase tracking-wide shadow-md">
                            Popular Choice
                          </span>
                        )}
                      </div>

                      {/* Bottom Key Stat Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{service.painLevel}</span>
                        </div>
                      </div>
                    </div>

                    {/* Indications Checklist */}
                    {extra.indications && (
                      <div className="mt-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                        <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                          Who Needs This Treatment?
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {extra.indications.map((ind, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                              <span>{ind}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Service Information & Step-by-Step Flow Column */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:order-1' : 'lg:order-2'} flex flex-col`}>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                      <Activity className="w-4 h-4" />
                      <span>Specialized Procedure</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                      {service.title}
                    </h2>

                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Step-by-Step Clinical Flow */}
                    {extra.steps && (
                      <div className="mb-6">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Clinical Treatment Workflow:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {extra.steps.map((stepItem, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                              <div className="text-cyan-400 font-extrabold text-xs font-mono mb-1">
                                STEP {stepItem.step}
                              </div>
                              <div className="text-xs font-bold text-white mb-1">
                                {stepItem.title}
                              </div>
                              <div className="text-[11px] text-slate-400 leading-tight">
                                {stepItem.desc}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clinical Highlights Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.highlights.map((h, i) => (
                        <span key={i} className="px-3 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-xs font-medium text-cyan-300">
                          ✓ {h}
                        </span>
                      ))}
                      {extra.longevity && (
                        <span className="px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-xs font-medium text-emerald-300">
                          ★ {extra.longevity}
                        </span>
                      )}
                    </div>

                    {/* Booking CTAs */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-slate-800/80">
                      <button
                        onClick={() => onOpenBooking(service.id)}
                        className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Book Appointment for {service.title}</span>
                      </button>

                      <a
                        href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20dentbites,%20I%20would%20like%20to%20consult%20about%20${encodeURIComponent(service.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-lg shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-4 h-4 fill-white" />
                        <span>WhatsApp Query</span>
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust & Assurance Banner */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950/90 via-[#0a233f] to-teal-950/90 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <BadgeCheck className="w-6 h-6 text-cyan-400" />
              <span>Not Sure Which Procedure You Need?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Book a comprehensive 3D digital diagnosis with Dr. Muhammad Hafeez. We will map your complete oral health and present transparent, customized treatment options with zero obligation.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-xl shadow-cyan-500/30 transition-all flex-shrink-0"
          >
            Book Free Diagnostic Consultation
          </button>
        </div>

      </div>
    </div>
  );
}
