import type { FC } from 'react';
import { siteContent } from '../data/siteContent';

interface DidYouKnowProps {
  onOpenContactModal: () => void;
}

export const DidYouKnow: FC<DidYouKnowProps> = ({ onOpenContactModal }) => {
  return (
    <section className="py-20 sm:py-24 bg-[#312C29] text-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF7F2] tracking-wide mb-6">
          {siteContent.didYouKnow.title}
        </h2>

        <div className="w-20 h-[1.5px] bg-[#E2D9CC] mx-auto my-4"></div>

        <p className="text-xl sm:text-2xl text-[#E8E0D5] font-light leading-relaxed max-w-3xl mx-auto mb-10">
          {siteContent.didYouKnow.text}
        </p>

        <button
          onClick={onOpenContactModal}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base sm:text-lg font-bold text-[#1E1B18] bg-[#E2D9CC] hover:bg-white transition-all cursor-pointer shadow-sm"
        >
          לבדיקת התיק הרפואי שלכם
        </button>

      </div>
    </section>
  );
};
