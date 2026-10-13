import type { FC, MouseEvent } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { smoothScrollTo } from '../utils/smoothScroll';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  const handleFooterNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href, 95, 800);
  };

  return (
    <footer className="bg-[#312C29] text-[#E2D9CC] text-sm py-16 border-t border-[#3E3834]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#4A423D]">
          
          {/* מיתוג ופרטי רופאה */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-2xl font-extrabold text-white font-heading">
              {siteContent.doctor.fullName}
            </div>
            <div className="text-base font-semibold text-[#D5CBBF]">
              {siteContent.doctor.title}
            </div>

            <p className="text-[#C4B8A8] text-sm font-light leading-relaxed max-w-sm">
              חוות דעת רפואיות, הערכת כושר עבודה, ליווי במיצוי זכויות וייעוץ למעסיקים.
              מרפאה נגישה ברמת החייל, תל אביב ומענה מקוון מקיף.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#E2D9CC] pt-2">
              <span className="px-3 py-1 rounded-full bg-[#3E3834] border border-[#524A44]">
                מס' מומחה: {siteContent.doctor.specialistLicense}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#3E3834] border border-[#524A44]">
                רישיון רפואי: {siteContent.doctor.medicalLicense}
              </span>
            </div>
          </div>

          {/* ניווט מהיר */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-base mb-3">
              ניווט באתר
            </h4>
            <ul className="space-y-2.5 text-sm text-[#C4B8A8]">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleFooterNavClick(e, '#home')}
                  className="hover:text-white transition-colors"
                >
                  דף הבית
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleFooterNavClick(e, '#services')}
                  className="hover:text-white transition-colors"
                >
                  תחומי פעילות
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleFooterNavClick(e, '#process')}
                  className="hover:text-white transition-colors"
                >
                  איך זה עובד?
                </a>
              </li>
              <li>
                <a
                  href="#checklist"
                  onClick={(e) => handleFooterNavClick(e, '#checklist')}
                  className="hover:text-white transition-colors"
                >
                  הכנת מסמכים לבדיקה
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleFooterNavClick(e, '#pricing')}
                  className="hover:text-white transition-colors"
                >
                  עלויות והחזרים
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleFooterNavClick(e, '#about')}
                  className="hover:text-white transition-colors"
                >
                  אודות הרופאה
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleFooterNavClick(e, '#faq')}
                  className="hover:text-white transition-colors"
                >
                  שאלות נפוצות
                </a>
              </li>
            </ul>
          </div>

          {/* פרטי התקשרות במרפאה */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-base mb-3">
              מרפאת ד"ר נעם בן צרויה
            </h4>
            <div className="space-y-3 text-sm text-[#C4B8A8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FFBC7D] shrink-0 mt-0.5" />
                <span>{siteContent.doctor.clinicAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FFBC7D] shrink-0" />
                <a href={`tel:${siteContent.doctor.phone}`} className="hover:text-white transition-colors">
                  {siteContent.doctor.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FFBC7D] shrink-0" />
                <a href={`mailto:${siteContent.doctor.email}`} className="hover:text-white transition-colors font-mono">
                  {siteContent.doctor.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* שורת זכויות תחתונה */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B5A898] text-center sm:text-right font-light">
          <div>
            כל הזכויות שמורות © {currentYear} לד"ר נעם בן צרויה • רופאה מומחית ברפואה תעסוקתית
          </div>
          <div>
            המידע המופיע באתר זה נועד להתרשמות כללית בלבד ואינו מהווה תחליף לייעוץ רפואי פרטני.
          </div>
        </div>

      </div>
    </footer>
  );
};
