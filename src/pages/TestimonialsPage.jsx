import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  Heart, 
  Quote, 
  ThumbsUp,
  ShieldCheck
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { CLINIC_INFO } from '../data/clinicData';

const ALL_REVIEWS = [
  {
    id: 1,
    name: "Faseeh Ur Rehman",
    role: "Verified Patient",
    treatment: "Single-Sitting Root Canal (RCT)",
    category: "rct",
    rating: 5,
    date: "2 weeks ago",
    text: "I was terrified of getting a root canal, having heard horror stories from friends. But Dr. Muhammad Hafeez made it completely painless in just one sitting! The clinic is spotless, ultra-modern, and the 3D digital explanation before starting gave me full peace of mind. Zero soreness the next morning!",
    image: "/assets/media/testimonials/FASEEH.jpeg"
  },
  {
    id: 2,
    name: "Sami Ullah",
    role: "Verified Patient",
    treatment: "3D Clear Aligners Therapy",
    category: "aligners",
    rating: 5,
    date: "1 month ago",
    text: "Swapped metal braces for custom 3D clear aligners here. Within 6 months my front tooth gap completely vanished. Dr. Hafeez is super polite, transparent about progress, and the digital scans meant I never had to bite into gross mold putty. 10/10 clinic!",
    image: "/assets/media/testimonials/sami.jpg"
  },
  {
    id: 3,
    name: "Ayesha Malik",
    role: "Verified Patient",
    treatment: "Porcelain Veneers Smile Makeover",
    category: "veneers",
    rating: 5,
    date: "3 weeks ago",
    text: "The smile makeover completely boosted my career confidence! Dr. Muhammad Hafeez designed a smile that looks completely natural, bright, and perfectly balanced with my face. The veneers feel strong and look like real teeth. Everyone keeps complimenting my smile!",
    image: "/assets/media/testimonials/slide3.jpg"
  },
  {
    id: 4,
    name: "Tariq Mahmood",
    role: "Verified Patient",
    treatment: "Double Titanium Dental Implants",
    category: "implants",
    rating: 5,
    date: "2 months ago",
    text: "Got two titanium implants installed with computer-guided 3D surgical diagnostics. Healing was surprisingly fast with zero complications. The chewing comfort and bite stability is identical to my natural teeth. Truly world-class surgery in Lahore.",
    image: "/assets/img/testimonial-2.jpg"
  },
  {
    id: 5,
    name: "Dr. Bilal Aslam",
    role: "Medical Doctor & Patient",
    treatment: "Ultrasonic Scaling & Preventative Polishing",
    category: "preventive",
    rating: 5,
    date: "3 weeks ago",
    text: "As a physician myself, sterility is my primary concern. Seeing dentbites crack open individual vacuum-sealed Class-B autoclave pouches right beside my chair was tremendously reassuring. Dr. Hafeez is a true master of clinical ergonomics and gentle technique.",
    image: "/assets/img/testimonial-1.jpg"
  },
  {
    id: 6,
    name: "Zainab Riaz",
    role: "Verified Patient",
    treatment: "Wisdom Tooth Micro-Surgical Extraction",
    category: "implants",
    rating: 5,
    date: "1 month ago",
    text: "Had a severely impacted lower wisdom tooth that was causing terrible migraine-like pain. Dr. Hafeez removed it in under 25 minutes without any bone pressure or pain. Prescriptions and post-op guidelines were so clear I was back to university in 2 days.",
    image: "/assets/img/default-user.png"
  }
];

export default function TestimonialsPage({ onOpenBooking }) {
  const [filter, setFilter] = useState('all');

  const filteredReviews = ALL_REVIEWS.filter(r => {
    if (filter === 'all') return true;
    return r.category === filter;
  });

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Verified Patient Experiences & Reviews</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Loved By Over <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              15,000+ Happy Patients
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Read candid, unedited feedback from real patients who trusted Dr. Muhammad Hafeez and the dentbites team for their smile transformations, dental implants, and painless treatments.
          </p>
        </div>

        {/* Rating Overview Summary Box */}
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#091e36]/90 via-[#0b2444]/80 to-[#07172b]/90 border border-cyan-500/30 shadow-2xl mb-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Big Score Column */}
            <div className="md:col-span-4 text-center md:border-r md:border-slate-800 md:pr-8">
              <div className="text-6xl sm:text-7xl font-extrabold text-white mb-2">
                4.9
              </div>
              <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400" />
                ))}
              </div>
              <div className="text-sm font-semibold text-slate-300">
                Based on <span className="text-white font-bold">500+ Verified Patient Ratings</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Across Google Reviews & Post-Treatment Feedback
              </div>
            </div>

            {/* Satisfaction Bars Column */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1">
                  <span>Painless Treatment Protocol</span>
                  <span className="text-cyan-300">99.8% Satisfied</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full w-[99.8%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1">
                  <span>Hospital-Grade Sterility & Hygiene</span>
                  <span className="text-emerald-300">100% Satisfied</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full w-[100%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1">
                  <span>Doctor Bedside Manner & Clear Explanations</span>
                  <span className="text-sky-300">99.4% Satisfied</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full w-[99.4%]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'implants', label: 'Dental Implants' },
            { id: 'aligners', label: 'Clear Aligners' },
            { id: 'veneers', label: 'Smile Makeovers' },
            { id: 'rct', label: 'Root Canal (RCT)' },
            { id: 'preventive', label: 'Hygiene & Cleanings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === tab.id
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-cyan-500/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredReviews.map(review => (
            <div
              key={review.id}
              className="glass-panel-glow rounded-3xl p-6 bg-slate-900/80 border border-cyan-500/25 shadow-xl flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
            >
              <div>
                {/* Top User Info */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/50 flex-shrink-0"
                    onError={(e) => { e.target.src = '/assets/img/default-user.png'; }}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      <span>{review.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    </h3>
                    <div className="text-[11px] text-cyan-300 font-medium">{review.role}</div>
                  </div>
                </div>

                {/* Treatment Tag & Stars */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-[11px] text-cyan-300">
                    {review.treatment}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">
                  "{review.text}"
                </p>
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-between pt-3 border-t border-white/5">
                <span>Verified Patient Visit</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Share Review / Book Consultation Banner */}
        <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950 via-[#0a233f] to-teal-950 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Heart className="w-6 h-6 text-cyan-400" />
              <span>Ready To Start Your Own Smile Success Story?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Join thousands of satisfied patients across Lahore. Schedule a private consultation with Dr. Muhammad Hafeez today.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-xl shadow-cyan-500/30 transition-all flex-shrink-0"
          >
            Schedule Your Visit
          </button>
        </div>

      </div>
    </div>
  );
}
