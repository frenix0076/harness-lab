# Architecture

Le service sépare l'entrée API (`src/api`) de la règle métier (`src/domain`).
La Truth métier d'une évolution vit dans `docs/stories/<ID>/spec.md`. Le State courant vit dans `progress.md` et ne remplace jamais la spécification.
