const express = require("express");

const server = express();

//import routers here
server.use(express.json());

//use routers here

//sanity check
server.get("/", (req, res) => {
  res.json({ message: "Testing server for sprint" });
});

module.exports = server;
