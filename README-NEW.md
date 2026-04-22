# OmniCart

OmniCart is a modern ecommerce platform built for clean product discovery, fast browsing, and a polished shopping experience. It combines a marketplace-style storefront with account flows, category navigation, product actions, and a database-ready architecture for local development or deployment.

## Key Features

### Storefront Experience
- Clean shopping homepage with a single unified header
- Clickable category browsing for faster product discovery
- Search-ready marketplace layout
- Product preview panel with image, title, description, pricing, and stock display
- `Add to cart` and `Buy now` actions in the product view

### Account Flow
- Google-based authentication with Auth.js
- Dedicated sign-in and sign-up pages
- Customer dashboard with profile and product recommendations
- Session-ready account handling for protected pages

### Data Layer
- PostgreSQL with Prisma for products, users, accounts, and orders
- MongoDB support for audit-style and event-based data
- Local catalog support with seeded products
- External ecommerce product/category fallback support

### UI & Design
- Modern responsive layout across desktop and mobile
- Strong marketplace-inspired interface with premium card layouts
- Cleaner content structure with reduced unnecessary text
- Custom branding, gradients, and image-driven merchandising

## Project Structure

### App
- `app/page.tsx` - main storefront entry
- `app/dashboard/page.tsx` - customer dashboard
- `app/auth/signin/page.tsx` - sign-in page
- `app/auth/signup/page.tsx` - sign-up page

### API
- `app/api/products/route.ts` - products API
- `app/api/categories/route.ts` - categories API
- `app/api/auth/[...nextauth]/route.ts` - authentication route

### Components
- `components/storefront/home-client.tsx` - homepage shopping UI
- `components/layout/site-header.tsx` - global header
- `components/layout/site-footer.tsx` - global footer
- `components/auth/auth-actions.tsx` - auth actions UI

### Data & Config
- `prisma/schema.prisma` - Prisma schema
- `prisma/seed.mjs` - product seed data
- `lib/products.ts` - product and category data layer
- `lib/postgres.ts` - Prisma client setup
- `lib/mongodb.ts` - MongoDB connection

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Auth.js
- Prisma
- PostgreSQL
- MongoDB

## Overview

OmniCart is designed as a clean ecommerce base that can grow into a full shopping platform with cart persistence, checkout, order management, admin controls, and richer inventory flows. It is structured for local development first and can be connected to hosted infrastructure later without changing the overall app architecture.
