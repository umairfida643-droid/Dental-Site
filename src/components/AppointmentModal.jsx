import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES, DENTISTS, CLINIC_INFO } from '../data/clinicData';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function AppointmentModal({ isOpen, onClose, initialServiceId, initialDentistId }) {
  const [selectedService, setSelectedService] = useState(initialServiceId || SERVICES[0].id);
  const [selectedDentist, setSelectedDentist] = useState(initialDentistId || DENTISTS[0].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (initialServiceId) setSelectedService(initialServiceId);
    if (initialDentistId) setSelectedDentist(initialDentistId);
  }, [initialServiceId, initialDentistId]);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const timeSlots = [
    { time: '09:30 AM', period: 'Morning' },
    { time: '10:30 AM', period: 'Morning' },
    { time: '11:30 AM', period: 'Morning' },
    { time: '12:30 PM', period: 'Morning' },
    { time: '04:30 PM', period: 'Evening' },
    { time: '05:30 PM', period: 'Evening' },
    { time: '06:30 PM', period: 'Evening' },
    { time: '07:30 PM', period: 'Evening' },
    { time: '08:15 PM', period: 'Evening' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
      alert('Please enter your name and phone number.');
      return;
    }

    const refCode = 'DC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setIsSubmitted(true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }

    // Prepare WhatsApp Message
    const serviceObj = SERVICES.find(s => s.id === selectedService);
    const dentistObj = DENTISTS.find(d => d.id === selectedDentist);

    const waText = encodeURIComponent(
      `🦷 *New Dental Appointment Booking*\n` +
      `*Ref Code:* ${refCode}\n` +
      `*Patient Name:* ${patientName}\n` +
      `*Phone:* ${patientPhone}\n` +
      `*Email:* ${patientEmail || 'Not specified'}\n` +
      `*Treatment:* ${serviceObj ? serviceObj.title : selectedService}\n` +
      `*Doctor:* ${dentistObj ? dentistObj.name : selectedDentist}\n` +
      `*Date:* ${selectedDate}\n` +
      `*Time Slot:* ${selectedSlot}\n` +
      `*Notes:* ${notes || 'None'}\n\n` +
      `Please confirm my appointment. Thank you!`
    );

    const waUrl = `https://wa.me/${CLINIC_INFO.whatsapp}?text=${waText}`;
    
    // Automatically open WhatsApp in new tab after 1.2s delay for seamless UX
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  };

  const currentService = SERVICES.find(s => s.id === selectedService);
  const currentDentist = DENTISTS.find(d => d.id === selectedDentist);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#091e36] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/60 overflow-hidden z-10 animate-fadeIn my-8">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-[#0b2545] to-slate-900 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Book VIP Consultation</h3>
              <p className="text-xs text-slate-300">Fast digital reservation • Instant WhatsApp confirmation</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Appointment Reserved!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                Thank you, <span className="font-semibold text-white">{patientName}</span>. Your priority slot is tentatively locked.
              </p>

              {/* Digital Pass Ticket */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 max-w-md mx-auto text-left mb-6 shadow-inner space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Booking Reference</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">{bookingRef}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Treatment:</span>
                  <span className="font-semibold text-white">{currentService?.title}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Specialist:</span>
                  <span className="font-semibold text-white">{currentDentist?.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-semibold text-emerald-400">{selectedDate} at {selectedSlot}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-semibold text-white">{patientPhone}</span>
                </div>
              </div>

              <p className="text-xs text-cyan-300 mb-6 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> A WhatsApp confirmation link has been opened for our clinic reception.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    const waText = encodeURIComponent(`Hello DentCare, confirming my booking ref: ${bookingRef} for ${selectedDate}`);
                    window.open(`https://wa.me/${CLINIC_INFO.whatsapp}?text=${waText}`, '_blank');
                  }}
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp Now</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                  1. Select Treatment / Procedure
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dentist Selection */}
              <div>
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                  2. Select Preferred Specialist
                </label>
                <select
                  value={selectedDentist}
                  onChange={(e) => setSelectedDentist(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                >
                  {DENTISTS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                    3. Choose Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                    Available Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                  >
                    {timeSlots.map((slot, idx) => (
                      <option key={idx} value={slot.time}>
                        {slot.time} ({slot.period})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Info */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                  4. Patient Contact Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp Number *"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Describe any tooth pain, symptoms or specific questions (optional)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-sky-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Booking & Receive WhatsApp Pass</span>
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  🔒 Your medical privacy is protected. No payment required until appointment.
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
