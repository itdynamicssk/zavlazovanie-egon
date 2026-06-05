import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, Cookie, FileText } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  icon: React.ReactNode;
  onBack: () => void;
  children: React.ReactNode;
}

const LegalLayout = ({ title, icon, onBack, children }: LegalLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-navy selection:bg-brand-orange selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-brand-navy/5">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 group text-xs font-black uppercase tracking-widest hover:text-brand-orange transition-colors cursor-pointer min-h-[44px]"
          >
            <div className="p-2 rounded-full group-hover:bg-brand-orange/10 transition-colors">
              <ArrowLeft size={16} />
            </div>
            Späť
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-navy/30">IT DYNAMICS</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="flex items-center gap-6 mb-16">
            <div className="w-16 h-16 bg-brand-navy/5 rounded-3xl flex items-center justify-center text-brand-orange">
              {icon}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">{title}</h1>
              <div className="w-12 h-1.5 bg-brand-orange mt-4 rounded-full" />
            </div>
          </div>

          <div className="prose prose-brand prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-p:text-brand-navy/70 prose-li:text-brand-navy/70 prose-strong:text-brand-navy prose-hr:border-brand-navy/5">
            {children}
          </div>
        </motion.div>
      </main>

      <footer className="py-20 border-t border-brand-navy/5 bg-surface-light/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-black text-brand-navy/20 tracking-widest uppercase">
            © {new Date().getFullYear()} IT DYNAMICS S.R.O. • DOKONALOSŤ V KAŽDOM BYTE
          </p>
        </div>
      </footer>
    </div>
  );
};

export const GDPRPage = ({ onBack }: { onBack: () => void }) => (
  <LegalLayout 
    title="Ochrana súkromia (GDPR)" 
    icon={<Shield size={32} />} 
    onBack={onBack}
  >
    <section className="space-y-8">
      <div>
        <h2 className="text-xl">1. ÚVODNÉ USTANOVENIA</h2>
        <p>
          Spoločnosť <strong>IT Dynamics s.r.o.</strong>, so sídlom Švábska 43, 080 05 Prešov, IČO: 52180921 (ďalej len „Prevádzkovateľ“), 
          kladie veľký dôraz na ochranu vašich osobných údajov. Toto vyhlásenie vysvetľuje, ako spracúvame a chránime vaše údaje 
          v súlade s Nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR).
        </p>
      </div>

      <div>
        <h2 className="text-xl">2. ROZSAH SPRACÚVANÝCH ÚDAJOV</h2>
        <p>
          Spracúvame iba údaje, ktoré sú nevyhnutné na poskytovanie našich služieb a komunikáciu:
        </p>
        <ul>
          <li>Meno a priezvisko</li>
          <li>E-mailová adresa</li>
          <li>Telefónne číslo</li>
          <li>Názov spoločnosti</li>
          <li>IP adresa (pri technických logoch systému)</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl">3. ÚČEL A PRÁVNY ZÁKLAD</h2>
        <p>
          Vaše údaje spracúvame na základe nasledujúcich titulov:
        </p>
        <ul>
          <li><strong>Plnenie zmluvy:</strong> Spracovanie požiadaviek a realizácia IT projektov.</li>
          <li><strong>Oprávnený záujem:</strong> Odpovedanie na dopyty cez kontaktný formulár a ochrana bezpečnosti webu.</li>
          <li><strong>Analytika (Súhlas):</strong> Meranie návštevnosti cez nástroj Google Analytics 4.</li>
          <li><strong>Marketing (Súhlas):</strong> Personalizácia reklám (ak udelíte súhlas).</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl">4. PRÍJEMCOVIA A SPROSTREDKOVATELIA</h2>
        <p>
          Pri spracúvaní údajov využívame služby tretích strán, ktoré dodržiavajú prísne bezpečnostné štandardy:
        </p>
        <ul>
          <li><strong>Google Ireland Limited:</strong> Spracovanie analytických dát a správa značiek (Google Analytics 4, GTM).</li>
          <li><strong>Vlastná webová infraštruktúra:</strong> Hostingové služby pre prevádzku webu.</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl">5. DOBA UCHOVÁVANIA</h2>
        <p>
          Údaje uchovávame len po dobu nevyhnutnú na dosiahnutie účelu:
        </p>
        <ul>
          <li>Kontaktné údaje z dopytov: 2 roky od poslednej komunikácie.</li>
          <li>Fakturačné údaje: 10 rokov (podľa zákona o účtovníctve).</li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl">5. VAŠE PRÁVA</h2>
        <p>
          Ako dotknutá osoba máte právo na:
        </p>
        <ul>
          <li>Prístup k svojim osobným údajom</li>
          <li>Opravu nesprávnych údajov</li>
          <li>Vymazanie údajov (právo na „zabudnutie“)</li>
          <li>Obmedzenie spracúvania</li>
          <li>Prenositeľnosť údajov</li>
          <li>Namietať proti spracúvaniu</li>
        </ul>
        <p>
          Pre uplatnenie svojich práv nás kontaktujte na: <a href="mailto:info@itdynamics.sk" className="text-brand-orange hover:underline font-bold cursor-pointer">info@itdynamics.sk</a>.
        </p>
      </div>

      <div className="mt-16 pt-12 border-t border-brand-navy/5">
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          <div className="space-y-2">
            <h3 className="text-xs font-black tracking-widest text-brand-navy/30 uppercase mb-4">Prevádzkovateľ</h3>
            <p className="text-brand-navy font-black text-lg">IT Dynamics s.r.o.</p>
            <p className="text-brand-navy/60 text-sm font-medium">Švábska 43, 080 05 Prešov</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-black tracking-widest text-brand-navy/30 uppercase mb-4">Identifikácia</h3>
            <p className="text-brand-navy/60 text-sm font-medium">IČO: 52180921</p>
            <p className="text-brand-navy/60 text-sm font-medium">DIČ: 2120933320</p>
          </div>
        </div>
      </div>
    </section>
  </LegalLayout>
);

export const CookiesPage = ({ onBack }: { onBack: () => void }) => (
  <LegalLayout 
    title="Zásady používania Cookies" 
    icon={<Cookie size={32} />} 
    onBack={onBack}
  >
    <section className="space-y-8">
      <div>
        <h2 className="text-xl">ČO SÚ COOKIES?</h2>
        <p>
          Cookies sú malé textové súbory, ktoré sa ukladajú do vášho zariadenia pri návšteve nášho webu. 
          Pomáhajú nám zabezpečiť správne fungovanie stránky a pochopiť, čo vás zaujíma.
        </p>
      </div>

      <div>
        <h2 className="text-xl">TYPY COOKIES, KTORÉ POUŽÍVAME</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 bg-brand-navy/5 rounded-3xl border border-brand-navy/5">
            <h4 className="mt-0 font-black flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-navy" />
              Nevyhnutné
            </h4>
            <p className="text-sm mb-4">
              Umožňujú základné funkcie ako navigáciu stránky a prístup k zabezpečeným oblastiam. Bez nich web nefunguje správne. Zahŕňa súbory na zapamätanie si vášho súhlasu.
            </p>
            <div className="text-xs uppercase font-black text-brand-navy/40">Súbory: cookie_consent</div>
          </div>
          <div className="p-6 bg-brand-navy/5 rounded-3xl border border-brand-navy/5">
            <h4 className="mt-0 font-black flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-orange" />
              Štatistické (GA4)
            </h4>
            <p className="text-sm mb-4">
              Používame Google Analytics 4 na anonymné meranie návštevnosti a interakciu s prvkami webu pre neustále zlepšovanie používateľskej skúsenosti.
            </p>
            <div className="text-xs uppercase font-black text-brand-navy/40">Súbory: _ga, _ga_*, gtag_report_conversion</div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl">AKO SPRAVOVAŤ COOKIES?</h2>
        <p>
          Svoje preferencie môžete kedykoľvek zmeniť kliknutím na odkaz <strong>Cookies</strong> v pätičke našej stránky. 
          Váš výber ukladáme do lokálneho úložiska (localStorage) vášho prehliadača po dobu 1 roka alebo do zmazania histórie.
        </p>
      </div>

      <div>
        <h2 className="text-xl">TECHNICKÉ DETAILY</h2>
        <p>
          Naše servery môžu pri každej požiadavke zaznamenať IP adresu zariadenia, čas prístupu a typ prehliadača. 
          Tieto dáta sú spracúvané výhradne na účely kybernetickej bezpečnosti.
        </p>
      </div>

      <div className="mt-12 py-8 border-t border-brand-navy/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-brand-navy/50 font-bold mb-0 text-center md:text-left">Chcete zmeniť svoje nastavenia teraz?</p>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-settings'))}
          className="bg-brand-navy text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-orange hover:shadow-xl hover:shadow-brand-orange/20 transition-all active:scale-95 cursor-pointer min-h-[44px]"
        >
          Otvoriť nastavenia
        </button>
      </div>

      <div className="mt-16 pt-12 border-t border-brand-navy/5">
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          <div className="space-y-2">
            <h3 className="text-xs font-black tracking-widest text-brand-navy/30 uppercase mb-4">Prevádzkovateľ</h3>
            <p className="text-brand-navy font-black text-lg">IT Dynamics s.r.o.</p>
            <p className="text-brand-navy/60 text-sm font-medium">Švábska 43, 080 05 Prešov</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xs font-black tracking-widest text-brand-navy/30 uppercase mb-4">Identifikácia</h3>
            <p className="text-brand-navy/60 text-sm font-medium">IČO: 52180921</p>
            <p className="text-brand-navy/60 text-sm font-medium">DIČ: 2120933320</p>
          </div>
        </div>
      </div>
    </section>
  </LegalLayout>
);
