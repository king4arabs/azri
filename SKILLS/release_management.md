# SKILLS — Release Management

See `RELEASE_PROCESS.md` for the program-level flow. This file is the eng-lead rubric.

## What good looks like
- Releases are boring. Tagging is uneventful. Customers sleep.
- Each release has a clear scope, accurate changelog, and known rollback path.
- Hotfixes are rare and quick.

## Standards
- SemVer per `VERSION.md`.
- Changelog updated under `[Unreleased]` with every user/operator-visible PR.
- Release readiness checklist completed before tag.
- Canary 10% → 50% → 100% with auto-rollback on SLO burn.
- Mobile: TestFlight cohort then staged App Store rollout.

## Anti-patterns
- "Big bang" releases mixing schema, auth, and UI changes.
- Tag from a feature branch.
- Skipping changelog "because it's small."
- Deferring migration notes to "after release."

## How to implement
- Use the release readiness checklist in `RELEASE_PROCESS.md`.
- Follow the branching model in `CONTRIBUTING.md`.
- Coordinate with on-call before tagging.

## How to audit / test
- Quarterly release retro: time-to-deploy, rollback rate, hotfix count.
- Each Sev1/Sev2 release postmortem fed back into the checklist.

## How to scale
- Release captains rotation.
- Independent service release cadences once services proliferate.
- Automated changelog generation from Conventional Commits.

## AZRI-specific notes
- Healthcare context favors smaller, safer releases over large drops.
- Patient-safety regressions auto-rollback via SLO burn alerts.
- Feature flags mandatory for any change with user-visible behaviour or schema implications.

## Open questions
- Conventional Commits enforcement (warn vs block).
- Automated changelog tool (e.g. changesets vs custom).
- Long-term: weekly release cadence?
