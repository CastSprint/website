# CastSprint website

Official standalone website for CastSprint, built with Next.js 16 App Router, strict TypeScript, Tailwind CSS, Radix UI, MDX, next-themes, Lucide, and Motion.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Content and downloads

Documentation content lives in `src/content`. Route data and verified external links are centralized in `src/lib/site.ts`. Download cards remain non-actionable until official GitHub release assets exist. Verify platform, architecture, size, requirements, release date, and checksum before adding an asset URL.

## Deployment

Import this repository into Vercel with the Next.js preset and set `NEXT_PUBLIC_SITE_URL` to the verified production origin. Configure a custom domain only after ownership is confirmed. Preview deployments require no secrets. CI runs lint, strict TypeScript checks, and a production build.
