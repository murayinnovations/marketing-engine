# The Marketing & Sales Engine

Flora Mutahi's 12-gate Marketing & Sales Engine — an AI brain that guides teams from Growth Gap to Measure & Improve


## Supabase Setup

In your Supabase project's SQL editor, run, in order:
1. `supabase-schema.sql` — creates the tables
2. `supabase-policies.sql` — grants the server-side anon key access (RLS is enabled with no policies by default, which blocks every query until this runs)

## Local development

1. `npm install`
2. `npm install -g vercel` (one-time, if you don't have it)
3. Copy `.env.example` to `.env.local` and fill in your keys
4. `vercel dev` — serves the frontend and the `/api` routes together at `http://localhost:3000`

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Import in Vercel
3. Add environment variables (Project Settings → Environment Variables):
   - `ANTHROPIC_API_KEY` — your Anthropic API key
   - `SUPABASE_URL` — your Supabase project URL
   - `SUPABASE_ANON_KEY` — your Supabase anon key
4. Deploy

## Structure

```
├── api/
│   ├── chat.js           # Vercel serverless — proxies to Anthropic, persists conversation + gate progress
│   └── company.js        # Vercel serverless — finds/creates a company, restores its state, handles reset
├── lib/
│   └── supabase.js       # Supabase client helper
├── public/
│   └── index.html        # The frontend
├── package.json
├── vercel.json
├── supabase-schema.sql   # Database schema
├── supabase-policies.sql # RLS policies (run after the schema)
└── README.md
```

## How persistence works

The browser never talks to Supabase directly — the anon key lives only as a server-side env var. `api/company.js` finds-or-creates a `companies` row by slug and returns its `gate_outputs` + `conversations` so a company's progress survives a refresh. `api/chat.js` writes each turn to `conversations`, and when the model's reply signals a gate is complete, upserts `gate_outputs` to mark it complete and open the next gate. The `audit_log` table exists in the schema for tracking deviations from locked standards but isn't wired up yet — a natural next step.

## What it does

- 12 gated stages, Section 1 (Build the Asset) locked, Section 2 (Use the Asset) open
- AI challenges shallow answers, refuses to skip gates
- Red/Amber/Green governance per Flora's framework
- Conversation history per company
- Gate progress tracking
