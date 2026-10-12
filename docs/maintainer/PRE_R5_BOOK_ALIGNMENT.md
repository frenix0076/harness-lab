# Alignement livre ↔ dépôt

Cette version corrige les écarts relevés lors de l'audit du 12 octobre 2026.

## Alignements appliqués
- checkpoints 01–07 : `npm run verify` est multiplateforme via Node ;
- checkpoint 01 : aucun `customerType`/discount prématuré ;
- checkpoint 05 : vrai hook `PostToolUse` justifié et testable ;
- checkpoint 06 : paquet de preuves matériel avant BUILD + gate de plan traçable ;
- checkpoint 08 : schéma d'observabilité enrichi (contexte, modèle, durée, tools, verifier, preuves, git ref, approval) ;
- reviewer : inputs, invariants, scope drift et interdiction d'inventer de nouvelles exigences explicités ;
- incident runbook : détection et owner ajoutés.

## Erratum éditorial connu du livre
Le snippet fautif imprimé qui calcule la taxe sur `totalBeforeTax - discount` produirait mathématiquement **11 880**, pas 11 680. Le dépôt conserve le résultat canonique **11 680 → 11 800** en faisant porter l'erreur uniquement sur la base de remise. Il ne dégrade pas le code pour reproduire une incohérence éditoriale.

## Limites non transformées en preuve
- aucun smoke test Claude Code authentifié n'est inventé ;
- aucune GitHub Action distante n'est déclarée PASS sans run observé ;
- tokens/coût/modèle/durée restent `null` dans les événements de replay lorsqu'ils n'ont pas été mesurés.
