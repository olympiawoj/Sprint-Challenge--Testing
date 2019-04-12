exports.up = function(knex, Promise) {
  return knex.schema.createTable("games", games => {
    games
      .string("title", 128)
      .notNullable()
      .unique();
    games.string("genre", 128).notNullable();
    games.integer("releaseYear", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("games");
};
