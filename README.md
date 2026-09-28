# The Marketing & Sales Engine

Flora Mutahi's 12-gate Marketing & Sales Engine — an AI brain that guides teams from Growth Gap to Measure & Improve


## Supabase Setup

In your Supabase project's SQL editor, run, in order:
1. `supabase-schema.sql` — creates the tables
2. `supabase-policies.sql` — grants the server-side anon key access (RLS is enabled with no policies by default, which blocks every query until this runs)
3. `supabase-content-schema.sql` — adds `content_conversations`, used by Create mode (see below). Safe to run any time after the first two; Create mode degrades gracefully (no history restore) if you skip it.

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
│   ├── chat.js           # Vercel serverless — the 12-gate flow: proxies to Anthropic, persists conversation + gate progress
│   ├── create.js         # Vercel serverless — Create mode: on-demand content grounded in a company's locked standards
│   ├── company.js        # Vercel serverless — finds/creates a company, restores its state, handles reset
│   └── audit.js          # Vercel serverless — resolves a flagged standards deviation
├── lib/
│   ├── supabase.js         # Supabase client helper
│   ├── slugify.js          # Shared company-name → slug helper
│   ├── gates.js            # Shared GATE_NAMES, used by both chat.js and create.js
│   └── company-research.js # Per-company research seeds (e.g. Melvins Tea shopper personas)
├── public/
│   └── index.html        # The frontend — gate flow + Create mode
├── package.json
├── vercel.json
├── supabase-schema.sql         # Database schema
├── supabase-policies.sql       # RLS policies (run after the schema)
├── supabase-content-schema.sql # Create mode's content_conversations table (run after the above)
└── README.md
```

## How persistence works

The browser never talks to Supabase directly — the anon key lives only as a server-side env var. `api/company.js` finds-or-creates a `companies` row by slug and returns its `gate_outputs`, `conversations` and `content_conversations` so a company's progress survives a refresh. `api/chat.js` writes each gate-flow turn to `conversations`, and when the model's reply signals a gate is complete, upserts `gate_outputs` to mark it complete and open the next gate. When a reply contradicts an already-locked Section 1 standard, it's written to `audit_log` and surfaced in the sidebar as a standards flag; `api/audit.js` resolves a flag once someone's dealt with it.

## Create mode: training and content generation as one thing

Section 1 (Gates 0–6) produces a locked truth about a company — its persona, positioning, offer and message architecture. Create mode (`api/create.js`) is a second, staff-facing way into that same truth: anyone in the group picks a company and asks for a poster headline, a caption, a WhatsApp broadcast, a shelf talker, a sales line — anything — and gets it back grounded in whatever's locked so far, with a short "why this works" line naming the standard it drew on. That explanation is the training mechanism — staff learn the brand standard by watching it applied to their own real requests, across every company in the group, without a separate course to maintain.

Two things it never does: pretend an unlocked gate is settled (it says so plainly and gives a labeled draft instead), or quietly go along with a request that contradicts a locked standard (it flags it the same way the gate flow does, into the same `audit_log`).

## What it does

- 12 gated stages, Section 1 (Build the Asset) locked, Section 2 (Use the Asset) open
- AI challenges shallow answers, refuses to skip gates
- Create mode: on-demand, on-brand content for any staff member, grounded in each company's locked standards
- Red/Amber/Green governance per Flora's framework
- Conversation history per company, for both the gate flow and Create mode
- Gate progress tracking
- Standards-deviation flagging, from either the gate flow or Create mode
