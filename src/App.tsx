import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { ServicesSection } from './components/ServicesSection';
import { DidYouKnow } from './components/DidYouKnow';
import { ProcessSection } from './components/ProcessSection';
import { DocumentChecklist } from './components/DocumentChecklist';
import { PricingSection } from './components/PricingSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ContactModal } from './components/ContactModal';
import { AccessibilityModal } from './components/AccessibilityModal';

export function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string | undefined>();

  const handleOpenContactWithService = (serviceTitle: string) => {
    setSelectedServiceForContact(serviceTitle);
    setIsContactModalOpen(true);
  };

  const handleOpenGeneralContact = () => {
    setSelectedServiceForContact(undefined);
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2825] flex flex-col font-hebrew">
      {/* סרגל עליון וניווט דביק */}
      <Header
        onOpenAccessibility={() => setIsAccessibilityModalOpen(true)}
        onOpenContactModal={handleOpenGeneralContact}
      />

      {/* תוכן ראשי */}
      <main className="flex-1">
        {/* אזור היכרות - מאופק, רגוע וקליני ללא שיווק אגרסיבי */}
        <Hero onOpenContactModal={handleOpenGeneralContact} />

        {/* אני מאמינה - חזון ורגישות אנושית ברקע חול חם */}
        <Philosophy />

        {/* תחומי פעילות - שורות מתחלפות בסגנון ד"ר בקי */}
        <ServicesSection onSelectServiceForContact={handleOpenContactWithService} />

        {/* נתון מעניין / תובנה קלינית */}
        <DidYouKnow onOpenContactModal={handleOpenGeneralContact} />

        {/* שלבי התהליך - 4 שלבים נהירים */}
        <ProcessSection onOpenContactModal={handleOpenGeneralContact} />

        {/* מילוי טפסים והכנת מסמכים לבדיקה */}
        <DocumentChecklist />

        {/* ומה לגבי העלויות? - שקיפות והחזרים */}
        <PricingSection />

        {/* ומי אני? - סיפור אישי והסמכות */}
        <AboutSection />

        {/* מטופלים משתפים - המלצות אותנטיות */}
        <TestimonialsSection />

        {/* שאלות נפוצות */}
        <FaqSection />

        {/* אני כאן עבורכם - יצירת קשר ישירה */}
        <ContactSection initialService={selectedServiceForContact} />
      </main>

      {/* כותרת תחתונה */}
      <Footer />

      {/* כפתורים צפים */}
      <FloatingActions onOpenAccessibility={() => setIsAccessibilityModalOpen(true)} />

      {/* מודל פנייה מהירה */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledTopic={selectedServiceForContact}
      />

      {/* מודל נגישות */}
      <AccessibilityModal
        isOpen={isAccessibilityModalOpen}
        onClose={() => setIsAccessibilityModalOpen(false)}
      />
    </div>
  );
}

export default App;
