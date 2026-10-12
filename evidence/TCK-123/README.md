# Evidence contract — TCK-123

Au checkpoint 06, TCK-123 n'est pas encore construit. Le paquet de preuves existe déjà afin que la preuve soit définie avant BUILD.

Présent à ce stade :
- `verify.log` : vérification verte du baseline pré-TCK ;
- `tests.json` : résultats déterministes du baseline ;
- `diff-summary.md` : état du delta métier avant BUILD ;
- `review.md` : contrat de revue indépendant ;
- `approval.md` : gate de plan documenté comme fixture pédagogique, pas comme preuve runtime Claude Code.

Le paquet sera complété après l'état rouge puis la correction.

Régénération explicite : `npm run evidence:tck-123`. `npm run verify` ne modifie jamais ce paquet.
