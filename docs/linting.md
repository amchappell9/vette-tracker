# Linting

`npm run lint` runs Oxlint using `.oxlintrc.json`. `npm run ts-lint` runs the separate TypeScript check. Formatting continues to use Prettier, including its Tailwind CSS plugin. For editor diagnostics, use the [Oxc extension or language server](https://oxc.rs/docs/guide/usage/linter/editors.html).

## Migration from ESLint

The starting configuration combined `eslint-config-next/core-web-vitals` and TanStack Query's recommended rules. The Oxlint configuration preserves their explicit severities, options, and file overrides, including generated-file exclusions and the `Image` accessibility mapping. Default correctness rules are disabled to avoid introducing unrelated lint policy changes.

Most checks use native Oxlint rules. JavaScript compatibility plugins retain:

- All seven configured TanStack Query rules.
- Next.js `no-location-assign-relative-destination`.
- React `no-deprecated`.
- React Hooks `config` and `gating`.

`react/require-render-return` is enabled explicitly even though Oxlint currently categorizes it as nursery. Native React Compiler checks are enabled explicitly as well. The JavaScript plugin bridge is currently alpha, and the compiler checks are experimental; Oxlint and the newly explicit Next.js, React, and Hooks compatibility plugin versions are pinned for controlled upgrades. See the [Oxlint plugin documentation](https://oxc.rs/docs/guide/usage/linter/js-plugins.html) and [built-in plugin documentation](https://oxc.rs/docs/guide/usage/linter/plugins).

The resulting configuration has 67 active rules versus 69 in the original TSX configuration. The two omitted rules, `react/jsx-uses-react` and `react/jsx-uses-vars`, only mark variables as used for ESLint's other rules. The project uses the automatic JSX transform and had no unused-variable lint rule enabled, so these do not represent lost diagnostics.

TanStack Query's `no-void-query-fn` requires TypeScript parser services. It was configured but inactive under the original ESLint setup, which did not enable type-aware linting; it remains configured but inactive with Oxlint's JavaScript bridge. Adding type-aware linting would be a separate policy change.

ESLint and `eslint-config-next` are no longer direct dependencies and there is no ESLint config or ESLint lint command. ESLint can still appear transitively because the compatibility plugins declare it as a peer dependency.

## Benchmark: October 15, 2026

Measured locally on an Apple M1 Pro, macOS arm64, Node.js v24.20.0. Baseline: commit `d0d821bd55b05e9757a60bc47793259a3addf0a4`, ESLint 9.39.5 with installed `eslint-config-next` 16.4.1. Migrated linter: Oxlint 1.88.0 with the compatibility plugins above.

| Linter |  Median | Minimum | Maximum |
| ------ | ------: | ------: | ------: |
| ESLint | 1.706 s | 1.622 s | 1.775 s |
| Oxlint | 1.038 s | 1.000 s | 1.057 s |

Oxlint was **1.64× faster**, reducing median wall time by **39.2% (0.668 s)**. These measurements include Node startup, configuration loading, and JavaScript plugin loading; they are not native-only linter timings.

Method:

1. Enumerate the original ESLint file set with `new ESLint().lintFiles(['.'])`. Exclude `eslint.config.mjs`, which is removed by the migration. This produces the same 109 files for both linters.
2. Invoke each CLI in a fresh Node process with that explicit file list and `--format json`: `node node_modules/eslint/bin/eslint.js <files> --format json` and `node node_modules/oxlint/bin/oxlint <files> --format json`.
3. Warm up each CLI once, then measure seven runs each, alternating execution order every round. Measure wall time around `spawnSync` with `performance.now()`. No lint cache is enabled; filesystem caches are warmed. Exclude npm/npx launcher overhead, installation, and warmup runs.
4. Check every measured invocation exits successfully and emits zero diagnostics.

Raw wall times in milliseconds:

- ESLint: 1774.546, 1673.142, 1756.353, 1716.954, 1622.214, 1705.711, 1657.209.
- Oxlint: 1050.777, 1037.671, 1056.910, 1035.637, 1000.009, 1023.065, 1045.190.

The original directory lint passed on 110 files; the final directory lint passes on 109 after removing the ESLint config. A temporary TSX fixture produced the same 16 intended violations in both linters, covering conditional Hooks, effect dependencies, query keys, unstable query clients and mutation dependencies, query rest destructuring, infinite-query property order, global mutation, impure rendering, deprecated React APIs, missing render returns, Next.js navigation and images, accessibility, and JSX keys. The fixture was removed after verification. This is representative compatibility validation, not proof that every edge case behaves identically.
