import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { X, Accessibility, ZoomIn, Contrast, Link2, RotateCcw } from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityModal: FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('font-large', 'font-xlarge');
    if (textSize === 'large') root.classList.add('font-large');
    if (textSize === 'xlarge') root.classList.add('font-xlarge');

    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (underlineLinks) {
      root.classList.add('underline-links');
    } else {
      root.classList.remove('underline-links');
    }
  }, [textSize, highContrast, underlineLinks]);

  if (!isOpen) return null;

  const handleReset = () => {
    setTextSize('normal');
    setHighContrast(false);
    setUnderlineLinks(false);
    const root = document.documentElement;
    root.classList.remove('font-large', 'font-xlarge', 'high-contrast', 'underline-links');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B18]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-lg w-full p-8 sm:p-10 shadow-2xl border border-[#E8E0D5] relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-full text-[#6B6259] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          aria-label="סגור תפריט נגישות"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-[#EFEAE1] flex items-center justify-center text-[#8D7E6D]">
            <Accessibility className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#2E2824]">
              תפריט נגישות
            </h3>
            <p className="text-sm text-[#7A7268]">
              התאמת תצוגה לפי תקן ישראלי ת"י 5568
            </p>
          </div>
        </div>

        <div className="space-y-3.5 mb-6">
          
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-semibold text-[#2E2824]">
              <ZoomIn className="w-4 h-4 text-[#8D7E6D]" />
              <span>גודל טקסט:</span>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setTextSize('normal')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  textSize === 'normal' ? 'bg-[#351E06] text-white shadow-xs' : 'bg-white text-[#2E2824] border border-[#D8CFC4]'
                }`}
              >
                רגיל
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  textSize === 'large' ? 'bg-[#351E06] text-white shadow-xs' : 'bg-white text-[#2E2824] border border-[#D8CFC4]'
                }`}
              >
                גדול (+20%)
              </button>
              <button
                onClick={() => setTextSize('xlarge')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  textSize === 'xlarge' ? 'bg-[#351E06] text-white shadow-xs' : 'bg-white text-[#2E2824] border border-[#D8CFC4]'
                }`}
              >
                ענק (+40%)
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-semibold text-[#2E2824]">
              <Contrast className="w-4 h-4 text-[#8D7E6D]" />
              <span>ניגודיות צבעים גבוהה:</span>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                highContrast ? 'bg-[#351E06] text-white shadow-xs' : 'bg-white text-[#2E2824] border border-[#D8CFC4]'
              }`}
            >
              {highContrast ? 'מופעל' : 'כבוי'}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D5] flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-semibold text-[#2E2824]">
              <Link2 className="w-4 h-4 text-[#8D7E6D]" />
              <span>הדגשת קישורים:</span>
            </div>
            <button
              onClick={() => setUnderlineLinks(!underlineLinks)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                underlineLinks ? 'bg-[#351E06] text-white shadow-xs' : 'bg-white text-[#2E2824] border border-[#D8CFC4]'
              }`}
            >
              {underlineLinks ? 'מופעל' : 'כבוי'}
            </button>
          </div>

        </div>

        <div className="p-4 rounded-2xl bg-[#EFEAE1] text-xs text-[#4A433D] leading-relaxed mb-6">
          <span className="font-bold">הצהרת נגישות: </span>
          מרפאת ד"ר נעם בן צרויה מחויבת להנגשת שירותיה באופן שוויוני ומכבד. האתר מותאם לתקני נגישות ומאפשר גלישה נגישה במקלדת וקוראי מסך.
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D5]">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#8D7E6D] hover:text-[#351E06] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>איפוס הגדרות</span>
          </button>

          <button
            onClick={onClose}
            className="btn-pill-dark text-xs sm:text-sm py-2 px-6"
          >
            סגור
          </button>
        </div>

      </div>
    </div>
  );
};
