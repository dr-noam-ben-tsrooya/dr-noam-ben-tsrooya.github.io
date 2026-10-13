import { useState, useEffect } from 'react';
import type { FC, MouseEvent } from 'react';
import { Phone, Menu, X, Accessibility, Clock, MapPin } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { WhatsAppIcon } from './WhatsAppIcon';
import { smoothScrollTo } from '../utils/smoothScroll';

interface HeaderProps {
  onOpenAccessibility: () => void;
  onOpenContactModal: () => void;
}

export const Header: FC<HeaderProps> = ({ onOpenAccessibility, onOpenContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // סדר קישורים קוהרנטי ומדויק שעוקב בדיוק אחר מבנה העמוד מלמעלה למטה
  const navLinks = [
    { label: 'דף הבית', href: '#home' },
    { label: 'תחומי פעילות', href: '#services' },
    { label: 'איך זה עובד?', href: '#process' },
    { label: 'הכנת מסמכים', href: '#checklist' },
    { label: 'עלויות והחזרים', href: '#pricing' },
    { label: 'אודותיי', href: '#about' },
    { label: 'שאלות נפוצות', href: '#faq' },
  ];

  // גלילה חלקה ונעימה עם עקומת תאוצה ובלימה אלגנטית
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    smoothScrollTo(href, 95, 750);
  };

  return (
    <div className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E0D5] transition-all">
      {/* סרגל עליון סטיקי - פרטי מרפאה */}
      <div className={`border-b border-[#EFEAE1] transition-all duration-300 ${isScrolled ? 'py-1 text-[11px]' : 'py-1.5 text-xs'} hidden md:block text-[#6B6259]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          
          {/* כתובת ושעות פעילות בצד ימין */}
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 font-medium text-[#4A433D]">
              <MapPin className="w-3.5 h-3.5 text-[#8D7E6D]" />
              <span>{siteContent.doctor.clinicAddress}</span>
            </span>
            <span className="text-[#D8CFC4]">•</span>
            <span className="flex items-center gap-1.5 font-medium text-[#4A433D]">
              <Clock className="w-3.5 h-3.5 text-[#8D7E6D]" />
              <span>{siteContent.doctor.receptionHours}</span>
            </span>
          </div>

          {/* טלפון ונגישות בצד שמאל */}
          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteContent.doctor.phone}`}
              className="flex items-center gap-1.5 text-[#2E2824] hover:text-[#351E06] font-semibold transition-colors"
              title={`חיוג ישיר: ${siteContent.doctor.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#8D7E6D]" />
              <span>{siteContent.doctor.phoneDisplay}</span>
            </a>
            <span className="text-[#D8CFC4]">|</span>
            <button
              onClick={onOpenAccessibility}
              className="flex items-center gap-1.5 text-[#4A433D] hover:text-[#2E2824] cursor-pointer font-medium"
              title="תפריט נגישות"
            >
              <Accessibility className="w-3.5 h-3.5 text-[#8D7E6D]" />
              <span>תפריט נגישות</span>
            </button>
          </div>

        </div>
      </div>

      {/* שורת הניווט הראשית - Main Navigation Row */}
      <header className={`transition-all duration-300 ${isScrolled ? 'py-2.5' : 'py-3.5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          
          {/* מיתוג ולוגו הרופאה */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#2E2824] font-heading tracking-tight leading-none group-hover:text-[#8D7E6D] transition-colors">
                {siteContent.doctor.fullName}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#8D7E6D] tracking-wide mt-1">
                {siteContent.doctor.title}
              </div>
            </div>
          </a>

          {/* קישורי ניווט עקביים לדסקטופ בסדר כרונולוגי עליון-תחתון */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-[15px] xl:text-base font-semibold text-[#3A342F] hover:text-[#2E2824] hover:bg-[#EFEAE1]/70 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* כפתורי פעולה בצד שמאל - לוגו וואטסאפ רשמי וכפתור פגישה */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`https://wa.me/${siteContent.doctor.whatsappNumber}?text=${encodeURIComponent(
                siteContent.doctor.whatsappPrefillMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-sm font-bold text-[#2E2824] bg-[#EFEAE1] hover:bg-[#351E06] hover:text-white border border-[#351E06] border-dashed transition-all cursor-pointer shadow-2xs group"
              title="פנייה מהירה בוואטסאפ"
            >
              <WhatsAppIcon className="w-4.5 h-4.5" variant="green" />
              <span>וואטסאפ לרופאה</span>
            </a>

            <button
              onClick={onOpenContactModal}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-[#351E06] hover:bg-[#1E1B18] transition-all cursor-pointer shadow-xs"
            >
              <span>תיאום פגישה</span>
            </button>
          </div>

          {/* כפתורי מובייל */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAccessibility}
              className="p-2 rounded-full text-[#3A342F] hover:bg-[#EFEAE1]"
              title="נגישות"
            >
              <Accessibility className="w-5 h-5 text-[#8D7E6D]" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full text-[#2E2824] hover:bg-[#EFEAE1] transition-colors"
              aria-label={isMobileMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* תפריט מובייל נפתח */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E0D5] bg-[#FAF7F2] px-6 pt-4 pb-8 shadow-xl animate-in fade-in duration-200">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 text-lg font-bold text-[#2E2824] hover:bg-[#EFEAE1] rounded-2xl transition-colors border-b border-[#EFEAE1] last:border-none"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-[#E8E0D5] flex flex-col gap-3">
              <a
                href={`https://wa.me/${siteContent.doctor.whatsappNumber}?text=${encodeURIComponent(
                  siteContent.doctor.whatsappPrefillMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-full text-base font-bold text-[#2E2824] bg-[#EFEAE1] border border-dashed border-[#351E06]"
              >
                <WhatsAppIcon className="w-5 h-5" variant="green" />
                <span>פנייה בוואטסאפ לרופאה</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenContactModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-base font-bold text-white bg-[#351E06]"
              >
                <span>תיאום פגישה במרפאה</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
