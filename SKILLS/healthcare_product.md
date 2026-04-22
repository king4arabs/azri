# SKILLS — Healthcare Product

## Purpose
Talk and build like healthcare professionals. Words shape trust; trust shapes outcomes.

## What good looks like
- Copy is precise, careful, and honest.
- Patients understand what AZRI does and what it doesn't.
- Clinicians see AZRI as a defensible workflow tool.
- Marketing doesn't bleed into clinical surfaces.
- Edge cases (children, emergencies, comorbidities) are designed for, not ignored.

## Language guardrails

### Use
- "supports clinical decision-making"
- "assists doctors in"
- "helps monitor"
- "early-warning support"
- "may help detect patterns"
- "complements your medical care"

### Avoid
- "diagnoses" (we don't)
- "prevents seizures" (we don't claim to)
- "replaces your doctor"
- "FDA / SFDA approved" (only if literally true)
- "guaranteed"
- "AI-powered cure"
- "100% accurate"
- Comparative claims without sourced evidence

### Tone
- Calm, plain, respectful.
- Avoid medical jargon in patient-facing surfaces; use it precisely in clinician surfaces.
- Translate carefully — Arabic medical terminology is reviewed by a clinician, not a generic translator.

## Healthcare-critical design patterns

- **Consent** is granular, revocable, in plain language, with examples of what data is shared and with whom.
- **Alerts** distinguish between "informational," "needs attention," and "potential emergency" without being alarming when not needed.
- **Emergency guidance** clearly tells the user to call local emergency services for medical emergencies (KSA: **997 ambulance / 911 unified**).
- **Data ownership** language affirms that the patient owns their data.
- **AI explanations** state model boundaries and the human in the loop.

## Edge cases to design for
- Pediatric patients with guardian consent.
- Patients with multiple caregivers (spouse, parent, adult child).
- Patients who lose access (forgotten password, lost device) without losing data dignity.
- Clinician handoffs across institutions.
- Patients during travel / Hajj / Umrah.

## How to audit / test
- Healthcare-wording check on every PR (template gate).
- Quarterly clinical advisor review of patient & clinician copy.
- Plain-language readability check for patient surfaces.

## How to scale
- Glossary maintained in Arabic + English with clinician sign-off.
- Editorial review board for sensitive copy changes.
- Patient advisory input on major UX changes.

## AZRI-specific notes
- This product is positioned as **workflow support and early-warning monitoring**, not a regulated medical device. Re-evaluate scope only with leadership + legal + clinical sign-off.
- Emergency path: clear, redundant, never fancy.
- Caregiver visibility is **always** patient-controlled, never automatic.

## Open questions
- Clinical advisor cadence and compensation.
- Pediatric-specific copy variants.
- Public glossary publication timing.
