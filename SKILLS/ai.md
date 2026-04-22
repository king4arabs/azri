# SKILLS — AI

## Purpose
Use AI to accelerate care without overstepping. Assist clinicians, never replace them. Protect patient data absolutely.

## What good looks like
- AI outputs are **traceable** to source events; never floating opinions.
- Every AI inference is audited.
- PHI never leaves AZRI's tenant boundary without explicit consent and a BAA-equivalent agreement.
- Clinicians remain in the loop for any AI output they consume.
- Limitations are stated plainly to users.

## Standards
- **Provider screening:** any third-party LLM provider must sign a BAA-equivalent and offer no-training-on-input guarantees in writing.
- **Default = de-identified inference.** Re-identification only on the AZRI side, post-response.
- **Prompt templates** are code, reviewed in PRs, versioned.
- **Output validation** against a schema (JSON mode / structured outputs); no free-text leaking into clinical UIs unrendered.
- **Citations:** clinical summaries link back to source episode/annotation IDs visible in the UI.
- **Audit:** every inference logs model name, version, prompt hash, input hash, output hash, latency, cost, user, tenant, justification when applicable. Never the raw PHI.
- **Rate limits & cost guards** per tenant.
- **Human-in-the-loop**: AI never auto-acts on patients (no auto-medication changes, auto-escalation, auto-messaging clinicians without clinician confirmation in MVP).
- **Evaluation:** offline eval set per task; tracked over time.

## Anti-patterns
- "Just send the patient note to the API."
- Shadow PII in prompts (e.g. names embedded in fields).
- Free-text AI output rendered as clinical fact without citations.
- Hidden LLM calls in marketing or analytics paths.
- Letting model output be the only signal for an alert (always combine with deterministic rules).

## How to implement
- Use the AI inference module (`api/insights`) — never call providers from random services.
- Wrap providers behind a typed interface; switching providers should be a one-file change.
- Add the audit log entry in the same PR.
- Add an eval test for any new task.

## How to audit / test
- Eval set scored per release; regressions block.
- Adversarial prompts in CI for the most exposed entry points.
- PHI redaction unit tests on the prompt builder.
- Periodic manual review of AI outputs by a clinician advisor.

## How to scale
- Move to on-tenant inference (OSS models, KSA-hosted) for institutional customers requiring it.
- Caching of structured outputs where determinism allows.
- Smaller specialized models for narrow tasks (signal classification) vs general LLMs for summarization.

## AZRI-specific notes
- **Arabic-quality outputs**: evaluate Arabic generation explicitly; don't assume parity with English.
- Cultural and dialectal nuance reviewed by a native speaker before any patient-facing AI copy ships.
- Pediatric language register considered separately when minors are subjects.

## Open questions
- Default LLM provider for v0.6.0 (OpenAI vs Anthropic vs hybrid) given KSA/BAA constraints.
- Self-hosted Llama-class model for highest-sensitivity flows.
- AI guardrails framework (LangSmith, Lakera, custom).
