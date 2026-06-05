import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const initializedRef = useRef(false);

  const updateGCM = (type: 'all' | 'essential', isInitialLoad: boolean = false) => {
    if (typeof window.gtag !== 'function') return;

    const consentValues = type === 'all' ? {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted',
    } : {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied',
    };

    window.gtag('consent', 'update', consentValues);
    
    // Only push custom event on manual user interaction (not on page load)
    // to prevent double firing in GTM Tag Assistant
    if (type === 'all' && !isInitialLoad) {
      window.dataLayer?.push({
        event: 'consent_updated',
        timestamp: new Date().getTime()
      });
    }
  };

  useEffect(() => {
    // Prevent double initialization in Strict Mode
    if (initializedRef.current) return;
    initializedRef.current = true;

    const consent = localStorage.getItem('cookie_consent') as 'all' | 'essential' | null;
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Apply existing consent to GCM immediately on load, mark as initial load
      updateGCM(consent, true);
    }
  }, []);

  // Listen for custom event to reopen settings from footer
  useEffect(() => {
    const handleOpen = () => setIsVisible(true);
    window.addEventListener('open-cookie-settings', handleOpen);
    return () => window.removeEventListener('open-cookie-settings', handleOpen);
  }, []);

  const handleAccept = (type: 'all' | 'essential', e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Prevent redundant updates if the value is already set in this session
    if (localStorage.getItem('cookie_consent') === type && !isVisible) return;

    localStorage.setItem('cookie_consent', type);
    updateGCM(type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:w-96"
        >
          <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(10,25,47,0.15)] relative overflow-hidden group">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-brand-orange/5 rounded-full blur-3xl group-hover:bg-brand-orange/10 transition-colors duration-700" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-brand-navy/5 rounded-2xl">
                  <Cookie className="text-brand-orange" size={24} />
                </div>
                <div className="h-px flex-1 bg-brand-navy/5" />
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-brand-navy/60 hover:text-brand-navy transition-colors p-2 cursor-pointer"
                  aria-label="Zatvoriť"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-brand-navy font-black text-sm uppercase tracking-[0.3em]">Ochrana Súkromia</h3>
                <p className="text-brand-navy text-sm leading-relaxed font-medium">
                  Používame cookies, aby sme pochopili, ako interagujete s našimi technológiami. Vaše dáta sú u nás v bezpečí, chránené enterprise štandardmi. {" "}
                  <a 
                    href="#cookies" 
                    onClick={() => setIsVisible(false)}
                    className="text-[#943700] hover:underline font-bold cursor-pointer"
                  >
                    Viac informácií
                  </a>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                   onClick={(e) => handleAccept('all', e)}
                   className="w-full bg-brand-navy text-white text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-brand-orange hover:shadow-xl hover:shadow-brand-orange/20 transition-all active:scale-95 flex items-center justify-center gap-3 cursor-pointer min-h-[44px]"
                 >
                   <CheckCircle2 size={14} className="text-white" />
                   Prijať všetko
                 </button>
                 <button
                   onClick={(e) => handleAccept('essential', e)}
                   className="w-full bg-brand-navy/5 text-brand-navy text-xs font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-brand-navy/10 hover:text-brand-orange transition-all active:scale-95 cursor-pointer min-h-[44px]"
                 >
                   Iba nevyhnutné
                 </button>
              </div>
              
               <div className="mt-6 text-center">
                 <p className="text-xs font-black text-brand-navy/90 uppercase tracking-widest">
                   DOKONALE CHRÁNENÉ
                 </p>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
