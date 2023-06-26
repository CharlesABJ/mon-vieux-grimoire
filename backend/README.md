# Mon vieux Grimoire Backend

## Comment lancer le projet ?

### Installation

Assurez-vous que Node.js et MongoDB sont installés localement !!

Installez les dépendances en exécutant la commande suivante :
`npm install`

### Configuration

Renommez le fichier **.env.example** en **.env**.
Dans le fichier **.env**, configurez les variables d'environnement selon vos besoins, telles que vos clés secretes ( jwtSecretKey ) et vos informations de connexion à la base de données ( URI )

### Les Routes

L'API expose les 7 routes suivantes pour gérer les livres :

**POST** /books : Créer un nouveau livre.
**POST** /books/:id/rating : Noter un livre.
**GET** /books : Récupérer tous les livres.
**GET** /books/bestrating : Récupérer les 3 livres avec les meilleures évaluations.
**GET** /books/:id : Récupérer un livre spécifique en fonction de son identifiant.
**PUT** /books/:id : Mettre à jour les informations d'un livre spécifique.
**DELETE** /books/:id : Supprimer un livre spécifique.

L'API expose les 2 routes suivantes pour gérer l'authentification :

**POST** /auth/signup : Créer un nouveau livre.
**POST** /auth/login : Noter un livre.

### La Structure du projet

**controllers/** : Contient les contrôleurs qui gèrent les actions pour chaque route.
**middleware/** : Contient les middlewares utilisés dans l'application.
**models/** : Contient les schémas de modèle pour les différentes entités de la base de données.
**routes/** : Contient les fichiers de configuration des routes de l'API.
**app.js** : Fichier principal de l'application qui configure les middlewares et les routes.
**server.js** : Fichier d'entrée qui démarre le serveur.
