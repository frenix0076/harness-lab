# Incident runbook minimal

## Détection
- source / alerte : ____________________
- symptôme observé : ___________________
- sévérité : ___________________________

## Owner
- incident owner / rôle : ______________
- canal d'escalade : ___________________

## Containment et reprise
1. arrêter le run ou le déclencheur ;
2. préserver les preuves non sensibles ;
3. révoquer/faire tourner tout secret potentiellement exposé ;
4. identifier Truth, State et effets déjà commis ;
5. corriger ou rollbacker ;
6. ajouter une régression lorsque l'incident révèle un défaut reproductible ;
7. documenter la décision de reprise ;
8. reprendre uniquement depuis un état connu et vérifié.

## Fermeture
- preuve de correction : _______________
- preuve de non-régression : ___________
- risques résiduels : __________________
