import { getSupabase } from "../lib/supabase.js";
import { slugify } from "../lib/slugify.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, reset } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Company name is required" });
  }

  const slug = slugify(name);
  const supabase = getSupabase();

  try {
    if (reset) {
      // Cascades to gate_outputs / conversations / audit_log via FK.
      await supabase.from("companies").delete().eq("slug", slug);
    }

    let { data: company, error: findErr } = await supabase
      .from("companies")
      .select("id, name, slug")
      .eq("slug", slug)
      .maybeSingle();
    if (findErr) throw findErr;

    if (!company) {
      const { data: created, error: insErr } = await supabase
        .from("companies")
        .insert({ name, slug })
        .select("id, name, slug")
        .single();
      if (insErr) throw insErr;
      company = created;
    }

    const [
      { data: gates, error: gatesErr },
      { data: convos, error: convosErr },
      { data: auditFlags, error: auditErr },
    ] = await Promise.all([
      supabase
        .from("gate_outputs")
        .select("gate_number, status")
        .eq("company_id", company.id),
      supabase
        .from("conversations")
        .select("role, content, created_at")
        .eq("company_id", company.id)
        .order("created_at", { ascending: true }),
      supabase
        .from("audit_log")
        .select("id, gate_number, standard, variation, risk, recommendation, flagged_at")
        .eq("company_id", company.id)
        .eq("resolved", false)
        .order("flagged_at", { ascending: false }),
    ]);
    if (gatesErr) throw gatesErr;
    if (convosErr) throw convosErr;
    if (auditErr) throw auditErr;

    // Separate, non-fatal: content_conversations only exists once
    // supabase-content-schema.sql has been run. Don't break company load
    // for setups that haven't applied it yet.
    let contentConvos = [];
    try {
      const { data, error } = await supabase
        .from("content_conversations")
        .select("role, content, created_at")
        .eq("company_id", company.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      contentConvos = data || [];
    } catch (err) {
      console.error("content_conversations read error (has supabase-content-schema.sql been run?):", err);
    }

    const gateStatus = {};
    let maxComplete = -1;
    let activeGate = null;
    (gates || []).forEach((g) => {
      gateStatus[g.gate_number] = g.status;
      if (g.status === "complete") maxComplete = Math.max(maxComplete, g.gate_number);
      if (g.status === "active") activeGate = g.gate_number;
    });
    const currentGate = activeGate !== null ? activeGate : Math.min(maxComplete + 1, 11);

    return res.status(200).json({
      id: company.id,
      name: company.name,
      slug: company.slug,
      currentGate,
      gateStatus,
      messages: (convos || []).map((c) => ({ role: c.role, content: c.content })),
      contentMessages: contentConvos.map((c) => ({ role: c.role, content: c.content })),
      auditFlags: auditFlags || [],
    });
  } catch (err) {
    console.error("Company API error:", err);
    return res.status(500).json({ error: "Could not load company" });
  }
}
