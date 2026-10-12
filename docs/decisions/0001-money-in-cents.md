# ADR-0001 — Montants en cents entiers

## Décision
Les montants métier sont représentés en cents entiers.

## Pourquoi
Éviter les ambiguïtés de représentation monétaire dans ce laboratoire pédagogique.

## Conséquence
Toute règle de prix et tout test utilisent des entiers ; une application financière réelle doit ajouter une politique d'arrondi métier explicite.
