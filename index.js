const server = require("./api/server.js");

port = 8000;

server.listen(port, () => {
  console.log(`\n****API running on port ${port} for Sprint`);
});
