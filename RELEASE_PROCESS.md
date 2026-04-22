# RELEASE_PROCESS

> How AZRI ships safely. Applies once code lands; the v0.1.0 release of this repo follows it as a dry run.

## Cadence

- Time-bounded releases are *not* mandated; releases ship when scope is ready.
- Healthcare context favors **smaller, safer releases** over large drops.

## Branching

- `main` — protected, always releasable.
- Feature branches — see `CONTRIBUTING.md`.
- Release branches — `release/vX.Y.Z` only when needed for hotfix isolation.
- Hotfix branches — `hotfix/vX.Y.(Z+1)` cut from latest tag.

## Versioning

- SemVer per `VERSION.md`.
- Tags: `vX.Y.Z`, signed if signing keys are configured.

## Release types

- **Patch (`x.y.Z`)**: fixes, doc improvements, dependency bumps without behaviour change.
- **Minor (`x.Y.0`)**: new non-breaking features, infra/docs maturity, analytics additions.
- **Major (`X.0.0`)**: breaking architecture, API, schema, or auth contract changes.

## Release readiness checklist

- [ ] All required CI checks green on `main`.
- [ ] `CHANGELOG.md` updated under the new version heading.
- [ ] `VERSION.md` updated.
- [ ] Migration notes written (if any).
- [ ] Doc deltas merged.
- [ ] Sentry / analytics / dashboards updated for new surfaces.
- [ ] Healthcare-wording reviewed (any new patient/clinician copy).
- [ ] a11y + i18n checks green.
- [ ] Security: no `npm audit` / `pip-audit` Highs without an explicit waiver.
- [ ] Feature flags configured for any user-visible changes.
- [ ] Rollback plan documented (per service).
- [ ] On-call notified.

## Promotion

```
PR → CI green → merge to main → staging deploy → smoke + contract tests
                                              → tag vX.Y.Z → production canary
                                              → 10% → 50% → 100%
                                              → auto-rollback on SLO burn
```

## Hotfix flow

1. Branch from the latest tag (`hotfix/vX.Y.(Z+1)`).
2. Smallest possible change. Test. Tag. Deploy.
3. Forward-merge into `main` immediately.
4. Postmortem if Sev1/Sev2.

## Mobile releases

- iOS: TestFlight cohort → staged App Store rollout.
- Force-update flow available for security or safety-critical fixes.

## Communicating releases

- Internal: changelog summary in the engineering channel + product channel.
- External: customer-facing release notes for visible changes; emails for institutional customers on contractual cadence.

## Pre-1.0 caveat

While AZRI is `0.x.y`, minor bumps may include refinements that would otherwise be major. Always include a migration note when behaviour changes.

## v0.1.0 release notes (this repository)

- Type: minor (first structured baseline).
- Scope: repository operating system + SKILLS framework + GitHub hygiene.
- No application code; no migration required.
- Git tag (when applied): `v0.1.0`.
