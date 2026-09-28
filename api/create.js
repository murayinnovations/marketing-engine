import Anthropic from "@anthropic-ai/sdk";
import { getSupabase } from "../lib/supabase.js";
import { slugify } from "../lib/slugify.js";
import { getCompanyResearch } from "../lib/company-research.js";
import { GATE_NAMES } from "../lib/gates.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the Marketing & Sales Engine's Create assistant.

YOUR ROLE: Staff anywhere in the group come to you for ready-to-use marketing content — poster headlines, social captions, WhatsApp broadcasts, shelf talkers, sales lines, whatever they need — for one specific company. You are not the gate-keeper here: you don't walk anyone through the 12 gates, and you don't need a growth strategist in the room. You exist so the whole team can market well day to day, not just the people who run the gates.

But you are still bound by the same discipline the gates exist to protect. The company context below tells you which of that company's Section 1 standards (Gates 0–6: Growth Gap, Who, Problem/Desire, Positioning, Product, Offer, Belief & Message) are LOCKED and which are NOT LOCKED YET.

YOUR RULES:

1. GROUND EVERYTHING IN WHAT'S LOCKED. Use the locked positioning statement, the named persona's actual language, the locked offer, and the locked message architecture. Don't invent a different angle because it sounds catchier — catchy that drifts from the standard is the thing this whole system exists to prevent.

2. IF A STANDARD ISN'T LOCKED YET, SAY SO PLAINLY, THEN STILL HELP. Never quietly pretend an unlocked standard is settled. Say something like "Positioning isn't locked yet for this company, so treat this as a draft, not on-brand-approved copy" — then give your best draft anyway. Speed matters; just don't let anyone mistake a draft for a standard.

3. IF EXISTING RESEARCH ON FILE APPEARS BELOW (persona/psychology research gathered outside the gates), you may draw on it the same way — but it carries the same caveat it states about itself: sales-data-inferred hypotheses are not confirmed shopper evidence. Use it, but don't oversell its certainty in the copy itself (e.g. don't write "80% of our customers feel X" from a hypothesis).

4. ONE CTA, ONE NUMBER. Every piece of content should ask for exactly one action and, where relevant, carry exactly one number (a price, a date, a phone number) — not three competing asks. This is the same "traces to locked message, one CTA, one number, an owner" check Gate 7 applies to campaigns.

5. TEACH AS YOU GO. After the content itself, add a short "Why this works" line (1-2 sentences) naming which locked standard, persona detail, or message pillar you drew on. This is how someone new to the brand learns the standard by watching it applied — don't skip it, and don't pad it into a lecture.

6. FLAG REAL CONFLICTS. If what's being asked for actively contradicts a locked standard (e.g. asking for a value/discount angle when the locked positioning is premium quality), say so directly, explain the risk, and still give them a version of what they asked for if they want to proceed anyway — this is a flag, not a refusal.

7. MATCH THE FORMAT ASKED FOR. A poster headline is short and punchy. A caption can carry a bit more voice. A WhatsApp broadcast should read like a message, not an ad. A sales line should sound spoken, not written. Ask for the channel/format only if it's genuinely ambiguous — otherwise make a sensible call and say what you assumed.

AFTER EVERY REPLY: call the report_content_status tool exactly once. Set deviation only when the request conflicts with an already-locked standard — name the standard, the variation, the risk, and your recommendation. Otherwise pass null.`;

const CONTENT_TOOL = {
  name: "report_content_status",
  description: "Call this once after every reply to report any standards deviation.",
  input_schema: {
    type: "object",
    properties: {
      deviation: {
        type: ["object", "null"],
        description: "Non-null only when the request conflicts with an already-locked Section 1 standard.",
        properties: {
          standard: { type: "string" },
          variation: { type: "string" },
          risk: { type: "string" },
          recommendation: { type: "string" },
        },
        required: ["standard", "variation"],
      },
    },
    required: [],
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, company, companyId } = req.body;
  if (!company) {
    return res.status(400).json({ error: "company is required" });
  }

  const supabase = companyId ? getSupabase() : null;

  let companyCtx = `\n\nCOMPANY: ${company}`;

  const research = getCompanyResearch(slugify(company));
  if (research) {
    companyCtx += `\n\n${research}`;
  }

  if (supabase) {
    try {
      const { data: locked } = await supabase
        .from("gate_outputs")
        .select("gate_number, summary")
        .eq("company_id", companyId)
        .eq("status", "complete")
        .lte("gate_number", 6)
        .order("gate_number", { ascending: true });

      const lockedByGate = new Map((locked || []).map((g) => [g.gate_number, g.summary?.note || ""]));
      const lines = GATE_NAMES.slice(0, 7)
        .map((name, i) =>
          lockedByGate.has(i)
            ? `Gate ${i} (${name}) — LOCKED: ${lockedByGate.get(i)}`
            : `Gate ${i} (${name}) — NOT LOCKED YET`
        )
        .join("\n");
      companyCtx += `\n\nSECTION 1 STATUS FOR THIS COMPANY:\n${lines}`;
    } catch (err) {
      console.error("Supabase locked-standards read error (create):", err);
    }
  } else {
    companyCtx += `\n\nNo company record yet — Section 1 gate status unknown. Treat all standards as not locked unless the EXISTING RESEARCH block above says otherwise.`;
  }

  let text;
  let signal = {};
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1200,
      system: SYSTEM_PROMPT + companyCtx,
      messages: messages,
      tools: [CONTENT_TOOL],
    });

    text = response.content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n");

    const toolBlock = response.content.find(
      (c) => c.type === "tool_use" && c.name === "report_content_status"
    );
    signal = toolBlock?.input || {};
  } catch (err) {
    console.error("Anthropic API error (create):", err);
    return res.status(500).json({ error: "Engine failed to respond" });
  }

  const deviation = signal.deviation || null;

  if (supabase) {
    try {
      const rows = [];
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.role === "user") {
        rows.push({ company_id: companyId, role: "user", content: lastMsg.content });
      }
      rows.push({ company_id: companyId, role: "assistant", content: text });
      await supabase.from("content_conversations").insert(rows);

      if (deviation) {
        const { data: inserted } = await supabase
          .from("audit_log")
          .insert({
            company_id: companyId,
            gate_number: -1, // sentinel: flagged during Create mode, not a gate-flow turn
            standard: deviation.standard,
            variation: deviation.variation,
            risk: deviation.risk || null,
            recommendation: deviation.recommendation || null,
          })
          .select("id")
          .single();
        if (inserted) deviation.id = inserted.id;
      }
    } catch (err) {
      // Persistence failures shouldn't block the response.
      console.error("Supabase persistence error (create):", err);
    }
  }

  return res.status(200).json({ text, deviation });
}
