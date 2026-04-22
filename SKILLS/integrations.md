# SKILLS — Integrations

## Purpose
Choose, integrate, and maintain third-party services that match AZRI's safety, privacy, and reliability bar.

## What good looks like
- Vendors picked with eyes open on data flows, residency, costs, and exit ramps.
- Integrations isolated behind a typed interface so swapping providers is a one-file change.
- BAA-equivalent in place for any vendor touching PHI.
- Single-vendor dependencies on the emergency path are forbidden.

## Selection criteria (rubric)

| Dimension | Question |
| --- | --- |
| Data flow | What data leaves AZRI? Of what classification? With what consent? |
| Residency | Where is data stored / processed? KSA acceptable? |
| Security | SOC 2 / ISO 27001 / equivalent? Pen-test reports? |
| BAA-equivalent | Available? Already signed by them with peers? |
| Reliability | Public SLA? Status page history? |
| Cost | Predictable? Caps possible? |
| Exit | How hard is it to switch? Export available? |
| Bus factor | Vendor stability, funding, roadmap |

Run [`gh-advisory-database`](https://github.com/advisories) check on every new dependency from supported ecosystems.

## Standards by category

### Auth (Clerk, Auth0, SuperTokens, Cognito)
- MFA, SSO (SAML/OIDC), audit log access, session management, region of data storage.

### Payments (Stripe, Moyasar)
- KSA-native methods (Mada, Apple Pay KSA) via Moyasar.
- Stripe for global / institutional invoicing.
- PCI scope minimized via hosted fields.

### Email/Notifications (Resend, SES, SendGrid, Postmark, SMS)
- DKIM/SPF/DMARC aligned.
- No PHI in transactional emails beyond what the recipient already knows about themselves.
- KSA-compliant SMS sender registration when sending in KSA.

### Cloud (AWS primary)
- KSA-residency-friendly defaults.
- IAM least-privilege via short-lived role assumption.

### Analytics (PostHog primary, Plausible marketing)
- PHI-safe payloads (`ANALYTICS.md`).
- Cookieless on marketing site by default.

### Monitoring (Sentry, Datadog/Grafana)
- PII scrubbing at SDK layer.
- Trace context propagation to vendor.

### AI (OpenAI, Anthropic, Hugging Face, on-tenant)
- BAA-equivalent + no-training-on-input + de-identified inputs.
- Provider abstracted (`SKILLS/ai.md`).

### Search (Meilisearch, Typesense, Algolia)
- Self-host preferred for any index containing tenant data.
- Algolia evaluated for marketing search only.

### Edge / Security (Cloudflare)
- WAF, DDoS, bot mgmt, rate limiting at edge.

### Automation (Zapier, Make, n8n)
- No PHI through public no-code platforms unless self-hosted (n8n) and reviewed.

### Support (Intercom, Crisp, Zendesk)
- Conversations may contain PHI by accident — require BAA-equivalent.

## Anti-patterns
- "Quick PoC" with a vendor that ends up holding PHI without an agreement.
- Hardcoding a vendor SDK into business logic.
- Using a single vendor for emergency notifications.
- Sharing vendor API keys across environments.

## How to implement
- Wrap every vendor in a typed interface in `packages/<vendor>` or `api/integrations/<vendor>`.
- Document the data flow in `DATA_MODEL.md` for any new PHI exposure.
- Add the integration to the vendor inventory; tag classification.

## How to audit / test
- Vendor inventory reviewed quarterly.
- Contract / SLA renewals tracked.
- Periodic test of "what if vendor X is down?" for critical paths.

## How to scale
- Multi-vendor strategy for emergency notifications and other Sev1 paths.
- Per-tenant vendor pinning for institutional customers needing it.

## Open questions
- Final pick for transactional email.
- KSA SMS provider.
- Status page provider.
