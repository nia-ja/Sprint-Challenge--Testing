const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up and running!' });
});

server.get('/games', (req, res) => {
    Games.getAll()
      .then(games => {
        res.status(200).json(games);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

server.post('/games', (req, res) => {
    const { title, genre, releaseYear } = req.body;
    const newGame = { title, genre, releaseYear };
    if (!title || !genre) {
      return res.status(422).json({ error: 'title and genre are required' });
    } else {
        Games.insert(newGame)
        .then(games => {
            res.status(201).json(games);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    }
});

module.exports = server;