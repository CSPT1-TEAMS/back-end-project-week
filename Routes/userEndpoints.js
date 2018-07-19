const server = require('express').Router();
const cors = require('cors');
const User = require('../Models/User');

server.use(cors());

server.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({message: "Error getting users!"})
    });
});


server.post('/signup', (req, res) => {
  User.create(req.body) 
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({message: "Error saving user to DB!"});
    });
});