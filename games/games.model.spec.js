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

    it("should insert the provided game -- check game returned", async () => {});
  });

  describe("find", () => {
    it("should return an empty array even if no games are stored", async () => {
      const games = await db("games");
      expect(games).toHaveLength(0);
    });
  });
});
