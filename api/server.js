const express = require("express");
const Games = require("../games/games-model.js");
const server = express();

//import routers here
server.use(express.json());

//use routers here

//sanity check
server.get("/", (req, res) => {
  res.json({ message: "Testing server for sprint" });
});

//GET all games
server.get("/games", async (req, res) => {
  try {
    const games = await Games.find();
    res.status(200).json(games);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//POST new game

server.post("/games", async (req, res) => {
  let game = req.body;
  //   console.log(game);
  if (!game.title || !game.genre) {
    return res
      .status(422)
      .json({ message: "Submit both title and genre required to submit game" });
  }
  try {
    const saved = await Games.add(game);
    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error posting new game" });
  }
});
module.exports = server;
