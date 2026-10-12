# Validation officielle Claude Code — 2026-10-12

Le contrat de `scripts/run-ticket.mjs` a été vérifié statiquement contre la documentation officielle Claude Code actuelle.

Points confirmés :
- `-p` / print mode pour l'exécution non interactive ;
- `--json-schema` pour une sortie structurée ;
- `--max-turns` pour borner la boucle ;
- `--permission-mode dontAsk` pour refuser les appels qui demanderaient une approbation ;
- `--permission-prompts none` pour un run sans opérateur ;
- `--allowedTools` pour préautoriser des règles précises ;
- `--tools` pour restreindre les tools intégrés exposés ;
- `--disallowedTools "mcp__*,Edit(./tests/**),Edit(./evidence/**),Read(./.env),Read(./.env.*)"` pour retirer les tools MCP et protéger tests, preuves et `.env` ;
- `--settings .claude/settings.sandbox.json` pour appliquer le profil sandbox en plus des settings projet ;
- `--setting-sources project` pour éviter que des settings utilisateur modifient silencieusement le contrat du laboratoire.

Références officielles :
- https://code.claude.com/docs/en/cli-reference
- https://code.claude.com/docs/en/headless
- https://code.claude.com/docs/en/hooks
- https://code.claude.com/docs/en/sandboxing

Cette validation reste **statique**. Elle ne remplace pas un smoke test avec un binaire Claude Code installé et authentifié.
