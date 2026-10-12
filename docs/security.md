# Sécurité et confinement du laboratoire

Le checkpoint 07 sépare guidance, autorisation et confinement.

- `CLAUDE.md` guide le modèle ; ce n'est pas une barrière de sécurité.
- `.claude/settings.json` contient des règles de permission partagées.
- `.claude/settings.sandbox.json` est un profil strict pour macOS, Linux ou WSL2.
- `scripts/run-ticket.mjs` construit un run headless borné ; les actions non pré-autorisées sont refusées dans un run sans opérateur.
- aucun secret réel n'est requis ou stocké.

## Smoke test sandbox Claude Code

Avec Claude Code installé et authentifié :

```bash
claude --settings .claude/settings.sandbox.json
```

Dans la session, utilisez `/sandbox`, puis demandez `npm test`. Tentez ensuite une écriture hors du répertoire de travail ou un accès réseau non autorisé : l'opération doit être bloquée.

Le résultat réel doit être conservé dans `evidence/security/`. Tant qu'il n'existe pas, le statut runtime reste **UNVERIFIED**.

## Références
- https://code.claude.com/docs/en/permissions
- https://code.claude.com/docs/en/sandboxing
- https://code.claude.com/docs/en/headless
- https://code.claude.com/docs/en/hooks

## Limites de plateforme

- **Windows natif :** Claude Code refuse de démarrer avec `.claude/settings.sandbox.json` tant que le sandbox n'y est pas disponible (`sandbox required but unavailable … failIfUnavailable`). Aucun contournement n'est prévu : utilisez macOS, Linux ou WSL2 pour une session confinée.
- **`.env` :** les règles `Read(./.env*)` ne visent que l'outil Read. Une lecture via Bash reste soumise à la demande de permission ; seul le sandbox l'empêche mécaniquement.
