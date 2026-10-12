# ALIGNMENT MATRIX — Livre ↔ états Git (`book-exact-v4`)

| ID | Partie | Tag | Delta exact | Preuve |
|---|---|---|---|---|
| A-001 | Baseline | `book-v4/checkpoint-01-no-harness` | service + tests | `npm test`, `npm run verify` |
| A-002 | 1 | `book-v4/checkpoint-02-minimal` | CLAUDE.md + Truth + plan | `npm run verify` |
| A-003 | 2 | `book-v4/checkpoint-03-runtime-structured` | settings + rule + validateur | `npm run verify` |
| A-004 | 3 | `book-v4/checkpoint-04-information-disciplined` | architecture + ADR + information model + progress | `npm run verify` |
| A-005 | 4 | `book-v4/checkpoint-05-capabilities` | skill `plan-ticket` + hook | `npm run verify` |
| A-006 | 5–6 | `book-v4/checkpoint-06-verified-orchestrated` | reviewer + evidence + gate pédagogique + génération explicite des preuves | `npm run verify` |
| A-007 | 7 | `book-v4/checkpoint-07-secure` | sandbox + sécurité + evidence sécurité + limites de plateforme | `npm run verify` |
| A-008 | 8 rouge | `book-v4/demo-tck-123-expected-failure` | customerType + implémentation fautive + test rouge | `npm test` → 11680/11800 |
| A-009 | 8 vert | `book-v4/demo-tck-123-corrected` | correction base remise + régressions + preuves vertes | `npm run verify` |
| A-010 | 9–10 | `book-v4/checkpoint-08-professional` | headless borné + CI + observabilité + incident/reprise + closure | `npm run verify` + dry-run |

## Delta V4 ↔ V3 (déclaré et vérifié par `npm run verify:book`)

| Étape | Patch V4 sur l'arbre V3 | Finding |
|---|---|---|
| 01–04 | aucun : mêmes commits | — |
| 05 | hook (stderr + exit 2, `CLAUDE_PROJECT_DIR`) ; `skills/plan` → `skills/plan-ticket` ; `docs/capabilities.md` ; contrôles du validateur statique | H01–H03, H08 |
| 06 | `verify` non destructif ; `scripts/generate-evidence.mjs` ; script `evidence:tck-123` ; note dans `evidence/TCK-123/README.md` | H05 |
| 07 | `docs/security.md` : limites Windows natif et `.env` | H08, décision Windows A |
| Rouge | aucun patch propre (cumul 05–07) ; tests et pricing identiques à V3 | — |
| Vert | 3 régressions (livraison indépendante, montants entiers, LOYALTY via checkout) ; preuves régénérées | H07, décision arrondi A |
| 08 | `run-ticket.mjs` (Windows, périmètre `src/`, codes 1–4) ; CI sur `push: main` ; contrat headless ; `git_ref` V4 dans `events.jsonl` | H04, H06, H08 |
