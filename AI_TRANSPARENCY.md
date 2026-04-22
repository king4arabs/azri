# AI Transparency

> **Plain-language summary of how AZRI uses (or does not yet use) artificial intelligence.**
> This page is the public counterpart to the internal guardrails in
> [`SKILLS/ai.md`](./SKILLS/ai.md). It is written so patients, caregivers,
> clinicians, and institutional customers can hold us accountable.

**Status:** **Draft.** This is a v0.1.0 baseline. It will be updated
release-by-release as AI capabilities land (target: `v0.6.0`). If this page
does not match the product, treat the product as correct and
[report the drift](./SECURITY.md#responsible-disclosure).

---

## What AZRI is

AZRI is an **epilepsy workflow support and early-warning monitoring** platform.
It is **not a regulated medical device** and it does **not diagnose, treat,
cure, or prevent** any condition. See
[`COMPLIANCE_READINESS.md`](./COMPLIANCE_READINESS.md) for the honest
regulatory posture.

## Does AZRI use AI today?

**Today (v0.1.0 baseline release): no production AI features are shipped.**
No patient data is sent to any large language model (LLM) or third-party AI
provider from this repository's code because no user-facing code is shipped
yet. The content package (`@azri/content`) is static text authored by humans.

Once AI-assisted features are introduced (planned for `v0.6.0`), this page
will be updated in the same release that ships them, with:

- the specific feature and who it is for (patient / caregiver / clinician / admin),
- the provider(s) involved,
- the data sent and the data never sent,
- the human-in-the-loop checkpoint, and
- how to opt out.

## Principles we will not compromise on

1. **AI assists clinicians; it does not replace them.** Every AI output that
   reaches a clinician is explicitly labeled as AI-generated, cites the
   specific patient events it was built from, and requires a clinician to
   accept or reject it before it affects care.
2. **No auto-action on patients.** AZRI will not auto-medicate, auto-escalate,
   auto-message clinicians, or auto-change a care plan based on an AI
   inference alone. Emergency routing follows deterministic rules.
3. **No diagnostic claims.** AI output is never presented as a diagnosis,
   prediction of a specific future seizure, or guarantee of outcome.
4. **Citations or it didn't happen.** Any AI-generated clinical summary links
   back to the specific source events (episodes, annotations, signals) in the
   UI. Free-text AI output without citations does not reach clinical surfaces.
5. **PHI stays on our side by default.** Personal health information is
   de-identified before it reaches any third-party AI provider. Re-identification
   happens only inside AZRI, after the response returns.
6. **Provider obligations in writing.** Any third-party AI provider that
   processes AZRI data must sign a BAA-equivalent agreement and give
   written no-training-on-input guarantees before they are enabled.
7. **Every inference is audited.** Model name, model version, prompt hash,
   input hash, output hash, latency, cost, user, and tenant are logged for
   every AI call. The audit log never contains raw PHI.
8. **Arabic quality is evaluated explicitly.** Arabic output is not assumed
   to be as good as English. We evaluate it separately, and native KSA
   Arabic speakers review patient-facing AI copy before it ships.
9. **Users can decline AI-assisted features.** When AI-assisted features
   land, patients and institutional customers will be able to opt out without
   losing access to the core non-AI product.

These principles are enforced by engineering standards documented in
[`SKILLS/ai.md`](./SKILLS/ai.md) and by the pull-request template gate in
[`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md).

## Data we will never send to a third-party AI provider

- Raw PHI fields (names, medical record numbers, dates of birth, national
  IDs, phone numbers, addresses) without de-identification.
- Audit log payloads.
- Biometric templates.
- Credentials, API keys, or other secrets.
- Any data for which explicit, scoped consent has not been captured.

## Data-handling model (when AI features ship)

| Step | What happens | Where |
| --- | --- | --- |
| 1. Request | Clinician or patient invokes an AI-assisted action | AZRI app / dashboard |
| 2. Scope check | Feature flag + consent state + RBAC + tenant residency are verified | AZRI backend |
| 3. De-identification | PHI is stripped or tokenized; identifiers are replaced with local-only mappings | AZRI backend |
| 4. Prompt build | Reviewed prompt template + structured inputs are assembled | AZRI backend |
| 5. Inference | Call to the provider, over TLS, through a typed provider interface | Third-party provider (BAA-equivalent + no-training) or on-tenant model |
| 6. Output validation | Response is parsed against a strict schema; invalid outputs are rejected | AZRI backend |
| 7. Re-identification | Local-only mappings applied to restore patient context | AZRI backend |
| 8. Human-in-the-loop | Output is presented to a clinician with citations; clinician accepts or rejects | AZRI dashboard |
| 9. Audit | Inference metadata recorded; PHI never written to the audit log | AZRI audit system |

If any step fails or is skipped, the AI-assisted output is not shown.

## Residency

AI-assisted features follow the residency model in
[`DATA_MODEL.md`](./DATA_MODEL.md#ksa-classification-mapping) and
[`ADR-0007`](./DECISIONS.md#adr-0007--cloud-region--data-residency-open).
For institutional customers whose contracts or sector guidance require
in-Kingdom hosting, AI inference must also occur on an in-Kingdom-compatible
path (on-tenant model, or a provider with an in-Kingdom deployment) before
the feature is enabled for that tenant.

## Bias, safety, and limitations we acknowledge

- Epilepsy presents differently across ages, genders, and underlying
  conditions; AI trained on general datasets may perform worse on
  under-represented groups. We will evaluate Arabic-language and pediatric
  cases explicitly and publish scoped performance notes alongside any
  clinician-facing AI feature.
- LLMs are confidently wrong sometimes. Every AI output a clinician sees is
  framed as "draft for review," never as ground truth.
- On-device / wearable signal interpretation is assistive, not diagnostic.
  Alert thresholds remain deterministic and are reviewed by clinicians.
- We do not use patient data to train third-party foundation models. Ever.

## How to ask questions, opt out, or report concerns

- **Questions / opt-out (once AI features ship):** contact the account owner
  in your institution, or email **`privacy@azri.ai`** (mailbox to be
  provisioned before `v0.2.0`; tracked in [`TODO.md`](./TODO.md)).
- **Security or privacy concerns:** see
  [`SECURITY.md`](./SECURITY.md#responsible-disclosure).
- **Clinical concerns:** contact your clinician. AZRI is not a substitute
  for medical care. **For a medical emergency in Saudi Arabia, call
  997 (ambulance) or 911 (unified).**

## How this page stays honest

- Updated in the **same release** that introduces or changes an AI-assisted
  feature (enforced by reviewer + PR template).
- Cross-checked against [`SKILLS/ai.md`](./SKILLS/ai.md) every release.
- Arabic translation to ship alongside the web scaffold in `v0.2.0` via the
  `@azri/content` bilingual content package.
- Change history is captured in [`CHANGELOG.md`](./CHANGELOG.md).

## Open questions (carry forward)

- Default LLM provider for `v0.6.0` given KSA / BAA constraints
  (OpenAI vs Anthropic vs hybrid vs on-tenant OSS). Tracked in
  [`SKILLS/ai.md`](./SKILLS/ai.md#open-questions).
- Self-hosted Llama-class model path for the highest-sensitivity flows.
- AI guardrails framework choice (LangSmith / Lakera / custom).
- Public evaluation-metrics publication cadence.
