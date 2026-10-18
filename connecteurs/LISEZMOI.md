# Connecteurs de Routeur IA

Chaque fichier `.json` de ce dossier est un connecteur. Dans l'app : ⚙ → 🔌 Connecteurs → **🔄 Synchroniser depuis mon dépôt GitHub**.
La synchro ajoute les nouveaux, met à jour les modifiés, retire ceux supprimés d'ici, puis teste chacun.

```json
{
  "name": "Nom affiché",
  "description": "Lu par l'IA : quand utiliser ce connecteur et ce qu'il faut mettre dans le paramètre (avec un exemple).",
  "url": "https://api.exemple.com/recherche?limit=5",
  "method": "GET",
  "paramName": "q",
  "test": "une valeur d'essai",
  "maxChars": 3000
}
```

- `GET` : l'app appelle `url` + `&paramName=valeur`. `POST` : elle envoie `{"paramName": "valeur"}` en JSON.
- Les paramètres fixes vont directement dans `url`.
- `maxChars` (500 à 8000, 1500 par défaut) : taille de la réponse transmise à l'IA.
- L'API doit accepter les appels depuis un navigateur (CORS) et ne demander **aucune clé** : ce dépôt est public.
- Pour transformer un connecteur créé dans l'app en fichier : bouton ⬇ à côté de son nom.
