import type { FC } from 'react';
import { Quote } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const TestimonialsSection: FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#EFEAE1] border-b border-[#E2D9CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* כותרת חלק המלצות - בסגנון ד"ר בקי */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23211E] tracking-tight mb-4">
            מטופלים משתפים
          </h2>
          <div className="w-24 h-[1.5px] bg-[#312C29] mx-auto my-4"></div>
          <p className="text-lg sm:text-xl text-[#5A524A] font-light max-w-2xl mx-auto leading-relaxed">
            מילים של מי שליווינו בצמתים הרפואיים והמקצועיים המורכבים.
          </p>
        </div>

        {/* 3 כרטיסי המלצה חמים */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] p-8 sm:p-10 border border-[#E2D9CC] shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#8D7E6D] mb-4 rotate-180 opacity-70" />

                <div className="text-xs font-bold text-[#8D7E6D] tracking-wide uppercase mb-3">
                  {t.caseType}
                </div>

                <p className="text-[#3A342F] text-base sm:text-lg leading-relaxed font-light italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1]">
                <div className="font-bold text-[#1E1B18] text-base">
                  {t.author}
                </div>
                <div className="text-xs text-[#6B6259]">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
