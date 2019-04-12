const Games = require("./games-model");
const db = require("../database/dbConfig.js");

describe("games-model", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });

  describe("add", () => {
    it("should insert the provided game -- check length", async () => {
      await Games.add({ title: "jenga", genre: "jenga", releaseYear: 1999 });
      const games = await db("games");
      expect(games).toHaveLength(1);
    });

    it("should insert the provided game -- check game returned", async () => {
      const jenga = await Games.add({
        title: "jenga",
        genre: "jenga",
        releaseYear: 1999
      });
      const game = await db("games")
        .where({ title: "jenga" })
        .first();
      expect(game).toEqual({
        title: "jenga",
        genre: "jenga",
        releaseYear: 1999
      });
    });
  });

  describe("find", () => {
    it("should return an empty array even if no games are stored", async () => {
      const games = await db("games");
      expect(games).toHaveLength(0);
    });

    it("should return an array if games are added", async () => {
      //add games
      let games = await Games.add({
        title: "jenga",
        genre: "jenga",
        releaseYear: 1999
      });
      //check length
      games = await db("games");
      expect(games).toHaveLength(1);
    });
  });
});
