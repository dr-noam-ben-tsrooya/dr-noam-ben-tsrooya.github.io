import type { FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const FaqSection: FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EFEAE1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* כותרת חלק שאלות נפוצות - בסגנון ד"ר בקי */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23211E] tracking-tight mb-4">
            שאלות נפוצות
          </h2>
          <div className="w-24 h-[1.5px] bg-[#312C29] mx-auto my-4"></div>
          <p className="text-lg sm:text-xl text-[#5A524A] font-light leading-relaxed">
            תשובות לשאלות החוזרות ביותר בנוגע לתהליך, להחזרים ולבדיקות.
          </p>
        </div>

        {/* אקורדיון שאלות ותשובות נקי ומאופק */}
        <div className="space-y-4">
          {siteContent.faq.map((item, idx) => (
            <details
              key={idx}
              name="faq-accordion"
              className="group bg-white rounded-[20px] border border-[#E8E0D5] p-6 shadow-2xs transition-all duration-200 open:border-[#8D7E6D]"
            >
              <summary className="flex items-center justify-between gap-4 text-xl sm:text-2xl font-bold text-[#23211E] cursor-pointer select-none">
                <span className="leading-snug">{item.question}</span>
                <span className="p-1 rounded-full text-[#8D7E6D] group-open:rotate-180 transition-transform duration-200 shrink-0">
                  <ChevronDown className="w-6 h-6" />
                </span>
              </summary>
              <div className="pt-4 text-lg text-[#4A433D] font-light leading-relaxed border-t border-[#F0EAE1] mt-4">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
};
