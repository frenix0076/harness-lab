# Publication de l'historique corrigé

Ce ZIP contient un dépôt Git complet avec les tags reconstruits. Les hashes diffèrent de l'historique public actuel.

## Séquence sûre

1. Sauvegarder le dépôt public actuel :
   `git clone --mirror https://github.com/frenix0076/harness-lab.git harness-lab-backup.git`
2. Ouvrir ce dépôt corrigé et vérifier :
   `npm ci && npm run verify`
3. Publier d'abord une branche de revue, sans toucher aux tags :
   `git push origin main:review/book-alignment`
4. Comparer la branche de revue au dépôt actuel.
5. Après validation humaine, remplacer `main` avec `--force-with-lease` si vous acceptez la réécriture d'historique.
6. Recréer/forcer les neuf tags uniquement après validation.

Ne forcez jamais l'historique public sans sauvegarde ni revue.
