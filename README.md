# harness-lab — checkpoint-07-secure

Le dépôt ajoute maintenant les frontières de sécurité introduites dans la Partie 7 :

- permissions projet déjà présentes dans `.claude/settings.json` ;
- profil sandbox strict dans `.claude/settings.sandbox.json` ;
- procédure de preuve dans `docs/security.md` ;
- dossier `evidence/security/` pour le test négatif runtime.

```bash
npm ci
npm run verify
```

Aucune preuve runtime n'est fabriquée. Le statut reste `UNVERIFIED_RUNTIME` tant que le smoke test Claude Code n'a pas réellement été exécuté.
