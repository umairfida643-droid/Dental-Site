import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block mr-3 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 text-xs text-white font-medium shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md whitespace-nowrap">
        Chat with Reception 💬
      </div>

      {/* Floating Button */}
      <a
        href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20DentCare!%20I%20would%20like%20to%20inquire%20about%20dental%20treatments%20and%20booking.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with DentCare on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-40 -z-10" />
        <MessageCircle className="w-7 h-7 fill-white" />
        
        {/* Online status indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-900" />
      </a>
    </div>
  );
}
