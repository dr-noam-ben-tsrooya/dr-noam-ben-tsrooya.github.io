import type { FC } from 'react';

interface WhatsAppIconProps {
  className?: string;
  variant?: 'green' | 'white' | 'outline';
}

export const WhatsAppIcon: FC<WhatsAppIconProps> = ({
  className = 'w-5 h-5',
  variant = 'green',
}) => {
  if (variant === 'green') {
    return (
      <img
        src="./whatsapp-green.png"
        alt="WhatsApp"
        className={`${className} object-contain shrink-0 inline-block`}
        width="24"
        height="24"
        loading="eager"
      />
    );
  }

  if (variant === 'outline') {
    return (
      <img
        src="./whatsapp-outline.png"
        alt="WhatsApp"
        className={`${className} object-contain shrink-0 inline-block`}
        width="24"
        height="24"
        loading="eager"
      />
    );
  }

  // White / monochrome vector fallback
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`${className} shrink-0 inline-block`}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42 1.55 1.56 2.41 3.63 2.41 5.83 0 4.54-3.69 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.14l-.3-.18-3.12.82.83-3.04-.2-.32a8.19 8.19 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24m-2.52 3.4c-.2 0-.36.07-.49.21-.13.14-.52.51-.52 1.26 0 .75.55 1.47.63 1.57.08.1 1.05 1.64 2.56 2.25 1.25.51 1.51.31 1.79.28.28-.03.9-.37 1.03-.74.13-.37.13-.68.09-.75-.04-.07-.16-.11-.34-.2-.18-.09-1.08-.53-1.25-.59-.17-.06-.29-.09-.41.09-.12.18-.47.63-.58.75-.11.12-.22.14-.4.05-.18-.09-.77-.28-1.46-.9-.54-.48-.9-1.08-1.01-1.26-.11-.18-.01-.28.08-.37.08-.08.19-.21.28-.32.09-.11.13-.19.19-.31.06-.12.03-.23-.01-.32-.05-.09-.41-.98-.56-1.35-.15-.35-.3-.31-.42-.31z" />
    </svg>
  );
};
