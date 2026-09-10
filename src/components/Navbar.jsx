import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Calendar, Menu, X, Clock, ShieldCheck, ChevronDown, Sparkles, MessageSquare, HelpCircle, Award } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import WhatsAppIcon from './icons/WhatsAppIcon';

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(true);
  const [desktopAboutOpen, setDesktopAboutOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDesktopAboutOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDesktopAboutOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const aboutSubMenu = [
    { 
      name: 'Why dentbites', 
      href: '/why-us',
      desc: 'Class-B Sterilization & 3D Bio-Engineering',
      icon: Award 
    },
    { 
      name: 'Testimonials', 
      href: '/testimonials',
      desc: '500+ Verified 5-Star Patient Reviews',
      icon: MessageSquare 
    },
    { 
      name: 'FAQ', 
      href: '/faq',
      desc: 'Comprehensive Patient Dental Guide',
      icon: HelpCircle 
    }
  ];

  const isAboutActive = ['/why-us', '/testimonials', '/faq'].includes(location.pathname);

  return (
    <>
      {/* Top emergency announcement bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 text-xs py-2 px-4 border-b border-cyan-900/40 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Class-B European Sterilization Standard
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Mon - Sat: 9:00 AM - 9:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`tel:${CLINIC_INFO.phone}`} 
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> Urgent: {CLINIC_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#071321]/92 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl shadow-cyan-950/40 py-2.5' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center group py-0.5">
              <img 
                src="/assets/img/Logo.png" 
                alt="dentbites" 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain filter drop-shadow-[0_4px_14px_rgba(87,202,219,0.35)] group-hover:scale-105 transition-transform duration-300" 
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              
              {/* Home Link */}
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm rounded-xl transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 font-medium'
                  }`
                }
              >
                Home
              </NavLink>

              {/* Services Link */}
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm rounded-xl transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 font-medium'
                  }`
                }
              >
                Services
              </NavLink>

              {/* Before & After Link */}
              <NavLink
                to="/before-after"
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm rounded-xl transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 font-medium'
                  }`
                }
              >
                Before & After
              </NavLink>

              {/* About Dropdown Menu (Why dentbites, Testimonials, FAQ) */}
              <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={() => setDesktopAboutOpen(true)}
                onMouseLeave={() => setDesktopAboutOpen(false)}
              >
                <button
                  onClick={() => setDesktopAboutOpen(!desktopAboutOpen)}
                  className={`px-3.5 py-2 text-sm rounded-xl transition-all flex items-center gap-1.5 ${
                    isAboutActive
                      ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 font-medium'
                  }`}
                  aria-expanded={desktopAboutOpen}
                >
                  <span>About</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${desktopAboutOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>

                {/* Dropdown Floating Popover */}
                {desktopAboutOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 rounded-2xl bg-[#08182b]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="space-y-1">
                      {aboutSubMenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = location.pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                              isSubActive
                                ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-300'
                                : 'hover:bg-cyan-950/40 text-slate-200 hover:text-white'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                              <SubIcon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold">{subItem.name}</div>
                              <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{subItem.desc}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Link */}
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm rounded-xl transition-all ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/30 font-medium'
                  }`
                }
              >
                Contact
              </NavLink>

            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20dentbites,%20I%20would%20like%20to%20inquire%20about%20a%20dental%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                <span>WhatsApp Live</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#071321]/98 backdrop-blur-2xl border-b border-cyan-500/20 px-4 pt-3 pb-6 mt-3 animate-fadeIn">
            <nav className="flex flex-col gap-1.5">
              
              <NavLink
                to="/"
                end
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm rounded-xl transition ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 font-bold'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-cyan-950/40 font-medium'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm rounded-xl transition ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 font-bold'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-cyan-950/40 font-medium'
                  }`
                }
              >
                Services
              </NavLink>

              <NavLink
                to="/before-after"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm rounded-xl transition ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 font-bold'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-cyan-950/40 font-medium'
                  }`
                }
              >
                Before & After
              </NavLink>

              {/* Mobile About Accordion */}
              <div className="rounded-xl border border-white/5 bg-slate-900/50 overflow-hidden my-1">
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className={`w-full px-4 py-2.5 text-sm flex items-center justify-between font-semibold ${
                    isAboutActive ? 'text-cyan-300' : 'text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>About</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      3 Menus
                    </span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>

                {mobileAboutOpen && (
                  <div className="px-3 pb-3 pt-1 space-y-1 bg-slate-950/60 border-t border-white/5">
                    {aboutSubMenu.map((sub) => {
                      const Icon = sub.icon;
                      const isSubActive = location.pathname === sub.href;
                      return (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition ${
                            isSubActive
                              ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 font-bold'
                              : 'text-slate-300 hover:text-white hover:bg-slate-900'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span>{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 text-sm rounded-xl transition ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 font-bold'
                      : 'text-slate-200 hover:text-cyan-400 hover:bg-cyan-950/40 font-medium'
                  }`
                }
              >
                Contact
              </NavLink>

              {/* Mobile CTA Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-sky-600 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
                >
                  <Calendar className="w-4 h-4" />
                  Book Appointment Now
                </button>
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-center text-slate-300 bg-slate-800/80 border border-slate-700 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cyan-400" />
                  Call: {CLINIC_INFO.phone}
                </a>
              </div>

            </nav>
          </div>
        )}
      </header>
    </>
  );
}
