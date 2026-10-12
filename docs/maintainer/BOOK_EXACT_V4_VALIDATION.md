# Validation book-exact-v4 — 2026-10-12

Synthèse publiable des preuves de la migration V3 → V4. Les journaux runtime bruts restent locaux : ils contiennent des identifiants de compte et ne sont pas versionnés.

Environnement de validation : Windows 11, Node 26.10.0, npm 11.19.1, Claude Code 2.1.296.

| Élément | Preuve | Statut |
|---|---|---|
| Hook : édition verte → exit 0 ; édition rouge → exit 2, échec cité par Claude | session headless réelle ; hook V4 identique octet pour octet au hook testé | PASS_RUNTIME |
| Skill `/plan-ticket` enregistré et invoqué (plus de conflit `/plan`) | session headless réelle ; `SKILL.md` identique, dossier `plan-ticket` | PASS_RUNTIME |
| Sous-agent `code-reviewer` (lecture seule, format de revue) | session headless réelle ; définition inchangée depuis V3 | PASS_RUNTIME |
| Permissions headless : `.env` (Read et Bash), `tests/`, `evidence/` refusés ; `src/` autorisé | session headless réelle avec les arguments de `run-ticket` (profil sandbox retiré pour le test uniquement) | PASS_RUNTIME |
| Garde-fous `run-ticket` : bloqué 3, erreur 1, hors périmètre 4, arbre modifié 2, OK 0 | doublures déterministes `CLAUDE_BIN=*.mjs` sur `book-v4/checkpoint-08-professional` | PASS_RUNTIME |
| Lancement sous Windows : `claude.exe` résolu, sandbox refusé explicitement | exécution réelle sur `book-v4/checkpoint-08-professional` | PASS_RUNTIME (lancement) |
| Run headless confiné | nécessite macOS, Linux ou WSL2 | UNVERIFIED |
| Rouge `11680` vs `11800` ; vert `11800` | `npm run replay:book` | PASS_RUNTIME |
| Tags V3 inchangés ; delta V4 exact ; chaîne linéaire | `npm run verify:book` | PASS_RUNTIME |
| CI GitHub | aucun run observé | UNVERIFIED |
