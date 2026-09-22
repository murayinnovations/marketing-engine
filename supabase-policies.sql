-- Marketing & Sales Engine — RLS policies
-- Run this AFTER supabase-schema.sql.
--
-- These tables are only ever read/written by our own Vercel serverless
-- functions (api/company.js, api/chat.js) using the Supabase anon key,
-- which is kept server-side as an environment variable and never shipped
-- to the browser. There is no per-end-user auth model in this app, so a
-- single permissive policy per table is appropriate here.

CREATE POLICY "Server access - companies" ON companies
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Server access - gate_outputs" ON gate_outputs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Server access - conversations" ON conversations
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Server access - audit_log" ON audit_log
  FOR ALL USING (true) WITH CHECK (true);
