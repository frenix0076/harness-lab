# harness-lab — demo-tck-123-expected-failure

État volontairement fautif de la Partie 8, construit **après** le checkpoint sécurité.

```bash
npm ci
npm test
```

Le test `LOYALTY discounts items but never shipping` doit être rouge : l'implémentation calcule la remise sur 11 000 centimes au lieu des 10 000 centimes d'articles. Le total obtenu est **11 680** au lieu de **11 800**.
