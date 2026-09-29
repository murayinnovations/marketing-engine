// Pre-existing research handed to the Engine before a company's gates are run.
// This is evidence the team already has — NOT a shortcut past the gates. It gets
// injected into the system prompt so the AI can ground Gate 1/2/6 questions in real
// data instead of starting from zero, while still applying the same evidence bar
// (challenge hypotheses, ask what's validated vs. inferred, flag open questions).

const RESEARCH = {
  "melvins-tea": `
EXISTING RESEARCH ON FILE FOR THIS COMPANY (compiled September 2026, from Naivas modern-trade
sales data, a 14-retail-group modern-trade report (Jan-Aug 2024-2026), Siena and Single World
general-trade secondary sales data, and a 9-account export report (Jan-Aug 2024-2026) — NOT a
shopper survey). This is a strong starting point for Gates 1, 2 and 6 — use it instead of asking
from scratch — but it is sales/distribution data, not shopper research. Gender, motivation and
psychology below are REASONED HYPOTHESES inferred from pack mix and store location, not confirmed
by talking to shoppers. Treat this the same way you'd treat any team's evidence: press on what's
actually confirmed versus assumed, and don't let it get locked as a Gate 1/2 standard until the
open questions below are resolved. Note: the live gate conversation for this company has already
progressed past this static seed in places (e.g. Gate 1 has reportedly been approved with four
personas, and Gate 0's channel-split numbers were being actively corrected as of late Sept 2026)
— treat whatever is actually LOCKED in the company's own gate_outputs as more current than this
seed; this seed exists to ground gates that aren't locked yet, not to override what's been decided.

FOUR CANDIDATE PERSONAS (modern trade + general trade + export):

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

3. EXPORT BUYERS — B2B, margin/risk-driven, currently low-loyalty and largely unproven. Per the
   9-account export report (Jan-Aug 2024-2026, ~2,212 cartons in 2026, +21% vs 2025): the entire
   export line is dangerously concentrated in two accounts with ZERO trading history before this
   year. EasyGo Impex (Uganda) is 62% of 2026 export volume but bought NOTHING in 2024 or 2025 —
   it is a brand-new relationship carrying most of the channel, flowing through a single ship-to
   point. Kebebe (Tanzania) is another 16%, also brand-new in 2026 with zero prior history, through
   2 ship-to points. Together, two untested accounts are ~78% of export volume. Simba (Rwanda,
   retail chain) is ~11% and DECLINING (-18% vs 2025) — relationship-driven (a named buyer/imports
   manager), not yet proven on sell-through. Critical precedent, not just a risk hypothesis: Amazon
   Distributors Ltd bought 1,115 cartons in 2025 (a real, meaningful account) and ZERO in 2026 — it
   already happened once. World Safari Shop also stopped between 2025 and 2026. Beth International
   and Asali Organics only ever bought in 2024 and never again. Of 9 tracked accounts, 4 are dead or
   dying and the live volume rests on 2 accounts with no track record. Motivation: export buyers are
   filling a flavored/herbal-tea gap not locally available to them — the export product mix is
   dominated by Hibiscus, Chamomile, Green Tea with Tangawizi, Lemon & Ginger, Slimming and Detox
   (wellness/herbal lines), NOT the ginger/masala staples that lead domestically. Commitment level:
   low loyalty, transactional, non-exclusive — will drop the line at the first sign of underperformance
   (the team's own words: "like a hot potato" by month 3). This is 28% of the stated growth gap
   sitting on almost no proof. Needs a deliberate 90-day performance plan per account (Gate 8/9), not
   a ship-and-hope approach, and a named owner for retention risk (Gate 10).

4. GENERAL TRADE — two levels, don't collapse them into one persona.
   Level 1, the Trader (decides what gets stocked): per Siena's outlet-segment data, 139
   range-stocking estate supermarkets (~24 SKUs each) carry 53% of value — this is where the
   herbal/premium range actually grows (Hibiscus +51%, Chamomile +62% at Single World) and where a
   Mary- or Njeri-like buyer plausibly shops. 16 bulk wholesalers carry 21.5% of value on ~3 core
   SKUs only — high concentration risk: losing one wholesaler has already cost over KES 2M in lost
   volume. 105 small dukas/minimarts carry 16% on a narrow range. 320 one-time outlets carry 9% with
   low reorder reliability. Only ~61% of outlets reorder the next month across the segment.
   Level 2, MAMA BRIAN, the Daily Chai Buyer (the end shopper, core of duka trade) — the answer to
   whether the general-trade gap is just Mary shopping smaller: mostly NOT, she is a genuinely
   different, lower-income buyer. Household income likely under ~KES 30,000/mo and irregular
   (casual work, small business, boda boda); manages money day by day. Buys a 15g sachet (~KES 10)
   or 50g pack (~KES 35) for use that day/week, several times a week, from the nearby duka — general
   trade over-indexes hard on ≤100g formats (41-55% of value vs 17% at Naivas) and sachets barely
   exist at Naivas but are Siena's #2 SKU. Job to be done: same as Mary's pantry pack (chai with
   bread/mandazi may BE a meal) but with more at stake, and ginger chai as her cheapest home remedy
   — herbal tea bags at KES 200-500 are largely outside her budget and routine; that premium range
   lives with the Level-1 Range Stockers, not with her. Barrier: overwhelmingly availability, not
   preference — she takes whatever the shopkeeper has that day; ~100 outlets drop off and get
   replaced every month, ~200 bought only once. Trigger: running out, on a day she has cash; the
   shopkeeper's recommendation does the job a shelf display does at Naivas. Messaging angle tested:
   everyday value framing, e.g. "strong ginger chai for KES 10" — NOT Mary-style monthly-stock-up or
   herbal "for you" framing, which won't reach her.
   OPEN, UNRESOLVED AS OF LATE SEPT 2026: whether the general-trade portion of the growth gap
   actually sits almost entirely with the 139 Level-1 Range Stockers (who behave more like modern
   trade) rather than spread across wholesalers and dukas — this was being actively challenged and
   corrected in the live Gate 0 conversation. Don't assume either answer; ask the team what was
   actually confirmed.

MODERN TRADE IS BIGGER THAN NAIVAS — a common blind spot to correct. The Mary/Njeri personas above
were built entirely from Naivas (114-115 stores, ~36% of 2026 modern-trade value). A 14-retail-group
report (Jan-Aug 2024-2026, ~KES 57.3M in 2026, +13.75% YoY, 346 outlets: 216 growing, 88 declining,
38 new, mostly healthy) shows Naivas is barely more than a third of modern trade. Quick Mart (22.3%),
Majid Al Futtaim/Carrefour (16.4%), Chandarana (5.9%), Khetias (5.8%), Cleanshelf, Powerstar, Defco
and six smaller groups make up the other ~64%. The wellness/mainstream/value store-tier clustering
used for Mary and Njeri has NOT been done for these other 13 chains — don't assume it transfers.
Also worth noting group-wide: Hibiscus is now the #1 SKU by value across all 14 chains combined
(9.5% share), edging out Ginger 250g (9.4%) — the herbal/wellness momentum looks at least as strong
group-wide as the Naivas-only view suggested, maybe stronger.

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
- Export cartons are lumpy month to month (zero in some months of 2024/2025, spikes in others) —
  consistent with shipment/invoice timing rather than steady sell-through. Read the cumulative
  total, not any single month, the same discipline already applied to Naivas and Siena data.

OPEN QUESTIONS RAISED BY THE NEW MODERN-TRADE AND EXPORT REPORTS:
1. What's the actual commercial arrangement behind EasyGo and Kebebe — contract, minimum volumes,
   exclusivity — given they're 78% of export volume with zero trading history before 2026?
2. What happened with Amazon Distributors Ltd (1,115 cartons in 2025 to zero in 2026)? That's the
   "drops it like a hot potato" risk already realized once, not just a hypothetical.
3. Has the wellness/mainstream/value store-tier clustering (used for Mary and Njeri) been checked
   against Quick Mart, Carrefour/Majid Al Futtaim, or any of the other 12 chains, or only Naivas?
4. Does the general-trade ~KES 400,000 gap sit mostly with the 139 Level-1 Range Stockers rather
   than spread across wholesalers and dukas? (open as of late Sept 2026, per the live conversation)

OPEN QUESTIONS THE ORIGINAL DOC FLAGS AS UNRESOLVED (raise these before locking Gate 1/2 on this):
1. Was the July 250g pricing a promotion that ended, or a list-price increase? (ask Naivas/trade team)
2. Does ginger sales actually lift in cold season? (needs a warm-month comparison, e.g. Oct or Jan)
3. Is there a payday pattern in Naivas sales? (needs weekly, not monthly, sales data)
4. Does a Hibiscus promotion in test stores actually move sales vs. matched control stores?
5. Can Ginger 50g / Masala 50g / Chamomile listing gaps be closed with the Naivas category buyer?
6. Is the Siena secondary report actually valued at Melvins' prices or Siena's? (confirm with Siena)
7. THE BIGGEST GAP: none of the shopper-facing personas above (Mary, Njeri, Mama Brian) have been
   validated by actually talking to a shopper — the export and trader personas are transaction data,
   which is a different and firmer kind of evidence, but still not the same as shopper psychology.
   The doc proposes a ~10-store intercept survey at the tea shelf with four questions: who in the
   house drinks this, when do you drink it, what would you buy if this was missing, why did you pick
   up the Hibiscus today. Until that (or equivalent) evidence exists, hold the shopper personas as a
   strong working hypothesis, not a locked Gate 1 standard — push the team on whether it's run yet.
`,
};

export function getCompanyResearch(slug) {
  return RESEARCH[slug] || null;
}
