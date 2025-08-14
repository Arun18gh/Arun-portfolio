# Arun Sudhakar — Portfolio (Next.js + Tailwind + Framer Motion)

## Requirements
- Node 18+
- MongoDB Atlas connection string (for the contact form)

## Quick Start
```bash
npm install
cp .env.local.example .env.local   # or create it and add MONGODB_URI
npm run dev
```
Open http://localhost:3000

## .env.local
```
MONGODB_URI=your_atlas_uri
# Optional email
MAIL_HOST=
MAIL_PORT=587
MAIL_USER=
MAIL_PASS=
CONTACT_TO=arunsudhakar.ie@gmail.com
```

## Deploy (Vercel)
- Import repo into Vercel
- Add `MONGODB_URI` to project Environment Variables
- Deploy

## Project Structure
- `app/(site)` — pages (home, projects, certificates, contact)
- `app/api` — API routes (`/api/contact`, `/api/health`)
- `components` — UI building blocks (Hero, Navbar, Cards, Marquee, Timeline, etc.)
- `content` — editable data (profile, skills, projects, certificates, experience)
- `lib` — db/mail/schemas/utils
- `public/images` — portraits, project screenshots, certificate images

## Add Sections
- **Skills ticker**: use `<Marquee items={ticker} />`
- **Experience timeline**: use `<Timeline items={timeline} />`


