# BOOK INDEX — Maîtriser le Harness Engineering ↔ harness-lab

Les tags de checkpoint sont les états pédagogiques du cours. Les deux tags `demo-tck-123-*` matérialisent les états rouge et vert de la Partie 8. `main` ajoute uniquement la couche de navigation/maintenance du compagnon au-dessus du dernier checkpoint.

| Partie | Tag | Artefacts principaux | Vérification |
|---|---|---|---|
| Baseline | `checkpoint-01-no-harness` | service, tests, vérificateur local | `npm ci && npm test && npm run verify` |
| Partie 1 | `checkpoint-02-minimal` | `CLAUDE.md`, Truth, plan minimal | `npm run verify` |
| Partie 2 | `checkpoint-03-runtime-structured` | settings, rule, validation statique | `npm run verify` |
| Partie 3 | `checkpoint-04-information-disciplined` | architecture, ADR, information model, State | `npm run verify` |
| Partie 4 | `checkpoint-05-capabilities` | skill + Hook | `npm run verify` |
| Parties 5–6 | `checkpoint-06-verified-orchestrated` | reviewer + paquet de preuves | `npm run verify` |
| Partie 7 | `checkpoint-07-secure` | sandbox + contrat de preuve sécurité | `npm run verify` |
| Partie 8 rouge | `demo-tck-123-expected-failure` | erreur volontaire pricing | `npm test` → FAIL `11680` vs `11800` |
| Partie 8 vert | `demo-tck-123-corrected` | correction ciblée + régression | `npm run verify` → PASS `11800` |
| Parties 9–10 | `checkpoint-08-professional` | headless, CI, observabilité, runbook, closure | `npm run verify` + dry-run |

## Parcours TCK-123

```bash
git switch --detach demo-tck-123-expected-failure
npm ci
npm test
# FAIL attendu : 11680 vs 11800

git switch --detach demo-tck-123-corrected
npm ci
npm run verify
# PASS : 11800
```

## Couche support

`BOOK_INDEX.md`, `ALIGNMENT_MATRIX.md`, `BOOK_VERSION`, `docs/book-alignment-manifest.json` et `docs/maintainer/` servent à maintenir la correspondance livre ↔ dépôt. Ils ne font pas partie du projet construit par le lecteur dans les tags pédagogiques.
