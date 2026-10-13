import type { FC } from 'react';
import { siteContent } from '../data/siteContent';

export const Philosophy: FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#EFEAE1] border-b border-[#E2D9CC]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* תוכן החזון והפילוסופיה של הרופאה */}
        <div className="space-y-6 text-[#2D2825] font-body text-xl sm:text-2xl leading-relaxed">
          <p className="font-normal text-[#3A342F]">
            {siteContent.philosophy.lead} {siteContent.philosophy.followUp}
          </p>

          <p className="font-bold text-[#1E1B18] text-2xl sm:text-3xl leading-snug pt-2 pb-2">
            {siteContent.philosophy.highlight}
          </p>

          {siteContent.philosophy.paragraphs.map((p, idx) => (
            <p key={idx} className="font-normal text-[#3A342F] text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
              {p}
            </p>
          ))}
        </div>

      </div>
    </section>
  );
};
