---
paths:
  - "src/domain/**/*.ts"
  - "tests/pricing.test.ts"
---

# Règles du domaine pricing

- Les montants sont des cents entiers.
- La livraison n'appartient pas à la base taxable des articles.
- Toute nouvelle règle de prix exige un test métier déterministe.
