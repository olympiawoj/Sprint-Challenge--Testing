const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("./server.js");

describe("server.js", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });

  describe("sanity check", () => {
    it("should return status 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });

    it("should return a message", async () => {
      const res = await request(server).get("/");
      expect(res.body).toEqual({ message: "Testing server for sprint" });
    });
  });

  //3 tests per endpoint
  describe("GET /games", async () => {
    it("should return status 200", async () => {
      const res = await request(server).get("/games");
      expect(res.status).toBe(200);
    });
    it("should return an array of all games", async () => {
      let res = await request(server).get("/games");
      expect(res.body).toHaveLength(0);

      await db("games").insert({
        title: "test",
        genre: "test",
        releaseYear: 1999
      });
      res = await request(server).get("/games");
      expect(res.body).toHaveLength(1);
    });

    it("should return an empty array if no games", async () => {
      let res = await request(server).get("/games");
      expect(res.body).toHaveLength(0);
    });
  });

  describe("POST /games", async () => {
    it("should return status 201", async () => {
      const newGame = { title: "test", genre: "test", releaseYear: 1999 };
      let res = await request(server)
        .post("/games")
        .send(newGame);
      expect(res.status).toBe(201);
    });

    it("should return status 422 if title or genre is missing", async () => {
      const errGame = { genre: "test", releaseYear: 1999 };

      let res = await request(server)
        .post("/games")
        .send(errGame);
      expect(res.status).toBe(422);
    });

    it("should successfully insert the new game in db", async () => {
      const newGame = { title: "test", genre: "test", releaseYear: 1999 };
      let res = await request(server)
        .post("/games")
        .send(newGame);
      res = await request(server).get("/games");

      expect(res.body[0]).toEqual({
        title: "test",
        genre: "test",
        releaseYear: 1999
      });
    });
  });
});
