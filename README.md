# harness-lab — checkpoint-07-secure-automated

Après la correction de TCK-123, le dépôt ajoute l'automatisation et les frontières de sécurité minimales :

- permissions projet ;
- profil sandbox strict séparé pour macOS/Linux/WSL2 ;
- caller headless borné ;
- workflow CI sans secret ;
- séparation guidance / autorisation / confinement.

```bash
npm ci
npm run verify
node scripts/run-ticket.mjs TCK-123 --dry-run
```

Voir `docs/security.md`. Le dry-run ne contacte pas Claude Code.
