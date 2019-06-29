const db = require('../data/dbConfig.js');
const Games = require('./gamesModel.js');

describe('the games model', () => {
    describe('insert()', () => {
        // cleanup for db
        afterEach(async () => {
           await db('games').truncate();
        });

        it('should insert games into the db', async () => {
            // using our model method
            await Games.insert({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
            await Games.insert({ title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 });

            // confirm with knex
            const games = await db('games');

            expect(games).toHaveLength(2);
            expect(games[0].title).toBe('Pacman');
        });

        it('should return the new game on insert', async () => {
            const game = await Games.insert({ title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 });

            expect(game).toEqual({ id: 1, title: "The Legend of Zelda", genre: "Action-adventure", releaseYear: 1986 });
        });
    });
});