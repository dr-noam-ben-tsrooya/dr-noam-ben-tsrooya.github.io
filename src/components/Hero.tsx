import type { FC } from 'react';
import { Phone } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onOpenContactModal: () => void;
}

export const Hero: FC<HeroProps> = ({ onOpenContactModal }) => {
  return (
    <section id="home" className="relative bg-[#FAF7F2] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#EFEAE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* עמודת תמונת הרופאה - Right Column (in RTL) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-md">
              <div className="rounded-[28px] overflow-hidden bg-white shadow-xs border border-[#E8E0D5]">
                <img
                  src="./dr-noam.jpg"
                  alt={`ד"ר נעם בן צרויה - ${siteContent.doctor.title}`}
                  className="w-full h-auto object-cover aspect-[4/4.5]"
                  width="500"
                  height="560"
                />
                
                {/* תיאור עדין תחת התמונה */}
                <div className="py-3 px-5 bg-white text-center border-t border-[#F0EAE1]">
                  <div className="text-xs font-semibold text-[#6B6259]">
                    מרפאה נגישה ברמת החייל, תל אביב • אפשרות לייעוץ מרחוק
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* עמודת היכרות ומהות - Left Column (in RTL) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-right order-1 lg:order-2">
            
            {/* שם הרופאה */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2E2824] tracking-tight leading-tight mb-3">
              {siteContent.doctor.fullName}
            </h1>

            {/* תואר מומחיות */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#4A433D] mb-5">
              {siteContent.doctor.title}
            </h2>

            {/* קו מפריד עדין ומאופק */}
            <div className="w-28 h-[1.5px] bg-[#351E06] my-2 mx-auto lg:mx-0"></div>

            {/* מספרי רישוי רפואיים */}
            <div className="space-y-1 text-lg sm:text-xl font-medium text-[#4A433D] mb-6">
              <div>מס' מומחה: {siteContent.doctor.specialistLicense}</div>
              <div>רישיון לעסוק ברפואה: {siteContent.doctor.medicalLicense}</div>
            </div>

            {/* פסקת תוכן עמוקה ואנושית */}
            <p className="text-lg sm:text-xl text-[#4A433D] leading-relaxed max-w-2xl mb-8 font-light">
              חוות דעת רפואיות, הערכת כושר עבודה ומיצוי זכויות מול ביטוח לאומי, קרנות פנסיה וחברות ביטוח.
              ליווי מקצועי, יסודי וקשוב בצמתים שבהם רפואה, תעסוקה וזכויות נפגשים.
            </p>

            {/* כפתורי פנייה מוגדרים ומדויקים ללא כפילויות */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onOpenContactModal}
                className="btn-pill-sand"
              >
                לתיאום פגישה במרפאה
              </button>

              <a
                href={`https://wa.me/${siteContent.doctor.whatsappNumber}?text=${encodeURIComponent(
                  siteContent.doctor.whatsappPrefillMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-dark group"
              >
                <WhatsAppIcon className="w-5 h-5" variant="green" />
                <span>הודעת וואטסאפ לרופאה</span>
              </a>

              <a
                href={`tel:${siteContent.doctor.phone}`}
                className="btn-pill-outline"
                title={`חיוג למרפאה: ${siteContent.doctor.phoneDisplay}`}
              >
                <Phone className="w-4 h-4 text-[#8D7E6D]" />
                <span>{siteContent.doctor.phoneDisplay}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
