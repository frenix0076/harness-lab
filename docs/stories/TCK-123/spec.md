# TCK-123 — Loyalty discount

## Truth

Pour un client `LOYALTY` :
- appliquer 10 % de remise au sous-total des articles avant taxe ;
- ne jamais remiser la livraison ;
- calculer la taxe après remise sur les articles.

Pour les autres clients :
- conserver le comportement existant.

## Scope

- `src/domain/types.ts`
- `src/domain/pricing.ts`
- tests métier de pricing
- aucune modification d'API non nécessaire
