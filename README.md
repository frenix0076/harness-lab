# harness-lab — checkpoint-06-verified-orchestrated

Une responsabilité réellement distincte apparaît : la revue indépendante. Elle est matérialisée par `.claude/agents/code-reviewer.md`, en lecture seule.

Le dossier `evidence/TCK-123/` définit le contrat de preuve. À ce stade, TCK-123 n'est pas encore implémenté : un résultat final ne doit pas être inventé avant l'exécution réelle.

```bash
npm ci
npm run verify
```
