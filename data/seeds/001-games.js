
exports.seed = function(knex) {
  return knex('games').insert([
    // {title: "Agricola", genre: "board game", releaseYear: 2007},
  ]);
};