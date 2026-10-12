# Plan de correction et amélioration du dépôt

## Objectif
Rendre `harness-lab` fidèle au fil rouge du livre, reproductible sur Windows/macOS/Linux pour les vérifications locales, et explicite sur ce qui est réellement prouvé versus seulement préparé.

## Décisions verrouillées
1. Le résultat canonique TCK-123 reste **11 680 (rouge) → 11 800 (vert)** ; le snippet éditorial incohérent est traité comme erratum du livre.
2. L'historique corrigé est reconstruit pour que `customerType` et la remise apparaissent au moment de TCK-123, pas au checkpoint 01.
3. Le checkpoint 05 gagne un vrai hook utile ; aucun MCP artificiel n'est ajouté sans besoin externe réel.
4. Les preuves runtime impossibles à exécuter ici restent `UNVERIFIED`, avec procédure et emplacement de capture.

## Phases
- P0 — sauvegarde du dépôt public et gel de la baseline ;
- P1 — reconstruire checkpoints 01–04 avec modèle métier pré-TCK et verify Node ;
- P2 — checkpoint 05 : skill + hook PostToolUse ;
- P3 — checkpoint 06 : reviewer + paquet de preuves + gate ;
- P4 — demo rouge : 11 680 attendu contre 11 800 ;
- P5 — checkpoint 07 : correction, sécurité, headless, CI ;
- P6 — checkpoint 08 : observabilité, runbook, fermeture ;
- P7 — QA : `npm ci`, `npm test`, `npm run verify` sur chaque tag ; demo rouge doit échouer pour la bonne raison ;
- P8 — publication : pousser d'abord une branche de revue, puis remplacer tags/historique uniquement après validation humaine.

## Critères de sortie
- 8 tags + 1 tag rouge présents ;
- tous les checkpoints verts passent `npm ci && npm test && npm run verify` ;
- tag rouge échoue uniquement sur la régression LOYALTY avec 11 680 vs 11 800 ;
- dry-run headless passe ;
- aucune preuve runtime, coût ou token n'est inventé ;
- README décrit exactement le dépôt ;
- GitHub Actions reste à permissions minimales.
