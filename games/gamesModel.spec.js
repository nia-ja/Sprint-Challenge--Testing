const request = require('supertest');
const server = require('../api/server.js');

const db = require('../data/dbConfig.js');
const Games = require('./gamesModel.js');

describe('the games model', () => {
    describe('insert()', () => {
        // cleanup for db
        afterEach(async () => {
           await db('games').truncate();
        });

        it('should insert games into the db', async () => {
            await Games.insert({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
            await Games.insert({ title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 });

            const games = await db('games');

            expect(games).toHaveLength(2);
            expect(games[0].title).toBe('Pacman');
        });

        it('should return a status code of 201', async () => {
            let response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
    
            expect(response.status).toBe(201);
        });

        it('should return the new game on insert', async () => {
            const game = await Games.insert({ title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 });

            expect(game).toEqual({ id: 1, title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 });
        });

        it('should return a `422` status code if title and/or genre are not included inside the body', async () => {
            let response = await request(server).post('/games').send({ releaseYear: 1980 });
    
            expect(response.status).toBe(422);
        });
    });
});