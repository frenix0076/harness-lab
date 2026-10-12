# Plan TCK-123

1. Ajouter un test prouvant que la remise LOYALTY porte uniquement sur les articles.
2. Préserver le cas STANDARD comme régression.
3. Modifier uniquement `src/domain/pricing.ts` si le contrat peut être fermé sans changer l'API.
4. Exécuter `npm run verify`.
5. Faire relire le diff et les preuves indépendamment du producteur.

## Risques
- inclure par erreur la livraison dans la base de remise ;
- appliquer la taxe avant la remise ;
- modifier le comportement STANDARD.
