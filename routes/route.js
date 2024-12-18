require('dotenv').config({path: 'config.env'});
const axios = require('axios');
const express = require('express');
const fs = require('fs');
const router = express.Router();

// ROUTES GET

router.get('/', async (req, res) => {

    // Afficher dynamiquement le contenu de notes.json
    fs.readFile('notes.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.render('404');
        } else {
            const notes = JSON.parse(data);
            res.render('index', {notes});
        }
    })
});

router.get('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const note = await axios.get(`http://localhost:6001/notes/${id}`);
    res.render('note', {note});
});


router.get('/connexion', async (req, res) => {
    res.render('connexion');
});

router.get('/inscription', async (req, res) => {
    res.render('inscription');
});

router.get('*', async (req, res) => {
    res.render('404');
});

// ROUTES POST

router.post('/connexion', async (req, res) => {
    const {email, password} = req.body;
    const user = await axios.post('http://localhost:6001/connexion', {email, password});
    res.json(user);
});

router.post('/inscription', async (req, res) => {
    const {username, email, password} = req.body;
    const user = await axios.post('http://localhost:6001/inscription', {username, email, password});
    res.json(user);
});

router.post('/notes', async (req, res) => {
    const { titre, description, tags } = req.body;

    fs.readFile('notes.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur lors de la lecture des notes.');
        }

        const notes = JSON.parse(data);

        // Ajouter la nouvelle note
        const newNote = {
            id: notes.length + 1,
            title: titre,
            content: description,
            tags: tags || 'No tags',
            created_at: new Date().toLocaleString(),
            author: 'Anonymous'
        };

        notes.push(newNote);

        fs.writeFile('notes.json', JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erreur lors de l\'écriture des notes.');
            }

            res.status(201).json(newNote);  // Retourner la nouvelle note
        });
    });
});


module.exports = router;