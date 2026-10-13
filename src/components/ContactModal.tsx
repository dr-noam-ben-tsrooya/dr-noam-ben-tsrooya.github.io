import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledTopic?: string;
}

export const ContactModal: FC<ContactModalProps> = ({
  isOpen,
  onClose,
  prefilledTopic,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: prefilledTopic || 'אובדן כושר עבודה ומיצוי זכויות',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `פנייה מאתר ד"ר נעם בן צרויה:
שם: ${formData.name}
טלפון: ${formData.phone}
נושא: ${formData.topic}
פירוט: ${formData.message || 'ללא'}`;

    const url = `https://wa.me/${siteContent.doctor.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1B18]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] max-w-lg w-full p-8 sm:p-10 shadow-2xl border border-[#E8E0D5] relative max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-full text-[#6B6259] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
          aria-label="סגור חלונית"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-right mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#23211E] mb-2">
            יצירת קשר עם המרפאה
          </h3>
          <p className="text-base text-[#5A524A] font-light">
            השאירו פרטים קצרים וד"ר בן צרויה תחזור אליכם בהקדם.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-[#EFEAE1] border border-[#E2D9CC] text-center space-y-3">
            <CheckCircle className="w-10 h-10 text-[#8D7E6D] mx-auto" />
            <div className="text-2xl font-bold text-[#23211E]">
              ההודעה הועברה בהצלחה
            </div>
            <div className="text-base text-[#5A524A] font-light leading-relaxed">
              חלון הוואטסאפ נפתח עם פרטי הפנייה שלך.
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 btn-pill-dark"
            >
              סגירת חלון
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-semibold text-[#312C29] mb-1.5">
                שם מלא
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="ישראל ישראלי"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-[#23211E] text-base focus:outline-none focus:border-[#8D7E6D]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#312C29] mb-1.5">
                מספר טלפון לחזרה
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="050-0000000"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-[#23211E] text-base focus:outline-none focus:border-[#8D7E6D]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#312C29] mb-1.5">
                נושא הפנייה
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-[#23211E] text-base focus:outline-none focus:border-[#8D7E6D]"
              >
                {siteContent.services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="ייעוץ כללי אחר">ייעוץ כללי אחר</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#312C29] mb-1.5">
                הערות נוספות (אופציונלי)
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="כמה מילים על המקרה..."
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-[#23211E] text-base focus:outline-none focus:border-[#8D7E6D] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn-pill-sand w-full text-center mt-2 group"
            >
              <WhatsAppIcon className="w-5 h-5" variant="green" />
              <span>שליחה ישירה לוואטסאפ של הרופאה</span>
            </button>

            <div className="text-center text-xs text-[#7A7268] pt-1">
              המידע נשמר תחת חיסיון רפואי וסודיות מלאה
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
