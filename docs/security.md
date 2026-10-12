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
