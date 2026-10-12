# Closure TCK-123

## Change
La remise LOYALTY porte uniquement sur les articles.

## Truth
`docs/stories/TCK-123/spec.md`.

## Evidence
- `npm run verify` vert ;
- régression "LOYALTY discounts items but never shipping" ;
- cas STANDARD vert ;
- état d'échec conservé dans l'historique au tag `demo-tck-123-expected-failure`.

## Failure encountered
La première implémentation utilisait `totalBeforeTax`, qui incluait la livraison.

## Regression added
Le test de non-remise de la livraison reste dans la suite.

## Review
Voir `review.md`.

## Open risks
Validation runtime Claude Code et CI distante hors de la preuve locale.
