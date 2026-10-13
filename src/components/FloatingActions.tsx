import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Phone, Accessibility, ArrowUp } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { smoothScrollTo } from '../utils/smoothScroll';

interface FloatingActionsProps {
  onOpenAccessibility: () => void;
}

export const FloatingActions: FC<FloatingActionsProps> = ({ onOpenAccessibility }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo(0, 0, 700);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center gap-3 print:hidden">
      
      {/* חזרה לראש העמוד */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-white text-[#312C29] border border-[#D5CBBF] shadow-sm flex items-center justify-center transition-all hover:bg-[#EFEAE1] cursor-pointer"
          title="חזרה לראש העמוד"
          aria-label="חזרה לראש העמוד"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* תפריט נגישות */}
      <button
        onClick={onOpenAccessibility}
        className="w-11 h-11 rounded-full bg-[#EFEAE1] text-[#312C29] border border-[#D5CBBF] shadow-sm flex items-center justify-center transition-all hover:bg-[#E2D9CC] cursor-pointer"
        title="פתיחת תפריט נגישות"
        aria-label="פתיחת תפריט נגישות"
      >
        <Accessibility className="w-5 h-5 text-[#8D7E6D]" />
      </button>

      {/* חיוג ישיר */}
      <a
        href={`tel:${siteContent.doctor.phone}`}
        className="w-11 h-11 rounded-full bg-[#312C29] text-white shadow-sm flex items-center justify-center transition-all hover:bg-[#1E1B18]"
        title={`חיוג למרפאה: ${siteContent.doctor.phoneDisplay}`}
        aria-label="חיוג ישיר"
      >
        <Phone className="w-5 h-5 text-[#E2D9CC]" />
      </a>

      {/* וואטסאפ מהיר ומכבד */}
      <a
        href={`https://wa.me/${siteContent.doctor.whatsappNumber}?text=${encodeURIComponent(
          siteContent.doctor.whatsappPrefillMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        title="שיחה ישירה בוואטסאפ"
        aria-label="וואטסאפ"
      >
        <img
          src="./whatsapp-green.png"
          alt="WhatsApp"
          className="w-8 h-8 object-contain"
          width="32"
          height="32"
        />
      </a>

    </div>
  );
};
