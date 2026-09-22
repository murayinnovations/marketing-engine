-- Marketing & Sales Engine — Supabase schema

-- Companies registered in the engine
CREATE TABLE companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Gate outputs (the locked standards)
CREATE TABLE gate_outputs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  gate_number INT NOT NULL CHECK (gate_number BETWEEN 0 AND 11),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'complete', 'locked')),
  summary JSONB,           -- structured output approved at this gate
  approved_by TEXT,        -- who signed off
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(company_id, gate_number)
);

-- Conversation history per company
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  gate_number INT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Audit log: when someone deviates from a locked standard
CREATE TABLE audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  gate_number INT NOT NULL,
  standard TEXT NOT NULL,
  variation TEXT NOT NULL,
  risk TEXT,
  recommendation TEXT,
  flagged_at TIMESTAMPTZ DEFAULT now(),
  resolved BOOLEAN DEFAULT false,
  resolved_by TEXT,
  resolved_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_gate_outputs_company ON gate_outputs(company_id);
CREATE INDEX idx_conversations_company_gate ON conversations(company_id, gate_number);
CREATE INDEX idx_audit_company ON audit_log(company_id);

-- RLS (enable per your auth setup)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE gate_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
