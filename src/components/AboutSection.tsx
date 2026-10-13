import type { FC } from 'react';
import { siteContent } from '../data/siteContent';

export const AboutSection: FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EFEAE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* כותרת חלק אודות - בסגנון ד"ר בקי */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23211E] tracking-tight mb-4">
            ומי אני?
          </h2>
          <div className="w-24 h-[1.5px] bg-[#312C29] mx-auto my-4"></div>
          <p className="text-lg sm:text-xl text-[#5A524A] font-light max-w-2xl mx-auto leading-relaxed">
            השכלה, ניסיון קליני וגישה אישית שמלווה אותי בכל מפגש.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* תמונת הרופאה */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-[28px] overflow-hidden bg-white shadow-sm border border-[#E8E0D5]">
              <img
                src="./dr-noam.jpg"
                alt={`ד"ר נעם בן צרויה - ${siteContent.doctor.title}`}
                className="w-full h-auto object-cover aspect-[4/4.5]"
                width="480"
                height="540"
              />
            </div>
          </div>

          {/* תוכן וסיפור מקצועי */}
          <div className="lg:col-span-7 space-y-6 text-lg sm:text-xl text-[#3A342F] font-light leading-relaxed">
            {siteContent.about.story.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            <div className="pt-6 border-t border-[#E8E0D5]">
              <h3 className="text-xl font-bold text-[#23211E] mb-4">
                הסמכות והשתייכות מקצועית:
              </h3>
              <ul className="space-y-3 text-base sm:text-lg text-[#312C29]">
                {siteContent.about.credentials.map((cred, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#8D7E6D] mt-2.5 shrink-0"></span>
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
