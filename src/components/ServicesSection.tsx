import { useState } from 'react';
import type { FC } from 'react';
import { ArrowLeft, Check, X, MessageCircle } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import type { ServiceItem } from '../data/siteContent';

interface ServicesSectionProps {
  onSelectServiceForContact: (serviceTitle: string) => void;
}

export const ServicesSection: FC<ServicesSectionProps> = ({ onSelectServiceForContact }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const serviceImages = [
    './consultation.jpg',
    './workplace.jpg',
    './clinic-desk.jpg',
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EFEAE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* כותרת חלק תחומי הפעילות - בסגנון ד"ר בקי */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23211E] tracking-tight mb-4">
            תחומי הפעילות שלי
          </h2>
          <div className="w-24 h-[1.5px] bg-[#312C29] mx-auto my-4"></div>
          <p className="text-lg sm:text-xl text-[#5A524A] font-light max-w-2xl mx-auto leading-relaxed">
            מענה מקצועי, יסודי וקשוב בצמתים המורכבים שבהם רפואה, תעסוקה וזכויות נפגשים.
          </p>
        </div>

        {/* שורות מתחלפות (Alternating Split Sections) - הדגם המדויק של ד"ר בקי */}
        <div className="space-y-16 sm:space-y-24">
          {siteContent.services.map((service, idx) => {
            const isEven = idx % 2 === 1;
            const imageSrc = serviceImages[idx % serviceImages.length];

            return (
              <div
                key={service.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* עמודת תמונה - Alternating Column */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="rounded-[28px] overflow-hidden bg-white shadow-sm border border-[#E8E0D5]">
                    <img
                      src={imageSrc}
                      alt={service.title}
                      className="w-full h-auto object-cover aspect-[4/3] hover:scale-102 transition-transform duration-700"
                      width="600"
                      height="450"
                    />
                  </div>
                </div>

                {/* עמודת תוכן ופירוט - Content Card */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="bg-white rounded-[28px] p-8 sm:p-12 border border-[#E8E0D5] shadow-xs">
                    
                    {/* כותרת השירות */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#23211E] leading-snug mb-3">
                      {service.title}
                    </h3>

                    {/* קו מפריד עדין */}
                    <div className="w-20 h-[1.5px] bg-[#312C29] my-4"></div>

                    {/* תיאור מהותי */}
                    <p className="text-lg sm:text-xl text-[#4A433D] font-light leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    {/* נקודות מפתח מפורטות */}
                    <ul className="space-y-3 mb-8">
                      {service.bulletPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-base sm:text-lg text-[#312C29]">
                          <span className="w-2 h-2 rounded-full bg-[#8D7E6D] mt-2.5 shrink-0"></span>
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* כפתור פיל לפעולה */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => onSelectServiceForContact(service.title)}
                        className="btn-pill-sand"
                      >
                        <span>לפנייה וייעוץ בנושא זה</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveModalService(service)}
                        className="btn-pill-outline text-sm"
                      >
                        פרטים מורחבים
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* מודל פירוט מורחב אם המשתמש רוצה להעמיק */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B18]/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-8 sm:p-10 shadow-2xl border border-[#E8E0D5] relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-6 left-6 p-2 rounded-full text-[#6B6259] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              aria-label="סגור חלונית"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#23211E] mb-3">
              {activeModalService.title}
            </h3>
            <div className="w-20 h-[1.5px] bg-[#312C29] my-3"></div>

            <p className="text-lg text-[#4A433D] leading-relaxed my-6 bg-[#FAF7F2] p-5 rounded-2xl border border-[#EFEAE1]">
              {activeModalService.fullDesc}
            </p>

            <h4 className="text-base font-bold text-[#23211E] mb-3">
              נושאי הטיפול המרכזיים:
            </h4>
            <ul className="space-y-3 mb-8">
              {activeModalService.bulletPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-[#312C29]">
                  <Check className="w-5 h-5 text-[#8D7E6D] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-[#EFEAE1] flex items-center justify-between">
              <button
                onClick={() => {
                  const title = activeModalService.title;
                  setActiveModalService(null);
                  onSelectServiceForContact(title);
                }}
                className="btn-pill-dark"
              >
                <span>השארת פרטים לרופאה</span>
              </button>

              <a
                href={`https://wa.me/${siteContent.doctor.whatsappNumber}?text=${encodeURIComponent(
                  `שלום ד"ר צרויה, אשמח להתייעץ לגבי ${activeModalService.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-sand text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>פנייה בוואטסאפ</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
