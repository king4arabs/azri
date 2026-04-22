# SECURITY

> Security baseline and responsible disclosure for AZRI. Healthcare context = stricter defaults than typical SaaS.

## Responsible disclosure

If you believe you have found a security or privacy issue:

- **Do not open a public GitHub issue.**
- Email **`security@azri.ai`** with: a description, steps to reproduce, impact, and any PoC.
- Allow up to **5 business days** for an initial response.
- We commit to: acknowledge, investigate, remediate critical issues within **30 days**, credit the reporter (if desired) in `CHANGELOG.md`.
- Please do **not**: access patient or production data, run automated scanning beyond what's necessary, or disrupt service.

A formal `SECURITY.md` GitHub policy and `security.txt` will be published with the marketing site in v0.2.0.

## Threat model (initial)

Top threats AZRI must defend against:

1. **Unauthorized access to PHI** — strongest priority.
2. **Account takeover** of clinicians or institution admins.
3. **Privilege escalation** across roles or tenants.
4. **Data exfiltration** via export endpoints, screen sharing, or supply chain.
5. **Insecure third-party integrations** (HealthKit pipeline, payments, AI providers).
6. **Alert path tampering** — false suppression, false amplification, replay.
7. **Insider misuse** — unauthorised support agents looking up patients.
8. **Supply-chain compromise** — malicious dependency, leaked CI token.

## Baseline controls

### Identity & access
- MFA mandatory for clinicians, institution admins, AZRI staff.
- SSO (SAML/OIDC) for institutional customers.
- Session timeouts shorter than typical SaaS; idle re-auth for sensitive views.
- Step-up auth for: viewing raw signals, exporting reports, audit log access, role changes.
- Default-deny RBAC + ABAC for consent-scoped data.

### Data protection
- TLS 1.2+ everywhere (TLS 1.3 preferred); HSTS on all hostnames.
- AES-256 at rest (DB, object storage, backups).
- Field-level encryption for highest-sensitivity columns (clinical notes, raw signals).
- Signed URLs for media; **no public buckets, ever**.
- Tenant isolation enforced at the data layer via Postgres RLS.
- Backups encrypted; restore drills quarterly.

### Application security
- Input validation at boundaries; output encoding by framework default.
- Rate limiting at edge (Cloudflare) and app (per-token, per-IP).
- CSRF protection on session-based flows; SameSite=Strict for sensitive cookies.
- CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy set.
- File upload scanning for malware before storage.

### Secrets
- Stored in AWS Secrets Manager + GitHub Encrypted Secrets.
- **Never in repo, never in logs, never in screenshots, never in Slack.**
- Pre-commit hook + CI scan (gitleaks/trufflehog) blocks secrets.
- Rotation cadence: 90 days for app secrets, 30 days for highly-privileged tokens, immediate on suspicion.
- All third-party API keys scoped least-privilege.

### Audit logging
- Append-only audit log in a separate schema with longer retention than primary data.
- Captures: who, what, when, from where, on which subject, with what justification (where applicable).
- Tamper-evident (hash-chained or WORM storage at v0.5.0).
- Audit records themselves never contain PHI payloads — only IDs and metadata.

### Vendor & supply chain
- Dependency updates via Renovate/Dependabot; weekly review.
- CodeQL + container image scanning in CI.
- SBOM generated per release (CycloneDX) starting v0.3.0.
- Each new third-party dependency screened against the GitHub advisory database before adoption.

### Endpoint & people
- AZRI staff use managed devices; disk encryption + screen lock + EDR.
- Background checks for staff with PHI access.
- Onboarding/offboarding checklist in `RUNBOOKS.md`.

## AI-specific security

- LLM prompts containing PHI must never be sent to third-party providers without a signed BAA-equivalent agreement *and* explicit user consent.
- Prefer on-tenant or de-identified inference paths.
- All AI inferences logged in the audit trail with model + version + input hash.
- Prompt injection defenses: structured tool calls, content-source labelling, output validation against schema.
- See `SKILLS/ai.md` for full guardrails.

## Incident response

See [`INCIDENT_RESPONSE.md`](./INCIDENT_RESPONSE.md) for severity matrix, comms protocol, and postmortem template.

## Compliance posture

See [`COMPLIANCE_READINESS.md`](./COMPLIANCE_READINESS.md). **No certifications are claimed prematurely.**

## Periodic activities

| Activity | Cadence |
| --- | --- |
| Dependency review | Weekly |
| Access review | Quarterly |
| Backup restore drill | Quarterly |
| Pen test (external) | Annually + after major architecture changes |
| Tabletop incident exercise | Semi-annually |
| Threat-model refresh | Annually |

## Open items

- Confirm pen-test partner before v0.7.0.
- Decide BAA-equivalent template for AI providers.
- Adopt HSM-backed key management when v0.5.0 institutional tier ships.
