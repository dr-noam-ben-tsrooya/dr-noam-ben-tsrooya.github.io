/**
 * גלילה מותאמת אישית חלקה, רכה ומענגת עם עקומת תאוצה/בלימה (easeInOutCubic)
 * וקיזוז מדויק של גובה הסרגל העליון הדביק (Sticky Header).
 */
export function smoothScrollTo(
  target: string | HTMLElement | number,
  offset = 95,
  duration = 750
): void {
  let targetPosition = 0;

  if (typeof target === 'number') {
    targetPosition = target;
  } else if (typeof target === 'string') {
    if (target === '#home' || target === '#' || target === 'top') {
      targetPosition = 0;
    } else {
      const el = document.querySelector(target);
      if (!el) return;
      const elementPosition = el.getBoundingClientRect().top;
      targetPosition = elementPosition + window.pageYOffset - offset;
    }
  } else if (target instanceof HTMLElement) {
    const elementPosition = target.getBoundingClientRect().top;
    targetPosition = elementPosition + window.pageYOffset - offset;
  }

  targetPosition = Math.max(0, targetPosition);
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;

  // אם המרחק אפסי, אין צורך באנימציה
  if (Math.abs(distance) < 2) {
    window.scrollTo(0, targetPosition);
    return;
  }

  let startTime: number | null = null;

  function animationStep(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    // עקומת easeInOutCubic: מתחילה בעדינות, נעה ברכות, ובולמת באלגנטיות
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, Math.round(startPosition + distance * ease));

    if (timeElapsed < duration) {
      window.requestAnimationFrame(animationStep);
    } else {
      window.scrollTo(0, targetPosition);
    }
  }

  window.requestAnimationFrame(animationStep);
}
