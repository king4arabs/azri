# COMPLIANCE_READINESS

> Honest posture on AZRI's compliance trajectory. **No certifications are claimed prematurely. No fabricated approvals.**

## Posture statement (today, v0.1.0)

AZRI has **no certifications** and **no regulatory approvals** at this time. This document describes the **direction of travel** and the controls being designed in to make future audits pass.

Marketing, sales, product, and engineering must align messaging with this reality. See [`SKILLS/healthcare_product.md`](./SKILLS/healthcare_product.md) for language guardrails.

## Frameworks tracked

| Framework | Why it matters | Status |
| --- | --- | --- |
| **Saudi Personal Data Protection Law (PDPL)** | Primary jurisdiction | Posture targeted; legal review scheduled before v0.7.0 launch |
| **Saudi NHIC / SDAIA / NCA guidance** | Healthcare & data residency | Tracked; plain-language summary maintained internally |
| **GDPR** | EU users, partners | Posture targeted; not yet certified |
| **HIPAA-style controls** | US partners, enterprise readiness | Designing controls to be HIPAA-equivalent; **not** a US-regulated entity yet |
| **ISO/IEC 27001** | Enterprise security | Targeted by v0.9.0 |
| **ISO/IEC 27701** | Privacy management | Targeted post-27001 |
| **SOC 2 Type II** | US enterprise sales | Considered post-v0.9.0 |
| **Medical device regulation (KSA SFDA / FDA / CE)** | Only if/when AZRI claims medical-device functionality | **Not in scope today.** AZRI is positioned as workflow support and early-warning monitoring, not a regulated medical device. Re-evaluation triggered if claims change. |

## Designed-in controls (mapped)

- **Access control:** RBAC + MFA + step-up auth → ISO A.9, HIPAA §164.312(a)
- **Audit log:** Append-only with tamper evidence → HIPAA §164.312(b), ISO A.12.4
- **Encryption in transit & at rest:** TLS 1.2+, AES-256, field-level for highest sensitivity → ISO A.10
- **Data minimization & retention:** Documented in `DATA_MODEL.md` → PDPL, GDPR Art. 5
- **Right to access / erasure:** Per-tenant export + cryptographic shred → PDPL, GDPR Arts. 15 & 17
- **Vendor management:** BAA-equivalent for third-party PHI processors → HIPAA §164.308(b)
- **Incident response:** Severity matrix + comms protocol + postmortem → ISO A.16, HIPAA §164.308(a)(6)
- **Business continuity / DR:** RTO/RPO targets in `OPERATIONS.md`; quarterly drills → ISO A.17

## Data residency

- KSA-residency-friendly hosting from day one (AWS `me-south-1` Bahrain initially; in-Kingdom partner evaluated for institutional customers requiring it). See ADR-0007.
- Per-tenant region pinning available at v0.5.0+ for institutional contracts.

## Consent & lawful basis

- Patient/caregiver consent collected explicitly, granular by data class, revocable at any time.
- Lawful basis for processing recorded per data class; reviewed by legal before v0.2.0 launch.

## DPIA / privacy impact

- A Data Protection Impact Assessment (DPIA) is performed before any new processing activity touching PHI (e.g. introducing a new AI provider, a new wearable integration).
- DPIA template tracked in this repo at `compliance/dpia-template.md` once first DPIA is performed (target: v0.2.0).

## Vendor risk

- Vendor inventory maintained; each vendor classified by data exposure.
- BAA-equivalent agreement required for any vendor processing PHI.
- Single-vendor dependency on the **emergency alert path** is forbidden.

## What we will not do

- Claim certifications we don't hold.
- Claim diagnostic capability.
- Imply regulatory approval that does not exist.
- Use marketing language that could mislead patients or clinicians about clinical efficacy.

## Open items

- Engage Saudi privacy/healthcare counsel before v0.2.0 production.
- ISO 27001 readiness consultant scoped for v0.7.0 prep.
- Decide on a compliance evidence platform (Drata / Vanta / Secureframe) at v0.5.0.
- Confirm pediatric data handling rules where minors are subjects (guardian consent flows).
