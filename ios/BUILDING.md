# Building AZRI for iPhone + Apple Watch

> Practical step-by-step for opening this scaffold in Xcode on macOS.

## 1. Create a new Xcode project

1. File → New → Project → **iOS App**
2. Product Name: `AzriApp`
3. Team: your Apple Developer team (required for HealthKit).
4. Organization Identifier: `com.example.azri` (replace with a real one
   owned by AZRI when available).
5. Interface: SwiftUI
6. Language: Swift
7. Minimum Deployments: iOS **17.0** or later.
8. Create the project inside this `ios/` directory so the existing
   Swift sources can be referenced in place.

## 2. Add the Watch App target

1. File → New → Target → **Watch App** (for the existing iOS app).
2. Product Name: `AzriWatch`
3. Minimum Deployments: watchOS **10.0** or later.
4. Xcode will create an `AzriWatch Watch App` folder. We already have
   Swift sources matching that path — replace Xcode's generated
   `AzriWatchApp.swift` / `ContentView.swift` with the committed
   versions.

## 3. Add the committed Swift sources

Right-click each target group in Xcode → **Add Files to "AzriApp"…**:

- Target `AzriApp`:
  - `ios/Shared/*.swift`
  - `ios/AzriApp/*.swift`
  - `ios/AzriApp/Services/*.swift`
- Target `AzriWatch Watch App`:
  - `ios/Shared/*.swift`  (✅ tick both targets)
  - `ios/AzriWatch Watch App/*.swift`
  - `ios/AzriWatch Watch App/Services/*.swift`

Choose **"Create groups"** (not folder references) so Xcode-native
refactors behave. Do **not** copy the files — reference them in place.

## 4. Configure capabilities

On each target → Signing & Capabilities → **+ Capability**:

- **HealthKit** (both targets). Leave "Clinical Health Records" *off*
  for v0.4.0.
- Background Modes (iOS only): enable *Background fetch* and
  *Background processing* for the passive-signal use case.

Merge the keys from `AzriApp.entitlements` / `AzriWatch.entitlements`
into Xcode's generated entitlements. Xcode will own the file from
this point on.

## 5. Configure Info.plist usage descriptions

Copy the keys from `Info-iOS.plist` and `Info-Watch.plist` into each
target's Info settings. In particular:

- `NSHealthShareUsageDescription` — plain Arabic + English; mirrors
  `PRIVACY_NOTICE.md`.
- `NSHealthClinicalHealthRecordsShareUsageDescription` — leave out
  until we actually request clinical records.
- `NSLocationWhenInUseUsageDescription` — only if/when we add location
  features; not today.

## 6. Build + run

- Scheme `AzriApp` → iPhone 15 simulator → Run.
- Scheme `AzriWatch Watch App` → Apple Watch simulator paired with
  the above iPhone → Run.
- First launch will prompt for HealthKit permission. Approving it
  should surface a heart-rate tile within ~10 seconds if the simulator
  has sample data.

## 7. Troubleshooting

- "Invalid entitlements" → make sure the bundle identifier matches a
  provisioning profile that has HealthKit enabled.
- "No heart-rate samples" → on the watch simulator, generate synthetic
  samples from *Features → Health → Add Heart Rate Data*.
- Watch Connectivity silence → both apps must be installed on a paired
  simulator and launched once; the session activates on app foreground.
