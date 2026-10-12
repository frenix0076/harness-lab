# harness-lab

Dépôt compagnon officiel de *Maîtriser le Harness Engineering*.

**Contrat pédagogique (`book-exact-v4`) :** un tag `book-v4/…` représente l'état que le lecteur obtient après l'étape correspondante du livre. Les deux tags TCK-123 matérialisent explicitement le rouge puis le vert. `main` ajoute seulement la navigation et les documents de maintenance du compagnon.

```bash
git clone https://github.com/frenix0076/harness-lab.git
cd harness-lab
npm ci
npm test
npm run verify
npm run verify:book
npm run replay:book
```

Voir `BOOK_INDEX.md` pour le parcours complet.

## États du cours

`book-v4/checkpoint-01-no-harness` → `book-v4/checkpoint-02-minimal` → `book-v4/checkpoint-03-runtime-structured` → `book-v4/checkpoint-04-information-disciplined` → `book-v4/checkpoint-05-capabilities` → `book-v4/checkpoint-06-verified-orchestrated` → `book-v4/checkpoint-07-secure` → `book-v4/demo-tck-123-expected-failure` → `book-v4/demo-tck-123-corrected` → `book-v4/checkpoint-08-professional`.

## Édition précédente (`book-exact-v3`)

Les tags V3 sans préfixe (`checkpoint-01-no-harness` … `checkpoint-08-professional`) restent publiés et ne sont jamais déplacés. `npm run verify:book` vérifie qu'ils n'ont pas bougé. V4 reprend l'arbre exact de chaque étape V3 et n'ajoute que les correctifs runtime déclarés dans `docs/book-alignment-manifest.json` (`v4.delta`). Les checkpoints 01 à 04 sont identiques au commit près.

## Validation officielle du runtime

Le contrat CLI/hook/sandbox a été revérifié contre la documentation Claude Code 2026. Voir `docs/maintainer/OFFICIAL_CLAUDE_CODE_VALIDATION_2026.md` et `docs/maintainer/BOOK_EXACT_V4_VALIDATION.md`.

## Preuves non simulées

Les tests Node, le dry-run et le rejeu des tags sont vérifiables localement. Les hooks, agents et sandbox Claude Code, ainsi que les GitHub Actions distantes, ne sont déclarés PASS qu'après exécution réelle dans leurs environnements respectifs. Le run headless confiné exige macOS, Linux ou WSL2 (voir `docs/security.md`).
