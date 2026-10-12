# Progress — TCK-123

status: VERIFY_FAILED

completed:
- exploration
- plan
- gate humain documenté
- implémentation initiale

failure:
- "LOYALTY discounts items but never shipping" rouge

observed:
- discount base = totalBeforeTax
- totalBeforeTax inclut shipping
- résultat = 11 680 au lieu de 11 800

next:
- utiliser itemsSubtotalCents comme base de remise
- calculer la taxe sur discountedItemsCents uniquement
- relancer verify
