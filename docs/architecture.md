# Architecture minimale

Le laboratoire sépare les responsabilités sans multiplier les composants :

- `src/` : comportement métier ;
- `tests/` : preuves déterministes ;
- `docs/stories/` : Truth et State de tâche ;
- `.claude/` : configuration du runtime ;
- `evidence/` : preuves de fermeture lorsqu'elles apparaissent.
