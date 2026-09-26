// Pre-existing research handed to the Engine before a company's gates are run.
// This is evidence the team already has — NOT a shortcut past the gates. It gets
// injected into the system prompt so the AI can ground Gate 1/2/6 questions in real
// data instead of starting from zero, while still applying the same evidence bar
// (challenge hypotheses, ask what's validated vs. inferred, flag open questions).

const RESEARCH = {
  "melvins-tea": `
EXISTING RESEARCH ON FILE FOR THIS COMPANY (compiled September 2026, from Naivas modern-trade
sales data + Siena and Single World general-trade secondary sales data — NOT a shopper survey).
This is a strong starting point for Gates 1, 2 and 6 — use it instead of asking from scratch —
but it is sales/distribution data, not shopper research. Gender, motivation and psychology below
are REASONED HYPOTHESES inferred from pack mix and store location, not confirmed by talking to
shoppers. Treat this the same way you'd treat any team's evidence: press on what's actually
confirmed versus assumed, and don't let it get locked as a Gate 1/2 standard until the open
questions below are resolved.

THREE CANDIDATE PERSONAS (modern trade + general trade):

1. MARY, the Household Manager — core buyer, ~2/3 of modern-trade (Naivas) sales, buyer in
   mainstream stores (Utawala, Buruburu, Kasarani, Rongai, Nakuru, Kisumu). Woman, ~28-45,
   household income ~KES 50,000-150,000/mo, comfortable but budget-aware. Buys Ginger/Masala
   250g-500g on the monthly payday shop as a pantry staple, plus a box of Hibiscus for herself.
   Job to be done: run a good home without extra effort — the pot of chai reflects on her as a
   mother and host; ginger also carries a home-remedy meaning inherited from her mother/grandmother.
   The Hibiscus box is self-care she feels "allowed" to buy because it's framed as a health habit,
   not an indulgence. Barriers: price rises (she trades down pack size, not brand — when the 250g
   got ~8% more expensive she switched to 100g rather than leave Melvins); stock-outs (she won't
   go to another store, she'll grab whatever brand is beside the gap); doubt is a live issue only
   for the herbal side, not Ginger/Masala. Triggers: the pantry pack is bought on autopilot when it
   runs low; the Hibiscus box needs a nudge at the shelf, at payday, or after a health scare/friend's
   tip/WhatsApp forward. Messaging angles tested in the doc: "The chai your home is known for"
   (pantry pack, pride as host); "Your cup, your moment" (Hibiscus, permission to spend on herself);
   "more cups for your shilling" (value framing to win back pack-size switchers).

2. NJERI, the Wellness Professional — ~17% of Naivas sales but highest value per unit. A mindset
   more than an income bracket — her 23 stores mix affluent areas (Kilimani, Lavington, both
   Karens, South C) with others (Embakasi Nyayo, Nyeri, Malindi); what unites them is ~44% herbal
   share vs ~25% elsewhere. Buys tea bags for herself (Hibiscus, Chamomile, Lemon Ginger, Berry
   Burst) but still buys the family Ginger/Masala pack too — she's "Mary in the chai aisle and
   Njeri at the herbal shelf." Job to be done: tea bags express identity (informed, intentional,
   health-conscious) and manage her day by need-state — green tea/Lemon Ginger for a lift, Chamomile
   to wind down, Mint/Hibiscus after meals. Biggest barrier is doubt that Melvins is "premium
   enough" — it may read as "the ginger chai brand my mother buys" versus imported brands on the
   same shelf; she also reads labels and wants ingredient/origin specifics. A real, currently-losable
   barrier: her preferred flavor is sometimes just not stocked in her store (confirmed listing gaps
   in specific stores). Triggers: need states (sleep, cutting coffee, fitness, bloating) more than
   payday; novelty; wellness creators/nutritionists/friends. Messaging angles tested: "Kenyan-grown
   wellness, made with intention" (origin as the premium story); organizing the range by need-state
   on shelf/pack/social; sampling and limited/seasonal blends for discovery.

3. MAMA BRIAN, the Daily Chai Buyer — the general-trade (Siena/Single World, kiosks and dukas)
   core buyer, and the answer to whether the ~KES 400,000 general-trade gap is just Mary shopping
   smaller: mostly NOT — she is a genuinely different, lower-income buyer. Household income likely
   under ~KES 30,000/mo and irregular (casual work, small business, boda boda); manages money day
   by day. Buys a 15g sachet (~KES 10) or 50g pack (~KES 35) for use that day/week, several times a
   week, from the nearby duka — general trade over-indexes hard on ≤100g formats (41-55% of value
   vs 17% at Naivas) and sachets barely exist at Naivas but are Siena's #2 SKU. Job to be done: same
   as Mary's pantry pack (chai with bread/mandazi may BE a meal) but with more at stake, and ginger
   chai as her cheapest home remedy — herbal tea bags at KES 200-500 are largely outside her budget
   and routine. Barrier: overwhelmingly availability, not preference — she takes whatever the
   shopkeeper has that day. Outlet churn is the sharpest evidence of this: only ~61% of Siena
   outlets reorder the next month, ~100 outlets drop off and get replaced every month, ~200 bought
   only once. Trigger: running out, on a day she has cash; the shopkeeper's recommendation does the
   job a shelf display does at Naivas. Messaging angle tested: everyday value framing, e.g. "strong
   ginger chai for KES 10" — NOT Mary-style monthly-stock-up or herbal "for you" framing, which
   won't reach her.

EVIDENCE-QUALITY CAVEATS TO KEEP ENFORCING (from the doc's own notes and the source spreadsheets):
- Siena/Single World numbers are SELL-OUT from the distributor's warehouse to outlets, not shopper
  purchases — roughly a fifth to a quarter of those outlets are themselves wholesalers/supermarkets,
  so stock can be sitting a tier further down, unseen. Don't let "secondary sales" get treated as
  "consumer demand" without that caveat.
- A single month of Naivas or Siena data is noisy (invoice timing, promotions ending mid-month); the
  doc explicitly flags the July/August 250g price move as ambiguous — a promotion ending vs. a real
  price increase — and recommends confirming with Naivas/the trade team rather than assuming.
- Cold-season "ginger for immunity" is NOT yet supported — growth in July/August was broad across
  categories, more consistent with more shoppers overall (school holidays) than a seasonal effect.
  Needs a warm-month comparison (October/January) before it's used as a campaign rationale.

OPEN QUESTIONS THE ORIGINAL DOC FLAGS AS UNRESOLVED (raise these before locking Gate 1/2 on this):
1. Was the July 250g pricing a promotion that ended, or a list-price increase? (ask Naivas/trade team)
2. Does ginger sales actually lift in cold season? (needs a warm-month comparison, e.g. Oct or Jan)
3. Is there a payday pattern in Naivas sales? (needs weekly, not monthly, sales data)
4. Does a Hibiscus promotion in test stores actually move sales vs. matched control stores?
5. Can Ginger 50g / Masala 50g / Chamomile listing gaps be closed with the Naivas category buyer?
6. Is the Siena secondary report actually valued at Melvins' prices or Siena's? (confirm with Siena)
7. THE BIGGEST GAP: none of the three personas above have been validated by actually talking to a
   shopper. The doc proposes a ~10-store intercept survey at the tea shelf with four questions: who
   in the house drinks this, when do you drink it, what would you buy if this was missing, why did
   you pick up the Hibiscus today. Until that (or equivalent) evidence exists, hold these personas as
   a strong working hypothesis, not a locked Gate 1 standard — push the team on whether it's run yet.
`,
};

export function getCompanyResearch(slug) {
  return RESEARCH[slug] || null;
}
