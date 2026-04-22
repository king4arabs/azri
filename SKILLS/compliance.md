# SKILLS — Compliance

## Purpose
Stay compliance-ready without overclaiming. Build evidence as we build product.

## What good looks like
- Honest posture (`COMPLIANCE_READINESS.md`); no fake certifications.
- Controls designed in; evidence accumulates as a byproduct.
- Privacy decisions documented per data flow.
- Vendor risk visible at all times.

## Standards
- DPIA before any new PHI processing activity (new vendor, new wearable, new AI use).
- BAA-equivalent agreement for every PHI-processing vendor.
- Per-tenant data export and deletion endpoints from v0.3.0.
- Audit log retention longer than primary data.
- Incident response process exercised semi-annually.

## Anti-patterns
- Treating compliance as a launch checklist instead of an operating discipline.
- "We'll get the BAA later."
- Marketing copy that implies certifications we don't hold.
- Storing more PHI than the feature strictly requires.

## How to implement
- Use the DPIA template (added at v0.2.0).
- Vendor onboarding requires: data classification, BAA-equivalent if applicable, security review, sign-off.
- Compliance evidence captured in a chosen platform (Drata/Vanta/Secureframe) starting v0.5.0.

## How to audit / test
- Quarterly internal audit against `COMPLIANCE_READINESS.md`.
- External audit prep starting v0.7.0.
- Annual ISO 27001 readiness review starting v0.8.0.

## How to scale
- Per-region compliance modules (KSA PDPL, GDPR, HIPAA-equivalent posture for US partners).
- Customer-facing compliance portal starting v0.7.0.
- Dedicated privacy & compliance lead by v0.5.0.

## AZRI-specific notes
- KSA PDPL is the primary jurisdiction; design defaults around it.
- Pediatric data (minors) handled via guardian consent flows; document carefully.
- AI providers are a high-leverage compliance lever — pick wisely.

## Open questions
- Compliance evidence platform pick.
- KSA in-Kingdom hosting partner if Bahrain doesn't satisfy a customer's requirement.
- Pen-test partner.
