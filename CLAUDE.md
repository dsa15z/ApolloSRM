# ApolloSRM — Claude Development Guidelines

---

## Claude Agent Workflow & Credentials

> This section is for Claude Code only. Credentials are stored here for session persistence.

### How This Works

- **User gives instructions in plain English.** Claude writes code, commits, pushes, and triggers Railway redeploys. User never needs to touch git or the Railway dashboard directly.
- **All code goes on branch:** `claude/rebuild-apollo-website-FU1xn`
- **Deploys are triggered automatically** by Railway on push to the branch.
- **After each meaningful feature:** commit → push → Railway auto-deploys → report status
- **Use subagents** for parallel work whenever possible (e.g., exploring codebase, building independent components simultaneously)

### Git Workflow

```bash
# All development happens on this branch
git checkout claude/rebuild-apollo-website-FU1xn

# Standard commit cycle
git add <files>
git commit -m "feat/fix/chore: description"
git push -u origin claude/rebuild-apollo-website-FU1xn
```

### Service Credentials

```
# Railway account token (for Railway GraphQL API — use with backboard.railway.app/graphql/v2)
RAILWAY_TOKEN=a29da54c-3f94-4a38-87dc-37272f2163f9

# Railway Project
RAILWAY_PROJECT_ID=b29775ae-b0bc-4fda-8fcf-4b80c67e4f70
RAILWAY_ENV_ID=3fdd23f1-dbd4-4b45-8605-48dde6ed2ac9
RAILWAY_WEB_SERVICE_ID=e801d5be-2516-4b45-a286-7e8ff8790c5f
RAILWAY_PG_SERVICE_ID=e2f8ef63-43bf-4dfb-a106-c5ff23938b00

# Database (internal Railway network — used by web service at runtime)
DATABASE_URL=postgresql://postgres:uNcfaWTfTxciUXcFDDllUrqtgdrTxaTk@postgres.railway.internal:5432/railway

# Database (public proxy — for external access if needed)
DATABASE_PUBLIC_URL=postgresql://postgres:uNcfaWTfTxciUXcFDDllUrqtgdrTxaTk@nozomi.proxy.rlwy.net:21829/railway
```

### Live URLs

- **Production app:** `web-production-e5d67.up.railway.app`
- **Railway DB (internal):** `postgres.railway.internal:5432` (db: railway)
- **Railway DB (proxy):** `nozomi.proxy.rlwy.net:21829` (db: railway)

### Railway API Usage

```bash
# Query project info
curl -sk https://backboard.railway.app/graphql/v2 \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ project(id: \"$RAILWAY_PROJECT_ID\") { name services { edges { node { id name } } } } }"}'

# Set environment variables
curl -sk https://backboard.railway.app/graphql/v2 \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { variableCollectionUpsert(input: { projectId: \"$RAILWAY_PROJECT_ID\", environmentId: \"$RAILWAY_ENV_ID\", serviceId: \"$RAILWAY_WEB_SERVICE_ID\", variables: { KEY: \"value\" } }) }"}'
```

---

## What This Is

ApolloSRM is an integrated Student Information System (SIS) + Customer Relationship Management (CRM) platform for colleges and career schools. AI-powered analytics, workflow automation, and a unified student lifecycle management system.

**Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion + Prisma v7 + Railway PostgreSQL

---

## CRITICAL DIRECTIVES

### 1. ZERO DEMO MODE

No mock data for the contact form. The contact API connects to the real PostgreSQL database. If a database connection fails, fix the connection — don't add a fallback.

### 2. BUILD WORLD-CLASS SOFTWARE

- Clean, modern UI with the space-themed dark aesthetic
- Smooth scroll-triggered animations via Framer Motion
- WCAG 2.1 AA accessibility on all components
- TypeScript strict mode
- Responsive design (mobile-first)

### 3. SCHEMA IS AUTHORITATIVE

`prisma/schema.prisma` is the source of truth. Never manually edit the database. Migrations only.

`prisma.config.ts` configures the datasource URL (Prisma v7 pattern).

### 4. SECURITY IS NON-NEGOTIABLE

- Contact form validates all inputs server-side
- Email validation before database insertion
- No PII in client-side logs
- `.env` files never committed (gitignored)

---

## Project Structure

```
/public
  /logos         Integration partner SVG logos
  favicon.svg   Site favicon
  og-image.svg  Open Graph social sharing image
/prisma
  schema.prisma  Database schema
  /migrations    SQL migration files
/src
  /app
    /api/contact  POST endpoint — saves to Railway Postgres
    /blog         Blog listing + [slug] pages
    /demo         Demo booking page (Calendly embed)
    /migration    Data migration landing page
    /privacy      Privacy policy
    /security     Security & compliance trust page
    layout.tsx    Root layout (fonts, meta, i18n provider, analytics)
    page.tsx      Homepage (assembles all sections)
    loading.tsx   Loading skeleton
    sitemap.ts    Dynamic sitemap
    robots.ts     robots.txt
  /components
    Navbar.tsx         Fixed nav with mobile menu + language switcher
    Hero.tsx           Animated hero with star field
    Features.tsx       6 product module cards
    ProductDemo.tsx    Mock dashboard UI
    WhyChooseUs.tsx    4 differentiators
    AISection.tsx      Apollo Intelligence showcase
    Workflow.tsx       4-step student lifecycle
    Integrations.tsx   Partner logos grid
    Pricing.tsx        3-tier pricing table
    Testimonials.tsx   3 quote cards
    About.tsx          Founder credentials
    ROICalculator.tsx  Interactive savings calculator
    FAQ.tsx            Accordion with 8 questions
    Contact.tsx        Form with Prisma submission
    Footer.tsx         Multi-column footer
    Logo.tsx           Custom SVG logo component
    Analytics.tsx      Plausible analytics (opt-in)
    PageTransition.tsx Page enter animation
  /lib
    prisma.ts          Prisma client singleton
    blog-posts.ts      Blog post content
    /i18n
      en.ts            English dictionary
      es.ts            Spanish dictionary
      index.ts         Locale utilities
      context.tsx      React context provider
  /generated/prisma    Auto-generated Prisma client (gitignored)
```

---

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `DATABASE_URL` | Railway PostgreSQL | Contact form submissions |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible Analytics | Optional — analytics tracking |

---

## Deploying

### Railway (web app + database)

- **Web service** auto-deploys on push to `claude/rebuild-apollo-website-FU1xn`
- **Pre-deploy command:** `npx prisma migrate deploy` (runs migrations)
- **Build command:** `prisma generate && next build`
- **Start command:** `npm start`
- **Domain:** `web-production-e5d67.up.railway.app`

### Database Migrations

```bash
# Create new migration locally
npm run db:migrate

# Deploy migrations (runs automatically on Railway build)
npm run db:deploy

# Push schema without migration files
npm run db:push
```

---

## i18n — CRITICAL: Keep Spanish in Sync

**The site supports English (en) and Spanish (es).** Both dictionaries MUST stay in sync at all times.

### Rules

0. **USE LATIN AMERICAN SPANISH (not Spain/Castilian Spanish).** Target audience is Latin America. Use "ustedes" not "vosotros", "computadora" not "ordenador", "celular" not "móvil", etc.
1. **NEVER add English-only text to a component.** All user-facing strings go through `useI18n()` and the dictionary files.
2. **When adding/changing ANY text**, update BOTH files:
   - `src/lib/i18n/en.ts` — English dictionary
   - `src/lib/i18n/es.ts` — Spanish dictionary
3. **When adding a new component section**, add the corresponding key group to both dictionaries FIRST, then wire the component.
4. **When modifying existing text**, update the translation in es.ts to match the new meaning.
5. **Test both languages** by toggling the language switcher in the navbar before committing.

### How It Works

- `src/lib/i18n/en.ts` — English dictionary (source of truth for key structure)
- `src/lib/i18n/es.ts` — Spanish dictionary (must match all keys from en.ts)
- `src/lib/i18n/context.tsx` — React context provider with `useI18n()` hook
- Components import `useI18n` and use `t.section.key` for all text
- Language switcher in Navbar toggles between locales

### Dictionary Structure

Keys are grouped by component/section:
```
t.nav.*           — Navigation
t.hero.*          — Hero section
t.features.*      — Features section
t.productDemo.*   — Product demo dashboard
t.whyChooseUs.*   — Why choose us
t.ai.*            — AI section
t.workflow.*      — Workflow steps
t.integrations.*  — Integrations section
t.pricing.*       — Pricing plans
t.testimonials.*  — Testimonials
t.about.*         — About section
t.roi.*           — ROI calculator
t.faq.*           — FAQ section
t.contact.*       — Contact form
t.footer.*        — Footer
```

---

## Before Every Commit

- [ ] `npx next build` completes without errors
- [ ] New pages have proper `<Metadata>` exports
- [ ] New components use Framer Motion for scroll animations
- [ ] Form inputs have proper `id`, `name`, `label` attributes (a11y)
- [ ] No hardcoded secrets or connection strings
- [ ] SVG logos are in `/public/logos/` and use viewBox for scalability
- [ ] **All user-facing text uses `t.*` from i18n — no hardcoded English**
- [ ] **Spanish translations in es.ts match all new/changed keys in en.ts**

---

## UI/UX Standards

**Design system:**
- Dark navy background (`#031225`)
- Apollo blue primary (`#2794EB`)
- Space/mission theme throughout
- Glass-morphism card effects (`bg-white/[0.02] border border-white/5`)
- Gradient text for emphasis (`.gradient-text`)
- Glow effects on CTAs (`.glow`, `.glow-strong`)

**Required in every section:**
- Scroll-triggered entrance animation (Framer Motion `whileInView`)
- Section label (uppercase, tracking-widest, apollo-400 color)
- Responsive layout (works on mobile, tablet, desktop)

**Color tokens (defined in globals.css @theme):**
- `navy-950` through `navy-600` — backgrounds
- `apollo-50` through `apollo-500` — brand blues
- Gray scale — text hierarchy
