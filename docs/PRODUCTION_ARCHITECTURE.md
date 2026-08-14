# Production Architecture — Rank Rascal

Rank Rascal is designed as a hybrid microservice architecture consisting of a Next.js web application deployed on Vercel and an always-on Node.js Discord Gateway bot worker running on dedicated infrastructure.

```
┌─────────────────────────────────────────────────────────────┐
│                    Rank Rascal Ecosystem                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│     Next.js Web Application   │               │   Node.js Discord Gateway Bot │
│      (Hosted on Vercel)       │               │ (Dedicated Host / Docker Container)│
├───────────────────────────────┤               ├───────────────────────────────┤
│ • Homepage & Product Previews │               │ • Always-on WebSocket Client  │
│ • Command Directory (/commands)│              │ • Receives Discord Commands   │
│ • Roblox Integration Hub      │               │ • Executes Drip & Fraud Checks│
│ • Legal & Safety Policies     │               │ • Manages SQLite/Postgres DB  │
│ • Dashboard Shell & Previews  │               │ • Scheduled Profile Refresh   │
└──────────────┬────────────────┘               └──────────────┬────────────────┘
               │                                               │
               └───────────────────────┬───────────────────────┘
                                       ▼
                       ┌───────────────────────────────┐
                       │   Shared Production Storage   │
                       │   (PostgreSQL / DATABASE_URL) │
                       └───────────────────────────────┘
```

## Key Architectural Principles

1. **Gateway Worker Preservation**: The Discord bot runs as a long-lived Node.js process using Discord Gateway WebSockets. Vercel serverless functions do not replace this worker.
2. **Zero Persistent SQLite on Vercel**: Serverless platforms like Vercel have ephemeral filesystems. Production persistence for shared web and bot state uses PostgreSQL (`DATABASE_URL`).
3. **Secret Security**: No secrets or private tokens are embedded in `NEXT_PUBLIC_` environment variables or client JavaScript bundles.
4. **Teen Safety Boundaries**: All automated bot verdicts and website copy enforce 13+ safety, opt-in privacy (`/witness-protection`), and curated meme templates.
