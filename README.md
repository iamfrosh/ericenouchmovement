# Eric Enoch Movement: Website

Next.js (App Router) · TypeScript (strict) · Tailwind CSS 4 · Lucide icons · Sanity CMS · Resend email.

## Run locally
```bash
npm install
cp .env.example .env.local   # fill in values (all optional for a first run)
npm run dev                  # http://localhost:3000
```
Without CMS keys the site runs and shows designed empty states for leadership, news and gallery.

## Checks
```bash
npm run lint && npm run typecheck && npm run build
```

## 1. CMS setup (Sanity)
1. Create a project at sanity.io and a dataset (`production`).
2. Create a Studio (`npm create sanity@latest`) and copy `sanity/schemaTypes/` into it, then register `schemaTypes`.
3. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`.
4. Editors tick **published** on a document to make it live. Drafts and unticked documents never appear.
5. Optional instant updates: add a Sanity webhook (on publish) to `POST https://YOUR-SITE/api/revalidate?secret=SANITY_REVALIDATE_SECRET&tag=articles` (also `leaders`, `gallery`). Otherwise content refreshes within 5 minutes.
6. Keep the dataset public-read for published content, or set `SANITY_API_READ_TOKEN` (server only).

Add or edit leaders in the Studio only. The directory, filters, profile pages and sitemap update automatically.

## 2. Contact form email (Resend)
Create a Resend account, verify the sending domain, then set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
Until set, the form returns a clear "cannot be sent right now" message. Rate limit is in-memory (5 per 10 min per IP); use a shared store such as Upstash for multi-instance hosting.

## 3. Cookies and analytics
Consent banner with Essential / Analytics / Preferences. Analytics (Google tag, `NEXT_PUBLIC_GA_ID`) loads only after the visitor accepts. "Cookie settings" in the footer reopens choices.

## 4. Deploy (Vercel)
Import the repo, add the environment variables from `.env.example`, set `NEXT_PUBLIC_SITE_URL` to the live domain, deploy. Then submit `/sitemap.xml` in Google Search Console.

## Must be supplied by the movement before launch
- Official contact email, phone, office address, social links (env vars)
- Confirmed leadership structure, names, roles, photographs, approved bios
- Real news and gallery photographs (with alt text)
- Confirmation of the proposed core values on About
- Hero photograph (optional; the hero currently uses the logo panel)
- Review of the draft Privacy & Cookie Policy
- Organisational history, only if verified

## Structure
`src/app` routes · `src/components` (layout, home, leadership, news, gallery, ui) · `src/lib` (cms, site content, validation, consent) · `sanity/` schemas.
Official vision and mission text lives in `src/lib/site.ts`.
