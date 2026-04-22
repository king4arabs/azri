# SKILLS — DevOps / SRE

## Purpose
Deliver and run AZRI safely. Reproducible infrastructure, observable services, fast and reversible deploys.

## What good looks like
- All infrastructure is code; no production click-ops.
- Any environment can be re-created from `main` + secrets.
- Deploys are boring, frequent, reversible.
- Runbooks exist, are tested, and are linked from alerts.
- SLOs guide priorities; toil is tracked and reduced.

## Standards
- **IaC:** Terraform; modules versioned; `terraform plan` posted on PRs touching infra.
- **CI/CD:** GitHub Actions; reusable workflows; required reviewers for `production`.
- **Containers:** Distroless or minimal base images; SBOM generated per build.
- **Registry:** ECR (or equivalent); image scanning on push.
- **Compute:** ECS Fargate for v0.2.0–v0.3.0 (ADR-0008); revisit EKS later.
- **Secrets:** AWS Secrets Manager + GitHub Encrypted Secrets; rotation cadence in `SECURITY.md`.
- **DNS / TLS:** managed; HSTS preload-eligible.
- **Edge:** Cloudflare for WAF / DDoS / rate limiting.
- **Region:** AWS `me-south-1` primary (KSA-residency-friendly); DR region documented.
- **Observability:** OpenTelemetry SDK + Datadog/Grafana; no service ships without dashboards & alerts.
- **Cost tags:** every resource tagged `env`, `service`, `owner`, `tenant_class`.

## Anti-patterns
- One-off shell scripts run by humans in production.
- Long-lived AWS access keys instead of OIDC + short-lived role assumption.
- Shared production credentials.
- Alerts that page without runbooks.
- Deploys that aren't easy to roll back.
- Mixing prod and non-prod workloads on the same cluster.

## How to implement
- Use the IaC module template; PR `plan` output reviewed by infra owner.
- Wire SLO-based alerts during the same PR as the new endpoint.
- Add the runbook in `RUNBOOKS.md` before merging the alert.
- Set up a synthetic monitor for any new public surface.

## How to audit / test
- `terraform validate` + `tflint` + `checkov` in CI.
- Drift detection nightly; Slack alert on diff.
- Quarterly DR drill; document outcomes.
- Quarterly access review of cloud accounts.

## How to scale
- Auto-scaling per service with conservative defaults.
- Per-tenant rate budgets for noisy-neighbor protection.
- Separate compute & data planes for emergency notification path.
- Multi-region active-passive then active-active when traffic justifies it.

## AZRI-specific notes
- KSA data residency is a hard constraint; review per-resource on every IaC PR.
- Emergency notification path runs in a dedicated, redundant topology.
- BAA-equivalent vendor list maintained; using a non-listed provider for PHI is a Sev2 by default.

## Open questions
- ECS vs EKS endgame.
- OIDC federation for all CI roles (no static keys).
- Service mesh (Istio/Linkerd) — likely overkill until v0.7.0+.
