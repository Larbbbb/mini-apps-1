const express = require('express');
const path = require('path');

const server = express();

server.use(express.static(path.join(__dirname, 'public/')));

const port = 3000;
server.listen(port, () => {
  console.log(`Connect Four server is running!`);
  console.log(`listening on port ${port}...`);
  console.log(`http://localhost:${port}`);
});
