import { getSupabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.body || {};
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from("audit_log")
      .update({ resolved: true, resolved_at: new Date().toISOString() })
      .eq("id", id);
    if (error) throw error;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Audit API error:", err);
    return res.status(500).json({ error: "Could not resolve flag" });
  }
}
