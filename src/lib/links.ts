// Central place for outbound product / account links so we can swap env vars later.
// app.logisticsprizm.com is configured (Cloudflare DNS + Nginx server block on the VPS)
// to proxy to the Next.js client portal on port 3001. See CLAUDE.md Issue Resolution Log
// (2026-05-07/08) for the full setup and the routes audit that motivated this map.

export const APP_BASE =
  import.meta.env.PUBLIC_APP_URL ?? 'https://app.logisticsprizm.com';

// API lives on its own subdomain, not under the app host.
export const API_BASE =
  import.meta.env.PUBLIC_API_URL ?? 'https://api.logisticsprizm.com';

// signup/trial route to the marketing-site /request-demo lead-capture form
// (which POSTs to /api/v1/public/demo-request → emails sales). Today the portal
// has no self-serve registration UI — see CLAUDE.md Issue Resolution Log
// (2026-05-08) for the routes audit and Phase 2 plan to build a real (auth)/signup
// flow with email verification + auto-provisioning for Solo tier.
//
// chat → mailto:support since no /portal/support route exists yet.
export const APP_LINKS = {
  login: `${APP_BASE}/login`,
  signup: `/request-demo`,
  trial: `/request-demo?intent=trial&plan=growth`,
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
