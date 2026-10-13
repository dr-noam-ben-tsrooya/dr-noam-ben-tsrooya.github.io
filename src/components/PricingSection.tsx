import type { FC } from 'react';
import { siteContent } from '../data/siteContent';

export const PricingSection: FC = () => {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#EFEAE1] border-b border-[#E2D9CC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        {/* כותרת עלויות - בסגנון ד"ר בקי */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23211E] tracking-tight mb-4">
            {siteContent.pricing.title}
          </h2>
          <div className="w-24 h-[1.5px] bg-[#312C29] mx-auto my-4"></div>
          <p className="text-lg sm:text-xl text-[#4A433D] font-light leading-relaxed">
            {siteContent.pricing.lead}
          </p>
        </div>

        {/* 3 כרטיסי שקיפות במחיר */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {siteContent.pricing.points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] p-8 border border-[#E2D9CC] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-bold text-[#8D7E6D] mb-3">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-[#23211E] mb-3 leading-snug">
                  {pt.title}
                </h3>
                <p className="text-base sm:text-lg text-[#5A524A] font-light leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* הסבר ברור על אפשרויות תשלום והחזר */}
        <div className="bg-white rounded-[24px] p-8 sm:p-10 border border-[#E2D9CC] text-center">
          <div className="text-xl sm:text-2xl font-bold text-[#23211E] mb-3">
            החזרים כספיים מפוליסות ביטוח בריאות
          </div>
          <p className="text-base sm:text-lg text-[#5A524A] font-light leading-relaxed max-w-3xl mx-auto mb-6">
            במרבית פוליסות ביטוח הבריאות הפרטיות קיים כיסוי עבור ״התייעצות עם רופא מומחה״. 
            עם סיום הבדיקה נמסרת חשבונית מס וקבלה מפורטת הכוללת את תעודת המומחה ומספר הרישיון של הרופאה לצורך הגשה מהירה לחברת הביטוח.
          </p>
          <div className="text-sm font-semibold text-[#8D7E6D]">
            אמצעי תשלום מקובלים: העברה בנקאית • כרטיסי אשראי • Bit • PayBox
          </div>
        </div>

      </div>
    </section>
  );
};
