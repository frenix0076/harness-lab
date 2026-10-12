# Capacités au checkpoint 05

Le dépôt introduit seulement les primitives dont un besoin est déjà visible.

| Primitive | Implémentation | Pourquoi |
|---|---|---|
| Skill | `.claude/skills/plan/SKILL.md` | encapsuler une procédure de planification réutilisable |
| Tool / commande | `scripts/verify.sh` | exécuter une preuve déterministe |
| Hook | non ajouté à ce checkpoint | aucun événement lifecycle ne justifie encore une réaction automatique |
| Agent | non ajouté à ce checkpoint | la procédure de planification ne justifie pas encore un contexte indépendant |
| MCP | non ajouté | aucune capacité externe n'est nécessaire au scénario |

L'absence d'une primitive est un choix de conception : **une brique doit gagner sa place**.
