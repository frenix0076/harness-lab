# Closure TCK-123

## 1. Qu'est-ce qui a changé ?
Le type client est introduit au moment de TCK-123. La remise `LOYALTY` porte uniquement sur le sous-total des articles. La livraison reste hors base de remise et la taxe est calculée après remise sur les articles.

## 2. Quelle Truth justifiait ce changement ?
`docs/stories/TCK-123/spec.md`.

## 3. Quelles preuves sont vertes ?
- `npm run verify` exécuté localement ;
- `evidence/TCK-123/tests.json` ;
- régression `LOYALTY discounts items but never shipping` ;
- cas STANDARD inchangé ;
- revue statique documentée dans `review.md`.

## 4. Quelle erreur a été rencontrée ?
Le tag `demo-tck-123-expected-failure` calculait la remise sur `itemsSubtotalCents + shippingCents`. Il produisait 11 680 au lieu de 11 800. La régression empêche son retour.

## 5. Gate humain
`evidence/TCK-123/approval.md` matérialise le contrat de gate du scénario et est explicitement marqué `pedagogical_fixture`. Il n'est pas présenté comme une preuve runtime authentifiée.

## 6. Quels risques ou points ouverts restent ?
Le sous-agent reviewer, le runtime Claude Code, l'enforcement réel permissions/sandbox et la CI distante ne sont pas prouvés par les tests Node locaux. Ils exigent des smoke tests dans leurs environnements réels.
