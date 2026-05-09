# LogisticsPrizm — Public Sales Site

The public-facing marketing site at **https://logisticsprizm.com**.

The product application is reachable at **https://app.logisticsprizm.com** (customer-facing client portal, Cloudflare-fronted, proxied by Nginx to Next.js on the VPS port 3001). Internal staff also use **https://admin.logisticsprizm.com** (admin dashboard) and the backend lives at **https://api.logisticsprizm.com**. This repo is intentionally decoupled: nothing here depends on the main app's code, build, or runtime. You can deploy either independently.

## Stack

- **Astro 4** — static output, zero-JS by default.
- **Tailwind CSS** — utility-first with a custom `prizm` and `ocean` palette.
- **Hero video** — the 60-second presentation from the Claude Design bundle, loaded as an iframe (`public/media/hero-video.html`). The iframe runs React 18 UMD + Babel Standalone at runtime so we can keep the design bundle's JSX format verbatim. Cost: ~250 KB for React + Babel, one-time cached, loaded only on the iframe — not in the main site bundle.
- **Sales copy** — written with the `sales-copywriter` frameworks: Problem-Agitate-Solve, specificity-over-superlatives, named villains, concrete ROI anchors, objection-preempting FAQ.

## Get started

```bash
cd sales-site
npm install
npm run dev   # http://localhost:4500
```

### Environment variables

| Var | Default | Purpose |
|---|---|---|
| `PUBLIC_APP_URL` | `https://app.logisticsprizm.com` | Override for the app-domain CTAs (login, signup, tracking). Set to `http://localhost:4000` for local testing. |

Create `.env` or export inline:

```bash
PUBLIC_APP_URL=http://localhost:4000 npm run dev
```

## Project layout

```
sales-site/
├── public/
│   ├── media/
│   │   ├── hero-video.html    # iframe-hosted React bootstrap
│   │   ├── animations.jsx     # Stage / Timeline / Sprite framework (design bundle)
│   │   └── scenes.jsx         # 6-scene, 60-second presentation (design bundle)
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro   # SEO meta, fonts, structured data, scroll-reveal observer
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── HeroVideo.astro    # iframe wrapper + overlay copy + CTA
│   │   └── sections/
│   │       ├── LogoStrip.astro
│   │       ├── ProblemAgitation.astro     # P, A — named villain, specific stats
│   │       ├── SolutionBridge.astro        # S — three-pillar promise
│   │       ├── FeatureGrid.astro           # nine capabilities, outcome-first
│   │       ├── ProofStack.astro            # 32s / $14.8K / 5.2% quant proof
│   │       ├── ITARMoat.astro              # compliance moat
│   │       ├── PricingTiers.astro          # 4 tiers + Founding Customer note
│   │       ├── FAQ.astro                   # 8 objections, honestly answered
│   │       ├── FounderLetter.astro         # humanized closer
│   │       └── FinalCTA.astro              # single-choice close
│   ├── pages/
│   │   ├── index.astro         # Home — video hero + full sales flow
│   │   ├── pricing.astro
│   │   ├── itar.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── request-demo.astro
│   ├── lib/
│   │   └── links.ts            # App URL helpers + nav + contact
│   └── styles/
│       └── global.css
├── docs/
│   ├── design-bundle-README.md   # Original Claude Design bundle instructions
│   └── design-chat.md            # Chat transcript with the design assistant
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Hero video

The hero section embeds `public/media/hero-video.html` in an iframe. That HTML loads the two JSX files (`animations.jsx`, `scenes.jsx`) from the same `/media/` directory, compiled at runtime by Babel Standalone. This preserves the design file verbatim — no port required.

**Autoplay + loop** are on by default. **`prefers-reduced-motion`** disables animations inside the iframe. The iframe host page also persists playhead position to localStorage so an interrupted view resumes.

For mobile / low-bandwidth visitors, consider rendering a pre-recorded MP4 fallback; the iframe container is `min-height: 640px` so layout stays stable.

### Updating the video

1. Edit `public/media/scenes.jsx` or `animations.jsx` directly — the JSX format is preserved from the design bundle.
2. Or replace both files from an updated design bundle: `cp /path/to/project/*.{jsx,html} public/media/`.
3. No build step needed — Babel Standalone compiles on load.

## Sales copy principles used

Every section leans on one or more frameworks:

- **P-A-S** (Problem, Agitate, Solve) across `ProblemAgitation` → `SolutionBridge` → `FeatureGrid`.
- **Specificity beats superlatives**: "32-second quotes at 0.88 confidence" is more persuasive than "AI-powered quoting."
- **Named villains**: CargoWise, 15–30 disconnected systems, 6-hour quote turnaround.
- **Loss aversion**: $14.8K prevented, 5.2% reclaimed, $500K ITAR fine per violation.
- **Social proof with roles + context**: "Director of Sales, mid-Atlantic freight forwarder, 2026" beats "John D., satisfied customer."
- **Mini-commitment stair**: Watch video → scroll pain → scroll solution → read pricing → book demo → start trial.
- **Objection preempt**: FAQ reads the reader's mind; eight highest-frequency objections answered without marketing veneer.
- **Humanized closer**: Founder letter directly before the final CTA drops the corporate register so the reader lowers their shield.

## Deployment

### Recommended: Cloudflare Pages

The current `logisticsprizm.com` already resolves through Cloudflare. Point Pages at this directory:

```bash
# Build command
cd sales-site && npm install && npm run build
# Output directory
sales-site/dist
```

DNS stays on Cloudflare. Customer-portal traffic goes to `app.logisticsprizm.com` → VPS (Nginx → port 3001). Admin traffic goes to `admin.logisticsprizm.com` → VPS (port 3000). Marketing traffic goes to `logisticsprizm.com` apex → Pages.

### Alternative: same VPS as the app

```bash
cd sales-site && npm run build
rsync -avz dist/ logisticsprizm-vps:/var/www/logisticsprizm/marketing/
# Nginx already serves /var/www/logisticsprizm/marketing/ for logisticsprizm.com (see infra/nginx/)
```

### Alternative: Netlify / Vercel

Drop-in compatible. Build command `npm run build`, publish directory `dist`, no special config.

## DNS + subdomain routing (current production)

| Subdomain | Cloudflare DNS | Cloudflare proxy | Points to |
|---|---|---|---|
| `logisticsprizm.com` | Cloudflare Pages | proxied | This site (marketing) |
| `www.logisticsprizm.com` | CNAME → apex | proxied | This site |
| `app.logisticsprizm.com` | A → `187.124.84.140` | **must be proxied (orange cloud)** | Client portal (Next.js, port 3001) |
| `web.logisticsprizm.com` | A → `187.124.84.140` | proxied | Client portal (Next.js, port 3001) — alias |
| `admin.logisticsprizm.com` | A → `187.124.84.140` | proxied | Admin dashboard (Next.js, port 3000) |
| `api.logisticsprizm.com` | A → `187.124.84.140` | proxied | Express API (port 5000) |

> **Important:** all VPS-fronted subdomains MUST be Cloudflare-proxied (orange cloud). The Nginx config presents a Cloudflare Origin CA cert (`/etc/ssl/cloudflare/origin.pem`, wildcard `*.logisticsprizm.com`, valid through 2041), which is only trusted on the Cloudflare ↔ origin leg. A DNS-only (gray cloud) record on any of these subdomains will produce SSL warnings in browsers because the Origin CA is not in browser trust stores.

Update `sales-site/src/lib/links.ts` `APP_BASE` only if the customer portal moves off `app.logisticsprizm.com`.

## Next up

- [ ] Replace placeholder logo wordmarks in `LogoStrip.astro` with real customer logos once permissions are in hand.
- [ ] Wire the `/request-demo` form to the API's `/api/v1/public/demo-request` endpoint (currently stub-posting).
- [ ] Add individual solution pages: `/solutions/freight-forwarders`, `/solutions/3pl`, `/solutions/nvocc`, `/solutions/customs-brokers`.
- [ ] Add feature deep-dive pages: `/features/ai-quoting`, `/features/real-time-tracking`, `/features/financials`.
- [ ] Add blog/resources section for SEO-facing long-tail content.
- [ ] Record an MP4 screencast fallback for the hero video (bandwidth savings on mobile).
- [ ] Legal pages: `/legal/privacy`, `/legal/terms`, `/legal/security`.
- [ ] GA4 / Mixpanel event tracking on CTAs.
