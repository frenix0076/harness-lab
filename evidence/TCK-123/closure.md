# Closure TCK-123

## 1. Qu'est-ce qui a changé ?
La remise `LOYALTY` porte uniquement sur le sous-total des articles. La livraison reste hors base de remise et la taxe est calculée après la remise sur les articles.

## 2. Quelle Truth justifiait ce changement ?
`docs/stories/TCK-123/spec.md`.

## 3. Quelles preuves sont vertes ?
- `npm run verify` exécuté localement ;
- `evidence/TCK-123/tests.json` : 3 tests PASS ;
- régression `LOYALTY discounts items but never shipping` ;
- cas `STANDARD` inchangé ;
- revue statique de QA documentée dans `review.md`.

## 4. Quelle erreur a été rencontrée et quelle régression la couvre ?
L'état `demo-tck-123-expected-failure` calculait la remise sur `itemsSubtotalCents + shippingCents`. Il produisait 11 680 au lieu de 11 800. Le test de non-remise de la livraison reste dans la suite et empêche le retour de cette erreur.

## 5. Quels risques ou points ouverts restent ?
Le sous-agent reviewer, le runtime Claude Code, son enforcement réel de permissions/sandbox et la CI GitHub distante ne sont pas prouvés par les tests Node locaux. Ils exigent des smoke tests dans leurs environnements réels.
