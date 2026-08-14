# Rank Rascal Website Setup & Local Development

This guide explains how to run the Next.js production website (`apps/web`) alongside the Node.js Discord Gateway bot.

## Prerequisites

- Node.js 22.5+ or 24+
- npm 10+
- Discord Application & Bot token
- Roblox OAuth Application Client ID & Secret

## Workspace Architecture

```
rank-rascal/
├── apps/web/              # Next.js App Router Vercel Website
│   ├── app/               # Routes, Layouts & API stubs
│   ├── components/        # Reusable UI components
│   ├── public/brand/      # Brand assets, logos, mascot poses
│   └── package.json       # Next.js dependencies
├── src/                   # Node.js Discord Gateway Bot worker
├── brand/                 # Source brand assets & vector books
├── docs/                  # Deployment & portal documentation
└── package.json           # Root workspace configuration
```

## Running the Website Locally

1. Navigate to the workspace root and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables for `apps/web`:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```
   Set `NEXT_PUBLIC_SUPPORT_EMAIL` to your support email address.

3. Launch the Next.js development server:
   ```bash
   npm run dev --workspace=apps/web
   ```
   Open `http://localhost:3000` in your browser.

4. Run local type checks & builds:
   ```bash
   npm run check
   npm run build
   ```
