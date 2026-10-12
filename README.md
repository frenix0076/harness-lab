# harness-lab

Dépôt compagnon officiel de *Maîtriser le Harness Engineering*.

**Contrat pédagogique :** un tag représente l'état que le lecteur obtient après l'étape correspondante du livre. Les deux tags TCK-123 matérialisent explicitement le rouge puis le vert. `main` ajoute seulement la navigation et les documents de maintenance du compagnon.

```bash
git clone https://github.com/frenix0076/harness-lab.git
cd harness-lab
npm ci
npm test
npm run verify
npm run verify:book
```

Voir `BOOK_INDEX.md` pour le parcours complet.

## États du cours

`checkpoint-01-no-harness` → `checkpoint-02-minimal` → `checkpoint-03-runtime-structured` → `checkpoint-04-information-disciplined` → `checkpoint-05-capabilities` → `checkpoint-06-verified-orchestrated` → `checkpoint-07-secure` → `demo-tck-123-expected-failure` → `demo-tck-123-corrected` → `checkpoint-08-professional`.

## Validation officielle du runtime

Le contrat CLI/hook/sandbox a été revérifié contre la documentation Claude Code 2026. Voir `docs/maintainer/OFFICIAL_CLAUDE_CODE_VALIDATION_2026.md`. Cette vérification est statique : le smoke test authentifié reste une preuve séparée.

## Preuves non simulées

Les tests Node et le dry-run sont vérifiables localement. Les hooks/agents/sandbox Claude Code et GitHub Actions distantes ne sont déclarés PASS qu'après exécution réelle dans leurs environnements respectifs.
