# Version

**Current version:** `0.1.0`
**Release name:** Repository Operating System Baseline
**Release date:** 2026-04-22

## Semantic versioning policy

AZRI follows [SemVer 2.0.0](https://semver.org/).

| Bump | Use for |
| --- | --- |
| **MAJOR** (`x.0.0`) | Breaking API, schema, or auth contract changes; incompatible product/data migrations |
| **MINOR** (`0.x.0`) | Backwards-compatible features, new modules, new docs systems, infra/observability maturity, analytics additions |
| **PATCH** (`0.0.x`) | Backwards-compatible fixes, doc improvements, copy fixes, dependency bumps with no behavioural impact |

### Pre-1.0 rules
While AZRI is `0.x.y`:
- The public surface area is **not yet stable**.
- Minor bumps may include refinements that would otherwise be major.
- Each minor bump must still ship with a migration note in `CHANGELOG.md` if any behaviour changes.

### Release tags
- Tag format: `v<MAJOR>.<MINOR>.<PATCH>` (e.g. `v0.1.0`).
- Pre-releases: `v0.2.0-rc.1`, `v0.2.0-beta.1`.
- See [`RELEASE_PROCESS.md`](./RELEASE_PROCESS.md) for the full flow.

## Version history (summary)
| Version | Date | Theme |
| --- | --- | --- |
| `0.1.0` | 2026-04-22 | Repository operating system, SKILLS framework, GitHub templates |

Full details in [`CHANGELOG.md`](./CHANGELOG.md).
