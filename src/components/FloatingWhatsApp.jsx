import React from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { CLINIC_INFO } from '../data/clinicData';

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip on hover */}
      <div className="hidden sm:block mr-3 px-3.5 py-2 rounded-xl bg-slate-900/95 border border-[#25D366]/40 text-xs text-white font-medium shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md whitespace-nowrap">
        <span className="font-semibold text-[#25D366]">WhatsApp Live:</span> Speak with Reception 💬
      </div>

      {/* Floating Official WhatsApp Button */}
      <a
        href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20dentbites!%20I%20would%20like%20to%20inquire%20about%20dental%20treatments%20and%20booking.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with dentbites on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing subtle ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35 -z-10" />
        
        {/* Official WhatsApp Brand Icon */}
        <WhatsAppIcon className="w-8 h-8 text-white fill-white" />
        
        {/* Active Online green dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-slate-900" />
      </a>
    </div>
  );
}
