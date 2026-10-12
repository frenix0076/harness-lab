# Sécurité et confinement du laboratoire

Le checkpoint 07 sépare guidance, autorisation et confinement.

- `CLAUDE.md` guide le modèle ; ce n'est pas une barrière de sécurité.
- `.claude/settings.json` contient des règles de permission partagées : les tests peuvent être lancés et les fichiers `.env` sont refusés aux outils de lecture couverts.
- `.claude/settings.sandbox.json` est un profil **strict** à utiliser sur macOS, Linux ou WSL2 pour démontrer le confinement du shell sans rendre le dépôt inutilisable sur Windows natif.
- `scripts/run-ticket.mjs` construit un run headless borné ; toute action non pré-autorisée doit être refusée dans un run sans opérateur.
- aucun secret réel n'est requis ou stocké dans le dépôt.

## Smoke test sandbox Claude Code

Sur une plateforme prise en charge, avec Claude Code installé et authentifié :

```bash
claude --settings .claude/settings.sandbox.json
```

Dans la session, utilisez `/sandbox`, puis demandez à Claude d'exécuter `npm test`. Pour tester la frontière, demandez ensuite une écriture hors du répertoire de travail ou un accès réseau non autorisé : l'opération doit être bloquée par le confinement.

Ce test runtime ne peut pas être remplacé par la seule validation JSON du fichier.

## Références runtime vérifiées pour cette édition

- Permissions : `https://code.claude.com/docs/en/permissions`
- Sandbox : `https://code.claude.com/docs/en/sandboxing`
- Mode headless : `https://code.claude.com/docs/en/headless`

Le caller headless utilise `--permission-prompts none`, disponible à partir de Claude Code v2.1.259 selon la documentation actuelle.
