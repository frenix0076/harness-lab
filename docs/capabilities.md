# Capacités au checkpoint 05

Le dépôt introduit seulement les primitives dont un besoin est visible.

| Primitive | Implémentation | Pourquoi |
|---|---|---|
| Skill | `.claude/skills/plan-ticket/SKILL.md` | encapsuler une procédure de planification réutilisable |
| Tool / commande | `npm run verify` | exécuter une preuve déterministe multiplateforme |
| Hook | `.claude/hooks/post-edit-verify.mjs` via `PostToolUse` sur `Edit|Write` | relancer automatiquement les tests après une édition réussie |
| Agent | non ajouté à ce checkpoint | la procédure de planification ne justifie pas encore un contexte indépendant |
| MCP | non ajouté | aucune capacité externe n'est nécessaire au scénario |

Le hook est une réaction automatique à un événement réel ; il n'est pas ajouté pour décorer l'arborescence. L'absence d'un MCP reste volontaire : **une brique doit gagner sa place**.
