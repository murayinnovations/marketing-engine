-- Marketing & Sales Engine — Create mode
-- Run this once in your Supabase SQL editor, after supabase-schema.sql and
-- supabase-policies.sql have already been applied.

CREATE TABLE content_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_content_conversations_company ON content_conversations(company_id);

-- Deviations flagged during Create mode land in the existing audit_log table
-- with gate_number = -1 (a sentinel meaning "flagged outside the gate flow" —
-- audit_log has no CHECK constraint restricting gate_number, unlike gate_outputs).

ALTER TABLE content_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Server access - content_conversations" ON content_conversations
  FOR ALL USING (true) WITH CHECK (true);
