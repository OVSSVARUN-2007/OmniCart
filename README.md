# OmniCart

OmniCart is a marketplace-style ecommerce demo built with Next.js, TypeScript, Tailwind CSS, Auth.js, JWT sessions, Prisma/PostgreSQL, MongoDB, and API-fed product cards.

## What Changed

- Google OAuth login and signup
- Missing `AUTH_SECRET` crash fixed for local development with a safe fallback
- Marketplace-style storefront UI with brighter, more practical discovery sections
- PostgreSQL schema added through Prisma for users, accounts, orders, and products
- MongoDB connection and audit-log model added for event-oriented data
- Product catalog now supports external API images and fallback demo records
- Security middleware adds CSP and common hardening headers
- Dashboard popup remains in place to clarify this is a demo project

## Environment

Copy `.env.example` to `.env.local` and set:

```bash
AUTH_SECRET=
AUTH_URL=http://localhost:3000
APP_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/omnicart
MONGODB_URI=mongodb://127.0.0.1:27017/omnicart
```

## Database

Generate Prisma client and run your PostgreSQL migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

MongoDB is used through `MONGODB_URI` for audit/event-style collections.

## Run

```bash
npm install
npm run dev
```

## Verification

The current project passes:

```bash
npm run typecheck
npm run build
```
