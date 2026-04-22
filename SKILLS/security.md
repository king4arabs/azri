# SKILLS — Security

## Purpose
Make AZRI secure by default. Every engineer is a security engineer; the security team raises the bar.

## What good looks like
- Threats anticipated; controls layered; default deny everywhere.
- Secrets handled like radioactive material.
- Audit log answers "who did what, when, on which subject" in seconds.
- Pen tests find papercuts, not foundational gaps.

## Standards
- **AuthN:** MFA mandatory for clinicians, institution admins, AZRI staff.
- **AuthZ:** RBAC + ABAC for consent-scoped data; default deny.
- **Step-up auth** for: viewing raw signals, exporting reports, audit log access, role changes, billing.
- **Session security:** short timeouts; idle re-auth on sensitive views; SameSite cookies.
- **Transport:** TLS 1.2+ (1.3 preferred); HSTS on all hostnames.
- **At rest:** AES-256; field-level for `Sensitive`+ data.
- **Secrets:** never in repo, logs, screenshots, Slack; managed in AWS Secrets Manager.
- **Dependency hygiene:** Renovate/Dependabot weekly; Highs not deferred without waiver.
- **CodeQL** + **container scanning** in CI; SBOM per release (CycloneDX).
- **Headers:** CSP (strict), X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Rate limiting:** edge + per-token; tighter on sensitive endpoints.
- **Audit log:** append-only, separate schema, longer retention; tamper-evident from v0.5.0.
- **Pre-commit + CI scans:** gitleaks/trufflehog block secrets.

## Anti-patterns
- Long-lived API keys with broad scopes.
- "It's only staging" excuses for weak controls.
- Wildcard CORS in production.
- Storing PHI in URL params, logs, or analytics.
- Custom crypto (use vetted libraries, KMS-managed keys).
- Disabling MFA for "demo accounts."

## How to implement
- Threat model per new surface (lightweight STRIDE).
- Add audit log emission with the endpoint that introduces a new PHI access pattern.
- Pre-commit hooks + CI scans configured at scaffold time.
- Use the platform's secrets injection (no `.env` files in production).

## How to audit / test
- RBAC matrix tests.
- Negative tests: confirm denied paths are denied with correct status & no info leak.
- Annual external pen test; remediation tracked publicly internally.
- Quarterly access review.
- Tabletop incident exercise semi-annually.

## How to scale
- Move to HSM-backed keys at v0.5.0.
- Tenant-scoped KMS keys for institutional customers.
- Privileged Access Management (PAM) tool for break-glass workflows.

## AZRI-specific notes
- Patient safety overrides convenience every time.
- AI provider calls are a third-party data flow → BAA-equivalent + de-identification + audit.
- PHI never sent to ad networks, marketing analytics, or LLM training pipelines.

## Open questions
- Adopt a SIEM at what scale?
- Bug bounty program timing (post v0.7.0 likely).
- Internal phishing exercise cadence.
