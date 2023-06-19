# Mon vieux Grimoire Backend

## Comment lancer le projet ?

**Installation**
Assurez-vous que Node.js et MongoDB sont installés localement.

Installez les dépendances en exécutant la commande suivante :

npm install

**Routes**
L'API expose les 7 routes suivantes pour gérer les livres :

**POST** /books : Créer un nouveau livre.
**POST** /books/:id/rating : Noter un livre.
**GET** /books : Récupérer tous les livres.
**GET** /books/bestrating : Récupérer les 3 livres avec les meilleures évaluations.
**GET** /books/:id : Récupérer un livre spécifique en fonction de son identifiant.
**PUT** /books/:id : Mettre à jour les informations d'un livre spécifique.
**DELETE** /books/:id : Supprimer un livre spécifique.
