# harness-lab — checkpoint-05-capabilities

Le premier besoin de procédure réutilisable introduit `.claude/skills/plan/SKILL.md`.

Le premier besoin de réaction automatique introduit aussi un vrai hook `PostToolUse` : après un `Edit` ou `Write` réussi, `.claude/hooks/post-edit-verify.mjs` relance la suite de tests. Le mécanisme est statiquement validé ici ; son déclenchement par Claude Code nécessite un runtime réel.

```bash
npm ci
npm run verify
```

Aucun agent ou MCP n'est ajouté sans besoin : voir `docs/capabilities.md`.
