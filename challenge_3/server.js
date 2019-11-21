const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const server = express();

server.use(express.static(path.join(__dirname, 'public')));

server.post('/checkout', (req, res) => {

});

server.post('/info', (req, res) => {

});

server.get('/info', (req, res) => {

});


const port = 8000;
server.listen(port, () => {
    console.log('Checkout server is running!');
    console.log(`Listening on port ${port}...`);
    console.log(`http://localhost:${port}`);

    var mongoDB = 'mongodb://127.0.0.1/accountInfo';
    mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
});