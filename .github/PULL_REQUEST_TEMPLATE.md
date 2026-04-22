<!--
Thank you for contributing to AZRI. Please complete this template carefully.
Healthcare context = stricter defaults. Reviewers will use this checklist.
-->

## Summary
<!-- One paragraph: what changed and why. Link related issues. -->

Closes #

## Type of change
- [ ] feat — new user/operator-visible feature
- [ ] fix — bug fix
- [ ] docs — documentation only
- [ ] sec — security or privacy fix
- [ ] chore — internal change (deps, refactor, build)
- [ ] release — version bump

## Areas affected
- [ ] Patient surface
- [ ] Caregiver surface
- [ ] Doctor / clinician surface
- [ ] Institution / admin surface
- [ ] API / data model
- [ ] Auth / RBAC / audit
- [ ] AI / insights
- [ ] Marketing / public site
- [ ] Infra / CI / tooling
- [ ] Documentation / SKILLS only

## Healthcare wording check  *(required if any user-visible copy changed)*
- [ ] No diagnostic claims; uses "supports / assists / helps monitor / early-warning support" language (`SKILLS/healthcare_product.md`).
- [ ] No fabricated certifications, partnerships, or efficacy claims.
- [ ] Emergency guidance routes to local emergency services (KSA: 997 / 911 unified).
- [ ] Reviewed by clinical or product reviewer (mention them).

## i18n & RTL  *(required if UI changed)*
- [ ] All visible strings live in the i18n catalog.
- [ ] Verified visually in **Arabic / RTL** *and* **English / LTR**.
- [ ] Logical CSS properties used (`margin-inline-*`, `padding-inline-*`); no `*-left` / `*-right`.
- [ ] Native KSA Arabic reviewer signed off on patient/clinician copy.

## Accessibility  *(required if UI changed)*
- [ ] Keyboard-only walkthrough passes.
- [ ] Visible focus on all interactive elements.
- [ ] Form labels & error messages programmatically associated.
- [ ] Sufficient color contrast (4.5:1 text, 3:1 UI).
- [ ] axe / Lighthouse a11y checks green.

## Security & privacy
- [ ] No secrets committed (gitleaks/CI scan green).
- [ ] No PHI in logs, error messages, analytics events, or AI prompts.
- [ ] AuthN/AuthZ checks present on new endpoints; default deny.
- [ ] Audit log entry emitted for new PHI-touching endpoints.
- [ ] New third-party dependency screened against the GitHub Advisory database.
- [ ] DPIA updated/created if a new PHI processing activity is introduced.

## Data model
- [ ] New fields classified per `DATA_MODEL.md` (Public / Internal / Confidential / Sensitive PHI / Highly sensitive).
- [ ] Tenant scoping enforced at the data layer (RLS) — not only in app code.
- [ ] Migrations include reversible down-migrations or an ADR justification.

## Analytics
- [ ] New events declared in the registry; required properties present.
- [ ] No PHI in event payloads.

## Tests
- [ ] Unit tests added/updated.
- [ ] Integration / contract tests added/updated where applicable.
- [ ] E2E updated for new primary journeys.
- [ ] RBAC matrix updated for new endpoints.

## Documentation
- [ ] `CHANGELOG.md` updated under `[Unreleased]`.
- [ ] Relevant doc updated (`README.md`, `ARCHITECTURE.md`, `API_DOCUMENTATION.md`, `DATA_MODEL.md`, `RUNBOOKS.md`, etc.).
- [ ] If a material decision was made: ADR added/updated in `DECISIONS.md`.

## Rollout / rollback
- [ ] Feature-flagged for any user-visible behavior change.
- [ ] Rollback plan documented.
- [ ] On-call notified for any production-impacting change.

## Screenshots / recordings
<!-- Required for UI changes. Include both `ar`/RTL and `en`/LTR. -->

## Notes for reviewers
<!-- Anything reviewers should know upfront. -->
