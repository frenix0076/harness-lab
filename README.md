# harness-lab — checkpoint-08-professional

Le fil rouge est corrigé. Le dépôt ajoute maintenant l'automatisation et l'exploitation professionnelle :

- caller headless borné `scripts/run-ticket.mjs` ;
- chargement explicite du profil sandbox du checkpoint 07 ;
- tools intégrés restreints à `Read`, `Edit` et `Bash`, MCP refusés pour ce run ;
- workflow `.github/workflows/harness-review.yml` ;
- observabilité structurée ;
- runbook incident/reprise ;
- paquet de fermeture TCK-123.

```bash
npm ci
npm test
npm run verify
node scripts/run-ticket.mjs TCK-123 --dry-run
```

Le dry-run expose le contrat sans contacter Claude Code. Les preuves Claude Code runtime et GitHub Actions distantes restent distinctes des vérifications locales et ne sont promues qu'après exécution réelle.
