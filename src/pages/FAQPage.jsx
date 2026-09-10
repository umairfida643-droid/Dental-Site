import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Phone, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { CLINIC_INFO } from '../data/clinicData';

const EXTENDED_FAQS = [
  {
    category: "implants",
    categoryName: "Dental Implants & Surgery",
    question: "Is dental implant surgery painful?",
    answer: "No. The procedure is performed under high-grade local anesthesia, meaning the jawbone and surrounding gingival tissues are 100% numbed. Because bone tissue has fewer pain receptors than teeth, most patients report that getting a computer-guided dental implant is actually more gentle than a standard tooth extraction. Post-operative soreness is minimal and easily managed with standard mild painkillers for 24-48 hours."
  },
  {
    category: "implants",
    categoryName: "Dental Implants & Surgery",
    question: "How long does a titanium dental implant last?",
    answer: "Dental implants are engineered for lifelong durability. Biocompatible titanium fuses directly with your jawbone through a natural physiological process called osseointegration. With proper daily brushing, flossing, and 6-month routine checkups, your dental implant fixture can last your entire lifetime."
  },
  {
    category: "implants",
    categoryName: "Dental Implants & Surgery",
    question: "Am I a suitable candidate if I have had missing teeth for many years?",
    answer: "Yes, in the vast majority of cases. If bone loss has occurred due to long-term tooth absence, Dr. Muhammad Hafeez uses 3D CBCT digital scans to evaluate bone volume and can perform guided bone grafting or sinus augmentation to safely build a rock-solid foundation for the implant."
  },
  {
    category: "aligners",
    categoryName: "Clear Aligners & Braces",
    question: "How do Clear Aligners compare to traditional metal braces?",
    answer: "Clear aligners offer immense advantages: they are virtually invisible to onlookers, completely removable when eating or brushing (meaning zero dietary restrictions and no getting food stuck in wires), and have smooth edges that don't cause painful mouth ulcers. In addition, we design your entire treatment on 3D computer software so you can preview the finished smile before ever putting in your first tray."
  },
  {
    category: "aligners",
    categoryName: "Clear Aligners & Braces",
    question: "How many hours per day must I wear my aligners?",
    answer: "To achieve the projected results within the scheduled timeline, aligners should be worn for 20 to 22 hours each day. You only remove them during meals, hot drinks, and your daily oral hygiene routine."
  },
  {
    category: "rct",
    categoryName: "Root Canal & Restorations",
    question: "Can Root Canal Treatment really be completed in just one sitting?",
    answer: "Yes! At dentbites, over 85% of our root canal cases are successfully resolved in a single, comfortable 40-minute appointment. Using digital electronic apex locators and computerized rotary nickel-titanium instruments, Dr. Hafeez debrides, sterilizes, and hermetically seals the canals in one visit, sparing you multiple painful trips."
  },
  {
    category: "rct",
    categoryName: "Root Canal & Restorations",
    question: "Why does a root canal treated tooth require a dental crown?",
    answer: "Once the infected nerve and blood supply are cleaned out, the tooth natural structure becomes more brittle over time. A custom porcelain or zirconia crown caps and encases the tooth, shielding it from cracking under heavy chewing forces for decades."
  },
  {
    category: "veneers",
    categoryName: "Cosmetic Veneers & Smile Makeovers",
    question: "Do you have to shave down my natural teeth for porcelain veneers?",
    answer: "No heavy shaving is required! We practice conservative, minimally invasive aesthetic dentistry. For our ultra-thin porcelain veneers, Dr. Hafeez removes only 0.3mm to 0.5mm of outer enamel—roughly the thickness of a contact lens. In some cases (prepless laminates), almost zero enamel reduction is necessary."
  },
  {
    category: "pricing",
    categoryName: "Pricing & Installment Plans",
    question: "Do you offer 0% markup installment plans?",
    answer: "Yes! For major treatments including Clear Aligners, Dental Implants, and Full Smile Makeovers, we offer transparent, interest-free monthly installment options. We provide a full written itemized fee estimate during your first consultation with zero hidden fees."
  },
  {
    category: "emergency",
    categoryName: "Emergencies & Post-Op Recovery",
    question: "What should I do if I experience sudden severe toothache or a knocked-out tooth?",
    answer: "For severe throbbing pain, rinse with lukewarm salt water and take a mild anti-inflammatory (do not place aspirin directly on the gums). If a permanent tooth has been knocked out, hold it by the crown (never touch the root), rinse gently in cold milk without scrubbing, and come to our clinic immediately—a tooth re-implanted within 60 minutes has a 90% survival rate. Contact our emergency line immediately."
  }
];

export default function FAQPage({ onOpenBooking }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIndexes, setOpenIndexes] = useState([0]); // first open by default

  const toggleAccordion = (idx) => {
    setOpenIndexes(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = EXTENDED_FAQS.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dental Knowledge Base & Patient Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Frequently Asked <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Questions & Answers
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions regarding your dental care, anesthesia, treatment durations, or pricing? Find clear, doctor-verified clinical answers below.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any question (e.g. pain, root canal, implants, aligners, cost)..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-cyan-400 shadow-xl"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All FAQs' },
            { id: 'implants', label: 'Implants & Surgery' },
            { id: 'aligners', label: 'Aligners & Braces' },
            { id: 'rct', label: 'Root Canal & Fillings' },
            { id: 'veneers', label: 'Cosmetic Veneers' },
            { id: 'pricing', label: 'Pricing & Installments' },
            { id: 'emergency', label: 'Emergency Care' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-cyan-500/30 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              No matching questions found. Try searching with different keywords or ask our team directly via WhatsApp.
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 overflow-hidden transition-all hover:border-cyan-500/40"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <span className="font-bold text-sm sm:text-base text-white">
                        {faq.question}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-[#07172b]/50">
                      <p>{faq.answer}</p>
                      <div className="mt-3 text-[11px] text-cyan-400 font-medium">
                        Category: {faq.categoryName}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Emergency Dental Helpline Card */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-red-950/70 via-slate-900 to-cyan-950/70 border border-red-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Dental Trauma & Acute Emergency Help</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
              Still Have An Unanswered Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with our clinic desk or chat with Dr. Muhammad Hafeez via WhatsApp for clinical clarity.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>

            <a
              href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20dentbites,%20I%20have%20a%20specific%20question%20regarding%20dental%20treatments.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-xl shadow-[#25D366]/25 transition-all flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Ask via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
