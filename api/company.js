import { getSupabase } from "../lib/supabase.js";

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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

    const [{ data: gates, error: gatesErr }, { data: convos, error: convosErr }] =
      await Promise.all([
        supabase
          .from("gate_outputs")
          .select("gate_number, status")
          .eq("company_id", company.id),
        supabase
          .from("conversations")
          .select("role, content, created_at")
          .eq("company_id", company.id)
          .order("created_at", { ascending: true }),
      ]);
    if (gatesErr) throw gatesErr;
    if (convosErr) throw convosErr;

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
    });
  } catch (err) {
    console.error("Company API error:", err);
    return res.status(500).json({ error: "Could not load company" });
  }
}
