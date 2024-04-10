const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'stayeasy'
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données : ', err);
      return;
    }
    console.log('Connexion à la base de données réussie !');
  });

  connection.end((err) => {
    if (err) {
      console.error('Erreur lors de la fermeture de la connexion : ', err);
      return;
    }
    console.log('Connexion à la base de données fermée.');
  });
  
  