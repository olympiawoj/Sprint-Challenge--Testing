const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find
};

function find() {
  return db("games");
}
async function add(game) {
  const [title] = await db("games").insert(game);
  return findByTitle(title);
}

function findByTitle(title) {
  return db("games")
    .where({ title })
    .first();
}
