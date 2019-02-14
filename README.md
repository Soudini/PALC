# Issues :
  - confusion onglets
  - improve modération

# Fonctionnement du site :

Ce site a été codé avec la technologie React pour le front, et de l'express et une base de donnée en MongoDB pour le back. Pour la BDD, on utilise actuellement Mongoose.


## Backend :
Les requêtes du front vers le back sont proxy via l'adresse `/api/` par nginx directement. Ce sont en général des requêtes POST. Le fichier `/backend/server.js` définit les différentes routes possibles et quoi faire avec les requêtes entrantes.

`/backend/data.js` définit le canvas d'un objet représentant une annonce. Voici la nomenclature (elle est valable dans tout le code) :

### Nomenclature :
  - type: `String`, c'est le type de l'annonce found ou search
  - author: `String`, c'est le prénom puis le nom de l'auteur
  - author_id:`String`, c'est l'id de l'auteur (celui renvoyé par l'auth)
  - author_login:`String`, c'est le login de l'auteur (2018louysa)
  - title: `String`, c'est le titre de l'annonce (limité à 300 caractères actuellement)
  - reward : `String`, c'est la récompense offerte par l'auteur, si c'est une annonce trouvaille on s'en fiche (c'est palc dans ce cas btw)
  - description : `String`, c'est la descritpion de l'annonce (limité à 1000 caractères actuellement)
  - thumbnail: `String`, c'est l'image de "couverture" de l'annonce (elle est convertie par le client en Base64 String pour être stockée plus facilement, elle est aussi resize pour faire 200x200px)
  - image : `[String]`, c'est les images supplémentaires (idem que pour le thumbnail)

## Front :

Il a été créé par `create-react-app` donc la documentation de ce module s'applique en grande partie. Le site utilise actuellement `react-router` qui fonctionne plutôt très bien. Les différentes routes sont définies dans

### Architecture :

#### Views :
Ce sont les fichiers qui définissent les différentes pages  du site. Il serait bien de regrouper `perso.js`,`home.js`, `found.js`, `search.js` et `searchEngine.js` qui sont plus ou moins les mêmes à la requête récupérant les annonces près.

  - `createPost.js` : permet de créer et d'envoyer les ads au back
  - `perso.js`,`home.js`, `found.js`, `search.js` et `searchEngine.js` : Affichent respectivement les annonces crées par l'utilisateur, toutes les annonces, les annonces trouvaille, recherche et celles correspondant à la recherche.
  - `updatePost.js` : permet de modifier une annonce



#### Components :
Ce sont les composants récurrents dans le site, par exemple les cartes pour les ads. Le composant banner est important. C'est lui qui redirige les utilsateurs vers l'auth et s'occupe de cacher le badge reCaptcha.

  - `ad.js` : définit les cartes pour les vues multiples et la page affichée par ad
  - `banner.js` : définit la bannière du site qui permet de naviguer entre les différentes pages
  - `main.js` : définit les routes du router
  - `oauthend.js` : gère le callback de l'auth et stocke les données dans les cookies

# VM :
Le projet est dans `~/objets-trouves`. Afin d'installer les différents modules nécessaires au fonctionnement site il faut lancer `install.sh`. `client/build.sh` lancé avec les droits admins permet de créer le build de production et de le mettre dans `/var/www`. Pour le back, il faut lancer `npm start` dans `backend/`.

La config nginx peut être trouvée dans `ǹginx.conf`. L'article du wiki sur comment mettre en prod le site devrait suffire, à noter que cette config a été créée par CertBot, il faut donc l'avoir lancer pour que ca marche, s'il n'y en a pas besoin il suffit de virer tout ce qu'il y a en dessous de la ligne 11 sans oublier de fermer les {} si besoin.
La base de donnée est `ads` et les données sont stockées dans la collection `datas`
