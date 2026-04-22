# SKILLS — QA

## Purpose
Catch the right things at the right time. In healthcare, "right" leans heavily toward patient safety and privacy.

## What good looks like
- Tests are fast, deterministic, and named for behaviour.
- Failures point to the cause in seconds.
- Patient-safety paths have property-, integration-, and synthetic-monitor coverage.
- A11y and i18n regressions are caught in CI, not in production.

## Standards
- See `TESTING.md` for the full test pyramid and gates.
- Healthcare-critical modules (alerts, RBAC, audit, consent) target ≥ 95% branch coverage.
- Visual review in both `ar`/RTL and `en`/LTR for any UI change.
- E2E suite lives close to CI's time budget; aggressively parallelized.
- Synthetic monitors for emergency notification path and primary auth flows.

## Anti-patterns
- Tests that re-implement the implementation.
- Sleep-based waits in E2E.
- Mocks that hide real contract drift.
- Snapshot tests as the sole quality bar.
- "Skip on CI" as a workaround for flakes — quarantine and fix instead.

## How to implement
- Write the failing test first when fixing a bug.
- For new endpoints: contract test + happy path + at least one negative path + RBAC matrix entry.
- For new UI: a11y test + RTL snapshot + keyboard walkthrough.

## How to audit / test
- Coverage trends per package; regression triggers a conversation, not a block.
- Flake quarantine list reviewed weekly; aged flakes deleted or fixed.
- Test runtime budget per suite; over-budget triggers refactor.

## How to scale
- Move integration tests onto Testcontainers / ephemeral databases.
- Shard E2E suites; record videos on failure only.
- Contract tests at the service boundary as services multiply.

## AZRI-specific notes
- Test data is **synthetic only**; never copy prod into lower envs.
- Locale-aware test data with `ar_SA` Faker locale to surface RTL bugs.
- Patient-safety regression tests run on every PR, not just nightly.

## Open questions
- Vitest vs Jest.
- Playwright vs Cypress (Playwright preferred for RTL + tracing).
- Visual regression vendor.
