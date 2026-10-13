import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: FC<ContactSectionProps> = ({ initialService }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: initialService || 'אובדן כושר עבודה ומיצוי זכויות',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `הודעה מאתר ד"ר נעם בן צרויה:
שם: ${formData.name}
טלפון: ${formData.phone}
דוא"ל: ${formData.email || 'לא צוין'}
נושא: ${formData.topic}
פירוט: ${formData.message || 'ללא'}`;

    const url = `https://wa.me/${siteContent.doctor.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* כותרת חלק יצירת קשר - בסגנון ד"ר בקי */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23211E] tracking-tight mb-4">
            אני כאן עבורכם
          </h2>
          <div className="w-24 h-[1.5px] bg-[#312C29] mx-auto my-4"></div>
          <p className="text-xl sm:text-2xl font-bold text-[#8D7E6D] mb-3">
            {siteContent.doctor.title}
          </p>
          <p className="text-lg text-[#5A524A] font-light leading-relaxed">
            מוזמנים ליצור קשר בטלפון, בוואטסאפ או להשאיר הודעה בטופס.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* עמודת פרטי המרפאה והתקשרות */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[28px] p-8 sm:p-10 border border-[#E8E0D5] shadow-xs space-y-6">
              
              <div>
                <div className="text-sm font-semibold text-[#8D7E6D] mb-1">
                  שיחה ישירה עם המרפאה
                </div>
                <a
                  href={`tel:${siteContent.doctor.phone}`}
                  className="text-2xl font-bold text-[#23211E] hover:text-[#8D7E6D] transition-colors flex items-center gap-3"
                >
                  <Phone className="w-5 h-5 text-[#8D7E6D]" />
                  <span>{siteContent.doctor.phoneDisplay}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1]">
                <div className="text-sm font-semibold text-[#8D7E6D] mb-1">
                  הודעת וואטסאפ מהירה
                </div>
                <a
                  href={`https://wa.me/${siteContent.doctor.whatsappNumber}?text=${encodeURIComponent(
                    siteContent.doctor.whatsappPrefillMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-bold text-[#23211E] hover:text-[#8D7E6D] transition-colors flex items-center gap-3"
                >
                  <WhatsAppIcon className="w-5 h-5" variant="green" />
                  <span>לחצו לשליחת הודעה</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1]">
                <div className="text-sm font-semibold text-[#8D7E6D] mb-1">
                  דואר אלקטרוני
                </div>
                <a
                  href={`mailto:${siteContent.doctor.email}`}
                  className="text-base font-semibold text-[#23211E] hover:text-[#8D7E6D] transition-colors flex items-center gap-3"
                >
                  <Mail className="w-5 h-5 text-[#8D7E6D]" />
                  <span>{siteContent.doctor.email}</span>
                </a>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1]">
                <div className="text-sm font-semibold text-[#8D7E6D] mb-1">
                  כתובת המרפאה
                </div>
                <div className="text-base text-[#4A433D] font-light flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#8D7E6D] shrink-0" />
                  <span>{siteContent.doctor.clinicAddress}</span>
                </div>
              </div>

            </div>
          </div>

          {/* עמודת טופס יצירת קשר */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[28px] p-8 sm:p-12 border border-[#E8E0D5] shadow-xs">
              
              <h3 className="text-2xl font-bold text-[#23211E] mb-2">
                השארת פרטים
              </h3>
              <p className="text-base text-[#5A524A] font-light mb-8">
                הפרטים נשלחים ישירות לבחינת הרופאה בדיסקרטיות מלאה.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#EFEAE1] border border-[#E2D9CC] text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-[#8D7E6D] mx-auto" />
                  <div className="text-2xl font-bold text-[#23211E]">
                    ההודעה הועברה בהצלחה
                  </div>
                  <div className="text-base text-[#5A524A] font-light">
                    ד"ר נעם בן צרויה תיצור איתך קשר בהקדם.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#312C29] mb-1.5">
                        שם מלא
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="שם מלא"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-[#23211E] text-base focus:outline-none focus:border-[#8D7E6D] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#312C29] mb-1.5">
                        מספר טלפון
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="050-0000000"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-[#23211E] text-base focus:outline-none focus:border-[#8D7E6D] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#312C29] mb-1.5">
                      נושא הפנייה
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-[#23211E] text-base focus:outline-none focus:border-[#8D7E6D] transition-colors"
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
                      תוכן ההודעה (אופציונלי)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="כמה מילים על המקרה..."
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8E0D5] text-[#23211E] text-base focus:outline-none focus:border-[#8D7E6D] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-pill-sand w-full text-center"
                  >
                    שליחת הודעה
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
