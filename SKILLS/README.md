# SKILLS

> The SKILLS framework is AZRI's cross-functional standards library. Each file teaches future contributors **what good looks like**, **standards & anti-patterns**, **how to implement, audit, test, and scale**, **region-specific considerations**, and **AZRI-specific examples**.

This framework is a living document. Update it whenever the bar moves.

## How to use SKILLS

- **Joining AZRI?** Read `SKILLS/README.md` (this file) and the SKILLS file for your discipline. Then read `SKILLS/healthcare_product.md` and `SKILLS/privacy_data_governance.md`.
- **Reviewing a PR?** The relevant SKILLS file is your rubric.
- **Auditing a surface?** Use the SKILLS file as a checklist.
- **Proposing a new standard?** Open a PR that updates the SKILLS file. New standards must include rationale and an example.

## Files

| File | Audience | Core question |
| --- | --- | --- |
| [`frontend.md`](./frontend.md) | Web engineers | How do we build accessible, RTL-aware, fast UI? |
| [`backend.md`](./backend.md) | API & service engineers | How do we build safe, observable, multi-tenant services? |
| [`database.md`](./database.md) | Data engineers, backend | How do we model, migrate, and protect data? |
| [`devops.md`](./devops.md) | DevOps / SRE | How do we deliver and run AZRI safely? |
| [`security.md`](./security.md) | All engineers | How do we keep AZRI secure by default? |
| [`qa.md`](./qa.md) | QA, all engineers | How do we test what matters? |
| [`ai.md`](./ai.md) | AI/ML engineers | How do we use AI without harm? |
| [`product.md`](./product.md) | Product managers | How do we decide what to build for AZRI? |
| [`business.md`](./business.md) | Founders, leadership | How does AZRI win and sustain? |
| [`marketing.md`](./marketing.md) | Marketing | How do we grow honestly in healthcare? |
| [`operations.md`](./operations.md) | Ops, SRE | How do we run AZRI day-to-day? |
| [`compliance.md`](./compliance.md) | Legal, security, leadership | How do we stay compliance-ready without overclaiming? |
| [`integrations.md`](./integrations.md) | All engineers | How do we choose, integrate, and maintain third-party services? |
| [`saudi_gcc_readiness.md`](./saudi_gcc_readiness.md) | Everyone | How do we serve KSA & GCC excellently? |
| [`ux_ui.md`](./ux_ui.md) | Designers, design eng | How do we design with dignity and clarity? |
| [`accessibility.md`](./accessibility.md) | Designers, engineers | How do we meet WCAG 2.2 AA and beyond? |
| [`analytics.md`](./analytics.md) | PM, growth, data | How do we learn from usage without breaching privacy? |
| [`observability.md`](./observability.md) | All engineers | How do we know what's happening in prod? |
| [`healthcare_product.md`](./healthcare_product.md) | Everyone | How do we talk and build like healthcare professionals? |
| [`privacy_data_governance.md`](./privacy_data_governance.md) | Everyone | How do we treat patient data like the trust it is? |
| [`release_management.md`](./release_management.md) | Eng leads | How do we ship safely and predictably? |

## Standards-file structure

Each SKILLS file follows this shape:

1. **Purpose** — one paragraph.
2. **What good looks like** — short, concrete.
3. **Standards** — bulleted, enforceable.
4. **Anti-patterns** — equally explicit.
5. **How to implement** — practical pointers.
6. **How to audit / test** — what reviewers and tests check.
7. **How to scale** — what changes at 10×.
8. **AZRI-specific notes** — patient/clinical/regional considerations.
9. **Open questions** — honest unknowns.

## Cross-cutting threads

Three threads run through every SKILLS file:

1. **Patient safety & dignity** above all.
2. **Privacy by design** — minimize, classify, segregate, audit.
3. **Bilingual / RTL excellence** — Arabic-first, never bolted on.
