# SKILLS — Privacy & Data Governance

## Purpose
Treat patient data like the trust it is. Minimize, classify, segregate, audit.

## What good looks like
- Every byte of PHI has a reason to exist, a classification, a retention, and an erasure path.
- Consent is granular, revocable, and respected at request time.
- Audit log answers any privacy question quickly.
- DPIAs precede new processing; not after the fact.

## Standards
- See `DATA_MODEL.md` for classifications.
- See `SECURITY.md` for protection controls.
- See `COMPLIANCE_READINESS.md` for the regulatory frame.
- DPIA before any new PHI processing activity.
- Per-tenant export and deletion endpoints from v0.3.0.
- Consent grants persisted, versioned, and checked at request time.
- Data minimization in every payload (request, response, log, analytics, AI prompt).

## Anti-patterns
- Collecting "just in case."
- Storing free-text fields without redaction strategy.
- Using prod data in lower environments.
- "Soft delete" via boolean only.
- Sharing PHI to vendors without a BAA-equivalent and a DPIA.

## How to implement
- Classify new fields before adding them.
- PR template enforces a privacy checklist for any new PHI surface.
- Use the consent module; never inline consent checks inconsistently.
- Audit emitter wired into the new endpoint in the same PR.

## How to audit / test
- Quarterly PHI-leak audit on logs and analytics.
- Quarterly access review.
- Annual privacy program review.

## How to scale
- Per-region retention configurations.
- Customer-facing privacy portal (data export, consent history) at v0.7.0.
- Dedicated DPO once the team and customer base warrant it.

## AZRI-specific notes
- KSA PDPL is the primary frame.
- Pediatric patients have guardian consent flows; don't generalize from adult patterns.
- AI providers introduce third-party data flows — always BAA-equivalent + de-identification.

## Open questions
- Final BAA-equivalent template for AI vendors.
- Pediatric consent UX language.
- Public privacy portal scope.
