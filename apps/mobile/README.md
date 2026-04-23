# @azri/mobile

AZRI patient mobile app — Expo + React Native. Bilingual + RTL flip,
consumes `@azri/content` and `@azri/contracts`. Same brand, same wire
shapes as the iOS native app and the Wear OS app.

## Run

```bash
cd apps/mobile
npm install
npm run start            # press i for iOS simulator, a for Android
EXPO_PUBLIC_API_BASE_URL=https://api.dev.azri.local npm run start
```

## Test

The contract-shaped logic (e.g. `IngestQueue`) is tested with Node's
built-in test runner via `tsx`:

```bash
npm test
```

UI is exercised by Detox / Maestro in CI — wired with the rest of the
mobile harness in v0.5.0. Until then, the focus is on the logic that
controls what goes onto the wire.

## File map

| Path | Purpose |
| --- | --- |
| `App.tsx` | Entry point. Forces RTL when locale is Arabic. |
| `src/i18n/` | Locale + bilingual string lookup; uses `expo-localization`. |
| `src/navigation/` | Bottom-tab shell. |
| `src/screens/` | Home, Episodes, Trends, Alerts. |
| `src/ingest/` | `IngestQueue` shared with web/native via `@azri/contracts`. |

## Why two mobile codebases (Expo + native iOS)?

The native iOS app (`apps/ios`) owns deep HealthKit + Watch
integration; Expo is great for iteration but cannot ship the watchOS
companion in a way that meets our latency targets for on-wrist alerts.
The Expo build is the patient experience for Android until a native
Android Health Connect path is justified — see `ARCHITECTURE.md`.
