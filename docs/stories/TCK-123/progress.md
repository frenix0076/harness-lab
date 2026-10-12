# Progress — TCK-123

status: VERIFY_FAILED

completed:
- exploration
- plan
- implementation initiale

failure:
- "LOYALTY discounts items but never shipping" rouge

observed:
- discount base = totalBeforeTax
- totalBeforeTax inclut shipping

next:
- utiliser itemsSubtotalCents comme base de remise
- calculer la taxe sur discountedItemsCents uniquement
- relancer verify
