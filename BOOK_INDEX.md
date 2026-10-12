# BOOK INDEX — Maîtriser le Harness Engineering ↔ harness-lab (`book-exact-v4`)

Les tags `book-v4/checkpoint-*` sont les états pédagogiques du cours. Les deux tags `book-v4/demo-tck-123-*` matérialisent les états rouge et vert de la Partie 8. `main` ajoute uniquement la couche de navigation et de maintenance du compagnon au-dessus du dernier checkpoint.

| Partie | Tag | Artefacts principaux | Vérification |
|---|---|---|---|
| Baseline | `book-v4/checkpoint-01-no-harness` | service, tests, vérificateur local | `npm ci && npm test && npm run verify` |
| Partie 1 | `book-v4/checkpoint-02-minimal` | `CLAUDE.md`, Truth, plan minimal | `npm run verify` |
| Partie 2 | `book-v4/checkpoint-03-runtime-structured` | settings, rule, validation statique | `npm run verify` |
| Partie 3 | `book-v4/checkpoint-04-information-disciplined` | architecture, ADR, information model, State | `npm run verify` |
| Partie 4 | `book-v4/checkpoint-05-capabilities` | skill `/plan-ticket` + hook (échec renvoyé à Claude par exit 2) | `npm run verify` |
| Parties 5–6 | `book-v4/checkpoint-06-verified-orchestrated` | reviewer + paquet de preuves (`npm run evidence:tck-123`) | `npm run verify` |
| Partie 7 | `book-v4/checkpoint-07-secure` | sandbox + contrat de preuve sécurité + limites de plateforme | `npm run verify` |
| Partie 8 rouge | `book-v4/demo-tck-123-expected-failure` | erreur volontaire pricing | `npm test` → FAIL `11680` vs `11800` |
| Partie 8 vert | `book-v4/demo-tck-123-corrected` | correction ciblée + 3 régressions LOYALTY | `npm run verify` → PASS `11800` (6 tests) |
| Parties 9–10 | `book-v4/checkpoint-08-professional` | headless borné, CI, observabilité, runbook, closure | `npm run verify` + dry-run |

## Parcours TCK-123

```bash
git switch --detach book-v4/demo-tck-123-expected-failure
npm ci
npm test
# FAIL attendu : 11680 vs 11800

git switch --detach book-v4/demo-tck-123-corrected
npm ci
npm run verify
# PASS : 11800
```

## Rejouer tout le parcours

```bash
npm run replay:book   # un worktree jetable par tag, attentes déclarées dans le manifeste
```

## Couche support

`BOOK_INDEX.md`, `ALIGNMENT_MATRIX.md`, `BOOK_VERSION`, `docs/book-alignment-manifest.json`, `docs/maintainer/`, `scripts/validate-book-alignment.mjs` et `scripts/replay-checkpoints.mjs` servent à maintenir la correspondance livre ↔ dépôt. Ils ne font pas partie du projet construit par le lecteur dans les tags pédagogiques.

## Édition précédente

Les tags `book-exact-v3` (sans préfixe) restent disponibles et inchangés pour les lecteurs de l'édition précédente.
