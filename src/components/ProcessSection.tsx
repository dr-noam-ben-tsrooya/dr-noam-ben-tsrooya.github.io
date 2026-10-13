import type { FC } from 'react';
import { siteContent } from '../data/siteContent';

interface ProcessSectionProps {
  onOpenContactModal: () => void;
}

export const ProcessSection: FC<ProcessSectionProps> = ({ onOpenContactModal }) => {
  return (
    <section id="process" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EFEAE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* כותרת חלק התהליך - בסגנון ד"ר בקי */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23211E] tracking-tight mb-4">
            איך עובד התהליך?
          </h2>
          <div className="w-24 h-[1.5px] bg-[#312C29] mx-auto my-4"></div>
          <p className="text-lg sm:text-xl text-[#5A524A] font-light max-w-2xl mx-auto leading-relaxed">
            ארבעה שלבים פשוטים וברורים לקבלת חוות דעת רפואית מנומקת.
          </p>
        </div>

        {/* 4 כרטיסי שלבים ברורים ונקיים */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {siteContent.processSteps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-[24px] p-8 border border-[#E8E0D5] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* מספר שלב גדול ואלגנטי */}
                <div className="text-4xl font-extrabold text-[#8D7E6D] mb-4">
                  {step.step}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#23211E] mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-base sm:text-lg text-[#5A524A] font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* כפתור פיל לפעולה */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            onClick={onOpenContactModal}
            className="btn-pill-sand"
          >
            להתחלת התהליך ופנייה למרפאה
          </button>
        </div>

      </div>
    </section>
  );
};
