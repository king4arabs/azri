# SKILLS — Product

## Purpose
Decide what to build for AZRI with patient dignity, clinician trust, and institutional reliability in mind.

## What good looks like
- Decisions traceable to user research, healthcare context, or business reality.
- Roadmap reflects priorities in `ROADMAP.md`; surprise items have an explicit reason.
- Specs explain *who*, *why*, *what success looks like*, *what is out of scope*.
- Healthcare wording is precise; growth language doesn't bleed into clinical surfaces.

## Standards
- **Discovery** before delivery. Even small features have a one-paragraph problem statement.
- **PRDs** include: persona, journey, success metric, non-goals, risks, dependencies.
- **Experimentation** uses guardrail metrics (a11y, safety, support volume) alongside primary KPIs.
- **Healthcare claims** reviewed against `SKILLS/healthcare_product.md` glossary.
- **Pricing & plan changes** require a sign-off path documented in `BUSINESS_CONTEXT.md`.
- **Release notes** translated for both Arabic and English channels.

## Anti-patterns
- Shipping "patient delight" features that risk disclosure of clinical state.
- Borrowing growth tactics from consumer apps inappropriately (streaks for medication, leaderboards).
- Vanity metrics: signups without activation, free trials without conversion plan.
- Skipping the "what is out of scope" section.

## How to implement
- Use the PRD template (to be added to `.github/ISSUE_TEMPLATE/feature_request.md`).
- Co-design with engineering and design from the start; no over-the-wall handoffs.
- Validate Arabic copy with a native speaker before locking the spec.

## How to audit / test
- Quarterly metric review against `ANALYTICS.md` north-star and guardrails.
- Patient/caregiver feedback loop sampled monthly.
- Doctor advisory check-in per release on clinical workflow surfaces.

## How to scale
- Lightweight RFC process for cross-team initiatives.
- Backlog grooming weekly; ruthless pruning.
- Per-persona product owners as the team grows (patient PM, clinical PM, institution PM).

## AZRI-specific notes
- Patient-facing features default to **calm**: minimal motion, neutral tone, no urgency manipulation.
- Caregiver features require **explicit, granular consent** by the patient.
- Doctor features prioritize **time saved + defensibility**.
- Institution features prioritize **audit + procurement readiness**.

## Open questions
- Roadmap visibility: public-ish vs internal only.
- How customers can co-shape the roadmap (advisory board / private feedback channel).
