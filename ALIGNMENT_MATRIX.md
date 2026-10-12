# ALIGNMENT MATRIX — Livre ↔ états Git

| ID | Partie | Tag | Delta exact | Preuve |
|---|---|---|---|---|
| A-001 | Baseline | `checkpoint-01-no-harness` | service + tests | `npm test`, `npm run verify` |
| A-002 | 1 | `checkpoint-02-minimal` | CLAUDE.md + Truth + plan | `npm run verify` |
| A-003 | 2 | `checkpoint-03-runtime-structured` | settings + rule + validateur | `npm run verify` |
| A-004 | 3 | `checkpoint-04-information-disciplined` | architecture + ADR + information model + progress | `npm run verify` |
| A-005 | 4 | `checkpoint-05-capabilities` | skill + hook | `npm run verify` |
| A-006 | 5–6 | `checkpoint-06-verified-orchestrated` | reviewer + evidence + gate pédagogique | `npm run verify` |
| A-007 | 7 | `checkpoint-07-secure` | sandbox + sécurité + evidence sécurité | `npm run verify` |
| A-008 | 8 rouge | `demo-tck-123-expected-failure` | customerType + implémentation fautive + test rouge | `npm test` → 11680/11800 |
| A-009 | 8 vert | `demo-tck-123-corrected` | correction base remise + preuves vertes | `npm run verify` |
| A-010 | 9–10 | `checkpoint-08-professional` | headless + CI + observabilité + incident/reprise + closure | `npm run verify` + dry-run |
