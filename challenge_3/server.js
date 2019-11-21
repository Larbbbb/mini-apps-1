const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ urlencoded: true }));
server.use(express.static(path.join(__dirname, 'public')));

server.post('/checkout', (req, res) => {
  Users.create({}, function (err, userInstance) {
    if (err) return handleError(err);
    res.status(200).send(userInstance._id);
    });
});

server.post('/info', (req, res) => {
  var fields = req.body;

  Users.findOne({ _id: fields.user }, function (err, entry) {
    for (var key in fields) {
        entry[key] = fields[key];
    }
    entry.save();
    res.status(200).send(entry);
  });
});

var Users = mongoose.model('Users', new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phoneNumber: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    zip: String,
    cardNumber: String,
    expiry: String,
    cvv: String,
    billingZip: String
}));

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