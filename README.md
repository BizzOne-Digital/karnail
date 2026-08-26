# Sukh D. H. Khokhar — Mystery Art

Single Next.js app for **one GitHub repo + one Vercel project**. Website and API run together — no separate backend deploy.

## Structure

```
Karnail/
├── src/app/          # Next.js pages
├── src/app/api/      # API routes (Express + uploads)
├── src/server/       # Express API logic
├── src/models/       # MongoDB models
├── public/           # Static files
├── .env              # All environment variables (one file)
└── package.json
```

## Quick Start

```bash
npm install
cp .env.example .env    # edit MongoDB URI + secrets
npm run seed            # create admin user + sample data
npm run dev             # http://localhost:3000
```

## Vercel Deploy (single project)

1. Push repo to GitHub
2. Vercel → **New Project** → import repo
3. Root directory: **`.`** (repo root)
4. Framework: **Next.js** (auto-detected)
5. Add these env vars in Vercel dashboard:

| Variable | Example |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-app.vercel.app` |
| `MONGODB_URI` | `mongodb+srv://...` |
| `JWT_SECRET` | long random string |
| `COOKIE_SECRET` | long random string |
| `ADMIN_SEED_EMAIL` | `admin@sukhkhokharmysteryart.com` |
| `ADMIN_SEED_PASSWORD` | your password |
| `SMTP_*` | email settings (optional) |
| `ADMIN_NOTIFICATION_EMAIL` | your email |

6. Deploy. Run `npm run seed` locally once (or via Vercel CLI) to seed database.

**Admin login:** `https://your-app.vercel.app/admin/login`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run seed` | Seed MongoDB |

## Default Admin

- Email: `admin@sukhkhokharmysteryart.com`
- Password: `ChangeMe123!` (change in `.env` before seed)
