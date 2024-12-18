require("dotenv").config({ path: "./config.env" });

const express = require("express");
const path = require("path");
const fs = require('fs');
const app = express();
const router = require("./routes/route");
const itemsRoute = require("./routes/itemsRoute");

// Utilisation des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist'))); // Fichier CSS compilé
app.use(express.json());

// Moteur de vue EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Dossier des vues EJS


// Routes
app.use("/", router);

app.use("/api/v1", itemsRoute);


const hostname = "localhost";
const PORT = process.env.PORT || 6001;

app.listen(PORT, hostname, () => {
    console.log(`Serveur tourne sur http://${hostname}:${PORT}`);
});