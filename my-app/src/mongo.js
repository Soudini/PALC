

var mongoClient = require('mongodb').MongoClient;
export default function testConnect(){
    // Récupération du client mongodb

    // Paramètres de connexion
    var url = 'mongodb://localhost/objet_trouves';

    // Connexion au serveur avec la méthode connect
    mongoClient.connect(url, function (err, db) {
        if (err) {
            return console.error('Connection failed', err);
        }
        console.log('Connection successful on ', url);

        // Nous allons travailler ici ...

        // Fermeture de la connexion
        db.close()
    });
}
