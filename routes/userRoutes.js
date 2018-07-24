const server = require('express').Router();
const cors = require('cors');
const User = require('../models/User');

server.use(cors());

server.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500)
                .json({ message: 'There was a problem getting the users' });
        });
});

server.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
      .then(user => {
          if (!user) {
              return res.status(404).json({error: "User does not exist!"});
          }
          res.json({ user });
      })
      .catch(err => {
          res.status(500).json({message: "Error retrieving user from database!", error: err});
      })
})

server.post('/signup', (req, res) => {
    console.log(req.body);
    User.create(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: 'Error saving that user to the DB' });
        });
});

module.exports = server;
