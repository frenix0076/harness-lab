# QA — dépôt corrigé vs livre

Date: 2026-10-12

## Matrice de tests

| Ref | npm ci | npm test | npm run verify | Verdict |
|---|---|---|---|---|
| `checkpoint-01-no-harness` | PASS | PASS | PASS | PASS |
| `checkpoint-02-minimal` | PASS | PASS | PASS | PASS |
| `checkpoint-03-runtime-structured` | PASS | PASS | PASS | PASS |
| `checkpoint-04-information-disciplined` | PASS | PASS | PASS | PASS |
| `checkpoint-05-capabilities` | PASS | PASS | PASS | PASS |
| `checkpoint-06-verified-orchestrated` | PASS | PASS | PASS | PASS |
| `demo-tck-123-expected-failure` | PASS | FAIL attendu | FAIL attendu | PASS — échec métier attendu 11680 vs 11800 |
| `checkpoint-07-secure-automated` | PASS | PASS | PASS | PASS |
| `checkpoint-08-professional` | PASS | PASS | PASS | PASS |

## Contrôles complémentaires

- `node scripts/run-ticket.mjs TCK-123 --dry-run` : PASS.
- JSON `observability/schema.json` : parse PASS.
- hook checkpoint 05 : présence + configuration statiquement validées ; runtime Claude Code non revendiqué.
- sandbox : profil et procédure présents ; preuve négative runtime laissée `UNVERIFIED`.
- GitHub Actions : workflow présent ; aucun run distant n’est revendiqué dans ce paquet.
- Tokens/coûts : aucune valeur inventée.

## Verdict

**REPO ALIGNMENT PACKAGE — PASS LOCAL**
