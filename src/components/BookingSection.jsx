import React, { useState } from 'react';
import { Calendar, Phone, Clock, User, ShieldCheck, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES, DENTISTS, CLINIC_INFO } from '../data/clinicData';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function BookingSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICES[0].id);
  const [dentist, setDentist] = useState(DENTISTS[0].id);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [slot, setSlot] = useState('04:30 PM');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }
    setSubmitted(true);
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (err) {}

    const selectedServiceObj = SERVICES.find(s => s.id === service);
    const selectedDentistObj = DENTISTS.find(d => d.id === dentist);
    const msg = encodeURIComponent(
      `Hello DentCare! I would like to book an appointment:\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Treatment: ${selectedServiceObj?.title || service}\n` +
      `Doctor: ${selectedDentistObj?.name || dentist}\n` +
      `Date: ${date}\n` +
      `Time: ${slot}\n`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${CLINIC_INFO.whatsapp}?text=${msg}`, '_blank');
    }, 1000);
  };

  return (
    <section id="book" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#091e36] via-[#0d2a4d] to-[#091e36] border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Background decorative shine */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-xs font-semibold text-cyan-300 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Zero-Wait Booking Engine</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Reserve Your VIP Dental Visit Online.
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Pick your specialist, choose your convenient time, and get instant confirmation directly on WhatsApp. No waiting, no hassle.
              </p>

              <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span>Computerized zero-pain local anesthesia</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span>Instant SMS & WhatsApp appointment reminder</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>Direct emergency hotline: {CLINIC_INFO.phone}</span>
                </div>
              </div>
            </div>

            {/* Right Booking Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Slot Tentatively Booked!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mb-5">
                    Thank you {name}. A pre-filled confirmation is opening on your WhatsApp for instant receptionist validation.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                  >
                    Book Another Slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Ali Ahmed"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        placeholder="e.g. +92 300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Service</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        {SERVICES.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Dentist</label>
                      <select
                        value={dentist}
                        onChange={(e) => setDentist(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        {DENTISTS.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Date</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Slot</label>
                      <select
                        value={slot}
                        onChange={(e) => setSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
                      >
                        <option value="10:00 AM">10:00 AM (Morning)</option>
                        <option value="11:30 AM">11:30 AM (Morning)</option>
                        <option value="12:30 PM">12:30 PM (Morning)</option>
                        <option value="04:30 PM">04:30 PM (Evening)</option>
                        <option value="06:00 PM">06:00 PM (Evening)</option>
                        <option value="07:30 PM">07:30 PM (Evening)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#25D366] via-teal-500 to-cyan-500 hover:brightness-110 shadow-lg shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Confirm Slot & Open WhatsApp</span>
                  </button>

                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
