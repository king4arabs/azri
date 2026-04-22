# CONTRIBUTING

> How to contribute to AZRI. Healthcare context = stricter defaults.

## Before you start

1. Read [`README.md`](./README.md), [`PROJECT_STATUS.md`](./PROJECT_STATUS.md), and the [`SKILLS/`](./SKILLS) file relevant to your discipline.
2. If you're touching anything user-facing, also read [`SKILLS/healthcare_product.md`](./SKILLS/healthcare_product.md), [`ACCESSIBILITY.md`](./ACCESSIBILITY.md), and [`I18N_L10N.md`](./I18N_L10N.md).
3. If you're touching data, auth, or PHI flows, also read [`SECURITY.md`](./SECURITY.md), [`DATA_MODEL.md`](./DATA_MODEL.md), and [`SKILLS/privacy_data_governance.md`](./SKILLS/privacy_data_governance.md).

## Branching

- `main` — protected; always releasable.
- Feature branches: `feat/<scope>-<short-desc>`
- Fixes: `fix/<scope>-<short-desc>`
- Docs: `docs/<scope>-<short-desc>`
- Security/privacy: `sec/<scope>-<short-desc>`
- Chores: `chore/<scope>-<short-desc>`
- Releases: `release/vX.Y.Z`

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(web): add Arabic onboarding screen
fix(api): prevent cross-tenant patient lookup
docs(security): clarify PHI redaction rule
sec(auth): add step-up auth for report export
chore(deps): bump next to 14.2.4
```

Why: enables automated changelogs and clear release scope.

## Pull requests

- Use [`.github/PULL_REQUEST_TEMPLATE.md`](./.github/PULL_REQUEST_TEMPLATE.md). The template includes mandatory checks for healthcare wording, RTL/i18n, accessibility, security, and analytics PHI hygiene.
- Keep PRs **small and focused**. Split a PR if it covers more than one concern.
- Include screenshots / recordings for UI changes (both `ar`/RTL and `en`/LTR when applicable).
- Update docs *in the same PR* as the change.
- Update `CHANGELOG.md` under `[Unreleased]` for any user- or operator-visible change.
- Pass all required checks. Do not bypass.

### Review expectations

- At least one reviewer; two for changes in: auth, RBAC, PHI flows, audit, billing, AI behaviour, emergency path.
- Reviewers consider: correctness, safety, privacy, a11y, i18n, observability, testability.
- Healthcare wording reviewed by a clinical or product reviewer.

## Coding standards

- Strict types (TypeScript strict, mypy strict).
- Linting and formatting are non-negotiable; run `pnpm verify` (or equivalent) locally.
- Logical CSS properties for layout (RTL safety).
- No PHI in logs, errors, or analytics.
- No secrets in code, fixtures, or tests.
- Follow the SKILLS file for your domain.

## Tests

- Add unit tests for logic you add.
- Add integration tests for new endpoints / migrations.
- Add an a11y test for new UI primitives.
- Healthcare-critical paths require tests for the failure case, not just the happy path.

## Releases

See [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md). Don't tag releases yourself unless you own the release rotation.

## Reporting security issues

**Don't open a public issue.** See [`SECURITY.md`](./SECURITY.md).

## Code of conduct

Be kind, be patient, assume good intent, raise concerns directly. Patient-impacting decisions are made carefully and inclusively.

## Licensing of contributions

Until a license is published (ADR-0003), all contributions are accepted under the implicit understanding that they may be re-licensed by the AZRI team. External contributions are paused until a public license is announced.
