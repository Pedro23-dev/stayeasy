const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3003;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'stayeasy'
    });

    connection.connect((err) => {
        if (err) {
            console.log("Erreur de connexion :" + err.stack);
            return;
        }
        console.log("Connexion réussie à la base de données");
    });

    connection.query("SELECT * FROM utilisateur", (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
        connection.end(); // Ferme la connexion après avoir envoyé la réponse
    });
});



// Inscription
app.post('/inscription', (req, res) => {
    const { nom, email, mot_de_passe } = req.body;
    connection.query('INSERT INTO utilisateur (nom, email, mot_de_passe) VALUES (?, ?, ?)', [nom, email, mot_de_passe], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'inscription : ' + err.stack);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
        return;
      }
      res.json({ message: 'Inscription réussie' });
    });
  });
  
  // Connexion
  app.post('/connexion', (req, res) => {
    const { email, mot_de_passe } = req.body;
    connection.query('SELECT * FROM utilisateur WHERE email = ? AND mot_de_passe = ?', [email, mot_de_passe], (err, result) => {
      if (err) {
        console.error('Erreur lors de la connexion : ' + err.stack);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
        return;
      }
      if (result.length === 0) {
        res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
        return;
      }
      res.json({ message: 'Connexion réussie' });
    });
  });
  








app.listen(port, () => {
    console.log("Serveur démarré");
});
