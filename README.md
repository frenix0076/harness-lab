# harness-lab

Dépôt compagnon officiel de *Maîtriser le Harness Engineering*.

`harness-lab` fait évoluer **le même petit service TypeScript** du dépôt applicatif sans harness jusqu'à un harness professionnel. La règle du parcours est :

> **Besoin → Limite observée → Delta minimal → Preuve → Échec connu → Limite suivante.**

Le projet est volontairement petit : il sert à rendre visibles les responsabilités du harness, pas à simuler une application commerciale.

## Prérequis

- Node.js **22.6+** ;
- npm ;
- Git ;
- Bash pour `scripts/verify.sh` (Git Bash, WSL2, macOS ou Linux).

Aucune dépendance npm tierce n'est nécessaire.

## Installation et vérification de l'état final

```bash
npm ci
npm test
npm run verify
node scripts/run-ticket.mjs TCK-123 --dry-run
```

Attendu sur `checkpoint-08-professional` :

- `npm ci` : code 0 ;
- `npm test` : 3 tests PASS ;
- `npm run verify` : validation statique + 3 tests PASS ;
- le dry-run affiche la commande `claude -p` qui serait lancée, **sans appeler Claude Code**.

`npm run verify` régénère aussi `evidence/TCK-123/tests.json` à partir d'une exécution réelle de la suite.

## Les huit checkpoints

| Ordre | Tag | Ce qui apparaît | Ce que vous devez observer |
|---:|---|---|---|
| 1 | `checkpoint-01-no-harness` | service TypeScript + tests, aucune surface Claude Code | la friction existe avant la solution |
| 2 | `checkpoint-02-minimal` | `CLAUDE.md`, ticket, plan minimal, preuve projet | le minimum suffit pour cadrer une première tâche |
| 3 | `checkpoint-03-runtime-structured` | settings + rule ciblée | instruction ≠ configuration runtime |
| 4 | `checkpoint-04-information-disciplined` | spec, plan, progress, ADR, modèle d'information | Truth ≠ State ≠ Memory ≠ Context |
| 5 | `checkpoint-05-capabilities` | skill de planification + vérificateur déterministe | Skill ≠ Tool/commande ; hook/agent/MCP restent absents sans besoin |
| 6 | `checkpoint-06-verified-orchestrated` | reviewer indépendant en lecture seule + contrat de preuves | le producteur n'est pas sa propre preuve |
| 7 | `checkpoint-07-secure-automated` | permissions, profil sandbox strict, caller headless, CI | guidance ≠ autorisation ≠ confinement |
| 8 | `checkpoint-08-professional` | observabilité, incident/reprise, preuves de fermeture | le même harness devient exploitable et auditable |

Pour inspecter un checkpoint :

```bash
git switch --detach checkpoint-04-information-disciplined
npm ci
npm run verify
```

Revenez à l'état final avec :

```bash
git switch main
```

## TCK-123 — reproduire l'erreur puis la correction

La règle métier du livre est : pour un client `LOYALTY`, appliquer 10 % de remise **uniquement au sous-total des articles** ; la livraison n'est jamais remisée ; la taxe est calculée après remise sur les articles.

Cas canonique :

- articles : 10 000 centimes ;
- livraison : 1 000 centimes ;
- taxe : 20 % ;
- client : `LOYALTY` ;
- total correct : **11 800 centimes**.

### 1. Rejouer l'implémentation fautive

```bash
git switch --detach demo-tck-123-expected-failure
npm ci
npm test
```

**FAIL attendu.** Le test doit montrer :

- remise obtenue : 1 100 au lieu de 1 000 ;
- taxe obtenue : 1 780 au lieu de 1 800 ;
- total obtenu : **11 680** au lieu de **11 800**.

La cause doit être métier : la remise est calculée sur `itemsSubtotalCents + shippingCents`. Un échec de dépendance, de compilation ou de chemin n'est pas la démonstration attendue.

### 2. Revenir à l'état corrigé

```bash
git switch main
npm ci
npm run verify
```

Attendu : **PASS**, avec la régression `LOYALTY discounts items but never shipping` conservée.

## Paquet de preuves

L'état final contient :

```text
evidence/TCK-123/
├── verify.log
├── verify-failure.log
├── tests.json
├── diff-summary.md
├── review.md
└── closure.md
```

`closure.md` relie le changement à la Truth, aux tests, à l'erreur observée, à la régression et aux risques ouverts.

## Claude Code : ce qui est testable localement et ce qui ne l'est pas

Les fichiers Claude Code sont versionnés dans `.claude/` :

- instructions : `CLAUDE.md` ;
- settings partagés : `.claude/settings.json` ;
- rule de domaine : `.claude/rules/domain.md` ;
- skill : `.claude/skills/plan/SKILL.md` ;
- reviewer : `.claude/agents/code-reviewer.md` ;
- profil de confinement strict : `.claude/settings.sandbox.json`.

Le profil sandbox strict est prévu pour macOS, Linux ou WSL2. Il n'est pas activé dans les settings partagés par défaut afin de ne pas rendre le dépôt inutilisable sur Windows natif. Pour le tester avec Claude Code installé et authentifié :

```bash
claude --settings .claude/settings.sandbox.json
```

Voir `docs/security.md` pour le smoke test.

Le caller headless :

```bash
node scripts/run-ticket.mjs TCK-123 --dry-run
```

ne contacte pas Anthropic. Sans `--dry-run`, il exige une installation Claude Code et une authentification valides, puis exécute `npm run verify` après le run. Le caller utilise `--permission-prompts none`, documenté pour Claude Code v2.1.259 ou ultérieur ; avec une version plus ancienne, adaptez ce flag avant le smoke test.

## Sécurité

Le dépôt ne contient aucun secret réel. Ne commitez pas `.env`, token, clé API ou credential. Les tests locaux et la CI n'en nécessitent aucun.

Les règles de permissions du dépôt ne remplacent pas la sandbox. Le profil strict de `docs/security.md` illustre cette frontière séparément.

## Limites de validation

Les tests Node, la progression Git, TCK-123 et le dry-run headless sont reproductibles sans compte Anthropic.

Le comportement réel de Claude Code, le chargement runtime des skills/sous-agents, l'enforcement des permissions/sandbox et l'exécution GitHub Actions doivent être smoke-testés dans les environnements correspondants. Une validation statique n'est pas présentée comme une preuve runtime.
