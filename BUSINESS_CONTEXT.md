# BUSINESS_CONTEXT

> Personas, journeys, value propositions, and pricing logic for AZRI. The product team's source of truth.

## What AZRI is (and isn't)

AZRI is a **clinical workflow support and early-warning monitoring platform for epilepsy care**, designed Saudi-first.

- It **supports** patients, families, doctors, and institutions.
- It **assists** clinical decision-making; it does not replace it.
- It **helps monitor** signals and surface **early warnings**.
- It is **not** a diagnostic device.
- It does **not** dispatch emergency services on its own (yet — that's a v0.7.0+ partnership decision).

Language guardrails are enforced via [`SKILLS/healthcare_product.md`](./SKILLS/healthcare_product.md).

## Who AZRI serves

### Patients (primary)
People living with epilepsy in KSA / GCC — adults and, with guardian consent, minors. They want fewer surprises, more dignity, and a clear way to share what's happening with their doctor.

### Caregivers / family
Spouses, parents, adult children. They want reassurance without surveillance — and a clear path to help during an episode.

### Doctors (neurologists, epileptologists, GPs)
They want a defensible, time-saving view of what happened between visits, not another inbox.

### Institutions (hospitals, clinics, insurers)
They want population-level visibility, audit, integration, and procurement-friendly contracting.

## Personas (compressed)

| Persona | Goal | Pain | AZRI value |
| --- | --- | --- | --- |
| **Layla** — adult patient, Riyadh | Live without fear of the next episode | Anxious; episode logs are inconsistent | Dignified self-monitoring + early-warning support |
| **Ahmed** — caregiver father of teen | Know his daughter is okay at school | Constant worry; calls disrupt her dignity | Consent-scoped reassurance + alert relay |
| **Dr. Khalid** — neurologist | Make better adjustments faster | Patient recall is unreliable; PDFs lost in WhatsApp | Structured episode timeline + exportable report |
| **Hospital procurement** | Reduce risk and integrate cleanly | Vendor sprawl, unclear data flows | RBAC, audit, SSO, DPA-ready, KSA residency |

## Care journeys

### Patient onboarding
Sign up → consent (granular, in Arabic and English) → device pairing (Apple Watch / HealthKit) → quiet baseline period → first weekly summary.

### Doctor onboarding
Invite from institution or self-serve clinician sign-up → identity verification → workspace setup → first patient invitation → first report exported.

### Institution onboarding
Discovery → demo → pilot (sandbox tenant) → DPA + procurement → SSO + RBAC config → cohort import → live.

### Episode / alert journey
Signal anomaly detected → on-device confirmation step (avoid false positives) → patient notified gently → caregiver relay (per consent) → doctor visibility on next session → optional escalation if criteria met.

### Reporting / clinical review
Doctor opens timeline → filters by episode/severity/medication → annotates → exports a structured report (PDF + structured payload for EMR import in v0.5.0+).

## Value propositions

| Audience | One-line value |
| --- | --- |
| Patient | "Quiet, dignified monitoring that helps you and your doctor stay ahead of episodes." |
| Caregiver | "Be there when it matters — without taking away their independence." |
| Doctor | "A defensible view of what really happened between visits." |
| Institution | "Auditable, KSA-resident epilepsy monitoring that fits your workflow and procurement." |

## Pricing logic (target)

> Public pricing on `azri.ai` should reflect a real multi-tier offering. The intent below is product-level; final SKUs/copy live with marketing.

| Tier | Audience | Includes |
| --- | --- | --- |
| **Free / Personal** | Individual patients | Self-monitoring, basic logs, weekly summary |
| **Care+** | Patients + caregiver | Caregiver relay, richer reports, priority support |
| **Doctor** | Independent clinicians | Patient list, episode timeline, report export |
| **Clinic** | Small clinics | Multi-doctor org, SSO, basic audit, billing |
| **Enterprise / Hospital / Insurer** | Institutions | RBAC, audit, SSO, EMR integration, DPA, dedicated success |

### Current state vs. target

The pricing section shipped today in `@azri/content` (see
[`packages/content/src/data/azri.ts`](./packages/content/src/data/azri.ts),
`pricing.plans`) is deliberately a **mirror of the live `azri.ai` site**
— four tiers: `basic` ($9), `advanced` ($19), `insuranceDoctors` ($49),
`enterprise` (custom). The package's own `pricing.note` field records
this mirror relationship.

The five-tier target above is **aspirational product intent**, not a
shipped SKU set. Reconciling the two requires:

1. A marketing decision on final SKU naming (including Arabic naming —
   today's plan names are English labels used in both locales, which
   violates the Arabic-first principle in [`I18N_L10N.md`](./I18N_L10N.md)).
2. A trial-length decision for Care+.
3. A per-seat vs. per-active-patient decision for the Doctor tier.
4. A pricing model decision for the Insurer tier (per-member-per-month
   vs. outcome-linked).

All four are tracked in *Open questions* below. Until they are
resolved, the shipped content continues to mirror the live site and
must not be reshaped unilaterally by engineering. Once the marketing
decision is made, update `packages/content/src/data/azri.ts` pricing
in the same PR that updates the live site, and mention ADR-worthy
tradeoffs (e.g. moving from `$`-prefixed to `SAR`-prefixed pricing)
in [`DECISIONS.md`](./DECISIONS.md).

Conversion paths to instrument (see [`ANALYTICS.md`](./ANALYTICS.md)):
- Marketing → demo request
- Marketing → free patient sign-up → Care+ upgrade
- Marketing → "Talk to sales" → enterprise pilot
- Doctor referral → patient sign-up

## Trust posture

- Transparent about AI limitations.
- Transparent about data flows (one-page data map link in product).
- Patient-controlled consent at every escalation step.
- No advertising-derived monetization. Ever.

## Open questions

- Final SKU naming / Arabic naming for tiers (marketing decision).
- Trial length for Care+.
- Doctor tier: per-seat or per-active-patient pricing?
- Insurer pricing model: per-member-per-month vs outcome-linked.
