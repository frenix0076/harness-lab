---
name: plan-ticket
description: Préparer un plan borné à partir de la Truth d'un ticket sans implémenter.
disable-model-invocation: true
allowed-tools: Read Grep Glob
---

À partir du ticket fourni :
1. lis la spécification autoritative ;
2. recherche uniquement les zones du code nécessaires ;
3. liste fichiers visés, invariants, risques et preuves attendues ;
4. signale les questions qui bloquent une implémentation sûre ;
5. n'édite aucun fichier de code.

La sortie doit rester un plan vérifiable, pas une implémentation.
