# harness-lab — demo-tck-123-expected-failure

État volontairement fautif du scénario TCK-123.

```bash
npm ci
npm test
```

Le test `LOYALTY discounts items but never shipping` doit être **rouge** : l'implémentation applique 10 % de remise à 11 000 centimes au lieu des 10 000 centimes d'articles. Le total obtenu est 11 680 au lieu de 11 800.

Cet échec métier est la preuve attendue. Un problème de tooling ou de dépendance n'est pas acceptable.
