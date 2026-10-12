# Evidence TCK-123

Ce dossier contient les preuves reproductibles du cas, pas une seconde source de vérité.

- `verify.log` : sortie d'une exécution locale réelle de `npm run verify` ;
- `tests.json` : résultat normalisé produit par une exécution réelle du runner Node ;
- `verify-failure.log` : sortie réelle du tag fautif, avec le préfixe de chemin local normalisé en `<repo>` pour la portabilité ;
- `diff-summary.md` : synthèse du changement ;
- `review.md` : revue statique de QA, explicitement distincte d'un run du sous-agent Claude Code ;
- `closure.md` : fermeture du ticket et limites restantes.
