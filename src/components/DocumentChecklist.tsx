import { useState } from 'react';
import type { FC } from 'react';
import { Printer, CheckSquare, Square, Info } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export const DocumentChecklist: FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = siteContent.checklist.length;

  return (
    <section id="checklist" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#EFEAE1] print:bg-white print:py-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* כותרת חלק הטפסים והמסמכים - בסגנון ד"ר בקי */}
        <div className="text-center max-w-3xl mx-auto mb-16 print:mb-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#23211E] tracking-tight mb-4">
            מילוי טפסים והכנת מסמכים
          </h2>
          <div className="w-24 h-[1.5px] bg-[#312C29] mx-auto my-4"></div>
          <p className="text-lg sm:text-xl text-[#5A524A] font-light leading-relaxed print:text-sm">
            כדי לאפשר בחינה מלאה ומדויקת של מצבכם, מומלץ להכין מראש את המסמכים הרפואיים.
            באפשרותכם לסמן מה כבר ברשותכם ולהדפיס את הרשימה לצורך פנייה לקופת החולים.
          </p>
        </div>

        {/* לוח צ'קליסט נקי וחם */}
        <div className="bg-white rounded-[28px] border border-[#E8E0D5] p-6 sm:p-10 shadow-xs print:border-none print:shadow-none print:p-0">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-[#F0EAE1] print:hidden">
            <div className="flex items-center gap-2 text-base text-[#312C29]">
              <span className="font-bold">ריכוז החומרים:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EFEAE1] text-[#312C29]">
                {completedCount} מתוך {totalCount} מסמכים מוכנים
              </span>
            </div>

            <button
              onClick={handlePrint}
              className="btn-pill-outline text-xs sm:text-sm py-2 px-4"
            >
              <Printer className="w-4 h-4 text-[#8D7E6D]" />
              <span>הדפסת הרשימה</span>
            </button>
          </div>

          <div className="space-y-4">
            {siteContent.checklist.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-[#F2ECE4] border-[#D5CBBF]'
                      : 'bg-white border-[#E8E0D5] hover:border-[#D5CBBF] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div className="pt-0.5 text-[#8D7E6D] shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-[#8D7E6D]" />
                    ) : (
                      <Square className="w-5 h-5 text-[#BDB6AD]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-lg font-bold mb-1 ${
                        isChecked ? 'text-[#6B6259] line-through' : 'text-[#23211E]'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-base text-[#5A524A] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-[#EFEAE1] border border-[#E2D9CC] flex items-start gap-3.5 print:hidden">
            <Info className="w-5 h-5 text-[#8D7E6D] shrink-0 mt-0.5" />
            <div className="text-sm text-[#3A342F] leading-relaxed">
              <span className="font-bold">הנחיה חשובה: </span>
              את מרבית סיכומי המידע והפענוחים ניתן להוריד בנוחות ישירות מאזור המידע האישי באפליקציית קופת החולים שלכם (כללית, מכבי, מאוחדת או לאומית) ללא צורך בהגעה פיזית למרפאה.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
