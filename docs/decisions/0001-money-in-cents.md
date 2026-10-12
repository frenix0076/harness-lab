# ADR-0001 — Représenter l'argent en cents

## Décision
Les montants métier sont des entiers exprimés en cents.

## Raison
Éviter les erreurs d'arrondi binaires dans les opérations métier simples du laboratoire.

## Conséquence
Toute nouvelle API de pricing doit préserver cette représentation ou documenter explicitement une conversion à la frontière.
