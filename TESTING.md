# TESTING

> Test strategy and quality gates. Code-less today; this is the contract every code-introducing PR must follow.

## Principles

1. **Fast signal.** Lint and types in seconds; unit tests in <2 min; full pipeline <15 min.
2. **Patient-safety paths are over-tested.** Alerts, consent, RBAC, audit log, data deletion — full coverage + property tests where relevant.
3. **Bilingual & RTL are first-class test surfaces** — not an afterthought.
4. **No flakes.** Quarantine within 24h; fix or delete within 7 days.
5. **Tests are documentation.** Names describe behaviour, not implementation.

## The pyramid (target proportions)

```
              ▲ E2E (~5%)        — critical journeys only, headed + headless
             ▲▲ Integration (~25%) — API contracts, DB, auth, RLS
            ▲▲▲ Unit (~70%)       — pure logic, components, hooks
        ─────────────
         Static (always-on): lint, format, types, secrets scan, deps audit
```

## Quality gates (CI must enforce)

| Gate | Tool (target) | Blocking? |
| --- | --- | --- |
| Format | Prettier / Black | Yes |
| Lint | ESLint / Ruff | Yes |
| Types | TypeScript strict / mypy strict | Yes |
| Unit | Vitest / Jest / Pytest | Yes |
| Integration | Vitest + Testcontainers / Pytest + Postgres | Yes |
| Contract | OpenAPI schema diff + Pact (if needed) | Yes for API PRs |
| E2E smoke | Playwright | Yes for `main` and tags |
| Accessibility | axe-core in component tests + Playwright | Yes |
| i18n regression | snapshot of message catalog + RTL snapshot | Yes |
| Performance | Lighthouse CI budgets | Warn → block on tag |
| Security | `npm audit` / `pip-audit` + CodeQL + secret scan | Yes |
| Coverage | Per-package threshold (start 70%, raise quarterly) | Yes (with allowlist) |

## Healthcare-critical test categories

- **Consent & scope tests** — every PHI accessor must have a test that proves it denies without consent.
- **RBAC matrix tests** — table-driven test for each role × resource × action.
- **Audit log assertion tests** — every privileged action verified to emit an audit record.
- **PII redaction tests** — logs and analytics must not contain PHI.
- **Emergency path tests** — alert delivery has dedicated synthetic monitors hitting prod every minute.

## i18n & RTL testing

- All UI components rendered in both `ar` and `en`, RTL and LTR.
- Snapshot tests for direction-sensitive layout (icons, paddings via logical properties).
- Pseudo-localization run in CI to catch hard-coded strings.
- Arabic copy reviewed by a native KSA speaker before release; QA gate in PR template.

## Accessibility testing

- axe-core integrated in component test runner; zero serious/critical violations allowed.
- Keyboard-only walkthrough scripted in Playwright for every primary journey.
- Screen-reader smoke list maintained in `ACCESSIBILITY.md`.

## Test data

- **Never copy prod data into lower envs.**
- Synthetic patient fixtures live in `packages/contracts/fixtures` (when introduced).
- Faker locale set to `ar_SA` to surface Arabic-rendering bugs in tests.

## Local commands (target — to be defined alongside the first scaffold)

| Goal | Command (target) |
| --- | --- |
| Install | `pnpm install` (web/API), `pip install -r requirements-dev.txt` (insights) |
| Lint | `pnpm lint` / `ruff check` |
| Types | `pnpm typecheck` / `mypy` |
| Unit | `pnpm test` / `pytest` |
| E2E | `pnpm e2e` |
| All gates | `pnpm verify` |

## Coverage stance

- Coverage is a *floor*, not a goal. Don't chase 100% on trivial code.
- Patient-safety modules (alerts, RBAC, audit, consent) target **≥ 95%** branch coverage.

## Open items

- Choose Vitest vs Jest in ADR alongside web scaffold.
- Choose Playwright vs Cypress (Playwright preferred for RTL + tracing).
- Decide on visual regression (Chromatic vs Percy vs none) at v0.3.0.
