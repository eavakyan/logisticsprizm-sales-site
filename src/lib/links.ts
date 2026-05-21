// Central place for outbound product / account links so we can swap env vars later.
// app.logisticsprizm.com is configured (Cloudflare DNS + Nginx server block on the VPS)
// to proxy to the Next.js client portal on port 3001. See CLAUDE.md Issue Resolution Log
// (2026-05-07/08) for the full setup and the routes audit that motivated this map.

export const APP_BASE =
  import.meta.env.PUBLIC_APP_URL ?? 'https://app.logisticsprizm.com';

// API lives on its own subdomain, not under the app host.
export const API_BASE =
  import.meta.env.PUBLIC_API_URL ?? 'https://api.logisticsprizm.com';

// 2026-05-19 — real self-serve signup shipped on the portal. The headline
// "Start free trial" / "Sign up" CTAs now land users in the real registration
// flow (no-CC 14-day trial on Professional tier). Calendly is still the
// landing for explicit "Book a demo" / "Talk to sales" buttons, and the
// /request-demo form-based fallback (POSTs to /api/v1/public/demo-request →
// emails sales) is unchanged for prospects who want the high-touch path.
//
// chat → mailto:support since no /portal/support route exists yet.
export const CALENDLY_URL = 'https://calendly.com/gene-vugagroup/30min';

export const APP_LINKS = {
  login: `${APP_BASE}/login`,
  // Real registration: 14-day no-CC trial on Professional tier.
  signup: `${APP_BASE}/signup`,
  // "Start trial" intent — same destination, the portal reads ?intent=trial
  // to render the trial-flavored copy on the signup form.
  trial: `${APP_BASE}/signup?intent=trial`,
  // High-touch sales path (preserved for users who want to talk first).
  contactSales: `${APP_BASE}/contact-sales`,
  bookDemo: CALENDLY_URL,
  tracking: `${APP_BASE}/tracking`,
  chat: `mailto:support@logisticsprizm.com`,
  api: `${API_BASE}/api/v1`,
};

export const NAV_LINKS = [
  { label: 'Product', href: '/#product' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'ITAR', href: '/itar' },
  { label: 'About', href: '/about' },
];

// Real contact details pending — do not publish placeholder address/phone that create a
// false impression of an established presence. Sales inbox routes to the founding team.
export const CONTACT = {
  salesEmail: 'sales@logisticsprizm.com',
  supportEmail: 'support@logisticsprizm.com',
  partnersEmail: 'partners@logisticsprizm.com',
};
