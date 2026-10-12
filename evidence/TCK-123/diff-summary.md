# Diff summary TCK-123

- ajout de `CustomerType` et `customerType` au moment où TCK-123 le justifie ;
- ajout d'une remise de 10 % réservée au sous-total des articles pour `LOYALTY` ;
- livraison explicitement hors base de remise ;
- taxe calculée après remise sur les articles ;
- comportement standard conservé ;
- test rouge 11 680 → attendu 11 800, puis régression verte.
