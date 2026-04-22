# DEPLOYMENT

> How AZRI environments are provisioned, deployed, and rolled back. Targets the architecture in [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Environments

| Env | Purpose | Data | Access | Deploy trigger |
| --- | --- | --- | --- | --- |
| `local` | Developer machines | Synthetic only | Self | Manual |
| `preview` | Per-PR ephemeral env | Synthetic only | AZRI team | PR open / push |
| `staging` | Pre-prod integration | De-identified or synthetic; **never PHI** | AZRI team + invited partners | Merge to `main` |
| `production` | Live | Real PHI | Strictly RBAC + audit | Tagged release |
| `prod-sandbox` | Demo / sales | Synthetic only | AZRI sales / customers | Manual |

> **Rule:** PHI lives only in `production`. Any movement of data from prod to lower envs requires de-identification *before* leaving the prod boundary.

## Regions

- **Primary:** AWS `me-south-1` (Bahrain) for KSA-residency-friendly workloads (pending ADR-0007 confirmation that Bahrain meets KSA expectations for the data classes involved; otherwise switch to in-Kingdom partner).
- **Edge:** Cloudflare global.
- **DR:** A second AWS region in MENA or EU; warm standby for prod database.

## Deploy paths

- **Marketing & web apps:** GitHub Actions → Vercel (preview, staging, production projects).
- **APIs:** GitHub Actions → container registry (ECR) → ECS or EKS (decided in ADR-0008) with blue/green or rolling deploys.
- **Mobile:** Fastlane → TestFlight → App Store; Watch app shipped with iOS app.
- **Infra:** Terraform via GitHub Actions with required reviewer approval for `production`.

## Promotion flow

```
PR ─► preview env (ephemeral)
   └─ checks: lint, type, unit, e2e, axe, lighthouse, security scan
merge to main ─► staging
   └─ smoke + contract tests
git tag vX.Y.Z ─► production
   └─ canary 10% → 50% → 100%
   └─ auto-rollback on SLO burn
```

## Rollback strategy

- **Web/API:** previous container image / previous Vercel deployment promoted instantly.
- **Database migrations:** every migration ships with a tested down-migration *or* an explicit ADR justifying forward-only with a recovery plan.
- **Feature flags:** behind a flag for any change with user-visible behaviour or schema implications. Kill-switch documented in `RUNBOOKS.md`.
- **Mobile:** can't be rolled back at the store; mitigate with feature flags and forced-update flow.

## Secrets & configuration

- Secrets in **AWS Secrets Manager** + **GitHub Encrypted Secrets** for CI; never in repo, never in Slack, never in screenshots.
- A `.env.example` ships with every app at the root of its package; all required keys listed with safe placeholder values.
- Secret rotation: documented per provider in `RUNBOOKS.md`.

## Pre-launch checklist (per environment)

- [ ] DNS + TLS verified (HSTS, modern ciphers).
- [ ] WAF rules enabled at edge.
- [ ] Rate limits set (per-IP and per-token).
- [ ] Backups configured + restore drill executed.
- [ ] Logging/metrics/tracing reaching the platform.
- [ ] On-call rotation paged via test alert.
- [ ] Runbooks linked from alert pages.
- [ ] Privacy notice + DPA up to date.

## Open questions

- ECS vs EKS for v0.3.0 — see ADR-0008.
- Need for in-Kingdom partner beyond AWS Bahrain — see ADR-0007.
- Mobile OTA (e.g. EAS Update) policy if a hybrid app is later introduced.
