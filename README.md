# harness-lab — checkpoint-02-minimal

Le premier harness ajoute uniquement :

- `CLAUDE.md` pour les instructions stables ;
- `docs/stories/TCK-123/spec.md` comme Truth de tâche ;
- `docs/stories/TCK-123/plan.md` comme plan minimal ;
- les tests et `npm run verify` comme preuve externe au modèle.

```bash
npm ci
npm test
npm run verify
```

Aucun sous-agent, hook, MCP ou système de mémoire n'est encore justifié.
