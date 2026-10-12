# harness-lab — checkpoint-03-runtime-structured

Le dépôt ajoute maintenant :

- `.claude/settings.json` pour les permissions partagées ;
- `.claude/rules/domain.md` pour une règle ciblée au pricing ;
- une validation statique qui contrôle la présence et la syntaxe des surfaces déjà introduites.

```bash
npm ci
npm run verify
```

Instruction et configuration runtime sont désormais séparées.
