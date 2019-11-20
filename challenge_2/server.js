const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({encoded: true}));
server.use(express.static(path.join(__dirname, 'client/')));


server.post('/', (req, res) => {

  var input = JSON.parse(req.body.jsonInput);
  var string = "";

  var convert = (object) => {

    var line = [];
    var childrenKey;

    if (string === '') {
      for (var key in object) {
        if (typeof object[key] !== 'object') line.push(key);
      }
      string += (line.join() + '\n');
      line = [];
    }

    for (var key in object) {
      if (typeof object[key] !== 'object') line.push(object[key]);
      else childrenKey = key;
    }
    string += (line.join() + '\n');

    if (childrenKey.length !== 0) {
      object[childrenKey].forEach(child => {
        convert(child, string);
      });
    }

  };

  convert(input);

  var outputFile = path.join(__dirname, 'output/output.csv');

  fs.writeFile(outputFile, string, (err) => {
    if (err) {
      console.log('error writing to csv file :(');
      res.status(400).send();
    } else {
      console.log('successfully saved to csv file');
      console.log(string);
      res.status(200).sendFile(outputFile);
    }
  });

});

server.get('/csv', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'output/output.csv'));
});

const port = 9000;
server.listen(port, () => {
  console.log('CSV Report Generator server running!');
  console.log(`Listening on port ${port}...`);
  console.log('http://localhost:9000');
});