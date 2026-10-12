# harness-lab — checkpoint-06-verified-orchestrated

Une responsabilité réellement distincte apparaît : la revue indépendante. Elle est matérialisée par `.claude/agents/code-reviewer.md`, en lecture seule.

Le dossier `evidence/TCK-123/` matérialise maintenant le paquet minimal **avant BUILD** : baseline vert, résultats structurés, diff summary, revue et gate de plan. TCK-123 n'est pas encore implémenté ; le dépôt refuse donc de fabriquer une preuve finale prématurée.

```bash
npm ci
npm run verify
```
