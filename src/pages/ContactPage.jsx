import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Navigation, 
  ShieldCheck, 
  Stethoscope 
} from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { CLINIC_INFO, SERVICES, DENTISTS } from '../data/clinicData';

export default function ContactPage({ onOpenBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: SERVICES[0].id,
    dentist: DENTISTS[0].id,
    date: '',
    time: 'Morning (10:00 AM - 01:00 PM)',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if clinic is open right now based on PKT (Mon-Sat 9am-9pm)
  const isClinicOpenNow = () => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday
    const hours = now.getHours();
    if (day === 0) return false; // Closed Sunday except emergency
    return hours >= 9 && hours < 21;
  };

  const isOpen = isClinicOpenNow();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedService = SERVICES.find(s => s.id === formData.service);
    const selectedDoc = DENTISTS.find(d => d.id === formData.dentist);

    const message = `*NEW CLINIC APPOINTMENT INQUIRY*\n\n` +
      `*Patient Name:* ${formData.name}\n` +
      `*Phone Number:* ${formData.phone}\n` +
      `*Email:* ${formData.email || 'N/A'}\n` +
      `*Service Required:* ${selectedService?.title || formData.service}\n` +
      `*Doctor:* ${selectedDoc?.name || formData.dentist}\n` +
      `*Preferred Date:* ${formData.date || 'Flexible / Earliest Available'}\n` +
      `*Preferred Time:* ${formData.time}\n` +
      `*Notes:* ${formData.message || 'None'}\n\n` +
      `_Sent via dentbites Online Portal_`;

    const whatsappUrl = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Visit Or Contact Our Specialist Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Contact & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300">
              Clinic Location
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We are conveniently located in the medical heart of Lahore. Visit us for high-precision 3D dentistry or book your VIP appointment below.
          </p>
        </div>

        {/* Top Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Address Card */}
          <div className="glass-panel-glow rounded-3xl p-6 bg-slate-900/80 border border-cyan-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-lg">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Clinic Address</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {CLINIC_INFO.address}
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Lahore+Pakistan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          {/* Direct Phone & WhatsApp Card */}
          <div className="glass-panel-glow rounded-3xl p-6 bg-slate-900/80 border border-cyan-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 shadow-lg">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Phone & Emergency</h3>
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 mb-4">
                <div>Tel: <a href={`tel:${CLINIC_INFO.phone}`} className="text-white font-semibold hover:text-cyan-400">{CLINIC_INFO.phone}</a></div>
                <div>Emergency: <span className="text-red-400 font-semibold">{CLINIC_INFO.emergencyPhone}</span></div>
                <div>Email: <a href={`mailto:${CLINIC_INFO.email}`} className="text-slate-300 hover:text-cyan-400">{CLINIC_INFO.email}</a></div>
              </div>
            </div>
            <a
              href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20dentbites,%20I%20would%20like%20to%20inquire%20about%20an%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#25D366] hover:underline"
            >
              <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
              <span>Open Direct WhatsApp Chat</span>
            </a>
          </div>

          {/* Hours Card with Live Open/Closed Status */}
          <div className="glass-panel-glow rounded-3xl p-6 bg-slate-900/80 border border-cyan-500/30 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg">
                  <Clock className="w-6 h-6" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                  isOpen 
                    ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' 
                    : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                  {isOpen ? 'Clinic Open Now' : 'Closed • Reopens 9 AM'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Operating Hours</h3>
              <div className="text-xs sm:text-sm text-slate-300 space-y-1 mb-4">
                <div className="flex justify-between">
                  <span>Mon – Sat:</span>
                  <span className="font-semibold text-white">09:00 AM – 09:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-amber-400 font-semibold">Emergency Trauma Only</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-slate-400">
              Lead Doctor: <span className="text-cyan-300 font-semibold">Dr. Muhammad Hafeez</span>
            </div>
          </div>

        </div>

        {/* Main 2-Column Section: Interactive Booking Form + Map & Facility Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Left Column: Full Appointment Booking Form */}
          <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#091e36]/90 via-[#0b2444]/80 to-[#07172b]/90 border border-cyan-500/35 shadow-2xl">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                <Calendar className="w-4 h-4" />
                <span>Instant Confirmation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Book Your VIP Appointment
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Fill in your details below. Your request will be instantly processed and routed to Dr. Muhammad Hafeez's clinic desk.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">Appointment Request Dispatched!</h3>
                <p className="text-xs sm:text-sm text-slate-200 mb-4">
                  Thank you, {formData.name}. Your details were sent to our WhatsApp desk. Our clinic coordinator will confirm your exact time slot within minutes.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white hover:bg-slate-800"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Usman Ali"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1.5">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300 1234567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1.5">Service / Treatment Required</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1.5">Chief Consultant</label>
                    <select
                      value={formData.dentist}
                      disabled
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-cyan-300 font-semibold focus:outline-none"
                    >
                      {DENTISTS.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.name} ({d.title})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-200 mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-200 mb-1.5">Preferred Time Slot</label>
                    <select
                      value={formData.time}
                      onChange={e => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Morning (10:00 AM - 01:00 PM)">Morning (10:00 AM - 01:00 PM)</option>
                      <option value="Afternoon (02:00 PM - 05:00 PM)">Afternoon (02:00 PM - 05:00 PM)</option>
                      <option value="Evening (05:00 PM - 09:00 PM)">Evening (05:00 PM - 09:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-200 mb-1.5">Any specific symptoms or questions? (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Broken tooth, toothache on cold liquids, or interest in clear aligners..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Confirm via WhatsApp</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Your health data is 100% private and protected. Zero spam.</span>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: Google Map Placeholder & Luxury Facility Amenities */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Map Visual Card */}
            <div className="glass-panel-glow rounded-3xl p-6 bg-slate-900/80 border border-cyan-500/30 shadow-xl overflow-hidden">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Clinic Map & Landmark Guide</span>
              </h3>
              
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#07172b] border border-slate-700 flex items-center justify-center mb-4 group">
                {/* Visual map preview styling */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto mb-2 animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-white">dentbites Dental Clinic</div>
                  <div className="text-xs text-cyan-300">Lahore, Pakistan</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Dedicated on-site secure valet parking available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Elevator access to Suite 402 with wheelchair accessibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>Located directly across the City Center Boulevard</span>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Lahore+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Open in Google Maps Navigation</span>
              </a>
            </div>

            {/* Direct WhatsApp Box */}
            <div className="rounded-3xl p-6 bg-gradient-to-br from-[#128C7E]/30 to-[#075E54]/20 border border-[#25D366]/40 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white">
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Direct WhatsApp Consultation</h4>
                  <p className="text-xs text-slate-300">Fast replies from our medical reception</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Want to send photos of your teeth or ask a fast question? Message Dr. Muhammad Hafeez's team directly.
              </p>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20dentbites,%20I%20would%20like%20to%20consult%20with%20you%20regarding%20my%20dental%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>Chat Now on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
