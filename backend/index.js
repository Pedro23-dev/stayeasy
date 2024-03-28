const express = require('express');
const port = process.env.PORT || 5000;
const mysql = require('mysql');

const app = express();

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

app.listen(port, () => {
    console.log("Serveur démarré");
});
