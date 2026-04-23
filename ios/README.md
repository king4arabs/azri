# AZRI iOS + Apple Watch companion

> **Scaffold — requires Xcode on macOS to build.** The Swift sources
> committed here form a structured starting point. Xcode project files
> (`.xcodeproj` / `.xcworkspace`) are *not* committed; they are
> regenerated locally by the developer on macOS. See
> [*Building locally*](#building-locally) below.

The iOS app is the **patient companion**. The watchOS app is the
**Apple Watch passive-signal companion** — the device closest to the
person.

## Why this is a scaffold, not a finished app

- The target hosts an Xcode build (macOS 14+ / Xcode 15+). This
  repository runs CI on Linux, so building and code-signing cannot
  happen here. Xcode Cloud or a self-hosted macOS CI runner is needed
  once the iOS app ships in `v0.4.0`.
- Auth (ADR-0004) has not been decided, so the API client is a typed
  stub that hits the public `/version` endpoint only.
- HealthKit entitlements and App Store metadata are **intentionally not
  fabricated**. The Info.plist snippets here are templates; real
  entitlements, bundle identifiers, Team IDs, provisioning profiles,
  and privacy questionnaire answers are completed by a human.
- The Watch app is deliberately minimal: it proves the HealthKit
  authorization flow, renders a passive-signal status view, and wires
  a companion transfer back to the phone. It does **not** interpret
  clinical signals (see `AI_TRANSPARENCY.md`).

## Layout

```
ios/
├── README.md                                   this file
├── BUILDING.md                                 how to open in Xcode
├── .gitignore                                  Xcode artifacts
├── Info-iOS.plist                              iOS app usage descriptions (template)
├── Info-Watch.plist                            watchOS app usage descriptions (template)
├── AzriApp.entitlements                        iOS entitlements (template)
├── AzriWatch.entitlements                      watchOS entitlements (template)
├── Shared/
│   └── AzriBrand.swift                         brand/locale helpers shared by both targets
├── AzriApp/                                    iPhone app target
│   ├── AzriApp.swift                           @main entry
│   ├── ContentView.swift                       root view
│   └── Services/
│       ├── APIClient.swift                     typed client for @azri/api
│       ├── HealthKitService.swift              HealthKit auth + sample observation
│       └── WatchConnectivityService.swift      relay with the Watch companion
└── AzriWatch Watch App/                        watchOS app target
    ├── AzriWatchApp.swift                      @main entry
    ├── ContentView.swift                       root view
    └── Services/
        └── HealthKitService.swift              HealthKit auth + sample observation
```

## What the code does today

- **HealthKit authorization.** The iPhone and Watch both request read
  access to `heartRate`, `heartRateVariabilitySDNN`, `stepCount`, and
  `oxygenSaturation`. Write access is **not** requested — AZRI observes,
  it does not prescribe.
- **Passive-signal read.** A sample query pulls the most recent
  `heartRate` sample and renders it on both surfaces as a read-only
  tile.
- **API client.** `APIClient.version()` hits `GET /version` on the AZRI
  API scaffold. No authenticated endpoints are called (none exist yet).
- **Watch connectivity.** The phone relays a single "hello" payload to
  the Watch to prove the bridge. No PHI crosses the boundary.

## What it does NOT do (and won't, until design is signed off)

- Raise alerts or escalations from the device.
- Send any PHI to third parties.
- Interpret seizure signals. Signal interpretation is deterministic
  and clinician-reviewed; wearable ML lives on the server tier after
  `v0.6.0` guardrails land (see `AI_TRANSPARENCY.md`).
- Replace 997 / 911 in an emergency. The UI tells the user to call
  emergency services for emergencies.

## Building locally

Requirements: macOS 14+, Xcode 15+.

```bash
# 1. From the repo root:
cd ios

# 2. Create a new Xcode "iOS App" project called "AzriApp" targeting
#    iOS 17+ with SwiftUI and Swift 5.9+. Add a "Watch App" target
#    named "AzriWatch" targeting watchOS 10+.

# 3. Add existing files (do NOT copy — reference in place):
#    - All .swift files under Shared/
#    - All .swift files under AzriApp/
#    - All .swift files under "AzriWatch Watch App"/

# 4. Set the Info.plist usage description keys listed in
#    Info-iOS.plist / Info-Watch.plist on each target.

# 5. Enable the HealthKit capability on each target and add the
#    entitlements from AzriApp.entitlements / AzriWatch.entitlements.

# 6. Build + run on the iPhone + Watch simulator pair.
```

See [`BUILDING.md`](./BUILDING.md) for the step-by-step Xcode setup with
suggested bundle identifiers and capabilities.

## Compliance posture

Before any App Store submission:

- [ ] App Privacy answers completed accurately (no data sold, no PHI
      to third-party AI, etc.). Draft from `PRIVACY_NOTICE.md`.
- [ ] App Review metadata avoids diagnostic language (see
      `SKILLS/healthcare_product.md`).
- [ ] HealthKit data usage descriptions are in plain Arabic + English.
- [ ] Minimum iOS / watchOS versions match the support matrix in
      `DEPLOYMENT.md`.
- [ ] Crash reporting scrubs PHI before upload.
- [ ] `privacy@azri.ai` mailbox live.
