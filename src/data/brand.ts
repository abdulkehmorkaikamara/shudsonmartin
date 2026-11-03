/**
 * ShudsonMartin — central brand details.
 * Update contact information, email and social links here; every page reads from this file.
 */

export const brand = {
  name: 'ShudsonMartin',
  wordmark: 'SHUDSONMARTIN',
  founder: 'Hudson Martin',
  established: 2016,
  copyrightYear: 2026,
  address: {
    line1: '8 Walpole Street',
    city: 'Freetown, Sierra Leone',
  },
  phones: [
    { display: '076 75 10 17', href: 'tel:076751017' },
    { display: '075 315194', href: 'tel:075315194' },
  ],
  email: {
    /** Studio inbox — every email link and the contact form use this address. */
    address: 'shudsonmartindfl@gmail.com' as string | null,
    placeholder: '[EMAIL ADDRESS TO BE ADDED]',
    subject: 'Enquiry — ShudsonMartin',
  },
  /** Social handle — used everywhere except X (@shudsonmartins, 15-character limit) and TikTok (@shudsonmartinstud). */
  socialHandle: 'shudsonmartinstudio',
  socials: [
    { label: 'Instagram', short: 'IG', href: 'https://www.instagram.com/shudsonmartinstudio/' },
    { label: 'Facebook', short: 'FB', href: 'https://www.facebook.com/shudsonmartinstudio' },
    { label: 'X', short: 'X', href: 'https://x.com/shudsonmartins' },
    { label: 'Pinterest', short: 'PI', href: 'https://www.pinterest.com/shudsonmartinstudio/' },
    { label: 'LinkedIn', short: 'IN', href: 'https://www.linkedin.com/company/shudsonmartinstudio/' },
    { label: 'TikTok', short: 'TT', href: 'https://www.tiktok.com/@shudsonmartinstud' },
  ],
} as const;

/** mailto link — opens a pre-filled draft. Uses the real address once one is configured. */
export function emailHref(): string {
  const subject = encodeURIComponent(brand.email.subject);
  return `mailto:${brand.email.address ?? ''}?subject=${subject}`;
}

const mapQuery = encodeURIComponent(`${brand.address.line1}, ${brand.address.city}`);

/** Opens the studio location in Google Maps (app on phones, website on desktop). */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

/** Embeddable Google Map of the studio — no API key required. */
export const mapsEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`;

export function emailLabel(): string {
  return brand.email.address ?? brand.email.placeholder;
}

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Interior', to: '/interior' },
  { label: 'Fashion', to: '/fashion' },
  { label: 'Lifestyle', to: '/lifestyle' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const;
