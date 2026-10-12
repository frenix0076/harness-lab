# Truth, State, Memory et Context dans harness-lab

| Responsabilité | Où elle vit ici | Règle |
|---|---|---|
| Truth | `docs/stories/TCK-123/spec.md`, code et tests existants | fait foi pour le comportement à obtenir |
| State | `docs/stories/TCK-123/progress.md` | décrit où en est la tâche ; ne réécrit jamais la spec |
| Memory | aucune mémoire persistante tant qu'aucune leçon réutilisable ne le justifie | l'absence est volontaire ; une mémoire future ne deviendra pas Truth |
| Context | `CLAUDE.md`, rule ciblée et fichiers lus pour la décision courante | vue de travail temporaire ; ne remplace ni Truth ni State |

`docs/decisions/0001-money-in-cents.md` est une décision d'architecture durable, pas une mémoire de conversation.
